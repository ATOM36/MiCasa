import { Compte } from './compte';

export interface Agence {
  AgenceId: number | null;
  Compte: Compte | null;
  Latitude?: number | null;
  Longitude?: number | null;
  Adresse: string | null;
  Signalement: number | null;
}
