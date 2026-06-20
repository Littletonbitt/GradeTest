namespace GradeBackend.Middleware;

public class LoggingMiddleware
{
	private readonly RequestDelegate _next;
	private readonly ILogger<LoggingMiddleware> _logger;

	public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
	{
		_next = next;
		_logger = logger;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		_logger.LogInformation($"[Running] Middleware: {context.Request.Path}");

		await _next.Invoke(context);

		_logger.LogInformation($"[Finished] Middleware got an answer: {context.Response.StatusCode}");
	}
}
