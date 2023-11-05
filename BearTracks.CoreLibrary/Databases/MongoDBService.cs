using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Models.UserAccount;
using BearTracks.CoreLibrary.Utility;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections;
using System.Text.RegularExpressions;
using static MongoDB.Driver.WriteConcern;

namespace BearTracks.CoreLibrary.Databases
{
    public class MongoDBService : IDatabaseService
    {
        private Regex REGEX = new Regex(Constants.EMAIL_REGEX);
        
        private string? _connectionString;
        private MongoClient? _client;
        private IMongoDatabase? _database;
        private IDbSecurityService _security_svc;
        private readonly string? _databaseName;

        public MongoDBService(string? databaseName, string? connectionString, IDbSecurityService sec_svc)
        {
            _databaseName = databaseName;
            _connectionString = connectionString;
            _security_svc = sec_svc;
            Setup();
        }

        public IActionResult CreateUser(CreateModelDTO cModel)
        {
            if (_database != null)
            {
                if (REGEX.IsMatch(cModel.Email))
                {
                    var filter = Builders<User>.Filter.Eq(u => u.Email, cModel.Email);
                    var salt = _security_svc.CreateSALT();
                    var passwordHash = _security_svc.HashPassword(cModel.Password, salt);

                    var user = new User
                    {
                        FirstName = cModel.FirstName,
                        LastName = cModel.LastName,
                        Email = cModel.Email,
                        UserName = cModel.UserName,
                        PasswordHash = passwordHash,
                        SALT = Convert.ToBase64String(salt),
                        AccountPhoto = null
                    };

                    // Insert the User object into the collection
                    var collection = _database.GetCollection<User>("users");
                    var result = collection.Find(filter).FirstOrDefault();

                    if (result == null)
                    {
                        collection.InsertOne(user);
                        return new OkResult();
                    }
                    else
                    {
                        return new NotFoundResult();
                    }
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            else
            {
                return new NotFoundResult();
            }
        }


        public IActionResult LoginUser(LoginModelDTO lModel)
        {

            if (REGEX.IsMatch(lModel.Email))
            {
                var collection = _database != null ? _database.GetCollection<BsonDocument>("users") : null;
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
            _database = _client.GetDatabase(_databaseName);
        }

        public IActionResult DeleteUser(DeleteUserDTO delModel)
        {
            if (_database != null)
            {
                var collection = _database.GetCollection<BsonDocument>("users");
                var filter = Builders<BsonDocument>.Filter.And(
                        Builders<BsonDocument>.Filter.Eq("Email", delModel.Email));

                // Delete the document
                var result = collection.DeleteOne(filter);

                if (result.DeletedCount == 1)
                    return new OkResult();
                else
                    return new NotFoundResult();
            }
            else
                return new NotFoundResult();
        }

        public IActionResult RetrieveUser(string email)
        {
            if (_database != null)
            {
                var collection = _database.GetCollection<User>("users");
                var filter = Builders<User>.Filter.And(
                        Builders<User>.Filter.Eq("Email", email));

                // Delete the document
                var result = collection.Find(filter).FirstOrDefault();
                //var userData = new { Email = result.email, Name = "John Doe" };

                if (result != null)
                {
                    var userDto = new User
                    {
                        Email = result.Email,
                        FirstName = result.FirstName,
                        LastName = result.LastName,
                        UserName = result.UserName,
                        AccountPhoto = result.AccountPhoto
                        // You may need to adjust this based on your actual user class
                                          // Add other properties as needed
                    };
                    return new OkObjectResult(userDto);
                }
                else
                    return new NotFoundResult();
            }
            else
                return new NotFoundResult();
        }
    }
}
