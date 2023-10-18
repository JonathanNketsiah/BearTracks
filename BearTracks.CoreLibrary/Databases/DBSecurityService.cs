using System.Security.Cryptography;
using BearTracks.CoreLibrary.Databases.Interfaces;

namespace BearTracks.CoreLibrary.Databases
{
    public class DbSecurityService : IDbSecurityService

    {

        public byte[] CreateSALT()
        {
            byte[] salt = new byte[16];
            
            //Fill array with random values 
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }
        
        
        public string HashPassword(string password, byte[] salt)
        {
            // Create the password hash
            var derivedByted = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
            byte[] hash = derivedByted.GetBytes(32); // 32 bytes for a 256-bit key

            // Combine the salt and hash for storage
            byte[] hashBytes = new byte[48]; // 16 bytes for salt + 32 bytes for hash
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 32);

            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            
            // To verify a password, you would do the following:
            // 1. Retrieve the salt and hash from storage
            // 2. Compute the hash of the input password with the retrieved salt
            // 3. Compare the computed hash with the stored hash

            return savedPasswordHash;
        }
    }    
}
