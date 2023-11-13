using MongoDB.Bson;

namespace BearTracks.CoreLibrary.Databases.MongoObjects
{
    public class UserReturnObjectDTO
    {
        public UserBSON? User { get; set; }
        public string? accountPhoto { get; set; }
    }
}
