namespace MiCasa.Helpers;

public class AdministrateurHelper
{
    public static void MakeOnline(AppDbContext context, string username, string password)
    {
        var admin = (from e in context.Administrateurs
                     where e.Compte.Username == username &&
                     e.Compte.Password == password
                     select e).FirstOrDefault();

        admin.Compte.IsConnected = 1;
        context.SaveChanges();
    }
}
