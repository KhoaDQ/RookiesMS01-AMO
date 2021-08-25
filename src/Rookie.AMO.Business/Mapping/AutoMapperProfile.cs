using Rookie.AMO.Contracts.Dtos;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.Contracts.Dtos.Assignment;
using Rookie.AMO.Contracts.Dtos.Category;
using Rookie.AMO.Contracts.Dtos.Request;
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
            CreateMap<CategoryRequest, Category>();

            CreateMap<AssetDto, Asset>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State)));
            CreateMap<AssetUpdateRequest, Asset>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State)));
            CreateMap<AssetRequest, Asset>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State)));

            CreateMap<AssignmentDto, Assignment>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State)));
            CreateMap<AssignmentUpdateRequest, Assignment>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State)));
            CreateMap<AssignmentRequest, Assignment>();

            CreateMap<RequestDto, Request>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetValueInt<StateList>(input.State)));

        }

        private void FromDataAccessorLayer()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Asset, AssetDto>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetNameString<StateList>(input.State))).ForMember(dest => dest.CategoryName, opt => opt
                                                             .MapFrom(s => s.Category.Name));
            CreateMap<Assignment, AssignmentDto>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetNameString<StateList>(input.State)))
                                                  .ForMember(dest => dest.AssetCode, opt => opt
                                                            .MapFrom(s => s.Asset.Code))
                                                  .ForMember(dest => dest.AssetName, opt => opt
                                                            .MapFrom(s => s.Asset.Name))
                                                  .ForMember(u => u.Specification, opt => opt.MapFrom(s => s.Asset.Specification))
                                                  .ForMember(u => u.Category, opt => opt.MapFrom(s => s.Asset.Category.Name));
                                                
            CreateMap<Request, RequestDto>().ForMember(u => u.State, options => options.MapFrom(input => EnumConverExtension.GetNameString<StateList>(input.State)))
                                                  .ForMember(dest => dest.AssetCode, opt => opt
                                                            .MapFrom(s => s.Asset.Code))
                                                  .ForMember(dest => dest.AssetName, opt => opt
                                                            .MapFrom(s => s.Asset.Name));
        }
    }
}
