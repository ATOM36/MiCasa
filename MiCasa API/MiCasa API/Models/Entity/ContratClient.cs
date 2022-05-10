namespace MiCasa.Models.Entity;

[Table("ContratClient")]
public class ContratClient
{
    [Column("ContratId")]
    [JsonProperty("ContratId")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int ContratId { get; set; }

    [Column("IsActive")]
    [JsonProperty("IsActive")]
    [Required]
    public byte IsActive { get; set; }

    [Column("CreationDate")]
    [JsonProperty("CreationDate")]
    [Required]
    [DataType(DataType.Date)]
    public string? CreationDate { get; set; }


    [Column("ClientId")]
    [JsonProperty("ClientId")]
    [Required]
    [ForeignKey(nameof(Client))]
    public int ClientId { get; set; }
    public Client? Client { get; set; }


    [Column("AgenceId")]
    [JsonProperty("AgenceId")]
    [Required]
    [ForeignKey(nameof(Agence))]
    public int AgenceId { get; set; }
    public Agence? Agence { get; set; }
}
