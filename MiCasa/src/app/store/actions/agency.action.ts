import { Agence } from '@models/api/agency';

export namespace AgencyActions {
  export class LogIn {
    static readonly type = '[Agency] LogIn';
    constructor(public payload: Agence) {}
  }

  export class LogOut {
    static readonly type = '[Agency] LogOut';
    constructor(public agenceId: number) {}
  }

  export class UpdateProfile {
    static readonly type = '[Agency] UpdateProfile';
    constructor(public payload: Agence) {}
  }

  export class DeleteAccount {
    static readonly type = '[Agency] DeleteAccount';
    constructor(public agenceId: number) {}
  }
}
