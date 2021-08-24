using FluentValidation;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Identity.Quickstart.Manage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Validators
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordInputModel>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => new { x.OldPassword, x.ChangePasswordTimes })
                .Must(x => BeNotEmptyOrFirstTimeLogin(x.OldPassword, x.ChangePasswordTimes))
                .WithMessage(UserContants.PasswordIsNotEmptyUnlessTheFirstTimeLogin);

            RuleFor(x => new { x.NewPassword, x.ConfirmPassword })
                .Must(x => BeTheSame(x.NewPassword, x.ConfirmPassword))
                .WithMessage(UserContants.NewPasswordAndConfirmNewPasswordIsNotTheSame);

            RuleFor(x => x.ConfirmPassword)
                .Matches(@"^[^\s][A-z0-9\W]{7,30}$")
                .WithMessage(string.Format(UserContants.TheCharacterIsInvalidNotAllowSpaceCharacter, "Confirm Password"));

            RuleFor(x => x.NewPassword)
                .Matches(@"^[^\s][A-z0-9\W]{7,30}$")
                .WithMessage(string.Format(UserContants.TheCharacterIsInvalidNotAllowSpaceCharacter, "New Password"));

            RuleFor(x => x.OldPassword)
                .Matches(@"^[^\s][A-z0-9\W]{7,30}$")
                .WithMessage(string.Format(UserContants.TheCharacterIsInvalidNotAllowSpaceCharacter, "Password"));
        }

        private static bool BeNotEmptyOrFirstTimeLogin(string currentPassword, int changePasswordTimes) 
            => (changePasswordTimes == 0) || (!string.IsNullOrEmpty(currentPassword));

        private static bool BeTheSame(string newPassword, string confirmNewPassword) 
            => !String.IsNullOrEmpty(newPassword) && !string.IsNullOrEmpty(confirmNewPassword) && newPassword.Equals(confirmNewPassword, StringComparison.OrdinalIgnoreCase);
    }
}
