namespace MiCasa.Utility
{
    public class QueryData<T>
    {
        public QueryData(T data, bool state)
        {
            Data = data;
            State = state;
        }

        public QueryData(object data, bool state)
        {
            Data = (T)data;
            State = state;
        }

        public T? Data { get; set; }

        public bool State { get; set; }

        public static explicit operator QueryData<T>(QueryData<object> v)
        {
            return new QueryData<T>(v.Data, v.State);
        }
    }
}
