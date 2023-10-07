using BearTracks.Databases;
using BearTracks.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("account")]
    public class UserAccountController : ControllerBase
    {
        private readonly ILogger<UserAccountController> _logger;
        private IdB_Handler _handler;

        public UserAccountController(ILogger<UserAccountController> logger, IdB_Handler handler)
        {
            _logger = logger;
            _handler = handler;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModelDTO model)
        {
            return _handler.LoginUser(model.Email.ToLower(), model.Password);
            
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateModelDTO model)
        {
            return _handler.CreateUser(model);
        }
    }
}