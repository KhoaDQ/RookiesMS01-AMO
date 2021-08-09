using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.Security.Requirement
{
    public class AdminRoleRequirement : IAuthorizationRequirement
    {
        public AdminRoleRequirement()
        {

        }
    }
}
