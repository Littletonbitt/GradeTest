using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GradeBackend.Models;
using Microsoft.IdentityModel.Tokens;

namespace GradeBackend.Services;

public class JwtService
{
	private readonly IConfiguration _config;
	public JwtService(IConfiguration config) => _config = config;
    	public string GenerateToken(User user)
    	{
        	var claims = new[]
		{
            		new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            		new Claim(ClaimTypes.Name, user.NickName),
            		new Claim(ClaimTypes.Email, user.Email),
            		new Claim(ClaimTypes.Role, user.Role)
        	};
		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        	var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var token = new JwtSecurityToken(
            		issuer: _config["Jwt:Issuer"],
            		audience: _config["Jwt:Audience"],
            		claims: claims,
            		expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpiryMinutes"])),
            		signingCredentials: creds
        	);
		return new JwtSecurityTokenHandler().WriteToken(token);
	}

	public ClaimsPrincipal? ValidateToken(string token)
	{
    		var tokenHandler = new JwtSecurityTokenHandler();
    		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
    		try
    		{
        		var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
        		{
            			ValidateIssuerSigningKey = true,
            			IssuerSigningKey = key,
            			ValidateIssuer = true,
            			ValidIssuer = _config["Jwt:Issuer"],
            			ValidateAudience = true,
            			ValidAudience = _config["Jwt:Audience"],
            			ValidateLifetime = true,
            			ClockSkew = TimeSpan.Zero
        		}, out _);
        		return principal;
    		}
    		catch (Exception ex)
    		{
        		return null;
    		}
	}
}

