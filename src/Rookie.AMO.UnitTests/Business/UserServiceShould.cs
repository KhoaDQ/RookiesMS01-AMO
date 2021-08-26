using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.User;
using Rookie.AMO.Identity.Business.Mapping;
using Rookie.AMO.Identity.Business.Services;
using Rookie.AMO.Identity.DataAccessor.Data;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rookie.AMO.UnitTests.Business
{
    public class UserServiceShould
    {
        private readonly UserService _userService;
        private readonly Mock<AppIdentityDbContext> _dbContext;
        private readonly Mock<IUserStore<User>> _userStore;
        private readonly Mock<UserManager<User>> _userManager;
        private readonly IMapper _mapper;

        public UserServiceShould()
        {
            _dbContext = new Mock<AppIdentityDbContext>();
            _userStore = new Mock<IUserStore<User>>();
            _userManager = new Mock<UserManager<User>>(_userStore.Object, null, null, null, null, null, null, null, null);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _userService = new UserService(
                    _userManager.Object,
                    _mapper
                );
        }
        [Fact]
        public async Task GetUserByIdShouldReturnUser() 
        {
            var userRequest = Users().First();

            var user = _mapper.Map<User>(userRequest);

            _userManager.Setup(x => x.FindByIdAsync(user.Id)).Returns(Task.FromResult<User>(user));

            var id = new Guid(user.Id);
            var result = await _userService.GetByIdAsync(id);

            result.Should().NotBeNull();
            _userManager.Verify(mock => mock.FindByIdAsync(id.ToString()), Times.Once());
        }
        [Fact]
        public async Task GetUserByIdShouldReturnNull() 
        {
            var id = Guid.NewGuid();
            _userManager.Setup(x => x.FindByIdAsync(id.ToString())).Returns(Task.FromResult<User>(null));

            var result = await _userService.GetByIdAsync(id);

            result.Should().BeNull();
        }
        [Fact]
        public async Task GetAllUserShouldReturnUserList() 
        {
            var userRequests = Users();
            var lenght = userRequests.Count();
            var users = _mapper.Map<IEnumerable<User>>(userRequests).AsQueryable();
            _userManager.Setup(x => x.Users).Returns(users);

            var result = await _userService.GetAllAsync();

            result.Should().HaveCount(lenght);
            _userManager.Verify(mock => mock.Users, Times.Once());
        }

        [Fact]
        public async Task GetAllUserShouldReturnEmpty() 
        {
            var userRequests = new List<UserRequest>();
            var lenght = userRequests.Count();
            var users = _mapper.Map<IEnumerable<User>>(userRequests).AsQueryable();
            _userManager.Setup(x => x.Users).Returns(users);

            var result = await _userService.GetAllAsync();

            result.Should().HaveCount(lenght);
            _userManager.Verify(mock => mock.Users, Times.Once());
        }
        
        [Fact]
        public async Task DisableUserShouldBeNotFound() 
        {
            var userRequests = Users();
            var users = _mapper.Map<IEnumerable<User>>(userRequests).AsQueryable();
            var id = Guid.NewGuid();
            
            _userManager.Setup(x => x.FindByIdAsync(id.ToString())).Returns(Task.FromResult<User>(null));

            Func<Task> act = async () => await _userService.DisableUserAsync(id);

            act.Should().ThrowExactly<NotFoundException>();
        }
        [Fact]
        public async Task DisableUserShouldNotThrowException() 
        {
            var userRequests = Users();
            var users = _mapper.Map<IEnumerable<User>>(userRequests).AsQueryable();
            var deletedUser = _mapper.Map<User>(userRequests.First());
            var id = new Guid(deletedUser.Id);
            _userManager.Setup(x => x.FindByIdAsync(deletedUser.Id)).Returns(Task.FromResult(deletedUser));

            Func<Task> act = async () => await _userService.DisableUserAsync(id);

            act.Should().NotThrow();
            _userManager.Verify(mock => mock.UpdateAsync(deletedUser), Times.Once());
        }

        [Fact]
        public async Task DisableUserShoulSuccess()
        {
            var userRequests = Users();
            var users = _mapper.Map<IEnumerable<User>>(userRequests).AsQueryable();
            var deletedUser = _mapper.Map<User>(userRequests.First());
            var id = new Guid(deletedUser.Id);
            
            _userManager.Setup(x => x.FindByIdAsync(deletedUser.Id)).Returns(Task.FromResult(deletedUser));
            Func<Task> act = async () => await _userService.DisableUserAsync(id);
            var afterDisableUser = await _userManager.Object.FindByIdAsync(deletedUser.Id);

            act.Should().NotThrow();
            afterDisableUser.Disable.Should().BeTrue();
        }
        [Fact]
        public async Task CreateUserShouldBeSuccess() 
        {
            var userRequests = Users();
            var userRequest = userRequests.First();
            var user = _mapper.Map<User>(userRequest);
            _userManager.Setup(x => x.FindByNameAsync(user.UserName))
                .Returns(Task.FromResult(user));
            _userManager
                .Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            _userManager
                .Setup(x => x.AddClaimsAsync(It.IsAny<User>(), It.IsAny<List<Claim>>()))
                .ReturnsAsync(IdentityResult.Success);
            _userManager
                .Setup(x => x.AddToRoleAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            var result = await _userService.CreateUserAsync(userRequest);

            result.Should().BeOfType(typeof(UserDto));
            result.DateOfBirth.Should().BeSameDateAs(userRequest.DateOfBirth);
            result.FullName.Should().BeEquivalentTo($"{userRequest.FirstName} {userRequest.LastName}");
            result.CodeStaff.Should().BeEquivalentTo("SD0001");
            result.UserName.Should().BeEquivalentTo("nhutnl");
        }

        private IEnumerable<UserRequest> Users()
        {
            var u1 = new UserRequest()
            {
                FirstName = "Nhut",
                LastName = "Nguyen Lam",
                DateOfBirth = new DateTime(1999, 6, 23),
                JoinedDate = new DateTime(2021, 8, 26),
                Type = "Admin",
                Location = "HCM",
                Gender = "Male"
            };

            var u2 = new UserRequest()
            {
                FirstName = "Nhut",
                LastName = "Nguyen Lam Lam",
                DateOfBirth = new DateTime(1999, 6, 23),
                JoinedDate = new DateTime(2021, 8, 26),
                Type = "Staff",
                Location = "HCM",
                Gender = "Male"
            };

            var u3 = new UserRequest()
            {
                FirstName = "Nhut",
                LastName = "Nguyen Lam Thanh",
                DateOfBirth = new DateTime(1999, 6, 23),
                JoinedDate = new DateTime(2021, 8, 26),
                Type = "Staff",
                Location = "HCM",
                Gender = "Male"
            };

            var u4 = new UserRequest()
            {
                FirstName = "Nhut",
                LastName = "Nguyen Lam",
                DateOfBirth = new DateTime(1999, 6, 23),
                JoinedDate = new DateTime(2021, 8, 26),
                Type = "Admin",
                Location = "HCM",
                Gender = "Male"
            };

            var list = new List<UserRequest>();

            list.Add(u1);
            list.Add(u2);
            list.Add(u3);
            list.Add(u4);

            return list;
        }
    }
}
