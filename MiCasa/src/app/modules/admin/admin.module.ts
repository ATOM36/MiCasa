import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom modules
import { SharedModule } from '@modules/shared/shared.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { AgencyContractModule } from './contracts/agency-contract/agency-contract.module';

// Declarations
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from '@pages/admin/dashboard/admin-dashboard.component';
import { DashboardComponent } from '@components/admin/dashboard/dashboard.component';
import { AccountComponent } from '@pages/admin/account/account.component';
import { HeaderComponent } from '@components/admin/account/header/header.component';

// PrimeNg
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';

// Material Design
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashboardComponent,
    AccountComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    DashboardModule,
    TooltipModule,
    SplitButtonModule,
    MatToolbarModule,
    MatIconModule,
    CardModule,
    AvatarModule,
    AgencyContractModule,
    ChartModule,
    ButtonModule,
    SharedModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
