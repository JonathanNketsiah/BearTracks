﻿namespace BearTracks.CoreLibrary.Models.UserAccount
{
    public class CreateModelDTO
    {

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string FirstName { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class CreateModelHashingWrapperDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string SALT { get; set; }

        public CreateModelHashingWrapperDTO Wrap(CreateModelDTO viewModel, string passwordHash, string salt)
        {
            this.Email = viewModel.Email;
            this.UserName = viewModel.UserName;
            this.FirstName = viewModel.FirstName;
            this.LastName = viewModel.LastName;
            this.PasswordHash = passwordHash;
            this.SALT = salt;

            return this;
        }
    }


}
