using MiCasa.Helpers;
using System.Text;

namespace MiCasa.Models.Dal;
public class DAL_ContratAgence
{
    private static NpgsqlConnection? _connection;

    /// <summary>
    /// Active le contrat d'une agence spécifique
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public static async Task<Message> Activate(int id)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "UPDATE ContratAgence SET IsActive = 1 WHERE ContratId = @Id;";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", id);
                await command.ExecuteNonQueryAsync();

                return new(content: $"Le contrat {id} a été avec succès", true);
            }
        }
        catch (Exception ex)
        {
            return new Message(ex.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Active le contrat d'un certain nombre d'agence
    /// </summary>
    /// <param name="idList"></param>
    /// <returns></returns>
    public static async Task<Message> ActivateRange(List<int> idList)
    {
        try
        {
            StringBuilder query = new StringBuilder("UPDATE ContratAgence SET IsActive = 1 WHERE ");
            for (int i = 0; i < idList.Count; i++)
            {
                if (i == idList.Count - 1)
                    query.Append($"Id = {idList[i]}");
                else
                    query.Append($"Id = {idList[i]} ");
            }

            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                NpgsqlCommand command = new(query.ToString(), _connection);
                await command.ExecuteNonQueryAsync();

                return new(content: $"{idList.Count} contrats ont été activés", true);
            }
        }
        catch (Exception ex)
        {
            return new Message(ex.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Cette fonction crée un contrat spécifique pour une agence créé par un admin donné.
    /// </summary>
    /// <param name="contrat"></param>
    /// <returns></returns>
    public static async Task<Message> CreateContract(ContratAgence contrat)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "INSERT INTO ContratAgence VALUES(@Id, @Agence, @IsActive, @DateCreation);";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", contrat.ContratId);
                command.Parameters.AddWithValue("@Agence", contrat.AgenceId);
                command.Parameters.AddWithValue("@IsActive", 1);
                command.Parameters.AddWithValue("@DateCreation", DateTime.Now.ToShortDateString());

                await command.ExecuteNonQueryAsync();

                return new($"Le contrat {contrat.ContratId} a été créé avec succès!", true);
            }
        }
        catch (Exception ex)
        {
            return new Message(ex.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Supprime un contrat relatif à une agence donnée
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public static async Task<Message> Delete(int id)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "DELETE FROM ContratAgence WHERE ContratId = @Id";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", id);
                await command.ExecuteNonQueryAsync();

                return new(content: $"Le contrat {id} a été supprimé avec succès", true);
            }
        }
        catch (Exception ex)
        {
            return new Message(ex.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Supprime un certains nombre de contrat.
    /// </summary>
    /// <param name="idList"></param>
    /// <returns></returns>
    public static async Task<Message> DeleteRange(List<int> idList)
    {
        try
        {
            StringBuilder query = new StringBuilder("DELETE FROM ContratAgence WHERE ");
            for (int i = 0; i < idList.Count; i++)
            {
                if (i == idList.Count - 1)
                    query.Append($"Id = {idList[i]}");
                else
                    query.Append($"Id = {idList[i]} ");
            }

            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                NpgsqlCommand command = new(query.ToString(), _connection);
                await command.ExecuteNonQueryAsync();

                return new($"{idList.Count} contrats ont été supprimés", true);
            }
        }
        catch (Exception ex)
        {
            return new Message(ex.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Récupère les informations relatives a un contrat spécifique.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public static async Task<QueryData<object>> Select(int id)
    {
        try
        {
            ContratAgence? result = null;
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "SELECT * FROM ContratAgence WHERE ContratId = @Id";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", id);
                NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                if ((reader.Read()) && (reader is not null))
                {
                    result = ContratAgenceHelper.FillContract(reader, result);
                    await reader.CloseAsync();
                }

                return new(result, true);
            }
        }
        catch (Exception ex)
        {
            return new(new Message(ex.Message, false), false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Récupère un certain nombre de contrat.
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    /// <returns></returns>
    public static async Task<QueryData<object>> SelectRange(int start, int end)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "SELECT * FROM ContratAgence OFFSET @start FETCH NEXT @end ROWS ONLY;";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@start", start);
                command.Parameters.AddWithValue("@end", end);

                NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command);
                DataTable table = new();
                adapter.Fill(table);

                return new(table, true);
            }
        }
        catch (Exception ex)
        {
            return new(new Message(ex.Message, false), false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }

    /// <summary>
    /// Met à jour l'état d'activation et la date de création d'un contrat.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="contrat"></param>
    /// <returns></returns>
    public static async Task<Message> UpdateContrat(int id, ContratAgence contrat)
    {
        try
        {
            using (_connection = DbConnection.GetConnection())
            {
                await _connection.OpenAsync();
                string query = "UPDATE ContratAgence SET IsActive = @state, DateCreation = @dateCreation WHERE ContratId = @Id;";

                NpgsqlCommand command = new(query, _connection);
                command.Parameters.AddWithValue("@Id", id);
                command.Parameters.AddWithValue("@state", contrat.IsActive);
                command.Parameters.AddWithValue("@dateCreation", contrat.DateCreation.ToShortDateString());

                await command.ExecuteNonQueryAsync();
                return new($"Le compte {id} a été mis à jour!", true);
            }
        }
        catch (Exception ex)
        {
            return new(ex.Message, false);
        }
        finally
        {
            await _connection!.CloseAsync();
            await _connection!.DisposeAsync();
        }
    }
}
