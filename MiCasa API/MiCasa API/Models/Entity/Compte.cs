namespace MiCasa.Models.Entity;

public class Compte
{
    [Column("CompteId")]
    [JsonProperty("CompteId")]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CompteId { get; set; }

    [Column("NumeroTelephone")]
    [JsonProperty("NumeroTelephone")]
    [DataType(DataType.PhoneNumber)]
    [MinLength(8), MaxLength(13)]
    [Required]
    public string NumeroTelephone { get; set; }

    [Column("Username")]
    [JsonProperty("Username")]
    [Required]
    public string Username { get; set; }

    [Column("Password")]
    [JsonProperty("Password")]
    [DataType(DataType.Password)]
    [Required]
    public string Password { get; set; }

    [Column("Mail")]
    [JsonProperty("Mail")]
    [Required]
    [DataType(DataType.EmailAddress)]
    public string Mail { get; set; }

    [Column("Nom")]
    [JsonProperty("Nom")]
    [MinLength(3)]
    [Required]
    public string Nom { get; set; }

    [Column("DateInscription")]
    [JsonProperty("DateInscription")]
    [Required]
    [DataType(DataType.Date)]
    public string DateInscription { get; set; }

    [Column("IsBlocked")]
    [JsonProperty("IsBlocked")]
    [Required]
    public byte IsBlocked { get; set; }

    [Column("IsConnected")]
    [JsonProperty("IsConnected")]
    [Required]
    public byte IsConnected { get; set; }

    [Column("Token")]
    [JsonProperty("Token")]
    public string? Token { get; set; }
}
