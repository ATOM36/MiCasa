import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientContractRoutingModule } from './client-contract-routing.module';

//? Declarations
import { ClientContractComponent } from '@pages/admin/contracts/client-contract/client-contract.component';
import { TableComponent } from '@components/admin/contracts/client/table/table.component';

//? Feature modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? PrimeNG modules
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ClientContractComponent, TableComponent],
  imports: [
    CommonModule,
    ClientContractRoutingModule,
    DashboardModule,
    SharedModule,

    //? PrimeNG modules
    TableModule,
  ],
})
export class ClientContractModule {}
