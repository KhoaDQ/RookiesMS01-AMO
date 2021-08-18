using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Contracts;
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

        [HttpGet("{userId}")]
        public async Task<UserDto> GetByIdAsync(Guid userId)
            => await _userService.GetByIdAsync(userId);

        [HttpGet("find")]
        public async Task<PagedResponseModel<UserDto>> PagedQueryAsync
            (string name, string type, int page, int limit)
            => await _userService.PagedQueryAsync(name, type, page, limit);

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUserAsync(UserRequest user)
        {
            var userDto = await _userService.CreateUserAsync(user);

            return Ok(userDto);
        }

        [HttpDelete]
        public async Task<ActionResult> DisableUserAsync(Guid userId)
        {
            await _userService.DisableUserAsync(userId);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserUpdateRequest request)
        {
            await _userService.UpdateUserAsync(id, request);

            return Ok("Update successfully");
        }

        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            try
            {
                await _userService.ChangePassword(model);
                return Ok();
            }
            catch (NotFoundException notFound)
            {
                return NotFound(notFound.Message);
            }
            catch (Exception ex)
            {
                //when password is wrong
                return BadRequest(ex.Message);
            }
        }
    }
}
