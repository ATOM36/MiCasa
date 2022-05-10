import { ContratAgence } from '@models/api/contrat-agence';

export namespace AgencyContractActions {
  export class LoadData {
    static readonly type = '[AgencyContract] LoadData';
    constructor(public payload: ContratAgence[]) {}
  }

  export class DeleteContract {
    static readonly type = '[AgencyContract] DeleteContract';
    constructor(public payload: number) {}
  }

  export class UpdateContract {
    static readonly type = '[AgencyContract] UpdateContract';
    constructor(public payload: ContratAgence) {}
  }

  export class ClearState {
    static readonly type = '[AgencyContract] ClearState';
  }
}
