using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Rookie.AMO.Identity.DataAccessor.Entities;
using Rookie.AMO.Identity.Security.Requirement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Security.Handler
{
    public class AdminHandler : AuthorizationHandler<AdminRequirement>
    {
        private readonly IConfiguration _configuration;
        //private readonly UserManager<User> _userManager;
        public AdminHandler(IConfiguration configuration,
            UserManager<User> userManager)
        {
            _configuration = configuration;
            //_userManager = userManager;
        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                        AdminRequirement requirement)
        {
            var claims = context.User.Claims.ToList();

            var sub = claims.FirstOrDefault(c => c.Type.Contains("sub") && c.Issuer == _configuration["IdentityServerHost"])?.Value;
            /*var user = await _userManager.FindByIdAsync(sub);
            var valid = await _userManager.IsInRoleAsync(user, "Admin");*/
            if (true)
            {
                context.Succeed(requirement);
            }
        }
    }
}
