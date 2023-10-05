using BearTracks.Models;
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
        public IActionResult Login([FromBody] LoginModelDTO model)
        {
            return _handler.LoginUser(model.Email.ToLower(), model.Password);
            
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] LoginModelDTO model)
        {
            return _handler.CreateUser(model.Email.ToLower(), model.Password);
        }
    }
}