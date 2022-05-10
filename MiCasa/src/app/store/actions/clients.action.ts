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

  export class ClearState {
    static readonly type = '[Clients] ClearState';
  }

  export class LoadData {
    static readonly type = '[Clients] LoadData';
    constructor(public payload: Client[]) {}
  }
}
