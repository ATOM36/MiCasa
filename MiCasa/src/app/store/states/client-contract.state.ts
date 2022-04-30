import { Injectable } from '@angular/core';
import { ContratClient } from '@models/api/contrat-client';
import { State } from '@ngxs/store';
import { ClientContractsService } from '@services/api/contracts/client-contracts.service';

@State<ContratClient[]>({
  name: 'clientContracts',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class ClientContractsState {
  constructor(private service: ClientContractsService) {}
}
