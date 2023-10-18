using BearTracks.Controllers;
using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Databases;
using BearTracks.Tests.Mocks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Xunit;

public abstract class TestBase : IClassFixture<WebApplicationFactory<Program>>
{
    protected static ILogger<UserAccountController> logger;
    protected static IDatabaseService handler;
    protected WebApplicationFactory<Program> _factory;
    protected HttpClient _client;

    public TestBase(WebApplicationFactory<Program> factory)
    {
        _factory = factory;

        var services = new ServiceCollection();

        // Define an Action<IServiceCollection> delegate for configuring services
        Action<IServiceCollection> configureServices = collection =>
        {
            ConfigureCustomServices(collection);
        };

        // Use the configureServices delegate to configure services
        _factory = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(configureServices);
            // You can configure the web host builder if needed
        });

        _client = _factory.CreateClient();
        logger = new Logger<UserAccountController>(new LoggerFactory());
        handler = _factory.Services.GetRequiredService<IDatabaseService>();
    }


    // Configure your custom services here
    private void ConfigureCustomServices(IServiceCollection services)
    {
        services.AddTransient<IDatabaseServiceFactory, MockDatabaseServiceFactory>();
        services.AddScoped<IDatabaseService>(provider => provider.GetRequiredService<IDatabaseServiceFactory>().CreateDatabaseService());
        services.AddTransient<IDbSecurityService, DbSecurityService>();
    }
}
