using MongoDB.Bson;

public class User
{
    public ObjectId Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? UserName { get; set; }
    public string? PasswordHash { get; set; }
    public string? SALT { get; set; }
    public string? AccountPhoto { get; set; }

}
