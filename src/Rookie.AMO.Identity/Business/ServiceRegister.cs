using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rookie.AMO.Identity.Business.Interfaces;
using Rookie.AMO.Identity.Business.Services;
using Rookie.AMO.Identity.DataAccessor;
using AutoMapper;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Business
{
    public static class ServiceRegister
    {
        public static void AddBusinessLayer(this IServiceCollection services, IConfiguration configuration)
        {
            IIdentityServerBuilder builder;
            services.AddDataAccessorLayer(configuration, out builder);
            builder.AddProfileService<CustomProfileService>();

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
        }
    }
}
