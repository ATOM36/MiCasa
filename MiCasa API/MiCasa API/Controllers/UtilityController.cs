using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MiCasa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilityController : ControllerBase
    {
        private readonly IWebHostEnvironment? _environment;

        public UtilityController(IWebHostEnvironment environment) => _environment = environment;

        [Route("GetImageFolder")]
        [HttpGet]
        public JsonResult GetImageFolder()
        {
            string path = Path.Combine(_environment!.ContentRootPath, "img");
            path.Replace('\\', '/');
            return new(path);
        }
    }
}
