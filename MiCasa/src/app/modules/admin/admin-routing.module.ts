import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
