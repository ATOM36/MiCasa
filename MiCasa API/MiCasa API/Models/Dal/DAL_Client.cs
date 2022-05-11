using MiCasa_API.Models.Entity;

namespace MiCasa_API.Models.Dal;

public class DAL_Client
{
    private static NpgsqlConnection? _connection;
    private readonly AppDbContext? _context = null;
    private readonly IAuthService? _authService = null;
    public DAL_Client(AppDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
        _authService = authService;
    }

    /// <summary>
    /// </summary>
    /// <param name="clientId"></param>
    /// <returns></returns>
    public async Task<Message> SupprimerCompte(int clientId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string query = "DELETE from \"Client\" Where \"ClientId\" =@clientId ";
                await _connection.OpenAsync();
                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@clientId", clientId);
                await command.ExecuteNonQueryAsync();

                return new Message("le compte a été supprimé avec succès", true);
            }
        }
        catch (Exception e)
        {
            return new(e.Message, false);

        }
        finally
        {
            await _connection!.CloseAsync();
        }
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="clientId"></param>
    /// <returns></returns>
    public async Task<Message> BloquerCompteAgence(int clientId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string query = "UPDATE \"Comptes\" SET \"IsBlocked\" = 1 FROM \"Client\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Client\".\"CompteId\" AND \"Client\".\"ClientId\" = @clientId";
                await _connection.OpenAsync();

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@clientId", clientId);
                await command.ExecuteNonQueryAsync();

                return new("le compte a été bloqué avec succès", true);
            }
        }
        catch (Exception e)
        {
            return new Message(e.Message, false);

        }
        finally
        {
            await _connection!.CloseAsync();
        }
    }



    /// <summary>
    /// 
    /// </summary>
    /// <param name="client"></param>
    /// <param name="agenceId"></param>
    /// <returns></returns>
   public async Task<Message> creerCompte(Client client, int agenceId)
    {
        try
        {
            await _context!.Clients.AddAsync(client);
            await _context!.SaveChangesAsync();


            return new Message("le compte est cree", true);
        }
        catch (Exception e)
        {
            return new Message(e.Message, false);
        }
    }
    
     public async Task<Message> ModifierProfile(Client c) {

        try{
            context.Clients.Update(c);
            await context.SaveChangesAsync();
            return new Message ("votre profil est mis à jour", true);
        }
         catch (Exception e)
        {
            return new(e.Message, false);
        }
    }

        public async Task<Message> DebloquerCompte(int clientId)
    
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string sql = "UPDATE \"Comptes\" SET \"IsBlocked\" = 0 FROM \"Client\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Client\".\"CompteId\" AND \"Client\".\"ClientId\" = @Id";
                await _connection.OpenAsync();
                NpgsqlCommand command = new(sql, _connection);
                command.Parameters.AddWithValue("@Id", clientId);
                await command.ExecuteNonQueryAsync();
                return new Message("le compte est débloqué", true);
            }
        }
        catch (Exception e)
        {
            return new Message(e.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
        }
    
    }   

     public async Task<Message> logout(int clientId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string sql = "UPDATE \"Comptes\" SET \"IsConnected\" = 0 FROM \"Client\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Client\".\"CompteId\" AND \"Client\".\"Client\" = @Id";
                await _connection.OpenAsync();
                NpgsqlCommand cmd = new(sql, _connection);
                cmd.Parameters.AddWithValue("@Id", clientId);
                await cmd.ExecuteNonQueryAsync();
                return new("Aurevoir!", true);
            }
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
        }
    }

     public async Task<QueryData<object>> LogIn(string username, string password)
    {
        try
        {

            Client? result = (from compte in context!.Comptes
                              where compte.Username == username &&
                              compte.Password == password
                              join client in context!.Clients on
                              compte.CompteId equals client.Compte.CompteId
                              select new Client {
                                  Compte = compte,
                                  ClientId= client.ClientId,
                                  CompteId= client.CompteId,
                              }).SingleOrDefault();

            result.Compte.Token = _authService!.GenerateToken(result.Compte.Username, result.Compte.Mail, "Client");
            result.Compte.IsConnected = 1;
            return new(result, true);
        }

        catch (Exception e)
        {
            return new(new Message(e.Message, false), false);
        }
        finally
        {
            await _context!.SaveChangesAsync();
        }
    }
}
