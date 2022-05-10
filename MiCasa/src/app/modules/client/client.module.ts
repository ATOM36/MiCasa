import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';

//? Declarations
import { ClientComponent } from '@pages/client/account/client.component';
import { HeaderComponent } from '@components/client/account/header/header.component';

//? Feature modules
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

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
