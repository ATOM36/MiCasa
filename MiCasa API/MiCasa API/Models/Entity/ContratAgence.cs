namespace MiCasa.Models.Entity
{
    [Table("ContratAgence")]
    public class ContratAgence
    {
        [Column("ContratId")]
        [JsonProperty("ContratId")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int ContratId { get; set; }

        [Column("DateCreation")]
        [JsonProperty("DateCreation")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime DateCreation { get; set; }

        [Column("IsActive")]
        [JsonProperty("IsActive")]
        [Required]
        public byte IsActive { get; set; }

        [Column("AgenceId")]
        [JsonProperty("AgenceId")]
        [ForeignKey(nameof(Agence))]
        [Required]
        public int AgenceId { get; set; }
    }
}
