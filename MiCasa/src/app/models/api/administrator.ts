import { Compte } from './compte';

export interface Administrateur {
  AdministratorId: number | null;
  IsActive: number | null;
  Compte: Compte | null;
}
