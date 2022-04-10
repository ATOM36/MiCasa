using SendGrid;
using SendGrid.Helpers.Mail;
using Serilog;

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


        /// <summary>
        /// Sends an to a user with a confirmation token
        /// </summary>
        /// <param name="_email"></param>
        /// <param name="_name"></param>
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
                sendGridMessage.SetTemplateData(new {
                    name = _name,
                });

                var response = await client.SendEmailAsync(sendGridMessage);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }

        }

        public void SendWelcomeEmail(string _email, string _name)
        {
            int a = 1;
        }


        /// <summary>
        /// Sends an email to a given user when one deletes it's account.
        /// </summary>
        /// <param name="_email"></param>
        /// <param name="_name"></param>
        public async void OnDeleteEmail(string _email, string _name)
        {

            try
            {

                var apiKey = _configuration.GetValue<string>("SendGridApiKey");
                var client = new SendGridClient(apiKey);
                var sendGridMessage = new SendGridMessage();
                sendGridMessage.SetFrom("leotim91@gmail.com", "Mi Casa");
                sendGridMessage.AddTo(_email);
                sendGridMessage.SetTemplateId("d-6d9394f9967d47f889d1a0ea16735e9e");
                sendGridMessage.SetSubject("Suppression de compte");
                sendGridMessage.SetTemplateData(new {
                    name = _name,
                });

                var response = await client.SendEmailAsync(sendGridMessage);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
        }
    }
}
