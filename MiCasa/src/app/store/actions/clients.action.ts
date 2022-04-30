import { Client } from '@models/api/client.model';

export namespace ClientsActions {
  export class GetClients {
    static readonly type = '[Clients] GetClients';
    constructor(public startIndex: number, public stopIndex: number) {}
  }

  export class GetClient {
    static readonly type = '[Clients] GetClient';
    constructor(public clientId: number) {}
  }

  export class DeleteAccount {
    static readonly type = '[Clients] DeleteAccount';
    constructor(public clientId: number) {}
  }

  export class UpdateProfile {
    static readonly type = '[Clients] UpdateProfile';
    constructor(public payload: Client) {}
  }
}
