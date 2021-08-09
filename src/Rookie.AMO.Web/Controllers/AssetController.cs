﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnsureThat;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.DataAccessor.Data;
using Rookie.AMO.DataAccessor.Entities;

namespace Rookie.AMO.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase 
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpPost]
        public async Task<ActionResult<AssetDto>> CreateAsync([FromBody] AssetRequest assetRequest)
        {
            Ensure.Any.IsNotNull(assetRequest, nameof(assetRequest));
            var asset = await _assetService.AddAsync(assetRequest);
            return Created(Endpoints.Asset, asset);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] AssetDto assetDto)
        {
            Ensure.Any.IsNotNull(assetDto, nameof(assetDto));
            await _assetService.UpdateAsync(assetDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAssetAsync([FromRoute] Guid id)
        {
            var assetDto = await _assetService.GetByIdAsync(id);
            Ensure.Any.IsNotNull(assetDto, nameof(assetDto));
            await _assetService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<AssetDto> GetByIdAsync(Guid id)
            => await _assetService.GetByIdAsync(id);

        [HttpGet]
        public async Task<IEnumerable<AssetDto>> GetAsync()
            => await _assetService.GetAllAsync();


        [HttpGet("find")]
        public async Task<PagedResponseModel<AssetDto>>
            FindAsync(string key, int page = 1, int limit = 10)
            => await _assetService.PagedQueryAsync(key, page, limit);

        [HttpGet("sort")]
        public async Task<IEnumerable<AssetDto>> GetBySortAsync(string PropertyName, bool desc = false)
            => await _assetService.GetBySortAsync(PropertyName,desc);
    }
}
