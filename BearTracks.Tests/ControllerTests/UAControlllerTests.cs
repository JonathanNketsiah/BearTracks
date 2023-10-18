using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace BearTracks.Tests.ControllerTests
{
    [Collection("UAController")]
    public class UAControllerTests : TestBase
    {
        public UAControllerTests(WebApplicationFactory<Program> factory) : base(factory)
        {
        }

        [Fact]
        public async Task TestMethod1()
        {
            CreateModelDTO dto = new CreateModelDTO
            {
                Email = "test@test.com",
                FirstName = "Firstname",
                LastName = "LastName",
                Password = "test_password",
                UserName = "G_Daggy_Dagg"
            };

            var response = await TestYourApiMethod(dto);

            if (response != null)
                Assert.Equal(StatusCodes.Status200OK, (int)response.StatusCode);
        }

        public async Task<HttpResponseMessage?> TestYourApiMethod(CreateModelDTO dto)
        {
            // Arrange
            var baseUrl = "https://localhost:44428/signUp"; // Replace with the actual API endpoint
            var queryString = $"/?firstName={dto.FirstName}&lastName={dto.LastName}" +
                $"&email={dto.Email}&userName={dto.UserName}&password={dto.Password}"; // Build the query string
            var fullUrl = baseUrl + queryString; // Combine the base URL and query string

            // Act
            var response = await _client.GetAsync(fullUrl);

            // Assert
            return response.EnsureSuccessStatusCode();

            // You can further assert the response content or other aspects of the response here.
        }
    }
}
