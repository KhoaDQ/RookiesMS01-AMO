using FluentValidation;
using Rookie.AMO.Web.Validators;

namespace Rookie.AMO.Tests.Validations
{
    public static class ValidationTestRunner
    {
        public static ValidationTestRunner<TValidator, TModel> Create<TValidator, TModel>()
            where TValidator : BaseValidator<TModel>, new()
            where TModel : class, new() =>
            new ValidationTestRunner<TValidator, TModel>(new TValidator());

        public static ValidationTestRunner<TValidator, TModel> Create<TValidator, TModel>(TValidator validator)
            where TValidator : BaseValidator<TModel>
            where TModel : class, new() =>
            new ValidationTestRunner<TValidator, TModel>(validator);
    }
}
