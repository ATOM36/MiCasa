import { NgModule } from '@angular/core';
import { AgencyContractComponent } from '@pages/admin/contracts/agency-contract/agency-contract.component';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? Declarations
import { TableComponent } from '@components/admin/contracts/agence/table/table.component';

//? PrimeNg
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [AgencyContractComponent, TableComponent],
  imports: [
    SharedModule,
    DashboardModule,

    //? Prime
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
  ],
})
export class AgencyContractModule {}
