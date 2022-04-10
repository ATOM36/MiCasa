namespace MiCasa.Models.Entity;

[Table("Administrateur")]
public class Administrateur
{
    [Column("AdministrateurId")]
    [JsonProperty("AdministrateurId")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int AdministrateurId { get; set; }

    [Column("IsActive")]
    [JsonProperty("IsActive")]
    [Required]
    public byte IsActive { get; set; }

    [Column("CompteId")]
    [JsonProperty("CompteId")]
    [ForeignKey(nameof(Compte))]
    [Required]
    public int CompteId { get; set; }
    public Compte Compte { get; set; }
}
