using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class BookDBContext : DbContext 
    {
        public BookDBContext(DbContextOptions<BookDBContext> options) : base(options) { }
        public DbSet<Project> Books { get; set; }
    }
}
