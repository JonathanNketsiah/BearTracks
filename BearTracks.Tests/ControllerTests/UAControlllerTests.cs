using BearTracks.Controllers;
using BearTracks.CoreLibrary.Models.UserAccount;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BearTracks.UnitTest.ControllerTests
{
    [TestClass]
    public class UAControllerTests : TestBase
    {
        private UserAccountController _controller;
        private ILogger<UserAccountController>? _logger;

        public UAControllerTests()
        {
            _controller = new UserAccountController(_logger, _databaseService);
            SetLogger();
        }

        [ClassInitialize]
        public static void ClassInitialize(TestContext context)
        {
            BuildConfiguration();
            ConfigureCustomServices();
            Setup();
        }

        [TestMethod]
        public void Login_ValidModel_ReturnsOkResult()
        {
            // Arrange

            var model = new LoginModelDTO
            {
                Email = "test@test.com",
                Password = "test"

            };

            // Act
            var result = _controller.Login(model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public void Login_WrongPassword_ReturnsNtFoundResult()
        {
            // Arrange

            var model = new LoginModelDTO
            {
                Email = "test@test.com",
                Password = "BadPassword"

            };

            // Act
            var result = _controller.Login(model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Login_InvalidEmail_ReturnsNtFoundResult()
        {
            // Arrange

            var model = new LoginModelDTO
            {
                Email = "NotAProperEmail",
                Password = "BadPassword"

            };

            // Act
            var result = _controller.Login(model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Create_ValidModel_ReturnsOkResult()
        {
            // Arrange
            var model = new CreateModelDTO
            {
                FirstName="New",
                LastName="User",
                Email="newuser@test.com",
                Password="New",
                UserName="UsaNaHaus!"
            };
            // Act
            var result = _controller.Create(model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public void Create_InvalidEmail_ReturnsNotFoundResult()
        {
            // Arrange
            var model = new CreateModelDTO
            {
                FirstName = "New",
                LastName = "User",
                Email = "AbsolutelyNotAnEmail",
                Password = "New",
                UserName = "UsaNaHaus!"
            };
            // Act
            var result = _controller.Create(model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Create_UseExistingEmail_ReturnsNotFoundResult()
        {
            // Arrange
            var model = new CreateModelDTO
            {
                FirstName = "New",
                LastName = "User",
                Email = "test@test.com",
                Password = "New",
                UserName = "UsaNaHaus!"
            };
            // Act
            var result = _controller.Create(model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }


        //TODO I don;t like this implementation, but it is granular and works. Research better way.
        //Learn how to do this genericaly.
        protected override void SetLogger()
        {
            _serviceCollection.AddSingleton<ILoggerFactory, LoggerFactory>();

            _serviceCollection.AddSingleton<ILogger<UserAccountController>>(x =>
            {
                var loggerFactory = x.GetRequiredService<ILoggerFactory>();
                return loggerFactory.CreateLogger<UserAccountController>();
            });

            var serviceProvider = _serviceCollection.BuildServiceProvider();
            _logger = serviceProvider.GetRequiredService<ILogger<UserAccountController>>();
        }

        [ClassCleanup]
        public static void ClassCleanup()
        {
            RestoreDatabase();
        }

        protected static void RestoreDatabase()
        {
            var user1 = new DeleteUserDTO
            {
                Email = "test@test.com",
                Password = "test",
            };
            var user2 = new DeleteUserDTO
            {
                Email = "newuser@test.com",
                Password = "New",
            };

            if (_databaseService != null)
            {
                _databaseService.DeleteUser(user1);
                _databaseService.DeleteUser(user2);
            }
        }
    }
}
