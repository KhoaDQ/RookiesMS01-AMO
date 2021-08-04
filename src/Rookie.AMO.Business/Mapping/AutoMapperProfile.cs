using Rookie.AMO.Contracts.Dtos;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.Contracts.Dtos.Category;
using Rookie.AMO.DataAccessor.Entities;

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
            CreateMap<AssetDto,Asset>();

            CreateMap<CategoryRequest, Category>();
            CreateMap<AssetRequest, Asset>();
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Asset, AssetDto>();
        }
    }
}
