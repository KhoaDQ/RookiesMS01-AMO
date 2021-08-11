using System;
using System.Reflection;

namespace Rookie.AMO.Business
{
    public static class EnumConverExtension
    {
        public static string GetNameString<T>(this T enumType) where T : Enum
        {
            return Enum.GetName(typeof(T), enumType);
        }
        public static int GetValueInt<T>(string name) where T : Enum
        {
            return (int)Enum.Parse(typeof(T), name);
        }
    }
}