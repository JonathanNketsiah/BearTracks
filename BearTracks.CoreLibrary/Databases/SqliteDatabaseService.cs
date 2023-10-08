using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.Text.RegularExpressions;

namespace BearTracks.CoreLibrary.Databases
{
    public class SqliteDatabaseService : IDatabaseService
    {
        private const string DB_NAME = "MyDatabase.sqlite";
        private const string TABLE_NAME = "users";
        //REGEX PATTERN for email address
        //This check needs to occur in the View as well,
        //but adding this to prevent any other direct calls to the API
        private const string PATTERN = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        private Regex REGEX = new Regex(PATTERN);
        private string ConnectionString;

        public SqliteDatabaseService(string connectionString)
        {
            ConnectionString = connectionString;
            if (!File.Exists(DB_NAME))
            {
                SQLiteConnection.CreateFile(DB_NAME);
            }
            Setup();
        }

        public void Setup()
        {
            using (var connection = new SQLiteConnection(ConnectionString))
            {
                connection.Open();
                var sql = $"Create Table IF NOT EXISTS {TABLE_NAME} (firstname varchar (50), lastname varchar (50), email varchar (50), username varchar (50), password varchar(50))";
                var command = new SQLiteCommand(sql, connection);
                command.ExecuteNonQuery();
            }
        }

        public IActionResult LoginUser(LoginModelDTO lModel)
        {
            //Currently adding a check for email pattern. 
            //TODO Determine password pattern to prevent injection
            if (REGEX.IsMatch(lModel.Email))
            {
                using (var connection = new SQLiteConnection(ConnectionString))
                {

                    string query = $"SELECT COUNT(*) FROM {TABLE_NAME} WHERE LOWER(email) = @email AND password = @password";

                    connection.Open();
                    using (var command = new SQLiteCommand(query, connection))
                    {
                        //Add the parameters below provides rudimentary screening for things like sql injection
                        command.Parameters.Add(new SQLiteParameter("@email", lModel.Email));
                        command.Parameters.Add(new SQLiteParameter("@password", lModel.Password));

                        var result = (long)command.ExecuteScalar();
                        //Checks if there is a result of 1 registered user. If so
                        //it returns an ok response; if not, a not found error 
                        //which can trigger a response on the login page
                        return result == 1 ? new OkResult() : new NotFoundResult();
                    }
                }
            }
            else return new NotFoundResult();
        }


        public IActionResult CreateUser(CreateModelDTO cModel)
        {

            //Currently adding a check for email pattern. 
            //TODO Determine password pattern to prevent injection
            if (REGEX.IsMatch(cModel.Email))
            {
                using (var connection = new SQLiteConnection(ConnectionString))
                {
                    string query = $"INSERT INTO {TABLE_NAME}(firstname, lastname, email, username, password) " +
                    $"SELECT @firstname, @lastname, LOWER(@email), @username, @password " +
                    $"WHERE NOT EXISTS (SELECT 1 FROM {TABLE_NAME} WHERE LOWER(email) = @email)";

                    connection.Open();
                    using (var command = new SQLiteCommand(query, connection))
                    {
                        //Add the parameters below provides rudimentary screening for things like sql injection
                        command.Parameters.Add(new SQLiteParameter("@firstname", cModel.FirstName));
                        command.Parameters.Add(new SQLiteParameter("@lastname", cModel.LastName));
                        command.Parameters.Add(new SQLiteParameter("@email", cModel.Email));
                        command.Parameters.Add(new SQLiteParameter("@username", cModel.UserName));
                        command.Parameters.Add(new SQLiteParameter("@password", cModel.Password));

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
    }
}
