import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyDashboardComponent } from '@pages/agency/dashboard/agency-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyDashboardComponent,
  },

  {
    path: 'agency/:name/account',
    loadChildren: () =>
      import('./agency-account/agency-account.module').then(
        (m) => m.AgencyAccountModule
      ),
    data: {
      origin: 'agency/',
    },
  },
  {
    path: 'agency/:name/contracts',
    loadChildren: () =>
      import('@modules/agency/contracts/contracts.module').then(
        (m) => m.ContractsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyRoutingModule {}
