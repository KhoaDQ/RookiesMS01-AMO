using System;
using System.Reflection;

namespace Rookie.AMO.Business
{
    public static class SetPropertyExtension
    {
        public static void SetProperty<T>(this T obj, string property, object value) where T : class
        {
            Type type = obj.GetType();
            PropertyInfo prop = type.GetProperty(property);
            prop.SetValue(obj, value, null);
        }
    }
}