import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenceRoutingModule } from './agence-routing.module';
import { AgenceComponent } from '@pages/admin/agence/agence.component';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SharedModule } from '@modules/shared/shared.module';

// ?Declarations

// ?PrimeNg

@NgModule({
  declarations: [AgenceComponent],
  imports: [CommonModule, AgenceRoutingModule, DashboardModule, SharedModule],
})
export class AgenceModule {}
