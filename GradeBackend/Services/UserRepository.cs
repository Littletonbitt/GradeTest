using System.Data;
using Dapper;
using GradeBackend.Models;
using Npgsql;

namespace GradeBackend.Services;

public class UserRepository: IUserRepository
{
	private readonly string _connectionString;
    
	public UserRepository(IConfiguration configuration)
    	{
        	_connectionString = configuration.GetConnectionString("DefaultConnection")!;
    	}

    	private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

    	public async Task<User?> GetUserByEmail(string email)
    	{
        	using var connection = CreateConnection();
        	const string sql = "SELECT id, nickname, email, password_hash as PasswordHash, role FROM users WHERE email = @Email";
        	return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
    	}

    	public async Task<User?> GetUserByNickName(string nickName)
    	{
        	using var connection = CreateConnection();
        	const string sql = "SELECT id, nickname, email, password_hash as PasswordHash, role FROM users WHERE nickname = @NickName";
        	return await connection.QueryFirstOrDefaultAsync<User>(sql, new { NickName = nickName });
    	}

    	public async Task CreateUser(User user)
    	{
        	using var connection = CreateConnection();
        	const string sql = @"
            		INSERT INTO users (id, nickname, email, password_hash, role)
            		VALUES (@Id, @NickName, @Email, @PasswordHash, @Role)";
        	await connection.ExecuteAsync(sql, user);
    	}

    	public async Task UpdateUser(User user)
    	{
        	using var connection = CreateConnection();
        	const string sql = @"
            		UPDATE users 
            		SET nickname = @NickName, email = @Email, password_hash = @PasswordHash, role = @Role
            		WHERE id = @Id";
        	await connection.ExecuteAsync(sql, user);
    	}

    	public async Task DeleteUser(Guid id)
    	{
        	using var connection = CreateConnection();
        	const string sql = "DELETE FROM users WHERE id = @Id";
        	await connection.ExecuteAsync(sql, new { Id = id });
    	}

    	public async Task<List<User>> GetAllUsers()
    	{
        	using var connection = CreateConnection();
        	const string sql = "SELECT id, nickname, email, password_hash as PasswordHash, role FROM users";
        	return (await connection.QueryAsync<User>(sql)).ToList();
    	}
}

