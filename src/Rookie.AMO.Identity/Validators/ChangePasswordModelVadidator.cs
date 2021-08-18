using FluentValidation;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Validators
{
    public class ChangePasswordModelVadidator : AbstractValidator<ChangePasswordModel>
    {
        public ChangePasswordModelVadidator()
        {
            RuleFor(x => x.Id).NotEmpty();

            RuleFor(x => new { x.CurrentPassword, x.ChangePasswordTimes })
                .Must(x => BeNotEmptyOrFirstTimeLogin(x.CurrentPassword, x.ChangePasswordTimes))
                .WithMessage(UserContants.PasswordIsNotEmptyUnlessTheFirstTimeLogin);

            RuleFor(x => new { x.NewPassword, x.ConfirmNewPassword })
                .Must(x => BeTheSame(x.NewPassword, x.ConfirmNewPassword))
                .WithMessage(UserContants.NewPasswordAndConfirmNewPasswordIsNotTheSame);

            RuleFor(x => x.ConfirmNewPassword)
                .Matches(@"^[^\s]*$")
                .WithMessage(string.Format(UserContants.TheCharacterIsInvalidNotAllowSpaceCharacter, "Confirm New Password"));

            RuleFor(x => x.NewPassword)
                .Matches(@"^[^\s]*$")
                .WithMessage(string.Format(UserContants.TheCharacterIsInvalidNotAllowSpaceCharacter, "New Password"));

            RuleFor(x => x.CurrentPassword)
                .Matches(@"^[^\s]*$")
                .WithMessage(string.Format(UserContants.TheCharacterIsInvalidNotAllowSpaceCharacter, "Password"));
        }

        private bool BeNotEmptyOrFirstTimeLogin(string currentPassword, int changePasswordTimes)
        {
            return (changePasswordTimes == 0) || (string.IsNullOrEmpty(currentPassword));
        }

        private bool BeTheSame(string newPassword, string confirmNewPassword)
        {
            return newPassword.Equals(confirmNewPassword, StringComparison.OrdinalIgnoreCase);
        }

    }
}
