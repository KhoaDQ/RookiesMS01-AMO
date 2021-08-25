using AutoMapper;
using FluentAssertions;
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

        public AssetServiceShould(SqliteInMemoryFixture fixture)
        {
            _assetRepository = new Mock<IBaseRepository<Asset>>();
            fixture.CreateDatabase();

            _context = fixture.Context;
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _assetService = new AssetService(
                    _assetRepository.Object,
                    _mapper,
                    _context
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
        [Fact]
        public async Task AddAssetShouldThrowExceptionAsync()
        {
            Func<Task> act = async () => await _assetService.AddAsync(null);
            await act.Should().ThrowAsync<ArgumentNullException>();
        }
      
        [Fact]
        public async Task AddAssetShouldBeSuccessfullyAsync()
        {
            var category = new Category()
            {
                Code = "code",
                Id = Guid.NewGuid(),
                Name = "name"
            };

            var entity = new Asset()
            {
                Code = "na100001",
                Id = Guid.NewGuid(),
                Name = "Name",
                InstalledDate = DateTime.Now,
                CategoryId = category.Id,
                Category = category
            };

            var entity2 = new Asset()
            {
                Code = "na100002",
                Id = Guid.NewGuid(),
                Name = "Name",
                InstalledDate = DateTime.Now,
                Category = category,
                CategoryId = category.Id,
              
            };

            var request = new AssetRequest()
            {
                Specification = "Desc",
                CategoryId = category.Id,
                State = StateList.Available.ToString(),
                InstalledDate = DateTime.Now
            };

            var existAsset = new List<Asset> {
                entity, entity2
            };

            _assetRepository
                .Setup(x => x.GetByAsync(It.IsAny<Expression<Func<Asset, bool>>>(), It.IsAny<string>()))
                .Returns(Task.FromResult<Asset>(entity2));

            var assetsMock = existAsset.AsQueryable().BuildMock();

            _assetRepository
                .Setup(x => x.Entities)
                .Returns(assetsMock.Object);

            _assetRepository.Setup(x => x.AddAsync(It.IsAny<Asset>())).Returns(Task.FromResult(entity2));

            
            var assetCode = _assetService.AutoGenerateAssetCode(entity);
            
            var result = await _assetService.AddAsync(request);

           
            result.Should().NotBeNull();
            // result.AssetCode.Should().Be("code000002");
            result.CategoryId.Should().NotBeEmpty();
            _assetRepository.Verify(mock => mock.AddAsync(It.IsAny<Asset>()), Times.Once);
            _assetRepository.Verify(mock => mock.GetByAsync(It.IsAny<Expression<Func<Asset, bool>>>(), It.IsAny<string>()), Times.Once);
        }

    }
}
