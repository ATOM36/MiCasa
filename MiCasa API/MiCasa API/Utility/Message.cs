namespace MiCasa.Utility
{
    public class Message
    {
        public Message(string content, bool state)
        {
            Content = content;
            State = state;
        }

        public string? Content { get; set; }

        public bool State { get; set; }
    }
}