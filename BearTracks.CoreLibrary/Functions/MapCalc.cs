﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BearTracks.CoreLibrary.Functions
{


    //Completely ripped from ChatGPT//


        public static class MapCalc
        {
            public static double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
            {
                const double R = 6371; // Earth's radius in kilometers

                double dLat = DegreesToRadians(lat2 - lat1);
                double dLon = DegreesToRadians(lon2 - lon1);

                double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                           Math.Cos(DegreesToRadians(lat1)) * Math.Cos(DegreesToRadians(lat2)) *
                           Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

                double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

                double distance = R * c; // Distance in kilometers

                return distance;
            }

            private static double DegreesToRadians(double degrees)
            {
                return degrees * Math.PI / 180;
            }

        }
}
