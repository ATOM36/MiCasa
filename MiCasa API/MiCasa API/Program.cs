
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JSON responses configuration
//With this configuration, we ensure that every given response by the API will be in JSON format
//Using the AddControllersWithViews allows OpenApi and the whole program to add services for pages
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(opt =>
        opt.SerializerSettings.ContractResolver = new DefaultContractResolver()).AddNewtonsoftJson(opt =>
            opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

//Enabling cors for services
builder.Services.AddCors(options =>
    options.AddPolicy(name: "AllowOrigin", opt =>
    {
        opt.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader();
    }));

// Registering services in the DI container
builder.Services.AddScoped<IAgency, BLL_Agency>();

// Adding response caching
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Using routing so that every API call will match the correct controller
//Also OpenApi will be able to redirect  the different calls
app.UseRouting();


app.UseAuthorization();

//Enabling cors
app.UseCors("AllowOrigin");

//Creating the endpoints' pattern so that OpenApi can do the matching and also to be more accurate for API every call
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action}/{id?}");
});

app.Run();
