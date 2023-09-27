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
            sql = $"Create Table IF NOT EXISTS {TABLE_NAME} (name varchar (20), score int)";
            command = new SQLiteCommand(sql, m_dbConnection);
            command.ExecuteNonQuery();
        }

        public int GetNewHighScore(SQLiteConnection connection)
        {
            int score = 0;
            string query = "select max(score) from highscores; ";

            using (SQLiteCommand command = new SQLiteCommand(query, connection))
            {
                var result = command.ExecuteScalar();
                if(result == DBNull.Value)
                {
                    result = 0;
                }
                else
                {
                    score = Convert.ToInt32(result);
                }
                Random rand = new Random();
                int randomNumber = rand.Next(1, 501);
                score = score + randomNumber;
            }
            return score;
        }

        public int LoginUser(string email, string password)
        {   
            using (var connection = new SQLiteConnection(CONNECTION_STRING))
            {
                connection.Open();
                using (var command = new SQLiteCommand($"Insert into {TABLE_NAME}(email, password) values ({email}, {password})", connection))
                {
                    var result = command.ExecuteNonQuery();
                    return result;
                }
            }
        }

        public bool DeleteTheScores()
        {
            using (var connection = new SQLiteConnection(CONNECTION_STRING))
            {
                connection.Open();
                using (var command = new SQLiteCommand($"DELETE FROM {TABLE_NAME}", connection))
                {
                    var result = command.ExecuteNonQuery();
                    if (result >= 1)
                    {
                        return true;
                    }
                    else return false;
                }
            }
        }

        public void addScore()
        {
            using (var connection = new SQLiteConnection(CONNECTION_STRING))
            {
                String sql = $"Insert into {TABLE_NAME} (name, score) values ('Player1', {GetNewHighScore(m_dbConnection)})";
                connection.Open();

                using (var command = new SQLiteCommand(sql, connection))
                {
                    command.ExecuteNonQuery();
                }
                m_dbConnection.Close();
            }
        }

    }
}
