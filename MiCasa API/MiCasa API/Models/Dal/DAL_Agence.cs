namespace MiCasa.Models.Dal
{
    public class DAL_Agence
    {
        private static NpgsqlConnection? _connection;
        public async static Task<JsonResult> GetAgencies(int startIndex, int stopIndex)
        {
            try
            {
                _connection = DbConnection.GetConnection();
                string query = "SELECT * FROM Agence OFFSET @startIndex FETCH NEXT @stopIndex ROWS ONLY ORDER BY AgenceId";
                await _connection.OpenAsync();

                NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                DataTable table = new DataTable();
                table.Load(reader);
                reader.Close();

                return new JsonResult(new QueryData<DataTable>
                {
                    Data = table,
                    State = true
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new Message
                {
                    Content = ex.Message,
                    State = false
                });
            }
            finally
            {
                await _connection!.CloseAsync();
            }
        }
    }
}
