using Microsoft.EntityFrameworkCore;

namespace MiCasa.Models.Dal;

public class Dal_ContratClient
{
    private readonly AppDbContext? _context;

    public Dal_ContratClient(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Message> AnnulerContrat(int contratId)
    {
        try
        {
            ContratClient? contract = await _context!.ContratClients.FindAsync(contratId);

            if (contract is not null)
            {
                contract.IsActive = 0;
                await _context.SaveChangesAsync();

                return new("Contrat annulé avec succès", true);
            }
            else
                return new("Contrat introuvable", false);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
    }
    public async Task<Message> CreerContrat(int clientId, int agenceId)
    {
        try
        {
            ContratClient contrat = new() {
                AgenceId = agenceId,
                ClientId = clientId,
                CreationDate = DateTime.Today.ToShortDateString(),
                IsActive = 1
            };

            await _context!.ContratClients.AddAsync(contrat);
            await _context.SaveChangesAsync();

            return new("Contrat créé avec succès", true);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
    }

    public async Task<QueryData<object>> Get(int contratId)
    {
        try
        {
            ContratClient? contrat = await _context!.ContratClients.FindAsync(contratId);

            if (contrat is not null)
                return new(contrat, true);
            else
                return new("Contrat introuvable", false);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
    }

    public async Task<QueryData<object>> GetRange(int startIndex, int stopIndex)
    {
        try
        {
            IEnumerable<ContratClient>? result = await _context!.ContratClients
                .Skip(startIndex)
                .Take(stopIndex)
                .OrderBy(e => e.ContratId)
                .Distinct()
                .ToListAsync();

            if (result is not null)
                return new(result, true);
            else
                return new("Aucun contrat trouvé", false);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
    }
}