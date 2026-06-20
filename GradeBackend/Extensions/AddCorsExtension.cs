using GradeBackend.Configuration;

namespace GradeBackend.Extensions;

public static class AddCorsExtension
{
	public static IServiceCollection ExtendOriginalCors(this IServiceCollection services)
	{
		services.AddCors(options => 
		{
			options.AddPolicy(name: CorsConfig.CorsPolicy, policy => 
			{
				policy.WithOrigins("http://localhost:5173")
				      .AllowAnyHeader()
				      .AllowAnyMethod()
				      .AllowCredentials();
			});
		});

		return services;
	}
}
