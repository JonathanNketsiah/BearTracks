using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Databases;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using BearTracks.CoreLibrary.Models.UserAccount;

public abstract class TestBase
{
    protected static IServiceCollection _serviceCollection = new ServiceCollection();
    protected static IDatabaseService? _databaseService { get; set; }
    protected static IConfiguration? _configuration { get; set; }


    protected abstract void SetLogger();
    
    protected static void BuildConfiguration()
    {
        _configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory) // Use the test project's base directory
            .AddJsonFile("appsettings.test.json") // Specify the file to load
            .Build();
    }

    // Configure your custom services here
    protected static void ConfigureCustomServices()
    {
        _serviceCollection.AddTransient<IDatabaseServiceFactory, DatabaseServiceFactory>();
        _serviceCollection.AddScoped<IDatabaseService>(provider => provider.GetRequiredService<IDatabaseServiceFactory>().CreateDatabaseService());
        _serviceCollection.AddTransient<IDbSecurityService, DbSecurityService>();
        
        if (_configuration != null)
        {
            _serviceCollection.AddSingleton<IConfiguration>(_configuration);
        }
    }   
    
    protected static void Setup()
    {
        var serviceProvider = _serviceCollection.BuildServiceProvider();
        _databaseService = serviceProvider.GetRequiredService<IDatabaseService>();
        CreateTestData(_databaseService);
    }

    private static void CreateTestData(IDatabaseService svc)
    {
        var testModel = new CreateModelDTO
        {
            FirstName = "Testy",
            LastName = "Tester",
            Email = "test@test.com",
            Password = "test",
            UserName = "Testizzy!"
        };
        svc.CreateUser(testModel);
    }
}