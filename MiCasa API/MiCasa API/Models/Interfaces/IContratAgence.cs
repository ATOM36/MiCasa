namespace MiCasa.Models.Interfaces
{
    public interface IContratAgence
    {
        Task<Message> CreateContract(ContratAgence contrat);

        Task<QueryData<ContratAgence>> Select(int id);

        Task<IAsyncEnumerable<object>> SelectRange(int start, int end);

        Task<Message> Activate(int id);

        Task<Message> ActivateRange(List<int> idList);

        Task<Message> Delete(int id);

        Task<Message> DeleteRange(List<int> idList);

        Task<Message> UpdateContrat(int id, ContratAgence contrat);
    }
}
