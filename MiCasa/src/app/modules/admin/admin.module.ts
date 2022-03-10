import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from '@pages/admin/dashboard/admin-dashboard.component';
import { TopCardsComponent } from '@components/admin/dashboard/top-cards/top-cards.component';
import { BlogCardsComponent } from '@components/admin/dashboard/blog-cards/blog-cards.component';
import { FeedsComponent } from '@components/admin/dashboard/feeds/feeds.component';
import { SalesRatioComponent } from '@components/admin/dashboard/sales-ratio/sales-ratio.component';
import { TopSellingComponent } from '@components/admin/dashboard/top-selling/top-selling.component';
import { NavbarComponent } from '@components/admin/dashboard/navbar/navbar.component';
import { ToolbarComponent } from '@components/admin/dashboard/toolbar/toolbar.component';

// PrimeNg
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';

// Material Design
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    TopCardsComponent,
    BlogCardsComponent,
    FeedsComponent,
    SalesRatioComponent,
    TopSellingComponent,
    NavbarComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule,
    SplitButtonModule,
    MatButtonModule,
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
  ],
  providers: [
    {
      provide: HashLocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
})
export class AdminModule {}
