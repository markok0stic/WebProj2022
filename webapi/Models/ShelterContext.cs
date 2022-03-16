using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ShelterContext : DbContext
    {
        public DbSet<Employee> Employees {get;set;}
        public DbSet<Pet> Pets {get;set;}
        public DbSet<Shelter> Shelters {get;set;}
        public ShelterContext(DbContextOptions options) : base(options)
        {}
    }
}