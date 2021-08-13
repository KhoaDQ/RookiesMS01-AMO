using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Rookie.AMO.Web.Security.Requirement;
using System.Threading.Tasks;
using System.Linq;

namespace Rookie.AMO.Web.Security
{
    public class AdminRoleHandler : AuthorizationHandler<AdminRoleRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       AdminRoleRequirement requirement)
        {
            var claims = context.User.Claims.ToList();
            var adminRole = claims.FirstOrDefault(c => c.Type.Contains("role") && c.Issuer == "https://localhost:5001" &&
                                                     c.Value.Equals("Admin", System.StringComparison.OrdinalIgnoreCase))?.Value;

            if (!string.IsNullOrEmpty(adminRole))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
