using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SQLite;

namespace BearTracks.SQLite
{
    public class dB_Handler
    {
        private const string DB_NAME = "MyDatabase.sqlite";
        private const string CONNECTION_STRING = "Data Source=MyDatabase.sqlite;Version=3;";
        private const string TABLE_NAME = "users";

        private SQLiteConnection m_dbConnection;


        public dB_Handler()
        {
            if (!File.Exists(DB_NAME))
            {
                SQLiteConnection.CreateFile(DB_NAME);
            }
            m_dbConnection = new SQLiteConnection(CONNECTION_STRING);
        }

        public void Setup()
        {
            // This creates a zero-byte file

            m_dbConnection.Open();

            // varchar will likely be handled internally as TEXT
            // the (20) will be ignored
            // see https://www.sqlite.org/datatype3.html

            String sql = String.Empty;
            SQLiteCommand? command;
            sql = $"Create Table IF NOT EXISTS {TABLE_NAME} (email varchar (50), password varchar(50))";
            command = new SQLiteCommand(sql, m_dbConnection);
            command.ExecuteNonQuery();
        }

        public IActionResult LoginUser(string email, string password)
        {
            using (var connection = new SQLiteConnection(CONNECTION_STRING))
            {
                string query = $"SELECT COUNT(*) FROM {TABLE_NAME} where email = @email and password = @password";

                connection.Open();
                using (var command = new SQLiteCommand(query, connection))
                {
                    //Add the parameters below provides rudimentary screening for things like sql injection
                    command.Parameters.Add(new SQLiteParameter("@email", email));
                    command.Parameters.Add(new SQLiteParameter("@password", password));
                    
                    var result = (Int64)command.ExecuteScalar();
                    //Checks if there is a result of 1 registered user. If so
                    //it returns an ok response; if not, a not found error 
                    //which can trigger a response on the login page
                    return result == 1 ? new OkResult() : new NotFoundResult();
                }
            }
        }
    }
}
