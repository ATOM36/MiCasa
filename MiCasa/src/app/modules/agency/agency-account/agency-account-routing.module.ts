import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyAccountComponent } from '@pages/agency/agency-account/agency-account.component';

const routes: Routes = [{ path: '', component: AgencyAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyAccountRoutingModule {}
