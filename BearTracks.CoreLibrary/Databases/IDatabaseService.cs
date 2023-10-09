using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.CoreLibrary.Databases
{
    public interface IDatabaseService
    {
        void Setup();
        IActionResult LoginUser(LoginModelDTO lModel);
        Task<IActionResult> LoginUserAsync(LoginModelDTO lModel);
        IActionResult CreateUser(CreateModelDTO cModel);
        Task<IActionResult> CreateUserAsync(CreateModelDTO cModel);
    }   
}
