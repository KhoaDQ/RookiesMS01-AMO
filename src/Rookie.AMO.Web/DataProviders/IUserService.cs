using Microsoft.AspNetCore.Mvc;
using Refit;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.User;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.DataProviders
{
    public interface IUserService
    {
        [Get(Endpoints.User)]
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        [Get(Endpoints.User + "/{userId}")]
        Task<UserDto> GetByIdAsync(Guid userId);
        [Post(Endpoints.User)]
        Task<UserDto> CreateUserAsync(UserRequest user);
        [Delete(Endpoints.User)]
        Task<IActionResult> DisableUserAsync(Guid userId);
        [Put(Endpoints.User + "/{id}")]
        Task<string> UpdateUserAsync(Guid id, UserUpdateRequest user);
        [Get(Endpoints.User + "/find")]
        Task<PagedResponseModel<UserDto>> PagedQueryAsync(string name, string type, int page, int limit, string propertyName, bool desc, [Header("Authorization")] string auth);
    }
}
