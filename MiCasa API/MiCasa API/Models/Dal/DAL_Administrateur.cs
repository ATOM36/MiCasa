using MiCasa.Helpers;

namespace MiCasa.Models.Dal;

public class DAL_Administrateur
{
    private readonly AppDbContext? _context = null;
    private static NpgsqlConnection? _connection = null;

    public DAL_Administrateur(AppDbContext context)
    {
        _context = context;
    }


    /// <summary>
    /// Creates a new <see cref="Administrateur"/> with all required credentials.
    /// </summary>
    /// <param name="administrateur"></param>
    /// <returns></returns>
    public async Task<Message> CreerCompte(Administrateur administrateur)
    {
        try
        {
            await _context!.Administrateurs.AddAsync(administrateur);
            await _context!.SaveChangesAsync();

            return new($"Le compte de {administrateur.Compte.Username} a été créé", true);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
        finally
        {
            _context!.Dispose();
        }
    }


    /// <summary>
    /// Retrieves all data related to an <see cref="Administrateur"/> and indicates that
    /// he's online.
    /// </summary>
    /// <param name="username"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    public async Task<QueryData<object>> LogIn(string username, string password)
    {
        try
        {
            Administrateur? admin = (from compte in _context!.Comptes
                                     where compte.Username == username &&
                                     compte.Password == password
                                     join _admin in _context!.Administrateurs on
                                     compte.CompteId equals _admin.Compte.CompteId
                                     select new Administrateur {
                                         Compte = compte,
                                         AdministrateurId = _admin.AdministrateurId,
                                         IsActive = _admin.IsActive,
                                         CompteId = _admin.CompteId
                                     }).FirstOrDefault();

            // Indiquer qu'il est connecter
            if (admin is not null)
                admin.Compte.IsConnected = 1;

            return new(admin, true);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
        finally
        {
            _context!.SaveChanges();
        }
    }


    /// <summary>
    /// Sets the <see cref="Administrateur.Compte.IsConnected"/> property to 0; 
    /// </summary>
    /// <param name="adminId"></param>
    /// <returns></returns>
    public async Task<Message> LogOut(int adminId)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "UPDATE \"Comptes\" SET \"IsConnected\" = 0 FROM \"Administrateur\" WHERE " +
                    " \"Comptes\".\"CompteId\" = \"Administrateur\".\"CompteId\" AND \"Administrateur\".\"AdministrateurId\" = @Id";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", adminId);
                await command.ExecuteNonQueryAsync();

                return new("Aurevoir !", true);
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
    /// Updates an <see cref="Administrateur"/>'s profile.
    /// </summary>
    /// <param name="admin"></param>
    /// <returns></returns>
    public async Task<Message> ModifierProfile(Administrateur admin)
    {
        try
        {
            _context!.Administrateurs.Update(admin);
            await _context!.SaveChangesAsync();

            return new("Compte modifié avec succès", true);
        }
        catch (Exception e)
        {
            return new(e.Message, false);
        }
    }
}
