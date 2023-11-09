using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;
using BearTracks.CoreLibrary.Databases.Interfaces;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("account")]
    public class UserAccountController : ControllerBase
    {
        private readonly ILogger<UserAccountController>? _logger;
        private IDatabaseService? _handler;

        public UserAccountController(ILogger<UserAccountController>? logger,
                                     IDatabaseService? handler)
        {
            _logger = logger;
            _handler = handler;
        }

        [HttpPost("login")]
        public IActionResult? Login([FromBody] LoginModelDTO model)
        {
            if (_handler != null)
                return _handler.LoginUser(model);
            else
                return null;
        }

        [HttpPost("create")]
        public IActionResult? Create([FromBody] CreateModelDTO model)
        {
            if (_handler != null)
                return _handler.CreateUser(model);
            else
                return null;
        }

        [HttpPost("update")]
        public IActionResult Update([FromBody] UpdateModelDTO model)
        {
            if (_handler != null)
            {
                _handler.UpdateUser(model);
                return Ok("User updated successfully");
            }
            else
            {
                return BadRequest("Handler not available");
            }
        }

        [HttpPost("retrieve")]
        [Consumes("text/plain")]
        public IActionResult? Retrieve([FromBody] string email)
        {
            if (_handler != null)
                return _handler.RetrieveUser(email);
            else
                return null;
        }
    }
}