using MongoDB.Bson;

public class AccountPhotoBSON
{
    public ObjectId Id { get; set; }
    public string? Email { get; set; }
    public string? AccountPhoto { get; set; }

}