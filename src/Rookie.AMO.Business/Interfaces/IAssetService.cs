using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Interfaces
{
    public interface IAssetService
    {
        Task<IEnumerable<AssetDto>> GetAllAsync();

        Task<PagedResponseModel<AssetDto>> PagedQueryAsync(FilterAssetsModel filter);

        Task<AssetDto> GetByIdAsync(Guid id);

        Task<AssetDto> AddAsync(AssetRequest assetRequest);

        Task DeleteAsync(Guid id);

        Task<AssetDto> UpdateAsync(Guid id,AssetUpdateRequest request);

        string AutoGenerateAssetCode(Asset asset);
    }
}
