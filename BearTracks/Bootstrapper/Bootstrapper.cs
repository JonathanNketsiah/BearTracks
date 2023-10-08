using BearTracks.Databases;

namespace BearTracks.Bootstrapper
{
    public static class Bootstrapper
    {
        public static void Initialize(WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<IdB_Handler, dB_Handler_Sqlite>();
        }
    }
}
