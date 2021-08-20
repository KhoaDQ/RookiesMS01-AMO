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
    [Authorize(Policy = "ADMIN_ROLE_POLICY")]
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
        [HttpGet("{userId}")]
        public Task<UserDto> GetByIdAsync(Guid userId)
            => _userService.GetByIdAsync(userId);
        [HttpGet("find")]
        public Task<PagedResponseModel<UserDto>> PagedQueryUserAsync(string name, string type, int page, int limit)
            => _userService.PagedQueryAsync(name, type, page, limit, HttpContext.Request.Headers["Authorization"]);
        [HttpDelete("{userId}")]
        public Task<IActionResult> DisableUserAsync(Guid userId)
            => _userService.DisableUserAsync(userId);
        [HttpPost]
        public Task<UserDto> CreateUserAsync(UserRequest user)
            => _userService.CreateUserAsync(user);
        [HttpPut("{userId}")]
        public Task<IActionResult> UpdateUserAsync(Guid userId, [FromBody] UserUpdateRequest user)
            => _userService.UpdateUserAsync(userId, user);
    }
}
