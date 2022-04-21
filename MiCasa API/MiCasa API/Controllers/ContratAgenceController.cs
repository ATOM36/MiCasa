using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MiCasa.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContratAgenceController : ControllerBase
{
    private IContratAgence? _bll;

    public ContratAgenceController(IContratAgence bll)
    {
        _bll = bll;
    }

    [HttpGet, Route("activateContract")]
    public async Task<JsonResult> Activate([FromRoute] int id, [FromRoute] string email, [FromRoute] string name)
        => new(await _bll!.Activate(id, email, name));


    [HttpPost, Route("createContract")]
    public async Task<JsonResult> CreateContract(ContratAgence contrat) => new(await _bll!.CreateContract(contrat));


    [HttpDelete, Route("delete/{id}")]
    public async Task<JsonResult> Delete([FromRoute] int id) => new(await _bll!.Delete(id));


    [HttpPost, Route("deleteRange")]
    public async Task<JsonResult> DeleteRange(List<int> idList) => new(await _bll!.DeleteRange(idList));


    [HttpGet, Route("select/{id}")]
    public async Task<JsonResult> Select([FromRoute] int id) => new(await _bll!.Select(id));


    [HttpGet, Route("selectRange/{start}/{end}")]
    public async Task<JsonResult> SelectRange([FromRoute] int start, [FromRoute] int end) => new(await _bll!.SelectRange(start, end));


    [HttpPost, Route("update/{id}")]
    public async Task<JsonResult> UpdateContrat([FromRoute] int id, ContratAgence contrat) => new(await _bll!.UpdateContrat(id, contrat));

}
