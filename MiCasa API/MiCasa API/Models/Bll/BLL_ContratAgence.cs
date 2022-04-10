using MiCasa.Helpers;

namespace MiCasa.Models.Bll
{
    public class BLL_ContratAgence : IContratAgence
    {
        private readonly IAuthService? _authService = null;

        public BLL_ContratAgence(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<Message> Activate(int id, string name, string email)
        {
            if (id <= 0)
                return new($"Le contrat avec l'identifiant {id} n'existe pas", false);
            else
            {
                _authService!.SendActivationEmail(email, name);
                return await DAL_ContratAgence.Activate(id);
            }
        }

        public async Task<Message> CreateContract(ContratAgence contrat) => ContratAgenceHelper.EvaluateContract(contrat) ?
            new("Les valeurs données sont incorrectes", false)
                : await DAL_ContratAgence.CreateContract(contrat);

        public async Task<Message> Delete(int id) => id <= 0 ? new($"L'agence avec l'identifiant {id} n'existe pas", false)
            : await DAL_ContratAgence.Delete(id);

        public async Task<Message> DeleteRange(List<int> idList)
        {
            bool ok = true;
            foreach (int id in idList)
                if (id <= 0)
                    ok = false;
            if (ok || idList.Count <= 0)
                return await DAL_ContratAgence.DeleteRange(idList);
            else
                return new("Il existe une entrée incorrecte", false);
        }

        public async Task<QueryData<object>> Select(int id) => id <= 0 ?
            new(new Message($"L'agence avec l'identifiant {id} n'existe pase", false), false) :
                await DAL_ContratAgence.Select(id);

        public async Task<QueryData<object>> SelectRange(int start, int end) => start <= 0 || end <= 0 || start == end ?
            new(new Message("Plus de données à lire", false), false) :
                await DAL_ContratAgence.SelectRange(start, end);

        public async Task<Message> UpdateContrat(int id, ContratAgence contrat) => id <= 0 ||
            ContratAgenceHelper.EvaluateContract(contrat) ? new("Valeurs incorrectes", false) :
                await DAL_ContratAgence.UpdateContrat(id, contrat);
    }


}
