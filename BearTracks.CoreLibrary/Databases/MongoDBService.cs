using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BearTracks.CoreLibrary.Databases
{
    public class MongoDBService : IDatabaseService
    {
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

        public IActionResult LoginUser(LoginModelDTO lModel)
        {
            var collection = _database.GetCollection<BsonDocument>("testStuff");
            // Create a document and insert it into the collection
            var document = lModel.ToBsonDocument();
            collection.InsertOneAsync(document);

            // Create a filter to select the document
            var filter = Builders<BsonDocument>.Filter.Eq(lModel.Email, lModel.Password);

            // Find the document and print it
            var result = collection.Find(filter).FirstOrDefaultAsync();
            Console.WriteLine(result);

            return new OkResult();
        }

        public void Setup()
        {
            _client = new MongoClient(_connectionString);
            _database = _client.GetDatabase("testusers");
        }
    }
}
