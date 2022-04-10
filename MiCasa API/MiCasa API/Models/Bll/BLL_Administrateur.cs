using Serilog;

namespace MiCasa.Models.Bll;

public class BLL_Administrateur : IAdministrateur
{
    private readonly DAL_Administrateur? _dal = null;
    private readonly AppDbContext? _context;
    public BLL_Administrateur(AppDbContext context, IAuthService authService)
    {
        _context = context;
        _dal = new(context, authService);
    }


    public async Task<Message> CreerCompte(Administrateur administrateur)
    {
        Message result = await _dal!.CreerCompte(administrateur);

        if (result.State)
        {
            Log.Information($"Création d'un compte pour {administrateur.Compte.Username} {administrateur.Compte.Mail}");

            return result;
        }
        else
        {
            Log.Error(result.Content);
            return new("Erreur lors de la création du compte", false);
        }
    }

    public async Task<QueryData<object>> LogIn(string username, string password)
    {
        var result = await _dal!.LogIn(username, password);

        if (result.State)
        {
            Log.Information($"Connection administrateur avec username = {username} et password = {password}");

            if (result.Data is null)
            {
                Log.Information("Aucune entrée trouvée");

                return new(new Message("Informations incorrectes", false), false);
            }

            else
                return result;
        }
        else
        {
            Log.Error($"Erreur connection administrateur avec username = {username} et password = {password}\n" +
                ((QueryData<Message>)result).Data.Content);

            return new(new Message("Informations incorrectes", false), false);
        }
    }

    public async Task<Message> LogOut(int adminId)
    {
        var result = await _dal!.LogOut(adminId);

        if (result.State)
        {
            Log.Information($"Déconnection administrateur avec Id = {adminId}");
            return result;
        }

        else
        {
            Log.Error($"Erreur déconnection administrateur avec Id = {adminId}\n" + result.Content);
            return new("Erreur !", false);
        }
    }

    public async Task<Message> ModifierProfile(Administrateur admin)
    {
        var result = await _dal!.ModifierProfile(admin);

        if (result.State)
        {
            Log.Information($"Modification du profile pour le compte {admin.Compte.Username}");
            return result;
        }
        else
        {
            Log.Error($"Erreur mise à jour profile administrateur pour {admin.Compte.Username}" + result.Content);
            return new("Informations incorrectes\nVeuillez réessayer.", false);
        }
    }
}
