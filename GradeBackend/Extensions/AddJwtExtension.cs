using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public static class AddJwtExtension
{
	public static IServiceCollection AddJwtService(this IServiceCollection services, IConfiguration configuration)
    	{
        	var jwtSettings = configuration.GetSection("Jwt");
        	services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            	.AddJwtBearer(options =>
            	{
                	options.TokenValidationParameters = new TokenValidationParameters
                	{
                    		ValidateIssuer = true,
                    		ValidateAudience = true,
                    		ValidateLifetime = true,
                    		ValidateIssuerSigningKey = true,
                    		ValidIssuer = jwtSettings["Issuer"],
                    		ValidAudience = jwtSettings["Audience"],
                    		IssuerSigningKey = new SymmetricSecurityKey(
                        		Encoding.UTF8.GetBytes(jwtSettings["Key"]!))
                	};
            	});

        	services.AddAuthorization();
        	return services;
    	}
}
