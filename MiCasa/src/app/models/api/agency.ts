export interface Agence {
  AgenceId: number;
  NumeroTelephone: string;
  Mail: string;
  Nom: string;
  Latitude: number | undefined;
  Longitude: number | undefined;
  DateInscription: Date;
  IsBlocked: number;
  Adresse: string;
  Password: string;
}
