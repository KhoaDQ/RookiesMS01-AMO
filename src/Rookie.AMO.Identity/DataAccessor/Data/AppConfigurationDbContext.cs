using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;

namespace Rookie.AMO.Identity.DataAccessor.Data
{
    public class AppConfigurationDbContext : ConfigurationDbContext<AppConfigurationDbContext>
    {
        public AppConfigurationDbContext(
            DbContextOptions<AppConfigurationDbContext> options,
            ConfigurationStoreOptions storeOptions)
            : base(options, storeOptions)
        {
        }
    }
}
