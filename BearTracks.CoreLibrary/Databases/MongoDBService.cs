using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Databases.MongoObjects;
using BearTracks.CoreLibrary.Models.Events;
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
        
        private string? _connectionString;
        private MongoClient? _client;
        private IMongoDatabase? _database;
        private IDbSecurityService _security_svc;
        private readonly string? _databaseName;
        private const string P_KEY_VALUE = "Email";

        public MongoDBService(string? databaseName, string? connectionString, IDbSecurityService sec_svc)
        {
            _databaseName = databaseName;
            _connectionString = connectionString;
            _security_svc = sec_svc;
            Setup();
        }

        public IActionResult CreateUser(CreateModelDTO cModel)
        {
            IActionResult response = new NotFoundResult();

            if (_database != null)
            {
                if (REGEX.IsMatch(cModel.Email))
                {
                    var filter = Builders<UserBSON>.Filter.Eq(u => u.Email, cModel.Email);
                    var salt = _security_svc.CreateSALT();
                    var passwordHash = _security_svc.HashPassword(cModel.Password, salt);

                    var user = new UserBSON
                    {
                        FirstName = cModel.FirstName,
                        LastName = cModel.LastName,
                        Email = cModel.Email.ToLower(),
                        UserName = cModel.UserName,
                        PasswordHash = passwordHash,
                        SALT = Convert.ToBase64String(salt),
                    };

                    var accountPhoto = new AccountPhotoBSON
                    {
                        Email = cModel.Email,
                        AccountPhoto = null
                    };

                    // Insert the User object into the collection
                    var collection = _database.GetCollection<UserBSON>("users");
                    var photoCollection = _database.GetCollection<AccountPhotoBSON>("accountPhotos");
                    
                    var result = collection.Find(filter).FirstOrDefault();

                    if (result == null)
                    {
                        collection.InsertOne(user);
                        photoCollection.InsertOne(accountPhoto);
                        response = new OkResult();
                    }
                }
            }
            return response;
        }


        public IActionResult LoginUser(LoginModelDTO lModel)
        {

            if (REGEX.IsMatch(lModel.Email))
            {
                var collection = _database != null ? _database.GetCollection<BsonDocument>("users") : null;
                var hashedPassword = lModel.Password;
                
                // Create a filter to select the document
                var filter = Builders<BsonDocument>.Filter.And(
                    Builders<BsonDocument>.Filter.Eq("Email", lModel.Email.ToLower())); // Filter by Email value
                
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
                //Pull in users associated account photos
                var userCollection = _database.GetCollection<BsonDocument>("users");
                var photoCollection = _database.GetCollection<BsonDocument>("accountPhotos");
                var filter = Builders<BsonDocument>.Filter.And(
                        Builders<BsonDocument>.Filter.Eq("Email", email));
                
                // Results with the given email
                var userResult = userCollection.Find(filter).FirstOrDefault();
                var photoResult = photoCollection.Find(filter).FirstOrDefault();
                
                string accntphoto = null;
                if (userResult != null)
                {
                    if (photoResult.Contains("AccountPhoto") && !photoResult["AccountPhoto"].IsBsonNull)
                    {
                        accntphoto = photoResult["AccountPhoto"].AsString;
                    }

                    var returnObject = new UserReturnObjectDTO
                    {
                        User = new UserBSON
                        {
                            Email = userResult["Email"].AsString,
                            FirstName = userResult["FirstName"].AsString,
                            LastName = userResult["LastName"].AsString,
                            UserName = userResult["UserName"].AsString,
                        },
                        accountPhoto = accntphoto
                    };
                    return new OkObjectResult(returnObject);
                }
                else
                    return new NotFoundResult();
            }
            else
                return new NotFoundResult();
        }

        public IActionResult UpdateUser(UpdateModelDTO uModel)
        {
            var collection = _database.GetCollection<UserBSON>("users");
            var photoCollection = _database.GetCollection<AccountPhotoBSON>("accountPhotos");

            var filter = Builders<UserBSON>.Filter.Eq(P_KEY_VALUE, uModel.Email);
            var photoFilter = Builders<AccountPhotoBSON>.Filter.Eq(P_KEY_VALUE, uModel.Email);

            // Define the update operation
            var updateUser = Builders<UserBSON>.Update
                .Set("FirstName", uModel.FirstName)
                .Set("LastName", uModel.LastName)
                .Set("UserName", uModel.UserName);

            var updatePhoto = Builders<AccountPhotoBSON>.Update
                .Set("AccountPhoto", uModel.ProfilePic);

            var updateResult = collection.UpdateOne(filter, updateUser);
            var updatePhotoResult = photoCollection.UpdateOne(photoFilter, updatePhoto);

            return updateResult.ModifiedCount == 1 ? new OkResult() : new NotFoundResult();
        }

        public IActionResult CreateEvent(CreateEventDTO uModel)
        {
            return new OkResult();
        }

        public IActionResult GetEvents(Position userPos)
        {
            return new OkResult();
        }
    }
}
