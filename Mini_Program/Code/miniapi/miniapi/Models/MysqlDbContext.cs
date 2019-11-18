using Microsoft.EntityFrameworkCore;

namespace miniapi.Models
{
    public class MysqlDbContext : DbContext
    {
        public MysqlDbContext(DbContextOptions<MysqlDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<ShippingAddress> ShippingAddresses { get; set; }

        public DbSet<ShippingInfo> ShippingInfos { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
