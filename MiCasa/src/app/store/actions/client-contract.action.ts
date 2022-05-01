import { ContratClient } from '@models/api/contrat-client';

export namespace ClientContractsActions {
  export class LoadData {
    static readonly type = '[ClientContract] LoadData';
    constructor(public payload: ContratClient[]) {}
  }

  export class DeleteContract {
    static readonly type = '[ClientContract] DeleteContract';
    constructor(public payload: number) {}
  }

  export class UpdateContract {
    static readonly type = '[ClientContract] UpdateContract';
    constructor(public payload: ContratClient) {}
  }

  export class ClearState {
    static readonly type = '[ClientContract] ClearState';
  }
}
