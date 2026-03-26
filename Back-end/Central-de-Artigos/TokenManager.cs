using Central_de_Artigos.Models;
using Microsoft.Ajax.Utilities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace Central_de_Artigos
{
    public class TokenManager
    {
        // Developed by Ruan Marcelo
        // GitHub: https://github.com/seu-usuario

        public static string Secret = "c34beb58a76c02a04cba42897201d8fd8138c34d59a5a4aab3741d32535dfc8fab25bf4212345554e363186c7ba597daf53088a2506ef3097a363809e156226b94f1";

        public static string GenerateToken(string email,string isDeletable)
        {
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {new Claim(ClaimTypes.Email,email), new Claim("isDeletable",isDeletable)}),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);
            return handler.WriteToken(token);
        }

        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try 
            { 
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtSecurityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                if (jwtSecurityToken == null)
                {
                    return null;
                }
                TokenValidationParameters validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret))
                };

                SecurityToken securityToken;
                ClaimsPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);
                return principal;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static TokenClaim  ValidateToken(string rawToken)
        {
            TokenClaim tokenClaim = new TokenClaim();
            string[] array = rawToken.Split(' ');
            var token = array[1];
            ClaimsPrincipal principal = GetPrincipal(token);
            Claim email = principal.FindFirst(ClaimTypes.Email);
            tokenClaim.Email = email.Value;
            Claim isDeletable = principal.FindFirst("isDeletable");
            tokenClaim.isDeletable = isDeletable.Value;
            return tokenClaim;
        }
    }
}