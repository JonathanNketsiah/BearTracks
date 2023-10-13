namespace BearTracks.CoreLibrary.Databases
{
    public interface IDbSecurityService
    {
        byte[] CreateSALT();
        string HashPassword(string password, byte[] salt);
    }
}