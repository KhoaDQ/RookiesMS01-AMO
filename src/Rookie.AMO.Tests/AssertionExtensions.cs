using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Tests.Assertions;
using Rookie.AMO.Tests.Validations;

namespace Rookie.AMO.Tests
{
    public static class AssertionExtensions
    {
        public static ActionResultAssertions Should(this ActionResult actualValue)
            => new ActionResultAssertions(actualValue);

        public static ValidationResultAssertions Should(this ValidationResult actualValue)
            => new ValidationResultAssertions(actualValue);
    }
}
