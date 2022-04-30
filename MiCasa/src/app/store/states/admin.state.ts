import { Injectable } from '@angular/core';
import { Administrateur } from '@models/api/administrator';
import { Message } from '@models/api/message';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { AdministratorService } from '@services/api/admin/administrator.service';
import { Observable, of, tap } from 'rxjs';
import { AdminActions } from '../actions/admin.action';
import { MessageActions } from '../actions/message.action';

@State<Administrateur>({
  name: 'admin',
  defaults: undefined,
})
@Injectable({
  providedIn: 'root',
})
export class AdminState {
  constructor(private service: AdministratorService, private store: Store) {}

  /**
   * @summary
   * @param ctx
   * @param action
   */
  @Action(AdminActions.LogIn)
  logIn(ctx: StateContext<Administrateur>, action: AdminActions.LogIn) {
    ctx.setState(action.payload);
    localStorage.setItem('token', action.payload.Compte?.Token!);
  }

  /**
   * @summary
   * @param ctx
   * @param action
   * @returns
   */
  @Action(AdminActions.LogOut)
  logOut(ctx: StateContext<Administrateur>, action: AdminActions.LogOut) {
    ctx.setState({
      AdministratorId: null,
      IsActive: null,
      Compte: null,
    });
  }

  /**
   * @summary
   * @param ctx
   * @param action
   * @returns
   */
  @Action(AdminActions.UpdateProfile)
  updateProfile(
    ctx: StateContext<Administrateur>,
    action: AdminActions.UpdateProfile
  ) {
    let result!: Observable<Message>;

    this.service
      .updateProfile(action.payload)
      .pipe(
        tap(($response) =>
          this.store.dispatch(new MessageActions.AddMessage($response))
        )
      )
      .subscribe(($response) => {
        result = of($response);
        if ($response.State) ctx.setState(action.payload);
      });

    return result;
  }

  /**
   * @summary
   * @param ctx
   * @param action
   * @returns
   */
  @Action(AdminActions.DeleteAccount)
  deleteAccount(
    ctx: StateContext<Administrateur>,
    action: AdminActions.DeleteAccount
  ) {
    let result!: Observable<Message>;

    this.service
      .deleteAccount(action.administrateurId)
      .subscribe(($response) => {
        result = of($response);
        this.store.dispatch(new MessageActions.AddMessage($response));

        if ($response.State) this.store.reset(AdminState);
      });

    return result;
  }

  @Action(AdminActions.ClearState)
  clearState(ctx: StateContext<Administrateur>) {
    ctx.patchState({});
  }
}
