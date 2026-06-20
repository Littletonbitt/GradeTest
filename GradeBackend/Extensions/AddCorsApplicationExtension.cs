using GradeBackend.Configuration;
namespace GradeBackend.Extensions;

public static class AddCorsApplicationExtension
{
	public static WebApplication ExtendApplicationCors(this WebApplication app)
	{
		app.UseCors(CorsConfig.CorsPolicy);

		return app;
	}
}
