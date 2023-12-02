using BearTracks.CoreLibrary.Databases.Interfaces;
using BearTracks.CoreLibrary.Models.Events;
using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("event")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<UserAccountController>? _logger;
        private IDatabaseService? _handler;

        public EventController(ILogger<UserAccountController>? logger,
                                     IDatabaseService? handler)
        {
            _logger = logger;
            _handler = handler;
        }

        [HttpPost("create")]
        public IActionResult? Create([FromBody] CreateEventDTO model)
        {
            if (_handler != null)
                return _handler.CreateEvent(model);
            else
                return null;
        }

        [HttpPost("get")]
        public IActionResult? Get()
        {
            if (_handler != null)
                return _handler.GetEvents();
            else
                return null;
        }
    }
}
