using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.CoreLibrary.Databases.Interfaces
{
    public interface IDatabaseService
    {
        void Setup();
        IActionResult LoginUser(LoginModelDTO lModel);
        IActionResult CreateUser(CreateModelDTO cModel);
        IActionResult DeleteUser(DeleteUserDTO delModel);
        IActionResult RetrieveUser(string email);
        IActionResult UpdateUser(UpdateModelDTO uModel);
    }
}
