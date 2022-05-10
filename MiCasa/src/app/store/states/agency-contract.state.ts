import { Injectable } from '@angular/core';
import { ContratAgence } from '@models/api/contrat-agence';
import { Action, State, StateContext } from '@ngxs/store';
import { AgencyContractService } from '@services/api/contracts/agency-contract.service';
import { AgencyContractActions } from '../actions/agency-contract.action';

@State<ContratAgence[]>({
  name: 'agencyContracts',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class AgencyContractsState {
  constructor(private service: AgencyContractService) {}

  @Action(AgencyContractActions.LoadData)
  loadData(
    ctx: StateContext<ContratAgence[]>,
    action: AgencyContractActions.LoadData
  ) {
    const $state = ctx.getState();
    ctx.patchState([...$state, ...action.payload]);
  }

  @Action(AgencyContractActions.DeleteContract)
  deleteContract(
    ctx: StateContext<ContratAgence[]>,
    action: AgencyContractActions.DeleteContract
  ) {
    const $state = ctx
      .getState()
      .filter((contract) => contract.ContratId !== action.payload);

    ctx.setState([...$state]);
  }

  @Action(AgencyContractActions.UpdateContract)
  updateContract(
    ctx: StateContext<ContratAgence[]>,
    action: AgencyContractActions.UpdateContract
  ) {
    const $state = ctx.getState();
    const index = $state.findIndex(
      (contract) => contract.ContratId === action.payload.ContratId
    );
    $state[index] = action.payload;
    ctx.setState([...$state]);
  }

  @Action(AgencyContractActions.ClearState)
  clearState(ctx: StateContext<ContratAgence[]>) {
    ctx.setState([]);
  }
}
