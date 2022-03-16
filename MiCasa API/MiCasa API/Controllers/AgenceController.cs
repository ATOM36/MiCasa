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
        [Route("test")]
        public object test()
        {
            var _connection = DbConnection.GetConnection();
            string query = "SELECT * FROM \"Agence\"";
            _connection.Open();

            NpgsqlCommand cmd = new(query, _connection);
            var reader = cmd.ExecuteReader();
            DataTable ta = new();
            ta.Load(reader);
            reader.Close();

            return new JsonResult(ta);
        }

        [HttpGet]
        [Route("LogIn")]
        public JsonResult LogIn([FromQuery] string username,[FromQuery] string password) => _bll.LogIn(username, password);

        [HttpDelete]
        [Route("SupprimerCompte")]
        public JsonResult SupprimerCompte([FromQuery] int agenceId) => _bll.SupprimerCompte(agenceId);


        [HttpGet]
        [Route("GetAgence")]
        public JsonResult GetAgence([FromQuery] int startIndex, [FromQuery] int stopIndex) =>
            _bll.GetAgence(startIndex, stopIndex);

        [HttpPut]
        [Route("BloquerCompteAgence")]
        public JsonResult BloquerCompteAgence([FromHeader] int agenceId) => _bll.BloquerCompteAgence(agenceId);
    }
}
