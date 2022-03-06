namespace MiCasa.Utility
{
    public class DbConnection
    {
        private static IConfiguration? _configuration;
        private static SqlConnection? _connection;

        public static void Init(IConfiguration configuration) => _configuration = configuration;

        /// <summary>
        /// Creates a new <paramref name="SqlConnection"></paramref> object.
        /// </summary>
        /// <returns>Returns a pre-configured <paramref name="SqlConnection"></paramref> object.</returns>
        public static SqlConnection GetConnection()
        {
            _connection = new(_configuration.GetConnectionString("MiCasaDB"));
            return _connection;
        }
    }
}
