using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.CoreLibrary.Databases
{
    public interface IDatabaseService
    {
        void Setup();
        Task<IActionResult> LoginUser(LoginModelDTO lModel);
        Task<IActionResult> CreateUser(CreateModelDTO cModel);
    }   
}
