using Rookie.AMO.Contracts.Dtos;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.Contracts.Dtos.Category;
using Rookie.AMO.DataAccessor.Entities;
using Rookie.AMO.DataAccessor.Enums;

namespace Rookie.AMO.Business
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
            CreateMap<CategoryDto, Category>();
            CreateMap<AssetDto,Asset>().ForMember(u => u.State, options => options.MapFrom(input =>EnumConverExtension.GetValueInt<StateList>(input.State)));

            CreateMap<CategoryRequest, Category>();
            CreateMap<AssetRequest, Asset>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State))); ;
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Asset, AssetDto>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetNameString<StateList>(input.State))); ;
        }
    }
}
