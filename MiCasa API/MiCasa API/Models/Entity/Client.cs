namespace MiCasa_API.Models.Entity;

[Table("Client")]
public class Client
{
    [Column("ClientId")]
    [JsonProperty("ClientId")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int ClientId { get; set; }

    [Column("CompteId")]
    [JsonProperty("CompteId")]
    [ForeignKey(nameof(Compte))]
    [Required]
    public int CompteId { get; set; }
    public Compte Compte { get; set; }
}
