export interface Compte {
  CompteId: number | null;
  Nom: string | null;
  Prenom: string | null;
  Username: string | null;
  Password: string | null;
  NumeroTelephone: string | null;
  Mail: string | null;
  DateInscription: string | null;
  IsConnected: number | null;
  IsBlocked: number | null;
}
