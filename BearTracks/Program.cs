using BearTracks.Bootstrapper;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllersWithViews();

        // Create a custom TextPlainInputFormatter to handle text/plain content type
        builder.Services.AddMvc(options =>
        {
            options.InputFormatters.Insert(0, new TextPlainInputFormatter());
        });

        // This bootstrapper allows easy one-stop registration of all injectable classes
        Bootstrapper.Initialize(builder);

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsProduction())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseStatusCodePagesWithRedirects("/Home/Error/{0}");

            app.UseHsts();
            // Configure other security-related middleware
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html");
        app.Run();
    }
}
