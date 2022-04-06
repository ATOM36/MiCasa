namespace MiCasa.Models.Bll
{
    public class BLL_Agence : IAgence
    {
        public JsonResult DebloquerCompte(int agenceId) => (agenceId <= 0) ?
      new(new Message
      { Content = "Informations incorrectes", State = false }) :
      DAL_Agence.DebloquerCompte(agenceId);

        public JsonResult logout(string username) => username == null ?
             new(new Message
             {
                 Content = "Erreur! Déconnexion impossible",
                 State = false
             }) :
                  DAL_Agence.logout(username);


        public JsonResult modifierprofil(int agenceId, char num, char mail, char nom, float latude, float lng, int isBlocked, char pass, char add, int sig, char username,int con) => (agenceId <= 0 || num == null || mail == null || nom == null || latude <= 0 || lng <= 0 || isBlocked <= 0 || pass == null || add == null || sig <= 0 || username <= 0|| con <= 0) ?
            new(new Message
            {
                Content = "Informations saisies incorrectes",
                State = false
            }) :
              DAL_Agence.modifierprofil(agenceId, num, mail, nom, latude, lng, isBlocked, pass, add, sig, username,con);

        public JsonResult creerCompte(int agenceId, char num, char mail, char nom, float latude, float lng, int isBlocked, char pass, char add, int sig, char username,int con) => (agenceId <= 0 || num == null || mail == null || nom == null || latude <= 0 || lng <= 0 || isBlocked <= 0 || pass == null || add == null || sig <= 0 || username <= 0 || con <= 0) ?
           new(new Message
           {
               Content = "Informations saisies incorrectes",
               State = false
           }) :
               DAL_Agence.modifierprofil(agenceId, num, mail, nom, latude, lng, isBlocked, pass, add, sig, username,con);
    }
}
