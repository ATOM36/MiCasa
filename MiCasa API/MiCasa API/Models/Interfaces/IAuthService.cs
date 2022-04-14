namespace MiCasa.Models.Interfaces
{
    public interface IAuthService
    {
        public void SendWelcomeEmail(string _email, string _name);

        public void SendActivationEmail(string _email, string _name);

        public string GenerateToken(string username, string email, string role);

        public void OnDeleteEmail(string _email, string _name);
    }
}
