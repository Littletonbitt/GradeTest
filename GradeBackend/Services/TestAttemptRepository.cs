using System.Data;
using Dapper;
using GradeBackend.Models;
using Npgsql;

namespace GradeBackend.Services;

public class TestAttemptRepository: ITestAttemptRepository
{
	private readonly string _connectionString;
	
	public TestAttemptRepository(IConfiguration configuration)
    	{
        	_connectionString = configuration.GetConnectionString("DefaultConnection")!;
    	}

    	private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

    	public async Task AddAttempt(TestAttempt attempt)
    	{
        	using var connection = CreateConnection();
        	const string sql = @"
            		INSERT INTO test_attempts (id, user_id, test_id, score, total_questions, completed_at, answers_json)
            		VALUES (@Id, @UserId, @TestId, @Score, @TotalQuestions, @CompletedAt, @AnswersJson)";
        	await connection.ExecuteAsync(sql, attempt);
    	}

    	public async Task<IEnumerable<TestAttempt>> GetAttemptsByUser(Guid userId)
    	{
        	using var connection = CreateConnection();
        	const string sql = "SELECT * FROM test_attempts WHERE user_id = @UserId ORDER BY completed_at DESC";
        	
		return await connection.QueryAsync<TestAttempt>(sql, new { UserId = userId });
    	}

    	public async Task<IEnumerable<TestAttempt>> GetAttemptsByTest(Guid testId)
    	{
        	using var connection = CreateConnection();
        	const string sql = "SELECT * FROM test_attempts WHERE test_id = @TestId ORDER BY completed_at DESC";
        
		return await connection.QueryAsync<TestAttempt>(sql, new { TestId = testId });
    	}
}

