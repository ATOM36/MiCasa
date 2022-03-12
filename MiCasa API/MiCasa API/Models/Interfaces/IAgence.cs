namespace MiCasa.Models.Interfaces
{
    public interface IAgence
    {
        Task<JsonResult> GetAgencies(int startIndex, int stopIndex);
    }
}
