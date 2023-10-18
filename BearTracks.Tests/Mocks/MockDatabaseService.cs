using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Tests.Mocks
{
    public class MockDatabaseService : IDatabaseService
    {
        public async Task<IActionResult> CreateUser(CreateModelDTO cModel)
        {
            return await Task.Run(() => new OkResult());
        }

        public async Task<IActionResult> LoginUser(LoginModelDTO lModel)
        {
            return await Task.Run(() => new OkResult());
        }

        public void Setup()
        {
            throw new NotImplementedException();
        }
    }
}
