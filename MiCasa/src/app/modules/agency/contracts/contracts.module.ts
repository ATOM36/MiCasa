import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';

//? Declarations
import { ContractsComponent } from '@pages/agency/contracts/contracts.component';
import { TableComponent } from '@components/agency/contracts/table/table.component';

//? Feature modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [ContractsComponent, TableComponent],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    DashboardModule,
    SharedModule,
  ],
})
export class ContractsModule {}
