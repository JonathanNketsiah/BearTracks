using BearTracks.CoreLibrary.Databases.Interfaces;
using Microsoft.Extensions.Configuration;

namespace BearTracks.CoreLibrary.Databases
{
    public class DatabaseServiceFactory : IDatabaseServiceFactory
    {
        private readonly IConfiguration? _configuration;
        private readonly IDbSecurityService _security_svc;

        public DatabaseServiceFactory(IConfiguration configuration, IDbSecurityService security_svc)
        {
            _configuration = configuration;
            _security_svc = security_svc;
        }

        public IDatabaseService CreateDatabaseService()
        {
            if (_configuration != null)
            {
                string? databaseType = _configuration["Database"];

                if (databaseType == "Sqlite")
                {
                    return new SqliteDatabaseService(
                        _configuration["DatabaseName"],
                        _configuration.GetConnectionString("SqliteConnection"),
                        _security_svc);
                }
                else if (databaseType == "MongoDB")
                {
                    return new MongoDBService(
                        _configuration["DatabaseName"], 
                        _configuration.GetConnectionString("MongoDBConnection"), 
                        _security_svc);
                }
                else if (databaseType == "SqlServer")
                {
                    return new SqlServerDatabaseService(
                        _configuration.GetConnectionString("SqlServerConnection"),
                        _security_svc);
                }
                else
                {
                    throw new InvalidOperationException("Invalid database type specified in appropriate appsettings.json file");
                }
            }
            else
            {
                throw new NullReferenceException("Configuration Object is not present.");
            }
        }
    }

}
