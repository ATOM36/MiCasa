namespace MiCasa.Models.Bll;

public class BllContratClient : IContratClient
{
    private readonly Dal_ContratClient? _dal;

    public BllContratClient(AppDbContext context)
    {
        _dal = new(context);
    }

    public async Task<Message> AnnulerContrat(int contratId) => await _dal!.AnnulerContrat(contratId);
    public async Task<Message> CreerContrat(int clientId, int agenceId) => await _dal!.CreerContrat(clientId, agenceId);
    public async Task<QueryData<object>> Get(int contratId) => await _dal!.Get(contratId);
    public async Task<QueryData<object>> Get(int startIndex, int stopIndex) => await _dal!.GetRange(startIndex, stopIndex);
}
