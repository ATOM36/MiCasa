import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgenceRoutingModule } from './agence-routing.module';
import { AgenceComponent } from '@pages/admin/agence/agence.component';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? Custom Modules

// ?Declarations
import { TableComponent } from '@components/admin/agency/table/table.component';

// ?PrimeNg
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [AgenceComponent, TableComponent],
  imports: [
    CommonModule,
    AgenceRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    DashboardModule,
    SharedModule,
    TableModule,
  ],
})
export class AgenceModule {}
