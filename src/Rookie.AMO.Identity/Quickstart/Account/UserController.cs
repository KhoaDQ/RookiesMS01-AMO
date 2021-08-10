using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Contracts.Dtos.User;
using Rookie.AMO.Identity.Business.Interfaces;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Quickstart.Account
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetAllAsync()
            => await _userService.GetAllAsync();

        [HttpGet]
        public async Task<UserDto> GetAllAsync(Guid userId)
            => await _userService.GetByIdAsync(userId);

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUserAsync(UserRequest user)
        {
            if (!ModelState.IsValid) return BadRequest();

            var userDto = await _userService.CreateUserAsync(user);

            return Ok(userDto);
        }

        [HttpDelete]
        public async Task<ActionResult> UpdateUserAsync(Guid userId)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _userService.DeleteUserAsync(userId);
            return Ok();
        }
    }
}
