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
<<<<<<< HEAD
    public DbSet<ContratClient> ContratClients { get; set; }
=======
    public DbSet<Client> Clients { get; set; }
>>>>>>> ac0837ffeb8942460de66e3d2410431fdcee7d54
}
