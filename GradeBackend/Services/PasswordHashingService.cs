using Microsoft.AspNetCore.Identity;
using GradeBackend.Models;

namespace GradeBackend.Services;

public class PasswordHashingService
{
	private readonly IPasswordHasher<User> _hasher;

	public PasswordHashingService(IPasswordHasher<User> hasher)
	{
		_hasher = hasher;
	}

	public string HashNewPassword(User user, string password)
	{
		return _hasher.HashPassword(user, password);
		
	}

	public bool VerifyUser(User user, string password, string hash)
	{
		var result = _hasher.VerifyHashedPassword(user, hash, password);
		return result == PasswordVerificationResult.Success;
	}
}
