using BearTracks.SQLite;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace BearTracks.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HighScoreController : ControllerBase
    {
        private readonly ILogger<HighScoreController> _logger;
        private dB_Handler _handler;

        public HighScoreController(ILogger<HighScoreController> logger)
        {
            _logger = logger;
            _handler = new dB_Handler();
            _handler.Setup();
        }

        [HttpGet]
        public IEnumerable<HighScore> Get()
        {
            return _handler.GetScoreData();
        }

        [HttpGet("delete")]
        public ActionResult<bool> Delete()
        {
            return _handler.DeleteTheScores();
        }

        [HttpGet("add")]
        public void Add()
        {
            _handler.addScore();
        }
    }
}