namespace MiCasa.Models.Dal;
public class DAL_Agence
{
    private static NpgsqlConnection? _connection;
    private readonly AppDbContext? _context = null;
    private readonly IAuthService? _authService = null;
    public DAL_Agence(AppDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }


    /// <summary>
    ///
    /// </summary>
    /// <param name="username"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    public async Task<QueryData<object>> LogIn(string username, string password)
    {
        try
        {

            Agence? result = (from compte in _context!.Comptes
                              where compte.Username == username &&
                              compte.Password == password
                              join agence in _context!.Agences on
                              compte.CompteId equals agence.Compte.CompteId
                              select new Agence {
                                  Compte = compte,
                                  AgenceId = agence.AgenceId,
                                  Adresse = agence.Adresse,
                                  CompteId = agence.CompteId,
                                  Latitude = agence.Latitude,
                                  Longitude = agence.Longitude,
                                  Signalement = agence.Signalement
                              }).SingleOrDefault();

            result.Compte.Token = _authService!.GenerateToken(result.Compte.Username, result.Compte.Mail, "Agence");
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


    /// <summary>
    /// p
    /// </summary>
    /// <param name="agenceId"></param>
    /// <returns></returns>
    public async Task<Message> SupprimerCompte(int agenceId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string query = "DELETE from \"Agence\" Where \"AgenceId\" =@agenceId ";
                await _connection.OpenAsync();
                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@agenceId", agenceId);
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
    /// <param name="agenceId"></param>
    /// <returns></returns>
    public async Task<Message> BloquerCompteAgence(int agenceId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string query = "UPDATE \"Comptes\" SET \"IsBlocked\" = 1 FROM \"Agence\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Agence\".\"CompteId\" AND \"Agence\".\"AgenceId\" = @Id";
                await _connection.OpenAsync();

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", agenceId);
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
    /// <param name="startIndex"></param>
    /// <param name="stopIndex"></param>
    /// <returns></returns>
    public async Task<QueryData<object>> GetAgence(int startIndex, int stopIndex)
    {
        try
        {
            IEnumerable<Agence> result = (from compte in _context!.Comptes
                                          join agence in _context!.Agences on
                                          compte.CompteId equals agence.Compte.CompteId

                                          select new Agence {
                                              Compte = compte,
                                              AgenceId = agence.AgenceId,
                                              Adresse = agence.Adresse,
                                              CompteId = agence.CompteId,
                                              Latitude = agence.Latitude,
                                              Longitude = agence.Longitude,
                                              Signalement = agence.Signalement,
                                          })
                                            .Skip(startIndex)
                                            .Take(stopIndex)
                                            .OrderBy(e => e.AgenceId)
                                            .ToList();

            return new(result, true);
        }
        catch (Exception e)
        {
            return new(new Message(e.Message, false), false);
        }

    }


    /// <summary>
    ///
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    public async Task<Message> logout(int agenceId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string sql = "UPDATE \"Comptes\" SET \"IsConnected\" = 0 FROM \"Agence\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Agence\".\"CompteId\" AND \"Agence\".\"Agence\" = @Id";
                await _connection.OpenAsync();
                NpgsqlCommand cmd = new(sql, _connection);
                cmd.Parameters.AddWithValue("@Id", agenceId);
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


    /// <summary>
    ///
    /// </summary>
    /// <param name="agenceId"></param>
    /// <returns></returns>
    public async Task<Message> DebloquerCompte(int agenceId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                string sql = "UPDATE \"Comptes\" SET \"IsBlocked\" = 0 FROM \"Agence\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Agence\".\"CompteId\" AND \"Agence\".\"AgenceId\" = @Id";
                await _connection.OpenAsync();
                NpgsqlCommand command = new(sql, _connection);
                command.Parameters.AddWithValue("@Id", agenceId);
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


    /// <summary>
    ///
    /// </summary>
    /// <param name="agence"></param>
    /// <returns></returns>
    public async Task<Message> creerCompte(Agence agence)
    {
        try
        {
            await _context!.Agences.AddAsync(agence);
            await _context!.SaveChangesAsync();

            return new Message("le compte est cree", true);
        }
        catch (Exception e)
        {
            return new Message(e.Message, false);
        }
    }


    /// <summary>
    ///
    /// </summary>
    /// <param name="agence"></param>
    /// <returns></returns>
    public async Task<Message> modifierprofil(Agence agence)
    {
        try
        {
            _context!.Agences.Update(agence);
            await _context.SaveChangesAsync();
            return new Message("le compte est modifier", true);

        }
        catch (Exception e)
        {
            return new Message(e.Message, false);
        }
    }


    /// <summary>
    ///
    /// </summary>
    /// <param name="agenceId"></param>
    /// <returns></returns>
    public async Task<QueryData<object>> Get(int agenceId)
    {
        try
        {
            Agence? result = (from compte in _context!.Comptes
                              join agence in _context!.Agences on
                              compte.CompteId equals agence.Compte.CompteId
                              where agence.AgenceId == agenceId

                              select new Agence {
                                  Compte = compte,
                                  AgenceId = agence.AgenceId,
                                  Adresse = agence.Adresse,
                                  CompteId = agence.CompteId,
                                  Latitude = agence.Latitude,
                                  Longitude = agence.Longitude,
                                  Signalement = agence.Signalement,
                              }).SingleOrDefault();

            return new(result, true);
        }
        catch (Exception e)
        {
            return new(new Message(e.Message, false), false);
        }
    }
}
