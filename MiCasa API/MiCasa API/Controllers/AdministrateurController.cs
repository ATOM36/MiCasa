using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MiCasa.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdministrateurController : ControllerBase
{
    private readonly IAdministrateur? _bll = null;

    public AdministrateurController(IAdministrateur bll)
    {
        _bll = bll;
    }


    [HttpPost, Route("CreerCompte")]
    [Authorize]0
    public async Task<JsonResult> CreerCompte([FromBody] Administrateur administrateur) => new(await _bll!.CreerCompte(administrateur));


    [HttpGet, Route("LogOut")]
    public async Task<JsonResult> LogOut([FromQuery] int adminId) => new(await _bll!.LogOut(adminId));


    [HttpGet, Route("LogIn")]
    public async Task<JsonResult> LogIn([FromQuery] string username, [FromQuery] string password) => new(await _bll!.LogIn(
        username.Replace("@admin", "").Trim(), password));


    [HttpPost, Route("ModifierProfile")]
    [Authorize]
    public async Task<JsonResult> ModifierProfile([FromBody] Administrateur admin) => new(await _bll!.ModifierProfile(admin));

}
