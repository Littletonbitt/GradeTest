using System.Security.Claims;
using GradeBackend.Services;
using GradeBackend.Models;


namespace GradeBackend.Endpoints;

public static class TestEndpoints
{
	public static void MapTestEndpoints(this WebApplication app)
    	{
        	app.MapPost("/tests", async (TestDto dto, ITestRepository repo, HttpContext ctx) =>
        	{
            		var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            		if (!Guid.TryParse(userIdClaim, out var ownerId))
                		return Results.Unauthorized();

            		var test = new Test
            		{
                		Id = Guid.NewGuid(),
                		Title = dto.Title,
                		OwnerId = ownerId,
                		CreatedAt = DateTime.UtcNow,
                		Questions = dto.Questions.Select(q => new Question
                		{	
                    			Id = Guid.NewGuid(),
                    			Text = q.Text,
                    			IsMultiple = q.IsMultiple,
                    			Answers = q.Answers.Select(a => new Answer
                    			{
                        			Id = Guid.NewGuid(),
                        			Text = a.Text,
                        			IsCorrect = a.IsCorrect
                    			}).ToList()
                		}).ToList()
            		};

            		await repo.CreateTest(test);
            		return Results.Created($"/tests/{test.Id}", test);
        	}).RequireAuthorization();

        	app.MapGet("/tests", async (ITestRepository repo, HttpContext ctx) =>
        	{
            		var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            		if (!Guid.TryParse(userIdClaim, out var ownerId))
                		return Results.Unauthorized();

            		var tests = await repo.GetTestsByOwner(ownerId);
            		return Results.Ok(tests);
        	}).RequireAuthorization();

        	app.MapGet("/tests/{id:guid}", async (Guid id, ITestRepository repo, HttpContext ctx) =>
        	{
            		var test = await repo.GetTestById(id);
            		if (test == null) return Results.NotFound();

            		var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            		if (!Guid.TryParse(userIdClaim, out var ownerId) || test.OwnerId != ownerId)
                		return Results.Forbid();

            		return Results.Ok(test);
        	}).RequireAuthorization();

        	app.MapDelete("/tests/{id:guid}", async (Guid id, ITestRepository repo, HttpContext ctx) =>
        	{
            		var test = await repo.GetTestById(id);
            		if (test == null) return Results.NotFound();

            		var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            		if (!Guid.TryParse(userIdClaim, out var ownerId) || test.OwnerId != ownerId)
                		return Results.Forbid();

            		await repo.DeleteTest(id);
            		return Results.NoContent();
        	}).RequireAuthorization();
    		
		app.MapPut("/tests/{id:guid}", async (Guid id, TestDto dto, ITestRepository repo, HttpContext ctx) =>
		{
    			var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    			if (!Guid.TryParse(userIdClaim, out var ownerId))
        			return Results.Unauthorized();

    			var existing = await repo.GetTestById(id);
    			if (existing == null)
        			return Results.NotFound();
    			if (existing.OwnerId != ownerId)
        			return Results.Forbid();
    			
			existing.Title = dto.Title;
    			existing.Questions = dto.Questions.Select(q => new Question
    			{
        			Id = Guid.NewGuid(),
        			Text = q.Text,
        			IsMultiple = q.IsMultiple,
        			Answers = q.Answers.Select(a => new Answer
        			{
            				Id = Guid.NewGuid(),
            				Text = a.Text,
            				IsCorrect = a.IsCorrect
        			}).ToList()
    			}).ToList();

    			await repo.UpdateTest(existing);
   			
		       	return Results.Ok(existing);
		}).RequireAuthorization();

		app.MapGet("/admin/tests", async (ITestRepository repo) =>
		{
    			var tests = await repo.GetAllTests();
    			return Results.Ok(tests);
		}).RequireAuthorization(policy => policy.RequireRole("Admin"));

		app.MapDelete("/admin/tests/{id:guid}", async (Guid id, ITestRepository repo) =>
		{
    			await repo.DeleteTest(id);
    			return Results.NoContent();
		}).RequireAuthorization(policy => policy.RequireRole("Admin"));

		app.MapPost("/tests/attempt", async (TestAttemptDto dto, ITestAttemptRepository attemptRepo, HttpContext ctx) =>
		{
    			var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    			if (!Guid.TryParse(userIdClaim, out var userId))
        			return Results.Unauthorized();

    			var attempt = new TestAttempt
    			{
        			Id = Guid.NewGuid(),
        			UserId = userId,
        			TestId = dto.TestId,
        			Score = dto.Score,
        			TotalQuestions = dto.TotalQuestions,
        			CompletedAt = DateTime.UtcNow,
        			AnswersJson = dto.AnswersJson
    			};
    			
			await attemptRepo.AddAttempt(attempt);
    			
			return Results.Ok(new { message = "Attempt saved" });
		}).RequireAuthorization();

		app.MapGet("/results", async (ITestAttemptRepository attemptRepo, HttpContext ctx) =>
		{
    			var userIdClaim = ctx.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    			if (!Guid.TryParse(userIdClaim, out var userId))
        			return Results.Unauthorized();

    			var attempts = await attemptRepo.GetAttemptsByUser(userId);
    			return Results.Ok(attempts);
		}).RequireAuthorization();
	}
}

public record TestDto(string Title, List<QuestionDto> Questions);
public record QuestionDto(string Text, bool IsMultiple, List<AnswerDto> Answers);
public record AnswerDto(string Text, bool IsCorrect);
public record TestAttemptDto(Guid TestId, int Score, int TotalQuestions, string? AnswersJson);


