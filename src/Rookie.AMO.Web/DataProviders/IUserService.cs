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
        Task<IEnumerable<UserDto>> GetAllUsersAsync([Header("Cookie")] string cookie);
        [Get(Endpoints.User + "/{userId}")]
        Task<UserDto> GetByIdAsync(Guid userId, [Header("Cookie")] string cookie);
        [Post(Endpoints.User)]
        Task<UserDto> CreateUserAsync(UserRequest user, [Header("Cookie")] string cookie);
        [Delete(Endpoints.User)]
        Task<bool> DisableUserAsync(Guid userId, [Header("Cookie")] string cookie);
        [Put(Endpoints.User + "/{id}")]
        Task<string> UpdateUserAsync(Guid id, UserUpdateRequest user, [Header("Cookie")] string cookie);
        [Get(Endpoints.User + "/find")]
        Task<PagedResponseModel<UserDto>> PagedQueryAsync(string name, string type, int page,
            int limit, string propertyName, bool desc, [Header("Cookie")] string cookie);
    }
}
