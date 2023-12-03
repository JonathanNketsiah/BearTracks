using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BearTracks.CoreLibrary.Models.Events
{
    public class GetEventsDTO
    {
        public Position Pos { get; set; }
    }

    public class Position
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}
