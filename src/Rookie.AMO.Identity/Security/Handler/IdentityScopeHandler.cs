using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Rookie.AMO.Identity.Security.Requirement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Security.Handler
{
    public class IdentityScopeHandler : AuthorizationHandler<IdentityScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IdentityScopeRequirement requirement)
        {
            var claims = context.User.Claims.ToList();

            var identityScope = claims.FirstOrDefault(c => c.Type.Contains("scope") && c.Issuer == "https://localhost:5001" &&
                                                     c.Value.Equals("identity", System.StringComparison.OrdinalIgnoreCase))?.Value;

            if (!string.IsNullOrEmpty(identityScope))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
