using GradeBackend.Models;
using GradeBackend.Services;
using System.Security.Claims;

namespace GradeBackend.Endpoints;

public static class LoginEndpoints
{
	public static void MapLoginEndpoints(this WebApplication app)
	{
		app.MapPost("/register", async (RecordRegister register, IUserRepository repo, PasswordHashingService hasher) =>
        	{
            		if (string.IsNullOrWhiteSpace(register.Email) || string.IsNullOrWhiteSpace(register.Password) || 
					(string.IsNullOrWhiteSpace(register.NickName)))
                		return Results.BadRequest(new { message = "Email and Password are required" });

            		var existing = await repo.GetUserByEmail(register.Email);
            		if (existing is not null)
                		return Results.Conflict(new { message = "User with this email already exists" });

            		var user = new User
            		{
                		Id = Guid.NewGuid(),
                		NickName = register.NickName ?? register.Email.Split('@')[0],
                		Email = register.Email,
                		Role = "User"
            		};
            		
			user.PasswordHash = hasher.HashNewPassword(user, register.Password);

            		await repo.CreateUser(user);
            		return Results.Ok(new { message = "User registered successfully" });
   	     	});

		app.MapPost("/login", async (RecordRegister loginData, IUserRepository repo, PasswordHashingService hasher, JwtService jwt, HttpContext ctx) =>
		{
    			var user = await repo.GetUserByEmail(loginData.Email);
    			if (user == null || !hasher.VerifyUser(user, loginData.Password, user.PasswordHash))
        			return Results.Unauthorized();

    			var token = jwt.GenerateToken(user);
    			ctx.Response.Cookies.Append("auth_token", token, new CookieOptions
    			{
        			HttpOnly = true,
        			Secure = false,
        			SameSite = SameSiteMode.Lax,
        			Expires = DateTime.UtcNow.AddHours(2)
    			});

    			return Results.Ok(new { role = user.Role });
		});

		app.MapGet("/me", async (HttpContext ctx, IUserRepository repo, JwtService jwt) =>
		{
    			var token = ctx.Request.Cookies["auth_token"];
			Console.WriteLine($"[ME] Cookie present: {!string.IsNullOrEmpty(token)}");
    			if (string.IsNullOrEmpty(token))
        			return Results.Unauthorized();

			Console.WriteLine($"[ME] Token (first 20): {token.Substring(0, Math.Min(20, token.Length))}...");
    			var principal = jwt.ValidateToken(token);
			Console.WriteLine($"[ME] Principal valid: {principal != null}");
    			if (principal == null)
        			return Results.Unauthorized();

    			var email = principal.FindFirst(ClaimTypes.Email)?.Value;
    			if (email == null)
        			return Results.Unauthorized();

    			var user = await repo.GetUserByEmail(email);
    			if (user == null)
        			return Results.NotFound();

    			return Results.Ok(new { user.NickName, user.Email, user.Role });
		});

		app.MapPost("/logout", (HttpContext ctx) =>
		{
    			ctx.Response.Cookies.Delete("auth_token");
    			return Results.Ok();
		});

        	app.MapGet("/profile", async (HttpContext context, IUserRepository repo) =>
        	{
            		var email = context.User.FindFirst(ClaimTypes.Email)?.Value;
            		if (string.IsNullOrEmpty(email))
                		return Results.Unauthorized();

            		var user = await repo.GetUserByEmail(email);
            		return user is null ? Results.NotFound() : Results.Ok(new { user.NickName, user.Email, user.Role });
        	}).RequireAuthorization();

        	app.MapPut("/user/{id}", async (Guid id, RecordRegister updateData, IUserRepository repo, PasswordHashingService hasher, HttpContext context) =>
        	{
            		var currentUserEmail = context.User.FindFirst(ClaimTypes.Email)?.Value;
            		var currentUserRole = context.User.FindFirst(ClaimTypes.Role)?.Value;

            		var userToUpdate = await repo.GetUserByEmail(updateData.Email) ?? await repo.GetUserByNickName(updateData.NickName);
            		if (userToUpdate == null)
                		return Results.NotFound(new { message = "User not found" });

            		if (currentUserRole != "Admin" && currentUserEmail != userToUpdate.Email)
                		return Results.Forbid();

            		if (!string.IsNullOrWhiteSpace(updateData.NickName))
                		userToUpdate.NickName = updateData.NickName;
            		if (!string.IsNullOrWhiteSpace(updateData.Email))
                		userToUpdate.Email = updateData.Email;
            		if (!string.IsNullOrWhiteSpace(updateData.Password))
                		userToUpdate.PasswordHash = hasher.HashNewPassword(userToUpdate, updateData.Password);

            		await repo.UpdateUser(userToUpdate);
            		return Results.Ok(new { message = "User updated" });
        	}).RequireAuthorization();

        	app.MapDelete("/admin/user/{id}", async (Guid id, IUserRepository repo) =>
        	{
            		await repo.DeleteUser(id);
            		return Results.Ok(new { message = "User deleted" });
        	}).RequireAuthorization(policy => policy.RequireRole("Admin"));

        	app.MapGet("/admin/users", async (IUserRepository repo) =>
        	{
            		var users = await repo.GetAllUsers();
            		return Results.Ok(users);
        	}).RequireAuthorization(policy => policy.RequireRole("Admin"));


	}
}


