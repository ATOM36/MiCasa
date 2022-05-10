import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

//? Declarations
import { TableComponent } from '@components/admin/user/table/table.component';
import { UserComponent } from '@pages/admin/user/user.component';

//? Feature modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? PrimeNg
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [UserComponent, TableComponent],
  imports: [
    CommonModule,
    UserRoutingModule,

    //? Feature modules
    SharedModule,
    DashboardModule,

    //? PrimeNG
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
  ],
})
export class UserModule {}
