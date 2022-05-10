import { Injectable } from '@angular/core';
import { Agence } from '@models/api/agency';
import { Action, State, StateContext } from '@ngxs/store';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgencyActions } from '../actions/agency.action';
import { AuthActions } from '../actions/auth.action';

@State<Agence>({
  name: 'agency',
  defaults: undefined,
})
@Injectable({
  providedIn: 'root',
})
export class AgencyState {
  constructor(private service: AgencyService) {}

  @Action(AgencyActions.LogIn)
  logIn(ctx: StateContext<Agence>, action: AgencyActions.LogIn) {
    ctx.setState(action.payload);
    ctx.dispatch(new AuthActions.SetToken(action.payload.Compte?.Token!));
    localStorage.setItem('token', action.payload.Compte?.Token!);
  }

  @Action(AgencyActions.LogOut)
  logOut(ctx: StateContext<Agence>, action: AgencyActions.LogOut) {
    ctx.setState({
      Signalement: null,
      Compte: null,
      AgenceId: null,
      Adresse: null,
      Latitude: null,
      Longitude: null,
    });
  }

  @Action(AgencyActions.DeleteAccount)
  deleteAccount(
    ctx: StateContext<Agence>,
    action: AgencyActions.DeleteAccount
  ) {
    ctx.patchState({});
  }

  @Action(AgencyActions.UpdateProfile)
  updateProfile(
    ctx: StateContext<Agence>,
    action: AgencyActions.UpdateProfile
  ) {
    ctx.patchState(action.payload);
  }
}
