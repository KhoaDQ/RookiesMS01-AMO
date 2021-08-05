using Microsoft.EntityFrameworkCore;
using Rookie.AMO.DataAccessor.Entities;

namespace Rookie.AMO.DataAccessor.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            //code first
            //db first
            //model first
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>(entity =>
            {
                entity.ToTable(name: "Category");
            });

            builder.Entity<Asset>(entity =>
            {
                entity.ToTable(name: "Asset");
            });
        }
    }
}
