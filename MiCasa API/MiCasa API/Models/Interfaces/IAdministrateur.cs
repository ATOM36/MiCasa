namespace MiCasa.Models.Interfaces;
public interface IAdministrateur
{
    public Task<Message> CreerCompte(Administrateur administrateur);

    public Task<QueryData<object>> LogIn(string username, string password);

    public Task<Message> LogOut(int adminId);

    public Task<Message> ModifierProfile(Administrateur admin);
}
