import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientContractRoutingModule } from './client-contract-routing.module';
import { ClientContractComponent } from '@pages/admin/contracts/client-contract/client-contract.component';

@NgModule({
  declarations: [ClientContractComponent],
  imports: [CommonModule, ClientContractRoutingModule],
})
export class ClientContractModule {}
