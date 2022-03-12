namespace MiCasa.Models.Bll
{
    public class BLL_Agence : IAgence
    {
        public async Task<JsonResult> GetAgencies(int startIndex, int stopIndex)
        {
            JsonResult result = await DAL_Agence.GetAgencies(startIndex, stopIndex);

            if (string.IsNullOrEmpty(result.ToString()))
                return new JsonResult(new Message
                {
                    Content = "Pas de résultat",
                    State = false
                });

            else
                return result;
        }
    }
}
