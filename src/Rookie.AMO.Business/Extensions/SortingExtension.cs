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
        public static IQueryable<T> OrderByPropertyName<T>(this IQueryable<T> source, string ordering, bool desc)
        {
            var type = typeof(T);
            var property = type.GetProperty(ordering);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            MethodCallExpression resultExp = Expression.Call(typeof(Queryable), desc? "OrderByDescending":"OrderBy", new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));
        
            return source.Provider.CreateQuery<T>(resultExp);
        }
    }
}
