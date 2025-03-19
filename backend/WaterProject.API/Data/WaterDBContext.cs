using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class WaterDBContext : DbContext 
    {
        public WaterDBContext(DbContextOptions<WaterDBContext> options) : base(options) { }
        public DbSet<Project> Projects { get; set; }
    }
}
