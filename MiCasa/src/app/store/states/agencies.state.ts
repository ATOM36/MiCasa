import { Injectable } from '@angular/core';
import { Agence } from '@models/api/agency';
import { Message } from '@models/api/message';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgenciesActions } from '../actions/agencies.action';
import { MessageActions } from '../actions/message.action';

@State<Agence[]>({
  name: 'agencies',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class AgenciesState {
  constructor(private service: AgencyService) {}

  @Action(AgenciesActions.LoadAgencies)
  loadAgencies(
    ctx: StateContext<Agence[]>,
    action: AgenciesActions.LoadAgencies
  ) {
    const $state = ctx.getState();
    ctx.setState([...$state, ...action.payload]);
  }

  @Action(AgenciesActions.DeleteAccount)
  deleteAccount(
    ctx: StateContext<Agence[]>,
    action: AgenciesActions.DeleteAccount
  ) {
    const $state = ctx
      .getState()
      .filter((agency: Agence) => agency.AgenceId !== action.payload);
    ctx.setState([...$state]);
  }

  @Action(AgenciesActions.GetAgencies)
  getAgencies(
    ctx: StateContext<Agence[]>,
    action: AgenciesActions.GetAgencies
  ) {
    this.service
      .getAgencies(action.startIndex, action.stopIndex)
      .subscribe(($response) => {
        if ($response.State) {
          const $state = ctx.getState();
          ctx.setState([...$state, ...($response.Data as Agence[])]);
        } else
          ctx.dispatch(
            new MessageActions.AddMessage($response.Data as Message)
          );
      });
  }

  @Action(AgenciesActions.UpdateProfile)
  updateProfile(
    ctx: StateContext<Agence[]>,
    action: AgenciesActions.UpdateProfile
  ) {
    const $state = ctx
      .getState()
      .find((agency) => agency.AgenceId === action.payload.AgenceId);
  }

  @Action(AgenciesActions.ClearState)
  clearState(ctx: StateContext<Agence[]>) {
    ctx.setState([]);
  }

  @Selector()
  static getAgencies(state: Agence[]) {
    return state;
  }
}
