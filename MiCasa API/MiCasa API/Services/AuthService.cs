using SendGrid;
using SendGrid.Helpers.Mail;

namespace MiCasa.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration? _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken<T>(T user)
        {
            throw new NotImplementedException();
        }

        public async void SendActivationEmail(string _email, string _name)
        {
            try
            {
                var apiKey = _configuration.GetValue<string>("SendGridApiKey");
                var client = new SendGridClient(apiKey);
                var sendGridMessage = new SendGridMessage();
                sendGridMessage.SetFrom("leotim91@gmail.com", "Mi Casa");
                sendGridMessage.AddTo(_email);
                sendGridMessage.SetTemplateId("d-7509b8198ba1479ea0d702ff2e272029");
                sendGridMessage.SetSubject("Activation de compte");
                sendGridMessage.SetTemplateData(new
                {
                    name = _name,
                });

                var response = await client.SendEmailAsync(sendGridMessage);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public void SendWelcomeEmail<T>()
        {
            throw new NotImplementedException();
        }
        
        
        
        public void OnDeleteEmail(string _email; string name){

            try{

            var apiKey = _configuration.GetValue<string>("SendGridApiKey");
                var client = new SendGridClient(apiKey);
                var sendGridMessage = new SendGridMessage();
                sendGridMessage.SetFrom("leotim91@gmail.com", "Mi Casa");
                sendGridMessage.AddTo(_email);
                sendGridMessage.SetTemplateId("d-7509b8198ba1479ea0d702ff2e272029");
                sendGridMessage.SetSubject("suppression  de compte");
                sendGridMessage.SetTemplateData(new
                {
                    name = _name,
                });

                var response = await client.SendEmailAsync(sendGridMessage);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
