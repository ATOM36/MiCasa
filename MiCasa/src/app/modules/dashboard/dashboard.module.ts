import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//? Declaration
import { ToolbarComponent } from '@components/dashboards/toolbar/toolbar.component';
import { SalesRatioComponent } from '@components/dashboards/sales-ratio/sales-ratio.component';
import { TopCardsComponent } from '@components/dashboards/top-cards/top-cards.component';
import { FeedsComponent } from '@components/dashboards/feeds/feeds.component';
import { BlogCardsComponent } from '@components/dashboards/blog-cards/blog-cards.component';
import { TopSellingComponent } from '@components/dashboards/top-selling/top-selling.component';
import { SidebarComponent } from '@components/dashboards/sidebar/sidebar.component';
import { AppbarComponent } from '@components/dashboards/appbar/appbar.component';
import { BottomAppbarComponent } from '@components/dashboards/bottom-appbar/bottom-appbar.component';

//? PrimeNg
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';

//? Material Design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    BlogCardsComponent,
    TopSellingComponent,
    ToolbarComponent,
    SalesRatioComponent,
    TopCardsComponent,
    FeedsComponent,
    SidebarComponent,
    AppbarComponent,
    BottomAppbarComponent,
  ],
  imports: [
    CommonModule,
    ScrollTopModule,
    MatDividerModule,
    RouterModule,
    SidebarModule,
    TooltipModule,
    MatToolbarModule,
    CardModule,
    ChartModule,
    ButtonModule,
  ],
  exports: [
    BlogCardsComponent,
    TopSellingComponent,
    ToolbarComponent,
    SalesRatioComponent,
    TopCardsComponent,
    FeedsComponent,
    SidebarComponent,
    AppbarComponent,
    BottomAppbarComponent,
  ],
})
export class DashboardModule {}
