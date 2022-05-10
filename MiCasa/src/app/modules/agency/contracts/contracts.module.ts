import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';

//? Declarations
import { ContractsComponent } from '@pages/agency/contracts/contracts.component';
import { TableComponent } from '@components/agency/contracts/table/table.component';

//? Feature modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? PrimeNG
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [ContractsComponent, TableComponent],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    DashboardModule,
    SharedModule,

    //? PrimeNG
    TableModule,
  ],
})
export class ContractsModule {}
