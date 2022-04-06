export interface Agence {
  AgenceId: number | null;
  Username: string | null;
  Password: string | null;
  Signalement: number | null;
  NumeroTelephone: string | null;
  Mail: string | null;
  Nom: string | null;
  Latitude: number | null;
  Longitude: number | null;
  DateInscription: string | null;
  Adresse: string | null;
  IsBlocked: number | null;
  id?: string;
}
