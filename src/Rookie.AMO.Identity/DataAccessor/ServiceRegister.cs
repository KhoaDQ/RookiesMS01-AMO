using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rookie.AMO.Identity.DataAccessor.Data;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.DataAccessor
{
    public static class ServiceRegister
    {
        public static void AddDataAccessorLayer(this IServiceCollection services, IConfiguration configuration, out IIdentityServerBuilder builder)
        {

            services.AddDbContext<AppIdentityDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("AppIdentityDbContext"));
            });

            services.AddIdentity<User, IdentityRole>(options => {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
            })
                    .AddEntityFrameworkStores<AppIdentityDbContext>()
                    .AddDefaultTokenProviders();

            builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
                .AddDeveloperSigningCredential()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext =
                        builder => builder.UseSqlServer(
                            configuration.GetConnectionString("AppConfigurationDbContext"));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext =
                        builder => builder.UseSqlServer(
                            configuration.GetConnectionString("AppOperationDbContext"));
                })
                .AddAspNetIdentity<User>();
            
            if (Convert.ToBoolean(configuration["SeedData"]))
            {
                var identityConnection = configuration.GetConnectionString("AppIdentityDbContext");
                var configurationConnection = configuration.GetConnectionString("AppConfigurationDbContext");
                var operationConnection = configuration.GetConnectionString("AppOperationDbContext");
                SeedIdentityData.EnsureSeedData(identityConnection);
                SeedConfigurationData.EnsureSeedData(configuration, configurationConnection, operationConnection);
            }
        }
    }
}
