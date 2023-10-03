using BearTracks.SQLite;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("account")]
    public class UserAccountController : ControllerBase
    {
        private readonly ILogger<UserAccountController> _logger;
        private dB_Handler _handler;

        public UserAccountController(ILogger<UserAccountController> logger)
        {
            _logger = logger;
            _handler = new dB_Handler();
            _handler.Setup();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var x =_handler.LoginUser(model.Email, model.Password);
            //For now, this will return a success (true) for any input given, but its a start
            return x;
        }

        public class LoginModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}