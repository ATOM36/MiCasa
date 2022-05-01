import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '@pages/admin/account/account.component';
import { AgencyContractComponent } from '@pages/admin/contracts/agency-contract/agency-contract.component';
import { AdminDashboardComponent } from '@pages/admin/dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/agence',
    loadChildren: () =>
      import('../admin/agence/agence.module').then((m) => m.AgenceModule),
    data: {
      // ? origin so that the right message is displayed
      origin: 'admin/',

      //? Data to notify the kind of action that will be done with form (edition | registration | consultation)
      action: 'edtion',
    },
  },
  {
    path: 'admin/contracts/agence',
    component: AgencyContractComponent,
    data: {
      // ? origin so that the right message is displayed
      origin: 'admin/',
    },
  },
  {
    path: 'admin/account',
    component: AccountComponent,
  },
  {
    path: 'admin/user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    data: {
      origin: 'admin/',
      action: 'edition',
    },
  },
  {
    path: 'admin/contracts/clients',
    loadChildren: () =>
      import(
        '@modules/admin/contracts/client-contract/client-contract.module'
      ).then((m) => m.ClientContractModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
