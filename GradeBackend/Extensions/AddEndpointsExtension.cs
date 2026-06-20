using GradeBackend.Endpoints;

namespace GradeBackend.Extensions;

public static class AddEndpointsExtension
{
	public static WebApplication MapEndpoints(this WebApplication app)
	{
		app.MapLoginEndpoints();
		app.MapTestEndpoints();

		return app;
	}
}
