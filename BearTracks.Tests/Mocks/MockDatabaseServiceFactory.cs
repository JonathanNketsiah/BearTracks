using BearTracks.CoreLibrary.Databases.Interfaces;

namespace BearTracks.Tests.Mocks
{
    public class MockDatabaseServiceFactory : IDatabaseServiceFactory
    {
        public IDatabaseService CreateDatabaseService()
        {
            return new MockDatabaseService();
        }
    }
}
