using BearTracks.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Databases
{
    public interface IdB_Handler
    {
        void Setup();
        IActionResult LoginUser(string email, string password);
        IActionResult CreateUser(CreateModelDTO cModel);
    }
}
