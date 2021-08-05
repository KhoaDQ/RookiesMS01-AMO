using System;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Rookie.AMO.Identity.Sercurity.Authorization.Requirement;
//using RookieShop.Backend.Security.Authorization.Requirements;

namespace RookieShop.Backend.Security.Authorization.Handlers
{
    public class AdminRoleHandler : AuthorizationHandler<AdminRoleRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   AdminRoleRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == JwtClaimTypes.Role &&
                                            c.Issuer == "https://localhost:5001"))
            {
                return Task.CompletedTask;
            }

            var adminclaim = context.User.FindFirst(c => c.Type == JwtClaimTypes.Role &&
                                                      c.Issuer == "https://localhost:5001" &&
                                                      c.Value == "admin")?.Value;

            if (!string.IsNullOrEmpty(adminclaim))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}