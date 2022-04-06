namespace MiCasa.Models.Entity
{
    public class ContratAgence
    {
        [JsonProperty("ContratAgenceId")]
        public int ContratId { get; set; }

        [JsonProperty("AdministrateurId")]
        public int AdministrateurId { get; set; }

        [JsonProperty("AgenceId")]
        public int AgenceId { get; set; }

        [JsonProperty("DateCreation")]
        public DateTime DateCreation { get; set; }

        [JsonProperty("IsActive")]
        public byte IsActive { get; set; }
    }
}
