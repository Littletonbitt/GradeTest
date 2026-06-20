namespace GradeBackend.Extensions;

public static class AddSwaggerExtension
{
	public static WebApplication UseDevelopmentSwagger(this WebApplication app)
	{
		var env = app.Environment;
		if (env.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
			app.MapOpenApi();
			app.UseSwaggerUI(options => 
			{
				options.SwaggerEndpoint("/openapi/apis.json", "GradeTest_v1.0.0");
			});
		}

		return app;
	}
}
