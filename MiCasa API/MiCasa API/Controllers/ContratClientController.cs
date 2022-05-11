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
        
           [HttpGet]
        [Route("GetClient")]
        [Authorize]
        public async Task<JsonResult> GetClient([FromQuery] int startIndex, [FromQuery] int stopIndex) =>
           new(await _bll!.GetClient(startIndex, stopIndex));


        [HttpGet]
        [Authorize(Roles = "Administrateur")]
        [Route("BloquerCompteClient")]
        public async Task<JsonResult> BloquerCompteClient([FromQuery] int ClientId) =>
            new(await _bll!.BloquerCompteClient(ClientId));


        [HttpPost, Route("CreerCompte")]
        [AllowAnonymous]
        public async Task<JsonResult> CreerCompte([FromBody] Client Client) => new(await _bll!.CreerCompte(Client));


        [HttpGet, Route("LogOut")]
        [Authorize(Roles = "Client")]
        public async Task<JsonResult> LogOut([FromQuery] int ClientId) => new(await _bll!.LogOut(ClientId));


        [HttpPost, Route("ModifierProfile")]
        [Authorize(Roles = "Administrateur")]
        [Authorize(Roles = "Client")]
        public async Task<JsonResult> ModifierProfile([FromBody] Client Client) => new(await _bll!.ModifierProfile(Client));


        [HttpGet, Route("DebloquerCompte")]
        [Authorize(Roles = "Administrateur")]
        public async Task<JsonResult> DebloquerCompte([FromQuery] int ClientId) => new(await _bll!.DebloquerCompte(ClientId));
}
