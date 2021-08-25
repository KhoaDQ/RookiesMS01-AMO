using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Business.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetByIdAsync(Guid userId);
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto> CreateUserAsync(UserRequest userRequest);
        Task<string> UpdateUserAsync(Guid id, UserUpdateRequest request);
        Task DisableUserAsync(Guid userId);
        Task EnableUserAsync(Guid userId);
        Task<PagedResponseModel<UserDto>> PagedQueryAsync(string name, string type, int page, int limit, string propertyName, bool desc);
    }
}
