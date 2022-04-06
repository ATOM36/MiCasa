namespace MiCasa.Utility
{
    public class DbConnection
    {
        private static IConfiguration? _configuration;

        public static void Init(IConfiguration configuration) => _configuration = configuration;

        /// <summary>
        /// Creates a new <paramref name="NpgsqlConnection"></paramref> object. <br/>
        /// <strong>NB:</strong> Si la connection vers la base de données ne passe pas, il faut changer la valeur
        /// du <strong>port</strong> par <strong>5432</strong> au lieu de <strong>5433</strong>
        /// </summary>
        /// <returns>Returns a pre-configured <paramref name="NpgsqlConnection"></paramref> object.</returns>
        public static NpgsqlConnection GetConnection() => new("Server=localhost;Port=5432;User Id=postgres;Password=postgres;Database = MiCasaDB;");

    }
}
