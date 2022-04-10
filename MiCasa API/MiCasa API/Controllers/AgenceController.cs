using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MiCasa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgenceController : ControllerBase
    {
        private readonly IAgence? _bll;

        public AgenceController(IAgence agency) => _bll = agency;

        /******************************
         * 
         * 
         *  LE TYPE DE RETOUR DES FONCTIONS DU CONTROLLEUR EST LE MÊME QUE
         *  CELUI DES FONCTIONS DE L'INTERFACE IAgence
         * 
         * 
         *  NB: toujours mettre une route et un verbe HTTP pour une fonction
         *  De préférence la route et la fonction ont le même nom
         * ********************************************/


        [HttpGet]
        [Route("LogIn")]
        public async Task<JsonResult> LogIn([FromQuery] string username, [FromQuery] string password) =>
            new(await _bll!.LogIn(username.Replace("@agence", "").Trim(), password));


        [HttpGet, Route("Get")]
        public async Task<JsonResult> Get([FromHeader] int agenceId) => new(await _bll!.Get(agenceId));


        [HttpDelete]
        [Route("SupprimerCompte")]
        public async Task<JsonResult> SupprimerCompte([FromQuery] int agenceId, [FromQuery] string email, [FromQuery] string name) =>
            new(await _bll!.SupprimerCompte(agenceId, email, name));


        [HttpGet]
        [Route("GetAgence")]
        public async Task<JsonResult> GetAgence([FromQuery] int startIndex, [FromQuery] int stopIndex) =>
           new(await _bll!.GetAgence(startIndex, stopIndex));


        [HttpGet]
        [Route("BloquerCompteAgence")]
        public async Task<JsonResult> BloquerCompteAgence([FromQuery] int agenceId) =>
            new(await _bll!.BloquerCompteAgence(agenceId));


        [HttpPost, Route("CreerCompte")]
        public async Task<JsonResult> CreerCompte([FromBody] Agence agence) => new(await _bll!.CreerCompte(agence));


        [HttpGet, Route("LogOut")]
        public async Task<JsonResult> LogOut([FromQuery] int agenceId) => new(await _bll!.LogOut(agenceId));


        [HttpPost, Route("ModifierProfile")]
        public async Task<JsonResult> ModifierProfile([FromBody] Agence agence) => new(await _bll!.ModifierProfile(agence));


        [HttpGet, Route("DebloquerCompte")]
        public async Task<JsonResult> DebloquerCompte([FromQuery] int agenceId) => new(await _bll!.DebloquerCompte(agenceId));
    }
}
