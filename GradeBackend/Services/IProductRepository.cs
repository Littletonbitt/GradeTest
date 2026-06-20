using GradeBackend.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace GradeBackend.Services;

public interface IProductRepository
{
	Task<List<User>> GetAllUsers();
	Task Save(RecordRegister newUser);
}

public class JsonProductRepository: IProductRepository
{
	private readonly string _filePathUser;
	private readonly PasswordHashingService _passwordHashingService;

	public JsonProductRepository(IWebHostEnvironment env, PasswordHashingService passwordHashingService)
        {
                _filePathUser = Path.Combine(env.ContentRootPath, "User.json");
		_passwordHashingService = passwordHashingService;
        }
	
	public async Task<List<User>> GetAllUsers()
	{
		if (!File.Exists(_filePathUser))
		{
			return new List<User>();
		}

		using var stream = File.OpenRead(_filePathUser);
		if (stream.Length == 0) return new List<User>();
		return await JsonSerializer.DeserializeAsync<List<User>>(stream) ?? new List<User>();
	}


	public async Task Save(RecordRegister newUser)
	{
		List<User> listUser;

		if (File.Exists(_filePathUser))
                {
                        string existFileUser = await File.ReadAllTextAsync(_filePathUser);
                        listUser = JsonSerializer.Deserialize<List<User>>(existFileUser) ?? new List<User>();
                }
                else
                {
                        listUser = new List<User>();
                }

		var id = Guid.NewGuid();
		
		var NewUserObj = new User
		{
			Id = id,
			NickName = newUser.NickName,
			PasswordHash = null!
		};
		
		string hash = _passwordHashingService.HashNewPassword(NewUserObj, newUser.Password);
		NewUserObj.PasswordHash = hash;

		listUser.Add(NewUserObj);
		var options = new JsonSerializerOptions { WriteIndented = true };
		string serializedData = JsonSerializer.Serialize(listUser, options);
		await File.WriteAllTextAsync(_filePathUser, serializedData);
		
	}
}
