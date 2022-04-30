import { Client } from '@models/api/client.model';

export namespace ClientActions {
  export class LogIn {
    static readonly type = '[Client] LogIn';
    constructor(public payload: { username: string; password: string }) {}
  }

  export class LogOut {
    static readonly type = '[Client] LogOut';
    constructor(public clientId: number) {}
  }

  export class UpdateProfile {
    static readonly type = '[Client] UpdateProfile';
    constructor(public payload: Client) {}
  }

  export class DeleteAccount {
    static readonly type = '[Client] DeleteAccount';
    constructor(public clientId: number) {}
  }
}
