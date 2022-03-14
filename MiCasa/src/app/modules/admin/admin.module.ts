import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

// Custom modules
import { SharedModule } from '@modules/shared/shared.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

// Declarations
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from '@pages/admin/dashboard/admin-dashboard.component';
import { DashboardComponent } from '@components/admin/dashboard/dashboard.component';

// PrimeNg
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';

// Material Design
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AdminDashboardComponent, DashboardComponent],
  imports: [
    CommonModule,
    AccordionModule,
    DashboardModule,
    TooltipModule,
    SplitButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CardModule,
    AvatarModule,
    AdminRoutingModule,
    ChartModule,
    MatCardModule,
    ButtonModule,
    MatGridListModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HashLocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
})
export class AdminModule {}
