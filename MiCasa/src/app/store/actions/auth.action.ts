export namespace AuthActions {
  export class SetToken {
    static readonly type = '[Auth] SetToken';
    constructor(public payload: string) {}
  }

  export class GetToken {
    static readonly type = '[Auth] GetToken';
  }
}
