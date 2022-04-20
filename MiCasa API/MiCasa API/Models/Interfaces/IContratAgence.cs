namespace MiCasa.Models.Interfaces
{
    public interface IContratAgence
    {

        Task<Message> CreateContract(ContratAgence contrat);

        Task<QueryData<object>> Select(int id);

        Task<QueryData<object>> SelectRange(int start, int end);

        Task<Message> Activate(int id, string email, string name);

        Task<Message> Delete(int id);

        Task<Message> DeleteRange(List<int> idList);

        Task<Message> UpdateContrat(int id, ContratAgence contrat);
    }
}
