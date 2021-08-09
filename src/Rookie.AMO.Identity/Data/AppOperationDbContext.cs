using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Data
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
