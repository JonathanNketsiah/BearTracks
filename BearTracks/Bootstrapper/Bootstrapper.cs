﻿using BearTracks.CoreLibrary.Databases;
using BearTracks.CoreLibrary.Databases.Interfaces;

namespace BearTracks.Bootstrapper
{
    public static class Bootstrapper
    {
        public static void Initialize(WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<DatabaseServiceFactory>();
            builder.Services.AddScoped<IDatabaseService>(provider =>
                provider.GetRequiredService<DatabaseServiceFactory>().CreateDatabaseService()
                );
            builder.Services.AddTransient<IDbSecurityService, DbSecurityService>();
        }
    }
}
