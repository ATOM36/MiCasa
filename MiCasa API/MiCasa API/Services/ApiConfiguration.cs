using Serilog;
using Serilog.Events;

namespace MiCasa.Services
{

    /// <summary>
    /// Makes most of the required configuration using <paramref name="IServiceCollection">
    /// </summary>
    public class ApiConfiguration
    {
        private readonly IServiceCollection? _services;
        private readonly IConfiguration? _configuration;

        public ApiConfiguration(IServiceCollection services, IConfiguration configuration)
        {
            _services = services;
            _configuration = configuration;
        }


        /// <summary>
        /// JSON responses configuration. <br/>
        /// With this configuration, we ensure that every given response by the API will be in JSON format.<br/>
        /// Using the AddControllersWithViews allows OpenApi and the whole program to add services for pages.
        /// </summary>
        public ApiConfiguration ConfigureJsonSerialization()
        {
            _services?.AddControllersWithViews().AddNewtonsoftJson(opt =>
                opt.SerializerSettings.ContractResolver = new DefaultContractResolver()).AddNewtonsoftJson(opt =>
                    opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize);

            return this;
        }

        /// <summary>
        /// Enabling CORS for services
        /// </summary>
        public ApiConfiguration ConfigureCors()
        {
            _services?.AddCors(options =>
                options.AddPolicy(name: "AllowOrigin", opt =>
                {
                    opt.WithOrigins("http://localhost:4200",
                        "https://inquisitive-snickerdoodle-f9acf7.netlify.app",
                        "http://localhost:8080")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                }));

            return this;
        }

        /// <summary>
        /// Registering services in the DI container
        /// </summary>
        public ApiConfiguration RegisterInterfacesServices()
        {
            _services?.AddScoped<IAgence, BLL_Agence>()
                .AddScoped<IAuthService,AuthService>()
                .AddScoped<IContratAgence, BLL_ContratAgence>();

            return this;
        }

        public ApiConfiguration ConfigureLogging()
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.File(
                    path: Path.Combine(
                        Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
                        "MiCasa Logs",
                        "log-.txt"),
                    outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} [{level:u3}] {Message:lj}{NewLine}{Exception}",
                    rollingInterval: RollingInterval.Day,
                    restrictedToMinimumLevel: LogEventLevel.Information).CreateLogger();

            return this;
        }

        public ApiConfiguration ConfigureEmailService()
        {
            _services!.AddScoped<IAuthService, AuthService>();

            return this;
        }
    }
}