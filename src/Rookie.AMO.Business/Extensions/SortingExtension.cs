using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Extensions
{
    public static class SortingExtension
    {
		public static IEnumerable<T> OrderByPropertyName<T>(this IEnumerable<T> enumerable, string property, bool desc)
		{
			if(desc)
				return enumerable.OrderByDescending(x => GetProperty(x, property));
			else
				return  enumerable.OrderBy(x => GetProperty(x, property));
		}

		private static object GetProperty(object o, string propertyName)
		{
			return o.GetType().GetProperty(propertyName).GetValue(o, null);
		}
	}
}
