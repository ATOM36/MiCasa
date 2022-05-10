using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace MiCasa.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ContratClientController : ControllerBase
{
    private readonly IContratClient? _bll;

    public ContratClientController(IContratClient bll)
    {
        _bll = bll;
    }

    [Route("CreerContrat")]
    [Authorize]
    [HttpPost]
    public async Task<JsonResult> CreerContrat([FromQuery] int clientId, [FromQuery] int agenceId) =>
        new(await _bll!.CreerContrat(clientId, agenceId));


    [Route("AnnulerContrat")]
    [Authorize]
    [HttpPatch]
    public async Task<JsonResult> AnnulerContrat([FromQuery] int contratId) => new(await _bll!.AnnulerContrat(contratId));

    [Route("Get")]
    [Authorize]
    [HttpGet]
    public async Task<JsonResult> Get([FromQuery] int contratId) => new(await _bll!.Get(contratId));


    [Route("GetRange")]
    [Authorize]
    [HttpGet]
    public async Task<JsonResult> Get([FromQuery] int startIndex, [FromQuery] int stopIndex) =>
        new(await _bll!.Get(startIndex, stopIndex));
}
