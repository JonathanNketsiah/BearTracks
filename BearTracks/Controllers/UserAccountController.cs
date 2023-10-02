using BearTracks.SQLite;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private dB_Handler _handler;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
            _handler = new dB_Handler();
            _handler.Setup();
        }

        [HttpPost("login")]
        public bool Login([FromBody] LoginModel model)
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