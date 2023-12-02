using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BearTracks.CoreLibrary.Models.Events
{
    public class CreateEventDTO
    {
        public string? name { get; set; }
        public string? location { get; set; }
        public decimal? latitude { get; set; }
        public decimal? longitude { get; set; }
        public string? description { get; set; }
    }
}
