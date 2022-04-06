
using MiCasa.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Antiforgery config
builder.Services.AddAntiforgery(opt => opt.HeaderName = "XSRF-TOKEN");

// Postgres JSON config
NpgsqlConnection.GlobalTypeMapper.UseJsonNet();

// Builder configuration
ApiConfiguration config = new(builder.Services, builder.Configuration);
config.RegisterInterfacesServices()
    .ConfigureLogging()
    .ConfigureEmailService()
    .ConfigureCors()
    .ConfigureJsonSerialization();



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
