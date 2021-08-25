using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.Extensions
{
    public static class CookiesExtension
    {
        public static string GetString(this IRequestCookieCollection cookieCollection)
        {
            var cookies = new StringBuilder();
            foreach (var cookie in cookieCollection)
            {
                var temp = $" {cookie.Key}={cookie.Value};";
                cookies.Append(temp);
            }

            return cookies.ToString();
        }
    }
}
