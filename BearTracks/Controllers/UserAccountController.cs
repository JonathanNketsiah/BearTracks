using BearTracks.CoreLibrary.Models.UserAccount;
using BearTracks.CoreLibrary.Databases;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("account")]
    public class UserAccountController : ControllerBase
    {
        private readonly ILogger<UserAccountController> _logger;
        private IDatabaseService _handler;

        public UserAccountController(ILogger<UserAccountController> logger, 
                                     IDatabaseService handler)
        {
            _logger = logger;
            _handler = handler;
        }

        [HttpPost("login")]
        public Task<IActionResult> Login([FromBody] LoginModelDTO model)
        {
            return _handler.LoginUser(model);
            
        }

        [HttpPost("create")]
        public Task<IActionResult> Create([FromBody] CreateModelDTO model)
        {
            return _handler.CreateUser(model);
        }
    }
}