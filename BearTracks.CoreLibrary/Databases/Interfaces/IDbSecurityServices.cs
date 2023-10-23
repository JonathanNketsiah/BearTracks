namespace BearTracks.CoreLibrary.Databases.Interfaces
{
    public interface IDbSecurityService
    {
        byte[] CreateSALT();
        string HashPassword(string password, byte[] salt);
    }
}