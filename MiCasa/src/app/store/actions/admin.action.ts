import { Administrateur } from '@models/api/administrator';

export namespace AdminActions {
  export class LogIn {
    static readonly type = '[Admin] LogIn';
    constructor(public payload: Administrateur) {}
  }

  export class LogOut {
    static readonly type = '[Admin] LogOut';
    constructor(public adminId: number) {}
  }

  export class UpdateProfile {
    static readonly type = '[Admin] UpdateProfile';
    constructor(public payload: Administrateur) {}
  }

  export class DeleteAccount {
    static readonly type = '[Admin] DeleteAccount';
    constructor(public administrateurId: number) {}
  }

  export class CreateAccount {
    static readonly type = '[Admin] CreateAccount';
    constructor(public payload: Administrateur) {}
  }

  export class ClearState {
    static readonly type = '[Admin] ClearState';
    constructor() {}
  }
}
