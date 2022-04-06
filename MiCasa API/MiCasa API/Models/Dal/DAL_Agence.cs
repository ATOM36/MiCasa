namespace MiCasa.Models.Dal
{
    public class DAL_Agence
    {
        private static NpgsqlConnection? _connection;

        public static JsonResult LogIn(string username, string password)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string query = "SELECT * FROM \"Agence\" WHERE \"Username\" = @username AND \"Password\" = @password;";
                    _connection.Open();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.Parameters.AddWithValue("@username", username);
                    command.Parameters.AddWithValue("@password", password);
                    NpgsqlDataReader reader = command.ExecuteReader();
                    DataTable table = new();
                    table.Load(reader);
                    reader.Close();
                    DataRow dr = table.Rows[0];

                    return new JsonResult(new QueryData<Array>(dr.ItemArray, true));
                }
            }

            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));

            }
            finally
            {
                _connection!.Close();
            }
        }

        public static JsonResult SupprimerCompte(int agenceId)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string query = "DELETE from \"Agence\" Where \"AgenceId\" =@agenceId ";
                    _connection.Open();
                    NpgsqlCommand command = new(query, _connection);
                    command.Parameters.AddWithValue("@agenceId", agenceId);
                    command.ExecuteNonQuery();

                    return new JsonResult(
                        new Message("le compte est supprimé avec succès", true));
                }
            }
            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));

            }
            finally
            {
                _connection!.Close();
            }
        }

        public static JsonResult BloquerCompteAgence(int agenceId)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string query = "update \"Agence\" set \"IsBlocked\" = 1 where \"AgenceId\" = @agenceId ";
                    _connection.Open();
                    NpgsqlCommand command = new(query, _connection);
                    command.Parameters.AddWithValue("@agenceId", agenceId);
                    command.ExecuteNonQuery();
                    return new JsonResult(new Message("le compte a été bloqué avec succès", true));

                }
            }
            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));

            }
            finally
            {
                _connection!.Close();
            }
        }

        public static JsonResult GetAgence(int startIndex, int stopIndex)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string query = "SELECT * FROM \"Agence\" offset @startIndex fetch next @stopIndex rows only;";

                    _connection.Open();
                    NpgsqlCommand command = new(query, _connection);
                    command.Parameters.AddWithValue("@startIndex", startIndex);
                    command.Parameters.AddWithValue("@stopIndex", stopIndex);
                    NpgsqlDataReader reader = command.ExecuteReader();
                    DataTable table = new();
                    table.Load(reader);
                    reader.Close();
                    return new JsonResult(new QueryData<DataTable>(table, true));
                }
            }
            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));

            }
            finally
            {
                _connection!.Close();
            }
        }
    }
}