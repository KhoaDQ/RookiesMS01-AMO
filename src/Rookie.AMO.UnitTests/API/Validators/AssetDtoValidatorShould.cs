using FluentAssertions;
using FluentValidation.Results;
using Moq;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.DataAccessor.Enums;
using Rookie.AMO.Tests.Validations;
using Rookie.AMO.UnitTests.API.Validators.TestData;
using Rookie.AMO.Web.Validators;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Rookie.AMO.UnitTests.API.Validators
{
   public class AssetDtoValidatorShould : BaseValidatorShould
    {
        private readonly ValidationTestRunner<AssetDtoValidator, AssetDto> _testRunner;
        private readonly Mock<IAssetService> _assetService;

        public AssetDtoValidatorShould()
        {
            _assetService = new Mock<IAssetService>();
            _testRunner = ValidationTestRunner
              .Create<AssetDtoValidator, AssetDto>(new AssetDtoValidator(_assetService.Object));
        }

        [Theory]

        [MemberData(nameof(AssetTestData.ValidTexts), MemberType = typeof(AssetTestData))]
        public void NotHaveErrorWhenNameIsvalid(string name) =>
           _testRunner
               .For(m => m.Name = name)
               .ShouldNotHaveErrorsFor(m => m.Name);


        [Theory]
        [MemberData(nameof(AssetTestData.ValidIds), MemberType = typeof(AssetTestData))]
        public void NotHaveErrorWhenIdsIsvalid(Guid id) =>
            _testRunner
                .For(m => m.Id = id)
                .ShouldNotHaveErrorsFor(m => m.Id);

        [Theory]
        [MemberData(nameof(AssetTestData.InvalidIds), MemberType = typeof(AssetTestData))]
        public void HaveErrorWhenIdsIsinvalid(Guid id, string errorMessage) =>
          _testRunner
              .For(m => m.Id = id)
              .ShouldHaveErrorsFor(m => m.Id, errorMessage);
        [Theory]
        [MemberData(nameof(AssetTestData.InvalidCodes), MemberType = typeof(AssetTestData))]
        public void HaveErrorWhenCodeIsInvalid(string code, string errorMessage) =>
            _testRunner
                .For(m => m.Code = code)
                .ShouldHaveErrorsFor(m => m.Code, errorMessage);

        [Fact]
        public void HaveErrorWhenCategoryIdIsNull()
        {
            var dto = new AssetDto()
            {
                Code = "valid code",
                Name = "valid name",
                Id = new Guid("B41E8F49-DBCB-42C3-946F-F26C5B815BED"),
                Specification = "valid spec",
                State = StateList.Assigned.ToString(),
                InstalledDate = DateTime.Now
            };

            _assetService.Setup(x => x.GetByIdAsync(dto.Id)).Returns(Task.FromResult(dto));

            var validator = new AssetDtoValidator(_assetService.Object);
            ValidationResult result = validator.Validate(dto);

            result.IsValid.Should().BeFalse();
            result.Errors.Should().ContainSingle(string.Format(ErrorTypes.Common.RequiredError, nameof(dto.CategoryId)));
        }

        [Fact]
        public void HaveErrorWhenInstalledDateIsNull()
        {
            var dto = new AssetDto()
            {
                Code = "valid code",
                Name = "valid name",
                Id = new Guid("B41E8F49-DBCB-42C3-946F-F26C5B815BED"),
                Specification = "valid spec",
                State = StateList.Assigned.ToString(),
                CategoryId = new Guid("cee3cb26-9776-4174-a552-ae4abbb0a80c")
            };

            _assetService.Setup(x => x.GetByIdAsync(dto.Id)).Returns(Task.FromResult(dto));

            var validator = new AssetDtoValidator(_assetService.Object);
            ValidationResult result = validator.Validate(dto);

            result.IsValid.Should().BeFalse();
            result.Errors.Should().ContainSingle(string.Format(ErrorTypes.Common.RequiredError, nameof(dto.CategoryId)));
        }

        [Fact]
        public void HaveErrorWhenIdNotFound()
        {
            var dto = new AssetDto()
            {
                Code = "valid code",
                Name = "valid name",
                Id = new Guid("B41E8F49-DBCB-42C3-946F-F26C5B815BED"),
                Specification = "valid spec",
                State = StateList.Assigned.ToString(),
                InstalledDate = DateTime.Now,
                CategoryId = new Guid("cee3cb26-9776-4174-a552-ae4abbb0a80c")
            };

            _assetService.Setup(x => x.GetByIdAsync(dto.Id)).Returns(Task.FromResult<AssetDto>(null));

            var validator = new AssetDtoValidator(_assetService.Object);
            ValidationResult result = validator.Validate(dto);

            result.IsValid.Should().BeFalse();
            result.Errors.Should().ContainSingle("error");
        }
    }
}
