using FluentValidation;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.Asset;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.Validators
{
    public class AssetDtoValidator : BaseValidator<AssetDto>
    {
      
        public AssetDtoValidator(IAssetService assetService)
            {
                 RuleFor(m => m.Id)
                        .NotNull()
                     .WithMessage(x => string.Format(ErrorTypes.Common.RequiredError, nameof(x.Id)));

                 RuleFor(m => m.Name)
                    .NotEmpty()
                    .WithMessage(x => string.Format(ErrorTypes.Common.RequiredError, nameof(x.Name)));

                RuleFor(m => m.Code)
                    .NotNull()
                    .WithMessage(x => string.Format(ErrorTypes.Common.RequiredError, nameof(x.Code)));

                RuleFor(m => m.State)
                    .NotNull()
                    .WithMessage(x => string.Format(ErrorTypes.Common.RequiredError, nameof(x.State)));

                RuleFor(m => m.InstalledDate)
                     .Must(m => m != DateTime.MinValue)
                   .WithMessage(x => string.Format(ErrorTypes.Common.RequiredError, nameof(x.InstalledDate)));

                RuleFor(m => m.CategoryId)
                     .NotEmpty()
                     .WithMessage(x => string.Format(ErrorTypes.Common.RequiredError, nameof(x.Id)));
                 RuleFor(x => x).MustAsync(async (dto, cancellation) =>
                 {
                          var obj = await assetService.GetByIdAsync(dto.Id);
                          return obj != null;
                 }).WithMessage("error");

           }
        }
}
