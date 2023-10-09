using BearTracks.CoreLibrary.Models.UserAccount;
using BearTracks.CoreLibrary.Utility;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.RegularExpressions;
using static MongoDB.Driver.WriteConcern;

namespace BearTracks.CoreLibrary.Databases
{
    public class MongoDBService : IDatabaseService
    {
        private Regex REGEX = new Regex(Constants.EMAIL_REGEX);
        
        private string _connectionString;
        private MongoClient _client;
        private IMongoDatabase _database;

        public MongoDBService(string connectionString)
        {
            _connectionString = connectionString;
            Setup();
        }

        public IActionResult CreateUser(CreateModelDTO cModel)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> CreateUserAsync(CreateModelDTO cModel)
        {
            if (REGEX.IsMatch(cModel.Email))
            {
                var collection = _database.GetCollection<BsonDocument>("users");
                // Create a document and insert it into the collection
                var document = cModel.ToBsonDocument();
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

        
        public IActionResult LoginUser(LoginModelDTO lModel)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> LoginUserAsync(LoginModelDTO lModel)
        {

            if (REGEX.IsMatch(lModel.Email))
            {
                var collection = _database.GetCollection<BsonDocument>("users");

                // Create a filter to select the document
                var filter = Builders<BsonDocument>.Filter.And(
                    Builders<BsonDocument>.Filter.Eq("Email", lModel.Email), // Filter by field1
                    Builders<BsonDocument>.Filter.Eq("Password", lModel.Password));

                // Find the document and print it
                try
                {
                    var result = await collection.CountDocumentsAsync(filter);

                    if (result == 1)
                    {
                        return new OkResult();
                    }
                    else
                    {
                        return new NotFoundResult();
                    }
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
