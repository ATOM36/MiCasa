namespace MiCasa.Models.Interfaces;
public interface IAgence
{
    public Task<Message> CreerCompte(Agence agence);

    public Task<QueryData<object>> LogIn(string username, string password);

    public Task<QueryData<object>> Get(int agenceId);

    public Task<Message> LogOut(int agenceId);

    public Task<Message> SupprimerCompte(int agenceId, string email, string name);

    public Task<Message> ModifierProfile(Agence agence);

    public Task<Message> BloquerCompteAgence(int agenceId);

    public Task<QueryData<object>> GetAgence(int start, int stop);

    public Task<Message> DebloquerCompte(int agenceId);
}
