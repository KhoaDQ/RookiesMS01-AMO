using Rookie.AMO.Contracts.Dtos.User;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rookie.AMO.Contracts.Constants;
using System.Text.RegularExpressions;

namespace Rookie.AMO.Identity.Validators
{
    public class UserRequestValidator : AbstractValidator<UserRequest>
    {
        public UserRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .MaximumLength(UserContants.MaxLengthCharactersForFirstName);
            RuleFor(x => x.FirstName)
                .Must(BeContainOnlyAZaz09Characters)
                .WithMessage(UserContants.TheCharacterIsInvalid);

            RuleFor(x => x.LastName).MaximumLength(UserContants.MaxLengthCharactersForLastName);
            RuleFor(x => x.LastName)
                .Must(BeContainOnlyAZaz09Characters)
                .WithMessage(UserContants.TheCharacterIsInvalid);


            RuleFor(x => x.DateOfBirth)
                .Must(BeNotUnder18)
                .WithMessage(UserContants.UserIsUnder18);

            RuleFor(x => new { x.DateOfBirth, x.JoinedDate })
                .Must(x => HaveJoinedDateGreaterThanDateOfBirth(x.JoinedDate, x.DateOfBirth))
                .WithMessage(UserContants.JoinedDataIsNotLaterThanDateOfBirth);

            RuleFor(x => x.JoinedDate)
                .Must(BeNotSaturdayOrSunday)
                .WithMessage(UserContants.JoinedDateIsSaturdayOrSunday);
        }

        private bool BeNotUnder18(DateTime dateOfBirth)
        {
            var theDateOf18YearAgo = DateTime.Now.AddYears(-18);

            return dateOfBirth > theDateOf18YearAgo;
        }

        private bool HaveJoinedDateGreaterThanDateOfBirth(DateTime joinedDate, DateTime dateOfBirth)
        {
            return joinedDate > dateOfBirth;
        }

        private bool BeContainOnlyAZaz09Characters(string str)
        {
            string regexPattern = @"^[A-Za-z0-9]$";
            return Regex.IsMatch(str, regexPattern);
        }

        private bool BeNotSaturdayOrSunday(DateTime dateTime)
        {
            return dateTime.DayOfWeek != DayOfWeek.Sunday && dateTime.DayOfWeek != DayOfWeek.Saturday;
        }
    }
}
