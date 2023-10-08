using Microsoft.Extensions.Configuration;

namespace BearTracks.CoreLibrary.Databases
{
    public class DatabaseServiceFactory
    {
        private readonly IConfiguration _configuration;

        public DatabaseServiceFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDatabaseService CreateDatabaseService()
        {
            string databaseType = _configuration["Database"];

            if (databaseType == "Sqlite")
            {
                return new SqliteDatabaseService(_configuration.GetConnectionString("SqliteConnection"));
            }
            else if (databaseType == "MongoDB")
            {
                return new MongoDBService(_configuration.GetConnectionString("MongoDBConnection"));
            }
            else
            {
                throw new InvalidOperationException("Invalid database type specified in appsettings.json");
            }
        }
    }

}
