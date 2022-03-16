namespace MiCasa.Utility
{
    public class QueryData<T>
    {
        public QueryData(T data, bool state)
        {
            Data = data;
            State = state;
        }

        public T? Data { get; set; }

        public bool State { get; set; }
    }
}
