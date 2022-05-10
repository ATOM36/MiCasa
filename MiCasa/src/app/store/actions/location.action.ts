export namespace LocationActions {
  export class SetLocation {
    static readonly type = '[Location] SetLocation';
    constructor(public payload: string) {}
  }

  export class GetLocation {
    static readonly type = '[Location] GetLocation';
  }
}
