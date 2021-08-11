﻿using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Rookie.AMO.Identity.Security.Requirement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Security.Handler
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
