import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

//? Custom modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

//? Declarations
import { AgencyAccountRoutingModule } from './agency-account-routing.module';
import { AgencyAccountComponent } from '@pages/agency/agency-account/agency-account.component';
import { HeaderComponent } from '@components/agency/account/header/header.component';
import { RecentPublicationComponent } from '@components/agency/account/recent-publication/recent-publication.component';
import { EditAccountComponent } from '@components/agency/account/edit-account/edit-account.component';

//? PrimeNg
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    AgencyAccountComponent,
    HeaderComponent,
    RecentPublicationComponent,
    EditAccountComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    DashboardModule,
    SharedModule,
    CardModule,
    DialogModule,
    DividerModule,
    AgencyAccountRoutingModule,
  ],
})
export class AgencyAccountModule {}
