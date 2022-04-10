using Microsoft.EntityFrameworkCore;

namespace MiCasa.Models.Entity;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Agence> Agences { get; set; }
    public DbSet<Administrateur> Administrateurs { get; set; }
    public DbSet<ContratAgence> ContratAgences { get; set; }
    public DbSet<Compte> Comptes { get; set; }
}
