namespace GradeBackend.Models;

public class User
{
	public Guid Id { get; init; }
	public string NickName { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty; 
	public string PasswordHash { get; set; } = string.Empty;
	public string Role { get; set; } = "User";
}
