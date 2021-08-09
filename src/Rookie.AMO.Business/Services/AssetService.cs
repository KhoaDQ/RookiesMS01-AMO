using AutoMapper;
using EnsureThat;
using Microsoft.EntityFrameworkCore;
using Rookie.AMO.Business.Extensions;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.DataAccessor.Data;
using Rookie.AMO.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Services
{
    public class AssetService : IAssetService
    {
        private readonly IBaseRepository<Asset> _baseRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public AssetService(IBaseRepository<Asset> baseRepository, IMapper mapper, ApplicationDbContext context)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<AssetDto> AddAsync(AssetRequest assetRequest)
        {
            Ensure.Any.IsNotNull(assetRequest, nameof(assetRequest));
            var asset = _mapper.Map<Asset>(assetRequest);

            asset.Id = Guid.NewGuid();

            asset.Code = ""; //add code category and auto number

            asset.Location = "HCM"; // location take in creator location

            var item = await _baseRepository.AddAsync(asset);
            return _mapper.Map<AssetDto>(item);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _baseRepository.DeleteAsync(id);
        }

        public async Task UpdateAsync(AssetDto assetDto)
        {
            var asset = _mapper.Map<Asset>(assetDto);
           
            await _baseRepository.UpdateAsync(asset);
        }

        public async Task<IEnumerable<AssetDto>> GetAllAsync()
        {
            var assets = await _baseRepository.GetAllAsync();
            return _mapper.Map<List<AssetDto>>(assets);
        }

        public async Task<AssetDto> GetByIdAsync(Guid id)
        {
            // map roles and users: collection (roleid, userid)
            // upsert: delete, update, insert
            // input vs db
            // input-y vs db-no => insert
            // input-n vs db-yes => delete
            // input-y vs db-y => update
            // unique, distinct, no-duplicate
            var asset = await _baseRepository.GetByIdAsync(id);
            return _mapper.Map<AssetDto>(asset);
        }

        public async Task<PagedResponseModel<AssetDto>> PagedQueryAsync(string key, int page, int limit)
        {
            var query = _baseRepository.Entities;

            query = query.Where(x => string.IsNullOrEmpty(key) || x.Name.Contains(key) || x.Code.Contains(key));

            query = query.OrderBy(x => x.Name);

            var assets = await query
                .AsNoTracking()
                .PaginateAsync(page, limit);

            return new PagedResponseModel<AssetDto>
            {
                CurrentPage = assets.CurrentPage,
                TotalPages = assets.TotalPages,
                TotalItems = assets.TotalItems,
                Items = _mapper.Map<IEnumerable<AssetDto>>(assets.Items)
            };
        }

        public async Task<IEnumerable<AssetDto>> GetBySortAsync(string propertyName,bool desc)
        {
            var assets = await Task.FromResult(_baseRepository.GetAllAsync().Result.OrderByPropertyName(propertyName,desc).ToList());
            
            return _mapper.Map<List<AssetDto>>(assets);
        }
    }
}
