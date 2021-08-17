using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Business.Services;
using Rookie.AMO.DataAccessor;
using System.Reflection;

namespace Rookie.AMO.Business
{
    public static class ServiceRegister
    {
        public static void AddBusinessLayer(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDataAccessorLayer(configuration);
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IAssetService, AssetService>();
            services.AddTransient<IAssignmentService, AssignmentService>();
        }
    }
}