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
        Task UpdateUserAsync(UserDto userDto);
        Task DeleteUserAsync(Guid userId);
        Task<PagedResponseModel<UserDto>> PagedQueryAsync(string name, int page, int limit);
    }
}
