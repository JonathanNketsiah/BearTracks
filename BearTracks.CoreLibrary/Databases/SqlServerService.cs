﻿using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Databases.MongoObjects;
using BearTracks.CoreLibrary.Models.UserAccount;
using BearTracks.CoreLibrary.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Text;
using System.Text.RegularExpressions;

namespace BearTracks.CoreLibrary.Databases
{
    public class SqlServerDatabaseService : IDatabaseService
    {
        private readonly string[] TABLE_NAME = { "users", "accountPhotos" };
        private Regex _regex = new Regex(Constants.EMAIL_REGEX);
        private readonly string _connectionString;
        private IDbSecurityService _security_svc;

        public SqlServerDatabaseService(string? connectionString, IDbSecurityService sec_svc)
        {
            _connectionString = connectionString;
            _security_svc = sec_svc;

            Setup();
        }

        public void Setup()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var sql = $"IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{TABLE_NAME[0]}') " +
                    $"BEGIN CREATE TABLE { TABLE_NAME[0]} (firstname varchar(50), lastname varchar(50), email varchar(50), username varchar(50), passwordHash varchar(max), salt varchar(max)) END;";

                var command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();

                sql = $"IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{TABLE_NAME[1]}') BEGIN    CREATE TABLE accountPhotos (email varchar(50), accountPhoto varchar(max)); END;";
                command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
            }
        }

        public IActionResult LoginUser(LoginModelDTO lModel)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM {TABLE_NAME[0]} WHERE LOWER(email) = @email";
                StringBuilder storedPasswordHash = new StringBuilder();
                byte[] salt = new byte[0];

                connection.Open();
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@email", lModel.Email));
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            storedPasswordHash.Append(reader.GetString(reader.GetOrdinal("passwordHash")));
                            salt = Convert.FromBase64String(reader.GetString(reader.GetOrdinal("salt")));
                        }
                    }
                }

                var passwordHash = _security_svc.HashPassword(lModel.Password, salt);

                return storedPasswordHash.ToString() == passwordHash ? new OkResult() : new NotFoundResult();
            }
        }

        public IActionResult CreateUser(CreateModelDTO cModel)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var salt = _security_svc.CreateSALT();
                var passwordHash = _security_svc.HashPassword(cModel.Password, salt);

                string query = $"INSERT INTO {TABLE_NAME[1]}(email, accountPhoto) SELECT @email, null WHERE NOT EXISTS (SELECT 1 FROM {TABLE_NAME[1]} WHERE LOWER(email) = @email)";

                connection.Open();
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@email", cModel.Email));
                    command.ExecuteNonQuery();
                }

                query = $"INSERT INTO {TABLE_NAME[0]}(firstname, lastname, email, username, passwordHash, salt) " +
                        $"SELECT @firstname, @lastname, LOWER(@email), @username, @passwordHash, @salt " +
                        $"WHERE NOT EXISTS (SELECT 1 FROM {TABLE_NAME[0]} WHERE LOWER(email) = @email)";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@firstname", cModel.FirstName));
                    command.Parameters.Add(new SqlParameter("@lastname", cModel.LastName));
                    command.Parameters.Add(new SqlParameter("@email", cModel.Email));
                    command.Parameters.Add(new SqlParameter("@username", cModel.UserName));
                    command.Parameters.Add(new SqlParameter("@passwordHash", passwordHash));
                    command.Parameters.Add(new SqlParameter("@salt", Convert.ToBase64String(salt)));

                    var result = (long)command.ExecuteNonQuery();

                    return result == 1 ? new OkResult() : new NotFoundResult();
                }
            }
        }

        public IActionResult DeleteUser(DeleteUserDTO delModel)
        {
            if (delModel.Email != null)
            {
                if (_regex.IsMatch(delModel.Email))
                {
                    using (var connection = new SqlConnection(_connectionString))
                    {
                        string query = $"DELETE FROM {TABLE_NAME[1]} WHERE LOWER(email) = @email";
                        connection.Open();
                        using (var command = new SqlCommand(query, connection))
                        {
                            command.Parameters.Add(new SqlParameter("@email", delModel.Email));
                            int deletedRows = command.ExecuteNonQuery();
                        }

                        query = $"DELETE FROM {TABLE_NAME[0]} WHERE LOWER(email) = @email";
                        using (var command = new SqlCommand(query, connection))
                        {
                            command.Parameters.Add(new SqlParameter("@email", delModel.Email));
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
            if (email != String.Empty && _regex.IsMatch(email))
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    UserReturnObjectDTO returnDto = new UserReturnObjectDTO();

                    string query = $"SELECT email, firstName, lastName, userName from {TABLE_NAME[0]} WHERE LOWER(email) = @email";
                    connection.Open();
                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.Add(new SqlParameter("@email", email));
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var eml = reader.GetString(reader.GetOrdinal("email"));
                                var firstName = reader.GetString(reader.GetOrdinal("firstName"));
                                var lastName = reader.GetString(reader.GetOrdinal("lastName"));
                                var userName = reader.GetString(reader.GetOrdinal("userName"));

                                returnDto.User = new UserBSON
                                {
                                    Email = eml,
                                    FirstName = firstName,
                                    LastName = lastName,
                                    UserName = userName,
                                };
                            }
                        }
                    }

                    query = $"SELECT * from {TABLE_NAME[1]} WHERE LOWER(email) = @email";
                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.Add(new SqlParameter("@email", email));
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var eml = reader.GetString(reader.GetOrdinal("email"));
                                string accountPhoto = null;
                                if (!reader.IsDBNull(reader.GetOrdinal("accountPhoto")))
                                {
                                    returnDto.accountPhoto = reader.GetString(reader.GetOrdinal("accountPhoto"));
                                }
                                else
                                {
                                    returnDto.accountPhoto = null;
                                }
                            }
                        }
                    }
                    return new OkObjectResult(returnDto);
                }
            }
            else
            {
                return new NotFoundResult();
            }
        }

        public IActionResult UpdateUser(UpdateModelDTO uModel)
        {
            if (uModel.Email != null)
            {
                if (_regex.IsMatch(uModel.Email))
                {
                    using (var connection = new SqlConnection(_connectionString))
                    {
                        string query = $"UPDATE {TABLE_NAME[1]} SET accountPhoto = @accountPhoto WHERE LOWER(email) = @email;";

                        connection.Open();
                        using (var command = new SqlCommand(query, connection))
                        {
                            command.Parameters.Add(new SqlParameter("@email", uModel.Email.ToLower()));
                            command.Parameters.Add(new SqlParameter("@accountPhoto", uModel.ProfilePic));
                            int updatedRows = command.ExecuteNonQuery();
                            Console.WriteLine($"Rows Updated: {updatedRows}");
                        }

                        query = $"UPDATE {TABLE_NAME[0]} SET firstName = @firstName, lastName = @lastName, userName = @userName WHERE LOWER(email) = @email;";

                        using (var command = new SqlCommand(query, connection))
                        {
                            command.Parameters.Add(new SqlParameter("@email", uModel.Email.ToLower()));
                            command.Parameters.Add(new SqlParameter("@firstName", uModel.FirstName));
                            command.Parameters.Add(new SqlParameter("@lastName", uModel.LastName));
                            command.Parameters.Add(new SqlParameter("@userName", uModel.UserName));

                            int updatedRows = command.ExecuteNonQuery();
                            Console.WriteLine($"Rows Updated: {updatedRows} Size: {uModel.ProfilePic.Length}");

                            if (updatedRows == 1)
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

    }
}
