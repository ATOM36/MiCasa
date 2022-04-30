import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from '@pages/client/account/client.component';
import { SharedModule } from 'primeng/api';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { HeaderComponent } from '../../components/client/account/header/header.component';

@NgModule({
  declarations: [ClientComponent, HeaderComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,

    //? Feature modules
    SharedModule,
    DashboardModule,
  ],
})
export class ClientModule {}
