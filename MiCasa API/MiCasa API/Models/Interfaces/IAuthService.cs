namespace MiCasa.Models.Interfaces
{
    public interface IAuthService
    {
        public void SendWelcomeEmail<T>();

        public void SendActivationEmail(string _email, string _name);

        public string GenerateToken<T>(T user);
    }
}
