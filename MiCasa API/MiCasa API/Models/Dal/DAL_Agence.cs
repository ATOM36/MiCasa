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
        public static JsonResult logout(string username)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string query = "update Username set IsConnected =0 where Username=@username";
                    _connection.Open();
                    NpsqlCommand cmd = new(query, _connection);
                    cmd.Parameters.AddWithValue("@Username", username);
                    cmd.ExecteNonQuery();
                    return new JsonResult(new Message("Aurevoir!", true));
                }
            }
            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));
            }
            finally { _connection.Close(); }
        }
        public static JsonResult DebloquerCompte(int agenceId)
        {
            try
            {
                using (_connection = bdConnection.GetConnection())
                {
                    string sql = "update Agence set IsBlocked =0 where AgenceId=@agenceId";
                    _connection.Open();
                    NpsqlCommand command = new(sql, _connection);
                    command.Parameters.AddWithValue("@AgenceId", agenceId);
                    command.ExecteNonQuery();
                    return new JsonResult(new Message("le compte est debloqué", true));
                }
            }
            catch (Exception e)
            {
                return new Result(new Message(e.Message, false));
            }
            finally
            {
                _connection.Close();
            }
        }
        public static JsonResult creerCompte(int agenceId, char num, char mail, char nom, float latude, float lng, int isBlocked, char pass, char add, int sig, char username, int con)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string sql = "insert into Agence values(agenceId,num,mail,nom,labtude,lng,isBlocked,pass,add,sig,username) ";
                    _connection.Open();
                    NpsqlCommand command = new(sql, _connection);
                    command.Parameters.AddWithValue("@AgenceId", agenceId);
                    command.Parameters.AddWithValue("@NumeroTelephone", num);
                    command.Parameters.AddWithValue("@Mail", mail);
                    command.Parameters.AddWithValue("@Nom", nom);
                    command.Parameters.AddWithValue("@Latitude", latude);
                    command.Parameters.AddWithValue("@Longitude", lng);
                    command.Parameters.AddWithValue("@IsBlocked", isBlocked);
                    command.Parameters.AddWithValue("@Password", pass);
                    command.Parameters.AddWithValue("@Adresse", add);
                    command.Parameters.AddWithValue("@Signalement", sig);
                    command.Parameters.AddWithValue("@Username", username);
                    command.Parameters.AddWithValue("@IsConnected", con);
                    command.ExecteNonQuery();
                    return new JsonResult(new Message("le compte est cree", true));

                }
            }
            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));
            }
            finally { _connection.Close(); }
        }

        public static JsonResult modifierprofil(int agenceId, char num, char mail, char nom, float labtude, float lng, int isBlocked, char pass, char add, int sig, char username,int con)
        {
            try
            {
                using (_connection = DbConnection.GetConnection())
                {
                    string sql = "update Agence set NumeroTelephone=num,Mail=mail,Nom=nom,Labtude=labtude,Longitude=lng,IsBlocked=isBlocked,Password=pass,Adresse=add,Siqnalement=sig,Username= username,IsConnected=con where AgenceId=@agenceId ";
                    _connection.Open();
                    NpsqlCommand command = new(sql, _connection);
                    command.Parameters.AddWithValue("@AgenceId", agenceId);
                    command.Parameters.AddWithValue("@NumeroTelephone", num);
                    command.Parameters.AddWithValue("@Mail", mail);
                    command.Parameters.AddWithValue("@Nom", nom);
                    command.Parameters.AddWithValue("@Latitude", labtude);
                    command.Parameters.AddWithValue("@Longitude", lng);
                    command.Parameters.AddWithValue("@IsBlocked", isBlocked);
                    command.Parameters.AddWithValue("@Password", pass);
                    command.Parameters.AddWithValue("@Adresse", add);
                    command.Parameters.AddWithValue("@Signalement", sig);
                    command.Parameters.AddWithValue("@Username", username);
                    command.Parameters.AddWithValue("@IsConnected", con);
                    command.ExecteNonQuery();
                    return new JsonResult(new Message("le compte est modifier", true));

                }
            }
            catch (Exception e)
            {
                return new JsonResult(new Message(e.Message, false));
            }
            finally { _connection.Close(); }
        }
    }

}
