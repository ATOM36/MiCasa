import { Injectable } from '@angular/core';
import { Message } from '@models/api/message';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MessageActions } from '../actions/message.action';

@State<Message[]>({
  name: 'messages',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class MessageState {
  constructor() {}

  @Action(MessageActions.AddMessage)
  addMessage(ctx: StateContext<Message[]>, action: MessageActions.AddMessage) {
    ctx.setState([...ctx.getState(), action.payload]);
  }

  @Action(MessageActions.DeleteMessage)
  deleteMessage(
    ctx: StateContext<Message[]>,
    action: MessageActions.DeleteMessage
  ) {
    ctx.setState(
      ctx.getState().filter((message) => message !== action.message)
    );
  }

  //**********************************  SELECTORS  *************************************/
  @Selector()
  static getMessages(state: Message[]) {
    return state;
  }

  @Selector()
  static getLast(state: Message[]) {
    return state[state.length - 1];
  }
}
