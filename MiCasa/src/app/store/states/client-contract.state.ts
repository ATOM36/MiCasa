import { Injectable } from '@angular/core';
import { ContratClient } from '@models/api/contrat-client';
import { Action, State, StateContext } from '@ngxs/store';
import { ClientContractsService } from '@services/api/contracts/client-contracts.service';
import { ClientContractsActions } from '../actions/client-contract.action';

@State<ContratClient[]>({
  name: 'clientContracts',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class ClientContractsState {
  constructor(private service: ClientContractsService) {}

  @Action(ClientContractsActions.LoadData)
  loadData(
    ctx: StateContext<ContratClient[]>,
    action: ClientContractsActions.LoadData
  ) {
    const $state = ctx.getState();
    ctx.patchState([...$state, ...action.payload]);
  }

  @Action(ClientContractsActions.DeleteContract)
  deleteContract(
    ctx: StateContext<ContratClient[]>,
    action: ClientContractsActions.DeleteContract
  ) {
    const $state = ctx
      .getState()
      .filter((contract) => contract.ContratId !== action.payload);

    ctx.setState([...$state]);
  }

  @Action(ClientContractsActions.UpdateContract)
  updateContract(
    ctx: StateContext<ContratClient[]>,
    action: ClientContractsActions.UpdateContract
  ) {
    const $state = ctx.getState();
    const index = $state.findIndex(
      (contract) => contract.ContratId === action.payload.ContratId
    );

    $state[index] = action.payload;
    ctx.setState([...$state]);
  }

  @Action(ClientContractsActions.ClearState)
  clearState(ctx: StateContext<ContratClient[]>) {
    ctx.setState([]);
  }
}
