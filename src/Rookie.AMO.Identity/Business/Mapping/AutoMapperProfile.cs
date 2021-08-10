
using AutoMapper;
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
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<User, UserDto>(MemberList.Destination);
        }
    }
}
