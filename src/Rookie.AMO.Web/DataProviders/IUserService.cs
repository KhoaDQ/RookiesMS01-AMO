﻿using Microsoft.AspNetCore.Mvc;
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
        [Get(Endpoints.User)]
        Task<UserDto> GetByIdAsync(Guid userId);
        [Post(Endpoints.User)]
        Task<UserDto> CreateUserAsync(UserRequest user);
        [Delete(Endpoints.User)]
        Task<ActionResult> DeleteUserAsync(Guid userId);
        [Get(Endpoints.User)]
        Task<PagedResponseModel<UserDto>> PagedQueryAsync(string name, int page, int limit);
    }
}
