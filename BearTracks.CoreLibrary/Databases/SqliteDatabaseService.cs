using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Models.UserAccount;
using BearTracks.CoreLibrary.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.Text;
using System.Text.RegularExpressions;
using static MongoDB.Driver.WriteConcern;

namespace BearTracks.CoreLibrary.Databases
{
    public class SqliteDatabaseService : IDatabaseService
    {
        private const string TABLE_NAME = "users";
        //REGEX PATTERN for email address
        //This check needs to occur in the View as well,
        //but adding this to prevent any other direct calls to the API
        private Regex _regex = new Regex(Constants.EMAIL_REGEX);
        private readonly string? _connectionString;
        private readonly string? _databaseName;
        private IDbSecurityService _security_svc;

        public SqliteDatabaseService(string? databaseName, string? connectionString, IDbSecurityService sec_svc)
        {
            _databaseName = databaseName;
            _connectionString = connectionString;
            _security_svc = sec_svc;

            Setup();
        }

        public void Setup()
        {
            using (var connection = new SQLiteConnection(_connectionString))
            {
                connection.Open();
                var sql = $"Create Table IF NOT EXISTS {TABLE_NAME} (firstname varchar (50), lastname varchar (50), email varchar (50), username varchar (50), passwordHash varchar(50), salt varchar(50));";
                var command = new SQLiteCommand(sql, connection);
                command.ExecuteNonQuery();
            }
        }

        public IActionResult LoginUser(LoginModelDTO lModel)
        {
            //Currently adding a check for email pattern. 
            //TODO Determine password pattern to prevent injection
            if (_regex.IsMatch(lModel.Email))
            {
                using (var connection = new SQLiteConnection(_connectionString))
                {

                    string query = $"SELECT * FROM {TABLE_NAME} WHERE LOWER(email) = @email";
                    StringBuilder storedPasswordHash = new StringBuilder();
                    byte[] salt = new byte[0];

                    connection.Open();
                    using (var command = new SQLiteCommand(query, connection))
                    {
                        command.Parameters.Add(new SQLiteParameter("@email", lModel.Email));
                        using (SQLiteDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                //Add the parameters below provides rudimentary screening for things like sql injection
                                storedPasswordHash.Append(reader.GetString(reader.GetOrdinal("passwordHash")));
                                salt = Convert.FromBase64String(reader.GetString(reader.GetOrdinal("salt")));
                            }
                        }
                    }
                    var passwordHash = _security_svc.HashPassword(lModel.Password, salt);
                    //Checks if there is a result of 1 registered user. If so
                    //it returns an ok response; if not, a not found error 
                    //which can trigger a response on the login page
                    return storedPasswordHash.ToString() == passwordHash ? new OkResult() : new NotFoundResult();
                }
            }
            else return new NotFoundResult();
        }

        public IActionResult CreateUser(CreateModelDTO cModel)
        {
            //Currently adding a check for email pattern. 
            //TODO Determine password pattern to prevent injection
            if (_regex.IsMatch(cModel.Email))
            {
                using (var connection = new SQLiteConnection(_connectionString))
                {
                    var salt = _security_svc.CreateSALT();
                    var passwordHash = _security_svc.HashPassword(cModel.Password, salt);

                    string query = $"INSERT INTO {TABLE_NAME}(firstname, lastname, email, username, passwordHash, salt) " +
                    $"SELECT @firstname, @lastname, LOWER(@email), @username, @passwordHash, @salt " +
                    $"WHERE NOT EXISTS (SELECT 1 FROM {TABLE_NAME} WHERE LOWER(email) = @email)";

                    connection.Open();
                    using (var command = new SQLiteCommand(query, connection))
                    {
                        //Add the parameters below provides rudimentary screening for things like sql injection
                        command.Parameters.Add(new SQLiteParameter("@firstname", cModel.FirstName));
                        command.Parameters.Add(new SQLiteParameter("@lastname", cModel.LastName));
                        command.Parameters.Add(new SQLiteParameter("@email", cModel.Email));
                        command.Parameters.Add(new SQLiteParameter("@username", cModel.UserName));
                        command.Parameters.Add(new SQLiteParameter("@passwordHash", passwordHash));
                        command.Parameters.Add(new SQLiteParameter("@salt", Convert.ToBase64String(salt)));

                        var result = (long)command.ExecuteNonQuery();
                        //Checks if there is a result of 1 registered user. If so
                        //it returns an ok response; if not, a not found error 
                        //which can trigger a response on the login page
                        return result == 1 ? new OkResult() : new NotFoundResult();
                    }
                }
            }
            else return new NotFoundResult();
        }

        public IActionResult DeleteUser(DeleteUserDTO delModel)
        {
            if (delModel.Email != null)
            {
                if (_regex.IsMatch(delModel.Email))
                {
                    using (var connection = new SQLiteConnection(_connectionString))
                    {

                        string query = $"DELETE FROM {TABLE_NAME} WHERE LOWER(email) = @email";
                        connection.Open();
                        using (var command = new SQLiteCommand(query, connection))
                        {
                            command.Parameters.Add(new SQLiteParameter("@email", delModel.Email));
                            int deletedRows = command.ExecuteNonQuery();
                            if (deletedRows == 1)
                                return new OkResult();
                            else
                                return new NotFoundResult();
                        }

                    }
                }
                return new NotFoundResult();
            }
            return new NotFoundResult();
        }

        public IActionResult RetrieveUser(string email)
        {
            throw new NotImplementedException();
        }
    }
}
