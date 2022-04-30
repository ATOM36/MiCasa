import { Injectable } from '@angular/core';
import { ContratAgence } from '@models/api/contrat-agence';
import { State } from '@ngxs/store';
import { AgencyContractService } from '@services/api/contracts/agency-contract.service';

@State<ContratAgence[]>({
  name: 'agencyContracts',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class AgencyContractsState {
  constructor(private service: AgencyContractService) {}
}
