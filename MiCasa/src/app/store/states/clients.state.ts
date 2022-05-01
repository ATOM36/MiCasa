import { Injectable } from '@angular/core';
import { Client } from '@models/api/client.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClientService } from '@services/api/client/client.service';
import { ClientsActions } from '../actions/clients.action';

@State<Client[]>({
  name: 'clients',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class ClientsState {
  constructor(private service: ClientService) {}

  @Selector()
  static getClients(state: Client[]) {
    return state;
  }

  @Action(ClientsActions.ClearState)
  clearState(ctx: StateContext<Client[]>) {
    ctx.setState([]);
  }

  @Action(ClientsActions.LoadData)
  loadData(ctx: StateContext<Client[]>, action: ClientsActions.LoadData) {
    const $state = ctx.getState();
    ctx.patchState([...$state, ...action.payload]);
  }

  @Action(ClientsActions.DeleteAccount)
  deleteAccount(
    ctx: StateContext<Client[]>,
    action: ClientsActions.DeleteAccount
  ) {
    const $state = ctx
      .getState()
      .filter((client) => client.ClientId !== action.clientId);

    ctx.setState([...$state]);
  }

  @Action(ClientsActions.UpdateProfile)
  updateProfile(
    ctx: StateContext<Client[]>,
    action: ClientsActions.UpdateProfile
  ) {
    const $state = ctx.getState();
    const index = $state.findIndex(
      (client) => client.ClientId === action.payload.ClientId
    );

    $state[index] = action.payload;
    ctx.setState([...$state]);
  }
}
