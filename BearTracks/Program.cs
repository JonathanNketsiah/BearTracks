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
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios.
            app.UseHsts();
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
