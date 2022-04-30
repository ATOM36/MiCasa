import { Message } from '@models/api/message';

export namespace MessageActions {
  export class AddMessage {
    static readonly type = '[Message] AddMessage';
    constructor(public payload: Message) {}
  }

  export class GetMessages {
    static readonly type = '[Message] GetMessages';
    constructor(public startIndex: number, public stopIndex: number) {}
  }

  export class GetMessage {
    static readonly type = '[Message] GetMessage';
    constructor(public messageIndex: number) {}
  }

  export class DeleteMessage {
    static readonly type = '[Message] DeleteMessage';
    constructor(public message: Message) {}
  }
}
