import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgenceRoutingModule } from './agence-routing.module';
import { AgenceComponent } from '@pages/admin/agence/agence.component';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? Custom Modules
import { LoginModule } from '@modules/login/login.module';

// ?Declarations
import { TableComponent } from '@components/admin/agency/table/table.component';

// ?PrimeNg
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [AgenceComponent, TableComponent],
  imports: [
    CommonModule,
    AgenceRoutingModule,
    ConfirmDialogModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    DashboardModule,
    SharedModule,
    TableModule,
    InputTextModule,
    LoginModule,
  ],
})
export class AgenceModule {}
