using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Models.UserAccount;
using BearTracks.CoreLibrary.Utility;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.RegularExpressions;

namespace BearTracks.CoreLibrary.Databases
{
    public class MongoDBService : IDatabaseService
    {
        private Regex REGEX = new Regex(Constants.EMAIL_REGEX);
        
        private string _connectionString;
        private MongoClient _client;
        private IMongoDatabase _database;
        private IDbSecurityService _security_svc;

        public MongoDBService(string connectionString, IDbSecurityService sec_svc)
        {
            _connectionString = connectionString;
            _security_svc = sec_svc;
            Setup();
        }

        public async Task<IActionResult> CreateUser(CreateModelDTO cModel)
        {
            if (REGEX.IsMatch(cModel.Email))
            {
                var salt = _security_svc.CreateSALT();
                var passwordHash = _security_svc.HashPassword(cModel.Password, salt);
                var dataModel = new CreateModelHashingWrapperDTO().Wrap(cModel, passwordHash, Convert.ToBase64String(salt));
                var collection = _database.GetCollection<BsonDocument>("users");
                
                // Create a document and insert it into the collection
                var document = dataModel.ToBsonDocument();
                try
                {
                    await collection.InsertOneAsync(document);
                    return new OkResult();
                }
                catch (Exception ex)
                {
                    return new NotFoundResult();
                }
            }
            else return new NotFoundResult();
        }

        public async Task<IActionResult> LoginUser(LoginModelDTO lModel)
        {

            if (REGEX.IsMatch(lModel.Email))
            {
                var collection = _database.GetCollection<BsonDocument>("users");
                var hashedPassword = lModel.Password;
                
                // Create a filter to select the document
                var filter = Builders<BsonDocument>.Filter.And(
                    Builders<BsonDocument>.Filter.Eq("Email", lModel.Email)); // Filter by Email value
          
                try
                {
                    
                    var result = collection.Find(filter).FirstOrDefault();
                    var storedPasswordHash = result["PasswordHash"].AsString;
                    var salt = Convert.FromBase64String(result["SALT"].AsString);
                    var passwordHash = _security_svc.HashPassword(lModel.Password, salt);

                    return storedPasswordHash.ToString() == passwordHash ? new OkResult() : new NotFoundResult();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                    return new NotFoundResult();
                }
            } else return new NotFoundResult();
        }

        public void Setup()
        {
            _client = new MongoClient(_connectionString);
            _database = _client.GetDatabase("Beartracks");
        }
    }
}
