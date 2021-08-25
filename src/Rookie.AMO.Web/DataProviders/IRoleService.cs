using Refit;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.DataProviders
{
    public interface IRoleService
    {
        [Get(Endpoints.Role)]
        Task<IEnumerable<RoleDto>> GetAllRolesAsync([Header("Authorization")] string auth);
    }
}
