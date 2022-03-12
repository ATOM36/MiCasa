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
        [Route("GetAgencies/startIndex/stopIndex")]
        public async Task<JsonResult> GetAgenices([FromRoute] int startIndex, [FromRoute] int stopIndex) => await _bll!.GetAgencies(startIndex, stopIndex);

        [HttpGet]
        [Route("test")]
        public string test()
        {
            return "Bonjour";
        }
    }
}
