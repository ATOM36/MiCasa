import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

//? Custom modules
import { SharedModule } from '@modules/shared/shared.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

//? Declarations
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from '@pages/admin/dashboard/admin-dashboard.component';
import { DashboardComponent } from '@components/admin/dashboard/dashboard.component';

//? PrimeNg
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

//? Material Design

@NgModule({
  declarations: [AdminDashboardComponent, DashboardComponent],
  imports: [
    CommonModule,
    AccordionModule,
    DashboardModule,
    CardModule,
    AdminRoutingModule,
    ChartModule,
    SharedModule,
  ],
})
export class AdminModule {}
