using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Contracts.Dtos.User;
using Rookie.AMO.Web.DataProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rookie.AMO.Contracts;

namespace Rookie.AMO.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public Task<IEnumerable<UserDto>> GetAllUserAsync()
            =>  _userService.GetAllUsersAsync();
        [HttpGet("userId")]
        public Task<UserDto> GetByIdAsync(Guid userId)
            => _userService.GetByIdAsync(userId);
        [HttpGet("find")]
        public Task<PagedResponseModel<UserDto>> PagedQueryUserAsync(string name, int page, int limit)
            => _userService.PagedQueryAsync(name, page, limit);
        [HttpDelete("userid")]
        public Task<ActionResult> DeleteUserAsync(Guid userId)
            => _userService.DeleteUserAsync(userId);
        [HttpPost]
        public Task<UserDto> CreateUserAsync(UserRequest user)
            => _userService.CreateUserAsync(user);
        [HttpPut]
        public Task UpdateUserAsync(Guid id, UserUpdateRequest user)
            => _userService.UpdateUserAsync(id, user);
    }
}
