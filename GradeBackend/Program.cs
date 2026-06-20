using GradeBackend.Middleware;
using GradeBackend.Endpoints;
using GradeBackend.Services;
using GradeBackend.Extensions;


var builder = WebApplication.CreateBuilder(args);

builder.Services.ExtendApplicationServices();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.ExtendOriginalCors();
builder.Services.AddJwtService(builder.Configuration);

var app = builder.Build();

app.MapEndpoints();

app.UseDevelopmentSwagger();
app.ExtendApplicationCors();
app.UseAuthentication();

app.Use(async (ctx, next) =>
{
	var token = ctx.Request.Cookies["auth_token"];
    	if (!string.IsNullOrEmpty(token))
    	{
		var jwt = ctx.RequestServices.GetRequiredService<JwtService>();
        	var principal = jwt.ValidateToken(token);
        	if (principal != null)
            		ctx.User = principal;
    	}
    	
	await next();
});

app.UseAuthorization();


app.MapGet("/", () => "Hello World!");

app.Run();

