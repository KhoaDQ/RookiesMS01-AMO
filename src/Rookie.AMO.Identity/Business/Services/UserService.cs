using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.User;
using Rookie.AMO.Identity.Business.Extensions;
using Rookie.AMO.Identity.Business.Interfaces;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Business.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UserService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }
        public async Task<UserDto> CreateUserAsync(UserRequest userRequest)
        {
            var user = _mapper.Map<User>(userRequest);

            user.UserName = AutoGenerateUserName(user.FirstName, user.LastName);
            user.CodeStaff = AutoGenerateStaffCode();
            var password = $"{user.UserName}@{user.DateOfBirth:ddmmyyyy}";
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new Exception("Unexpected errors!");
            }

            return _mapper.Map<UserDto>(user);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            await _userManager.DeleteAsync(user);
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<UserDto>>(await _userManager.Users.ToListAsync());
        }

        public async Task<UserDto> GetByIdAsync(Guid userId)
        {
            return _mapper.Map<UserDto>(await _userManager.FindByIdAsync(userId.ToString()));
        }

        public async Task<PagedResponseModel<UserDto>> PagedQueryAsync(string name, int page, int limit)
        {
            var query = _userManager.Users
                                .Where(x => String.IsNullOrEmpty(name) || x.UserName.Contains(name))
                                .OrderBy(x => x.CodeStaff);

            var assets = await query
                .AsNoTracking()
                .PaginateAsync(page, limit);

            return new PagedResponseModel<UserDto>
            {
                CurrentPage = assets.CurrentPage,
                TotalPages = assets.TotalPages,
                TotalItems = assets.TotalItems,
                Items = _mapper.Map<IEnumerable<UserDto>>(assets.Items)
            };
        }

        public Task UpdateUserAsync(UserDto userDto)
        {
            throw new NotImplementedException();
        }

        private string AutoGenerateStaffCode()
        {
            var staffCode = new StringBuilder();
            var userList = _userManager.Users
                                    .OrderByDescending(x => Convert.ToInt32(
                                        x.CodeStaff.Substring(0, UserContants.PrefixUserName.Length)
                                     ));
            var firstUser = userList.First();
            var currentNumber = Convert.ToInt32(firstUser.CodeStaff.Substring(0, UserContants.PrefixUserName.Length));
            currentNumber++;
            staffCode.Append(UserContants.PrefixUserName);
            staffCode.Append(currentNumber.ToString("0000"));

            return staffCode.ToString();
        }

        private string AutoGenerateUserName(string firstName, string lastName)
        {
            firstName = firstName.Trim().ToLower();
            lastName = lastName.Trim().ToLower();

            var userNameLogin = new StringBuilder(firstName);
            var words = lastName.Split(" ");

            foreach (var word in words)
            {
                userNameLogin.Append(word[0]);
            }

            var theSameUsernameLoginList = _userManager.Users
                .Where(x => x.FirstName.ToLower() == firstName && x.LastName.ToLower() == lastName)
                .OrderByDescending(x => Convert.ToInt32(x.UserName.Substring(0, userNameLogin.Length)));

            if (theSameUsernameLoginList.Count() == 0)
            {
                return userNameLogin.ToString();
            }

            var lastUsername = theSameUsernameLoginList.First().UserName;
            // lastUsername = usernamelogin + ordernumber ~ binhnv1 = binhnv + 1
            var orderNumber = Convert.ToInt32(lastUsername.Replace(userNameLogin.ToString(), ""));
            orderNumber++;
            userNameLogin.Append(orderNumber);

            return userNameLogin.ToString();
        }
    }
}
