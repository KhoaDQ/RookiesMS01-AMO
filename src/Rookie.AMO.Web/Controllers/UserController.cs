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
using Rookie.AMO.Web.Extensions;

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
        {
            var cookie = HttpContext.Request.Cookies.GetString();
            return _userService.GetAllUsersAsync(cookie);
        }
        [HttpGet("{userId}")]
        public Task<UserDto> GetByIdAsync(Guid userId)
        {
            var cookie = HttpContext.Request.Cookies.GetString();
            return _userService.GetByIdAsync(userId, cookie);
        }
        [HttpGet("find")]
        public Task<PagedResponseModel<UserDto>> PagedQueryUserAsync(string name, string type, int page, 
            int limit, string propertyName, bool desc)
        {
            var cookie = HttpContext.Request.Cookies.GetString();
            return _userService.PagedQueryAsync(name, type, page, limit, propertyName, desc, cookie);
        }
        [HttpDelete("{userId}")]
        public Task<bool> DisableUserAsync(Guid userId)
        {
            var cookie = HttpContext.Request.Cookies.GetString();
            return _userService.DisableUserAsync(userId, cookie);
        }
        [HttpPost]
        public Task<UserDto> CreateUserAsync(UserRequest user)
        {
            var cookie = HttpContext.Request.Cookies.GetString();
            return _userService.CreateUserAsync(user, cookie);
        }
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserAsync(Guid userId, [FromBody] UserUpdateRequest user)
        {
            var cookie = HttpContext.Request.Cookies.GetString();
            var result = await _userService.UpdateUserAsync(userId, user, cookie);
            if (result == "false")
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
