import { Injectable } from '@angular/core';
import { Client } from '@models/api/client.model';
import { Action, State, StateContext } from '@ngxs/store';
import { ClientService } from '@services/api/client/client.service';
import { AuthActions } from '../actions/auth.action';
import { ClientActions } from '../actions/client.action';

@State<Client | null>({
  name: 'client',
  defaults: undefined,
})
@Injectable({
  providedIn: 'root',
})
export class ClientState {
  constructor(private service: ClientService) {}

  @Action(ClientActions.LogIn)
  logIn(ctx: StateContext<Client>, action: ClientActions.LogIn) {
    ctx.setState(action.client);
    ctx.dispatch(new AuthActions.SetToken(action.client.Compte?.Token!));
    localStorage.setItem('token', action.client.Compte?.Token!);
  }

  @Action(ClientActions.LogOut)
  logOut(ctx: StateContext<Client>, action: ClientActions.LogOut) {
    ctx.setState({
      ClientId: null,
      Compte: null,
    });
  }

  @Action(ClientActions.DeleteAccount)
  deleteAccount(
    ctx: StateContext<Client>,
    action: ClientActions.DeleteAccount
  ) {
    ctx.dispatch(new ClientActions.LogOut());
  }

  @Action(ClientActions.UpdateProfile)
  updateProfile(
    ctx: StateContext<Client>,
    action: ClientActions.UpdateProfile
  ) {
    ctx.setState(action.payload);
  }
}
