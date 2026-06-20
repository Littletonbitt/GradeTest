using System.Data;
using Dapper;
using GradeBackend.Models;
using Npgsql;

namespace GradeBackend.Services;

public class TestRepository: ITestRepository
{
	private readonly string _connectionString;

    	public TestRepository(IConfiguration configuration)
    	{
        	_connectionString = configuration.GetConnectionString("DefaultConnection")!;
    	}

    	private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

    	public async Task<Test?> GetTestById(Guid id)
    	{
        	using var connection = CreateConnection();

        	var test = await connection.QueryFirstOrDefaultAsync<Test>(
            	"SELECT id, title, owner_id as OwnerId, created_at as CreatedAt FROM tests WHERE id = @Id",
            	new { Id = id });

        	if (test == null) return null;

        	var questions = await connection.QueryAsync<Question>(
            	"SELECT id, text, is_multiple as IsMultiple, test_id as TestId FROM questions WHERE test_id = @TestId",
            	new { TestId = id });

        	foreach (var q in questions)
        	{
            		var answers = await connection.QueryAsync<Answer>(
                	"SELECT id, text, is_correct as IsCorrect, question_id as QuestionId FROM answers WHERE question_id = @QuestionId",
                	new { QuestionId = q.Id });
            		q.Answers = answers.ToList();
        	}

        	test.Questions = questions.ToList();
        	return test;
    	}

    	public async Task<IEnumerable<Test>> GetTestsByOwner(Guid ownerId)
    	{
        	using var connection = CreateConnection();

        	var tests = await connection.QueryAsync<Test>(
            	"SELECT id, title, owner_id as OwnerId, created_at as CreatedAt FROM tests WHERE owner_id = @OwnerId",
            	new { OwnerId = ownerId });

        	var result = new List<Test>();

        	foreach (var test in tests)
        	{
            		var questions = await connection.QueryAsync<Question>(
               		"SELECT id, text, is_multiple as IsMultiple, test_id as TestId FROM questions WHERE test_id = @TestId",
                	new { TestId = test.Id });

            		foreach (var q in questions)
            		{
                		var answers = await connection.QueryAsync<Answer>(
                    		"SELECT id, text, is_correct as IsCorrect, question_id as QuestionId FROM answers WHERE question_id = @QuestionId",
                    		new { QuestionId = q.Id });
                		q.Answers = answers.ToList();
            		}

            		test.Questions = questions.ToList();
            		result.Add(test);
        	}

        	return result;
    	}

    	public async Task CreateTest(Test test)
    	{
        	using var connection = CreateConnection();
        	connection.Open();
        	using var transaction = connection.BeginTransaction();

        	try
        	{
            		const string insertTestSql = @"
                		INSERT INTO tests (id, title, owner_id, created_at)
                		VALUES (@Id, @Title, @OwnerId, @CreatedAt)";
            		await connection.ExecuteAsync(insertTestSql, new
            		{
                		test.Id,
                		test.Title,
                		test.OwnerId,
                		test.CreatedAt
            		}, transaction);

            		foreach (var q in test.Questions)
            		{
                		q.Id = Guid.NewGuid();
                		q.TestId = test.Id;
                		const string insertQuestionSql = @"
                    			INSERT INTO questions (id, text, is_multiple, test_id)
                    			VALUES (@Id, @Text, @IsMultiple, @TestId)";
                		await connection.ExecuteAsync(insertQuestionSql, new
                		{
                    			q.Id,
                    			q.Text,
                    			q.IsMultiple,
                    			q.TestId
                		}, transaction);

                		foreach (var a in q.Answers)
                		{
                    			a.Id = Guid.NewGuid();
                    			a.QuestionId = q.Id;
                    			const string insertAnswerSql = @"
                        			INSERT INTO answers (id, text, is_correct, question_id)
                        			VALUES (@Id, @Text, @IsCorrect, @QuestionId)";
                    			await connection.ExecuteAsync(insertAnswerSql, new
                    			{
                        			a.Id,
                        			a.Text,
                        			a.IsCorrect,
                        			a.QuestionId
                    			}, transaction);
                		}
            		}

            		transaction.Commit();
        	}
        	catch
        	{
            		transaction.Rollback();
            		throw;
        	}
    	}

    	public async Task UpdateTest(Test test)
    	{
        	using var connection = CreateConnection();
        	connection.Open();
        	using var transaction = connection.BeginTransaction();

        	try
        	{
            		const string updateTestSql = @"
                		UPDATE tests 
                		SET title = @Title, owner_id = @OwnerId, created_at = @CreatedAt
                		WHERE id = @Id";
            		await connection.ExecuteAsync(updateTestSql, new
            		{
                		test.Id,
                		test.Title,
                		test.OwnerId,
                		test.CreatedAt
            		}, transaction);

            		await connection.ExecuteAsync("DELETE FROM questions WHERE test_id = @TestId", new { TestId = test.Id }, transaction);

            		foreach (var q in test.Questions)
            		{
                		q.Id = Guid.NewGuid();
                		q.TestId = test.Id;
                		const string insertQuestionSql = @"
                    			INSERT INTO questions (id, text, is_multiple, test_id)
                    			VALUES (@Id, @Text, @IsMultiple, @TestId)";
                		await connection.ExecuteAsync(insertQuestionSql, new
                		{
                    			q.Id,
                    			q.Text,
                    			q.IsMultiple,
                    			q.TestId
                		}, transaction);

                		foreach (var a in q.Answers)
                		{
                    			a.Id = Guid.NewGuid();
                    			a.QuestionId = q.Id;
                    			const string insertAnswerSql = @"
                        			INSERT INTO answers (id, text, is_correct, question_id)
                        			VALUES (@Id, @Text, @IsCorrect, @QuestionId)";
                    			await connection.ExecuteAsync(insertAnswerSql, new
                    			{
                        			a.Id,
                        			a.Text,
                        			a.IsCorrect,
                        			a.QuestionId
                    			}, transaction);
                		}
            		}

            		transaction.Commit();
        	}
        	catch
        	{
            		transaction.Rollback();
            		throw;
        	}
    	}

    	public async Task DeleteTest(Guid id)
    	{
        	using var connection = CreateConnection();
        	await connection.ExecuteAsync("DELETE FROM tests WHERE id = @Id", new { Id = id });
    	}

	public async Task<IEnumerable<Test>> GetAllTests()
	{
    		using var connection = CreateConnection();

    		var tests = await connection.QueryAsync<Test>(
        		"SELECT id, title, owner_id as OwnerId, created_at as CreatedAt FROM tests");

    		var result = new List<Test>();

    		foreach (var test in tests)
    		{
        		var questions = await connection.QueryAsync<Question>(
            		"SELECT id, text, is_multiple as IsMultiple, test_id as TestId FROM questions WHERE test_id = @TestId",
            		new { TestId = test.Id });

        		foreach (var q in questions)
        		{
            			var answers = await connection.QueryAsync<Answer>(
                		"SELECT id, text, is_correct as IsCorrect, question_id as QuestionId FROM answers WHERE question_id = @QuestionId",
                		new { QuestionId = q.Id });
            			q.Answers = answers.ToList();
        		}

        		test.Questions = questions.ToList();
        		result.Add(test);
    		}

    		return result;
	}
}


