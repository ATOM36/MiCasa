namespace MiCasa.Models.Entity;

[Table("Agence")]
public class Agence
{
    [Column("AgenceId")]
    [JsonProperty("AgenceId")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int AgenceId { get; set; }

    [Column("Latitude")]
    [JsonProperty("Latitude")]
    public float Latitude { get; set; }

    [Column("Longitude")]
    [JsonProperty("Longitude")]
    public float Longitude { get; set; }

    [Column("Adresse")]
    [JsonProperty("Adresse")]
    [Required]
    [MinLength(10)]
    public string Adresse { get; set; }

    [Column("Signalement")]
    [JsonProperty("Signalement")]
    [Required]
    public int Signalement { get; set; }

    [Column("CompteId")]
    [JsonProperty("CompteId")]
    [ForeignKey(nameof(Compte))]
    [Required]
    public int CompteId { get; set; }
    public Compte Compte { get; set; }
}
