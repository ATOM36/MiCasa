namespace MiCasa.Helpers
{
    public class AgenceHelper
    {
        public static bool CheckEmailUniqueness(AppDbContext context, string email) =>
             context.Agences.Any(e => e.Compte.Mail == email);

        public static bool CheckUsernameUniqueness(AppDbContext context, string username) =>
            context.Agences.Any(e => e.Compte.Username == username);
    }
}
