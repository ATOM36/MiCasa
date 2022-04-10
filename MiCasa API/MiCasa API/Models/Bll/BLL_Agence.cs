using MiCasa.Helpers;
using Serilog;

namespace MiCasa.Models.Bll;
public class BLL_Agence : IAgence
{
    private readonly DAL_Agence? _dal = null;
    private readonly IAuthService? _authService = null;
    private readonly AppDbContext? _context;

    public BLL_Agence(AppDbContext dbContext, IAuthService authService)
    {
        _context = dbContext;
        _dal = new(dbContext);
        _authService = authService;
    }

    public async Task<Message> DebloquerCompte(int agenceId)
    {
        Log.Information($"Opération de débloquage de compte agence avec ID = {agenceId}");

        if (agenceId <= 0)
        {
            Log.Error("Identifiant incorrect");
            return new($"Aucune agence avec l'identifiant {agenceId}", false);
        }
        else
        {
            var result = await _dal.DebloquerCompte(agenceId);
            if (result.State)
            {
                Log.Information($"Débloquage du compte agence avec AgenceId = {agenceId}");
                return result;
            }
            else
            {
                Log.Fatal(result.Content);
                return new("Echec de l'opération.\nVeuilez réessayer.", false);
            }
        }
    }


    public async Task<Message> LogOut(int agenceId)
    {
        Log.Information($"Déconnection agence avec ID = {agenceId}");

        if (agenceId <= 0)
        {
            Log.Error("Echec! Identifiant incorrecte");
            return new("Erreur! Veuillez réessayer.", false);
        }
        else
        {
            var result = await _dal.DebloquerCompte(agenceId);
            if (result.State)
            {
                Log.Information($"Déconnection du compte agence avec AgenceId = {agenceId}");
                return result;
            }
            else
            {
                Log.Fatal(result.Content);
                return new("Echec de l'opération.\nVeuilez réessayer.", false);
            }
        }
    }


    public async Task<Message> ModifierProfile(Agence agence)
    {
        Log.Information($"Mise à jour du profile de l'agence {agence.Compte.Nom}");

        if (agence == null)
        {
            Log.Error("Entrées incorrectes");
            return new("Informations saisies incorrectes.\nVeuillez réessayer", false);
        }
        else
        {
            if (AgenceHelper.CheckEmailUniqueness(_context, agence.Compte.Mail))
            {
                Log.Information("Email dupliqué");
                return new("Cette adresse email est déjà utilisée.\nVeuillez la changer", false);
            }

            if (AgenceHelper.CheckUsernameUniqueness(_context, agence.Compte.Username))
            {
                Log.Information("Username dupliqué");
                return new("Ce nom d'utilisateur est déjà utilisé.\nVeuillez en choisir un autre.", false);
            }

            var result = await _dal!.modifierprofil(agence);

            if (result.State)
            {
                Log.Information($"Succès de la mise de {agence.Compte.Nom}");
                return result;
            }
            else
            {
                Log.Fatal(result.Content);
                return new("Echec de la mise à jour.\nVeuillez réessayer", false);
            }
        }
    }


    public async Task<Message> BloquerCompteAgence(int agenceId)
    {
        Log.Information($"Blocage du compte de l'agence avec ID ={agenceId}");

        if (agenceId <= 0)
        {
            Log.Error("Erreur! Identifiant incorrect");
            return new($"L'agence avec l'identifiant {agenceId} n'existe pas", false);
        }
        else
        {
            var result = await _dal!.BloquerCompteAgence(agenceId);

            if (result.State)
            {
                Log.Information("Compte bloqué");
                return result;
            }
            else
            {
                Log.Fatal(result.Content);
                return new("Echec lors de l'opération", false);
            }
        }
    }


    public async Task<Message> CreerCompte(Agence agence)
    {
        Log.Information($"Création d'un compte agence avec email = {agence.Compte.Mail} et " +
            $"numéro téléphone = {agence.Compte.NumeroTelephone}");

        if (agence is null)
        {
            Log.Error("Echec de l'opération");
            return new("Informations saisies incorrectes", false);
        }

        else
        {
            if (AgenceHelper.CheckEmailUniqueness(_context, agence.Compte.Mail))
            {
                Log.Information("Email dupliqué");
                return new("Cette adresse email est déjà utilisée.\nVeuillez la changer", false);
            }

            if (AgenceHelper.CheckUsernameUniqueness(_context, agence.Compte.Username))
            {
                Log.Information("Username dupliqué");
                return new("Ce nom d'utilisateur est déjà utilisé.\nVeuillez en choisir un autre.", false);
            }

            var result = await _dal!.creerCompte(agence);

            if (result.State)
            {
                Log.Information("Compte créé avec succès");
                _authService!.SendActivationEmail(agence.Compte.Mail, agence.Compte.Nom);
                return result;
            }
            else
            {
                Log.Fatal(result.Content);
                return new("Informations saisies incorrectes", false);
            }
        }
    }


    public async Task<QueryData<object>> Get(int agenceId)
    {
        Log.Information($"Consultation des données de l'agence avec ID = {agenceId}");

        if (agenceId <= 0)
        {
            Log.Error("Echec! Identifiant incorrecte");
            return new("L'agence demandée n'existe pas", false);
        }
        else
        {
            var result = await _dal!.Get(agenceId);

            if (result.State)
            {
                Log.Information("Succès de la consultation");
                return result;
            }
            else
            {
                Log.Fatal(((QueryData<Message>)result).Data!.Content);
                return new("L'agence demandée n'existe pas", false);
            }
        }
    }


    public async Task<QueryData<object>> GetAgence(int start, int stop)
    {
        Log.Information($"Consultation de {start} à {stop} agences");

        if (start < 0 || stop <= 0 || start == stop)
        {
            Log.Error("Echec! Indices incorrectes");
            return new("Aucune entrées disponibles", false);
        }
        else
        {
            var result = await _dal!.GetAgence(start, stop);

            if (result.State)
            {
                Log.Information("Succès de l'opération");
                return result;
            }
            else
            {
                Log.Fatal(((QueryData<Message>)result).Data!.Content);
                return new("Aucune entrées disponibles", false);
            }
        }
    }


    public async Task<QueryData<object>> LogIn(string username, string password)
    {
        Log.Information($"Connection agence avec username = {username} et password = {password}");

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            Log.Error("Informations incorrectes");
            return new("L'email ou le mot de passe est incorrecte", false);
        }
        else
        {
            var result = await _dal!.LogIn(username, password);

            if (result.State)
            {
                if (result.Data is not null)
                {
                    Log.Information("Connection autorisée");
                    return result;
                }
                else
                {
                    Log.Error("Aucune entrée trouvée");
                    return new("L'email ou le mot de passe est incorrecte", false);
                }
            }
            else
            {
                Log.Fatal(((QueryData<Message>)result).Data!.Content);
                return new("L'email ou le mot de passe est incorrecte", false);
            }
        }
    }


    public async Task<Message> SupprimerCompte(int agenceId, string email, string name)
    {
        Log.Information($"Suppression du compte agence avec email = {email}");

        if (string.IsNullOrEmpty(email) || agenceId <= 0)
        {
            Log.Error("Echec de l'opération");
            return new("Echec de l'opération.\nVeuillez réessayer", false);
        }
        else
        {
            var result = await _dal!.SupprimerCompte(agenceId);

            if (result.State)
            {
                Log.Information("Compte supprimé avec succès");
                _authService!.OnDeleteEmail(email, name);
                return result;
            }
            else
            {
                Log.Fatal(result.Content);
                return new("Echec de l'opération.\nVeuillez réessayer", false);
            }
        }
    }
}
