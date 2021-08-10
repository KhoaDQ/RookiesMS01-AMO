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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPut]
        public async Task<ActionResult<UserDto>> AddUserAsync(UserRequest user)
        {
            if (!ModelState.IsValid) return BadRequest();

            var userDto = await _userService.CreateUserAsync(user);

            return Ok(userDto);
        }
    }
}
