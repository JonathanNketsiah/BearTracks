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

        [HttpGet("login")]
        public IEnumerable<LoginCreds> Login(string email, string password)
        {
            return _handler.LoginUser(email, password);
        }

    }
}