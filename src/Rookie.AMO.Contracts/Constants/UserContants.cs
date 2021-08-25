using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Constants
{
    public static class UserContants
    {
        public const string PrefixStaffCode = "SD";
        public const int MaxLengthCharactersForFirstName = 100;
        public const int MaxLengthCharactersForLastName = 100;
        public const string TheCharacterIsInvalid = "The character is invalid. Allow only characters include A-z,0-9";
        public const string UserIsUnder18 = "User is under 18. Please select a different date";
        public const string JoinedDataIsNotLaterThanDateOfBirth = "Joined date is not later than Date of Birth. Please select a different date";
        public const string JoinedDateIsSaturdayOrSunday = "Joined date is Saturday or Sunday. Please select a different date";
        public const string PasswordIsNotEmptyUnlessTheFirstTimeLogin = "Password is not empty unless the first time login";
        public const string NewPasswordAndConfirmNewPasswordIsNotTheSame = "New password and confirm new password is not the same";
        public const string TheCharacterIsInvalidNotAllowSpaceCharacter = "The character is invalid. Not Allow space character in {0}";
    }
}
