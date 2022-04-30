import { Agence } from '@models/api/agency';

export namespace AgenciesActions {
  export class LoadAgencies {
    static readonly type = '[Agencies] GetAgencies';
    constructor(public payload: Agence[]) {}
  }

  export class GetAgencies {
    static readonly type = '[Agencies] GetAgencies';
    constructor(public startIndex: number, public stopIndex: number) {}
  }

  export class GetAgency {
    static readonly type = '[Agencies] GetAgency';
    constructor(public agencyId: number) {}
  }

  export class DeleteAccount {
    static readonly type = '[Agencies] DeleteAccount';
    constructor(public payload: number) {}
  }

  export class UpdateProfile {
    static readonly type = '[Agencies] UpdateProfile';
    constructor(public payload: Agence) {}
  }

  export class ClearState {
    static readonly type = '[Agencies] ClearState';
  }
}
