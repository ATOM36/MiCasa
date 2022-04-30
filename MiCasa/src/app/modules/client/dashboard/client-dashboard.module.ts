import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { ClientDashboardComponent } from '@pages/client/dashboard/client-dashboard.component';
import { SharedModule } from '@modules/shared/shared.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [
    CommonModule,

    //? Feature modules
    SharedModule,
    DashboardModule,

    ClientDashboardRoutingModule,
  ],
})
export class ClientDashboardModule {}
