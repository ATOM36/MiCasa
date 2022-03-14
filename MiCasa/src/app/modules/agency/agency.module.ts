import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

//? Custom modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { AgencyRoutingModule } from './agency-routing.module';

//? Declarations
import { AgencyDashboardComponent } from '@pages/agency/dashboard/agency-dashboard.component';

@NgModule({
  declarations: [AgencyDashboardComponent],
  imports: [CommonModule, DashboardModule, AgencyRoutingModule],
  providers: [
    {
      provide: HashLocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
})
export class AgencyModule {}
