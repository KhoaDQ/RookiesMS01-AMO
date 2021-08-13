using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Moq;
using Rookie.AMO.Identity.Business.Mapping;
using Rookie.AMO.Identity.Business.Services;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.UnitTests.Business
{
    class UserServiceShould
    {
        private readonly UserService _userService;
        private readonly Mock<UserManager<User>> _dbContext;
        private readonly IMapper _mapper;

        public UserServiceShould()
        {
            _dbContext = new Mock<UserManager<User>>();

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _userService = new UserService(
                    _dbContext.Object,
                    _mapper
                );
        }

        public async Task GetUserByIdShouldReturnUser() { }
        public async Task GetUserByIdShouldReturnNull() { }
        public async Task GetAllUserShouldReturnUserList() { }
        public async Task GetAllUserShouldReturnNull() { }
        public async Task DeleteUserShouldBeFail() { }
        public async Task DeleteUserShouldBeSuccess() { }
        public async Task CreateUserShouldBeFailBecauseInvalidFirstName() { }
        public async Task CreateUserShouldBeFailBecauseInvalidLastName() { }
        public async Task CreateUserShouldBeFailBecauseJoinedDateIsSaturdayOrSunDay() { }
        public async Task CreateUserShouldBeFailBecauseUserUnder18() { }
        public async Task CreateUserShouldBeFailBecauseUserJoinedIsLaterThanBirthDate() { }
        public async Task CreateUserShouldBeSuccess() { }
    }
}
