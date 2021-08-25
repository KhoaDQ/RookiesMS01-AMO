using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using Rookie.AMO.Business;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Business.Services;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.DataAccessor.Data;
using Rookie.AMO.DataAccessor.Entities;
using Rookie.AMO.DataAccessor.Enums;
using Rookie.AMO.IntegrationTests.Common;
using Rookie.AMO.UnitTests.API.Validators.TestData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Xunit;

namespace Rookie.AMO.UnitTests.Business
{
    public class AssetServiceShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly AssetService _assetService;
        private readonly Mock<IBaseRepository<Asset>> _assetRepository;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AssetServiceShould(SqliteInMemoryFixture fixture)
        {
            _assetRepository = new Mock<IBaseRepository<Asset>>();

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            fixture.CreateDatabase();
            _assetService = new AssetService(
                    _assetRepository.Object,
                    _mapper,
                    _context = fixture.Context,
                    _httpContextAccessor
                );
        }
        [Fact]
        public async Task GetAsyncShouldReturnNullAsync()
        {
            var id = Guid.NewGuid();
            _assetRepository.Setup(x => x.GetByIdAsync(id)).Returns(Task.FromResult<Asset>(null));

            var result = await _assetService.GetByIdAsync(id);
            result.Should().BeNull();
        }
        [Fact]
        public async Task GetAsyncShouldReturnObjectAsync()
        {
            var entity = new Asset()
            {
                Code = "code",
                Id = Guid.NewGuid(),
                Name = "Name",
                InstalledDate = DateTime.Now
            };

            _assetRepository.Setup(x => x.GetByIdAsync(entity.Id)).Returns(Task.FromResult(entity));
            var result = await _assetService.GetByIdAsync(entity.Id);
            result.Should().NotBeNull();

            _assetRepository.Verify(mock => mock.GetByIdAsync(entity.Id), Times.Once());
        }

       
    }
}
