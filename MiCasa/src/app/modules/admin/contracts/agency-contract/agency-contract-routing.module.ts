import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyContractComponent } from '@pages/admin/contracts/agency-contract/agency-contract.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyContractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyContracRoutingModule {}
