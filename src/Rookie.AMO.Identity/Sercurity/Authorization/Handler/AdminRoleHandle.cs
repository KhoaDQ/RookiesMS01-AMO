using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Rookie.AMO.Identity.Sercurity.Authorization.Requirement;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Sercurity.Authorization.Handler
{
    public class AdminRoleHandle : AuthorizationHandler<AdminRoleRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       AdminRoleRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == JwtClaimTypes.Role &&
                                              c.Issuer == "https://localhost:5001"))
            {
                return Task.CompletedTask;
            }
            var adminClaim = context.User.FindFirst(c => c.Type == JwtClaimTypes.Role &&
                                                     c.Issuer == "https://localhost:5001" &&
                                                     c.Value == "Admin")?.Value;

            if (!string.IsNullOrEmpty(adminClaim))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
