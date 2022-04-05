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
import { WeatherComponent } from '@components/dashboards/weather/weather.component';

//? PrimeNg
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DialogModule } from 'primeng/dialog';

//? Material Design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    BlogCardsComponent,
    TopSellingComponent,
    ToolbarComponent,
    SalesRatioComponent,
    TopCardsComponent,
    FeedsComponent,
    WeatherComponent,
  ],
  imports: [
    CommonModule,
    ScrollTopModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule,
    SidebarModule,
    MatCardModule,
    TooltipModule,
    MatToolbarModule,
    CardModule,
    ChartModule,
    ButtonModule,
    DialogModule,
  ],
  exports: [
    BlogCardsComponent,
    TopSellingComponent,
    ToolbarComponent,
    SalesRatioComponent,
    TopCardsComponent,
    FeedsComponent,
    WeatherComponent,
  ],
})
export class DashboardModule {}
