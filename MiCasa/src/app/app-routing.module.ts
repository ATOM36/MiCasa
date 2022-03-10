import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from '@pages/loading/loading.component';

const routes: Routes = [
  {
    path: 'loading',
    component: LoadingComponent,
    data: {
      animation: 'loading',
    },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    data: {
      animation: 'login',
    },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    data: {
      animation: 'home',
    },
  },
  {
    path: 'admin/:location',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    data: {
      animation: 'admin',
    },
  },
  {
    path: 'agency',
    loadChildren: () =>
      import('./modules/agency/agency.module').then((m) => m.AgencyModule),
    data: {
      animation: 'agency',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'loading',
  },
  {
    path: '**',
    redirectTo: 'loading',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
