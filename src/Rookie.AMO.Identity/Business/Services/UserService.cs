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
using System.Security.Claims;
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
            var createUserResult = await _userManager.CreateAsync(user, password);

            var claims = new List<Claim>()
            {
                new Claim(IdentityModel.JwtClaimTypes.GivenName, user.FirstName),
                new Claim(IdentityModel.JwtClaimTypes.FamilyName, user.LastName),
                new Claim(IdentityModel.JwtClaimTypes.Role, user.Type),
                new Claim("location", user.Location)
            };

            await _userManager.AddClaimsAsync(user, claims);

            if (!createUserResult.Succeeded)
            {
                throw new Exception("Unexpected errors!");
            }

            /*var role = await _roleManager.FindByNameAsync(userRequest.Type);
            if (role == null)
            {

            }*/
            var addRoleResult = await _userManager.AddToRoleAsync(user, userRequest.Type);

            if (!addRoleResult.Succeeded)
            {
                throw new Exception("Unexpected errors!");
            }

            return _mapper.Map<UserDto>(user);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                throw new NotFoundException("User not found!");
            }
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

        public async Task<bool> UpdateUserAsync(Guid id, UserUpdateRequest request)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            user.DateOfBirth = request.DateOfBirth;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.JoinedDate = request.JoinedDate;
            user.Type = request.Type;
            user.Gender = request.Gender;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        private string AutoGenerateStaffCode()
        {
            var staffCode = new StringBuilder();
            var userList = _userManager.Users
                                    .OrderByDescending(x => Convert.ToInt32(
                                        x.CodeStaff.Replace(UserContants.PrefixStaffCode, "")
                                     ));
            if (!userList.Any())
            {
                return UserContants.PrefixStaffCode + "0001";
            }

            var firstUser = userList.First();
            var currentNumber = Convert.ToInt32(firstUser.CodeStaff.Replace(UserContants.PrefixStaffCode, ""));
            currentNumber++;
            staffCode.Append(UserContants.PrefixStaffCode);
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
                .OrderByDescending(x => Convert.ToInt32(x.UserName.Replace(userNameLogin.ToString(), "")));

            if (!theSameUsernameLoginList.Any())
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
