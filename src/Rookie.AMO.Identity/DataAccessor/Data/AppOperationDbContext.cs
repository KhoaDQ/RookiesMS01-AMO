using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;

namespace Rookie.AMO.Identity.DataAccessor.Data
{
    public class AppOperationDbContext : PersistedGrantDbContext<AppOperationDbContext>
    {
        public AppOperationDbContext(
            DbContextOptions options,
            OperationalStoreOptions storeOptions) 
            : base(options, storeOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
