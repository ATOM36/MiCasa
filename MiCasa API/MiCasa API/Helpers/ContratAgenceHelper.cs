namespace MiCasa.Helpers
{
    public class ContratAgenceHelper
    {
        public static bool EvaluateContract(ContratAgence contrat) => (contrat is null ||
            contrat.ContratId <= 0 ||
            contrat.AdministrateurId <= 0 ||
            contrat.AgenceId <= 0 ||
            contrat.DateCreation > DateTime.Now);


        /// <summary>
        /// Initialise les champs d'un objet de type <see cref="ContratAgence"/>
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="contrat"></param>
        /// <returns></returns>
        public static ContratAgence FillContract(NpgsqlDataReader reader, ContratAgence contrat)
        {
            contrat.ContratId = (int)reader["ContratId"];
            contrat.AdministrateurId = (int)reader["AdministrateurId"];
            contrat.AgenceId = (int)reader["AgenceId"];
            contrat.IsActive = (byte)reader["IsActive"];
            contrat.DateCreation = Convert.ToDateTime(reader["DateCreation"]);

            return contrat;
        }
    }
}
