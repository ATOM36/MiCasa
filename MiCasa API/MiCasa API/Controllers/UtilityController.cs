using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MiCasa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilityController : ControllerBase
    {
        private readonly IWebHostEnvironment? _environment;
        private readonly IAuthService auth;

        public UtilityController(IWebHostEnvironment environment, IAuthService auth)
        {
            _environment = environment;
            this.auth = auth;
        }

        [Route("GetImageFolder")]
        [HttpGet]
        public JsonResult GetImageFolder()
        {
            string path = Path.Combine(_environment!.ContentRootPath, "img");
            path.Replace('\\', '/');
            return new(new Message(path, true));

        }

    }
}
