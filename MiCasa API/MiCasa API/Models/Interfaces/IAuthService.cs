namespace MiCasa.Models.Interfaces
{
    public interface IAuthService
    {
        public void SendWelcomeEmail(string _email, string _name);

        public void SendActivationEmail(string _email, string _name);

        public string GenerateToken<T>(T user);

        public void OnDeleteEmail(string _email, string _name);
    }
}
