using Microsoft.EntityFrameworkCore;
using Rookie.AMO.DataAccessor.Entities;

namespace Rookie.AMO.DataAccessor.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Request> Requests { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            
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

            builder.Entity<Assignment>(entity =>
            {
                entity.ToTable(name: "Assignment");
            });

            builder.Entity<Request>(entity =>
            {
                entity.ToTable(name: "Request");
            });
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
