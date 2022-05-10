namespace MiCasa.Models.Dal;

public interface IContratClient
{
    public Task<Message> CreerContrat(int clientId, int agenceId);

    public Task<Message> AnnulerContrat(int contratId);

    public Task<QueryData<object>> Get(int contratId);

    public Task<QueryData<object>> Get(int startIndex, int stopIndex);
}
