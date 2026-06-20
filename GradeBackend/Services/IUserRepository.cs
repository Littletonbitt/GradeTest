using GradeBackend.Models;

namespace GradeBackend.Services;

public interface IUserRepository
{
	Task<User?> GetUserByEmail(string email);
	Task<User?> GetUserByNickName(string nickName);
    	Task CreateUser(User user);
    	Task UpdateUser(User user);
    	Task DeleteUser(Guid id);
    	Task<List<User>> GetAllUsers();
}
