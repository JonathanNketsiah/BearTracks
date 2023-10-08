using BearTracks.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Databases
{
    public interface IdB_Handler
    {
        void Setup();
        IActionResult LoginUser(LoginModelDTO lModel);
        IActionResult CreateUser(CreateModelDTO cModel);
    }
}
