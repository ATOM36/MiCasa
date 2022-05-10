import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LocationActions } from '../actions/location.action';

@State<string>({
  name: 'location',
  defaults: '',
})
@Injectable()
export class LocationState {
  constructor() {}

  @Action(LocationActions.SetLocation)
  setLocation(
    ctx: StateContext<string>,
    { payload }: LocationActions.SetLocation
  ) {
    ctx.setState(payload);
  }

  @Selector()
  static getLocation(state: string) {
    return state;
  }
}
