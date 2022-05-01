import { Compte } from './compte';

export interface Client {
  ClientId: number | null;
  Compte: Compte | null;
}
