
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Rookie.AMO.Contracts.Dtos.User;
using Rookie.AMO.Identity.DataAccessor.Entities;

namespace Rookie.AMO.Identity.Business.Mapping
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            FromDataAccessorLayer();
            FromPresentationLayer();
        }

        private void FromPresentationLayer()
        {
            CreateMap<UserRequest, User>(MemberList.Destination);
            CreateMap<UserUpdateRequest, User>(MemberList.Destination);
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<User, UserDto>(MemberList.Destination);
            CreateMap<IdentityRole, RoleDto>(MemberList.Destination);
        }
    }
}
