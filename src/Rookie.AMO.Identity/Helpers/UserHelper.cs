using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Helpers
{
    public static class UserHelper
    {
        public static string GetUsernameLogin(string firstName, string lastName, string[] TheSameUsernameLoginList)
        {
            firstName = firstName.Trim().ToLower();
            lastName = lastName.Trim().ToLower();

            var userNameLogin = new StringBuilder(firstName);
            var words = lastName.Split(" ");

            foreach (var word in words)
            {
                userNameLogin.Append(word[0]);
            }

            if (TheSameUsernameLoginList.Length != 0)
            {
                Array.Sort<string>(TheSameUsernameLoginList);
                var lastUsername = TheSameUsernameLoginList.Last();
                // lastUsername = usernamelogin + ordernumber ~ binhnv1 = binhnv + 1
                var orderNumber = Convert.ToInt32((lastUsername.Replace(userNameLogin.ToString(), "")));
                orderNumber++;
                userNameLogin.Append(orderNumber);
            }

            return userNameLogin.ToString();
        }
    }
}
