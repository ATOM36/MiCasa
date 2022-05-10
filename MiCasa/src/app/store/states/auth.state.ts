import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthActions } from '../actions/auth.action';

@State<string>({
  name: 'auth',
  defaults: '',
})
@Injectable()
export class AuthState {
  constructor() {}

  @Action(AuthActions.SetToken)
  setToken(ctx: StateContext<string>, { payload }: AuthActions.SetToken) {
    ctx.setState(payload);
  }

  @Selector()
  static getToken(state: string) {
    return state;
  }
}
