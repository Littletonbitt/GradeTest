using GradeBackend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using GradeBackend.Models;

namespace GradeBackend.Extensions;

public static class AddBuilderExtension
{
	public static IServiceCollection ExtendApplicationServices(this IServiceCollection services)
	{
		services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
		services.AddScoped<PasswordHashingService>();
		services.Configure<PasswordHasherOptions>(options => 
		{
			options.IterationCount = 600_000;
			options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3;
		});


		services.AddScoped<IUserRepository, UserRepository>();
		services.AddScoped<JwtService>();
		services.AddScoped<ITestRepository, TestRepository>();
		services.AddScoped<ITestAttemptRepository, TestAttemptRepository>();

		return services;
	}
}
