import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth-guard.guard';
import { LoadingComponent } from '@pages/loading/loading.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

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
      import('@modules/login/login.module').then((m) => m.LoginModule),

    data: {
      animation: 'login',
    },
  },

  {
    path: 'home',
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
    data: {
      animation: 'home',
    },
  },

  {
    path: 'admin/dashboard',
    loadChildren: () =>
      import('@modules/admin/admin.module').then((m) => m.AdminModule),
    data: {
      animation: 'admin-dashboard',
      origin: 'admin/',
    },
    canActivate: [AuthGuard],
  },

  {
    path: 'agency/:name/dashboard',
    loadChildren: () =>
      import('@modules/agency/agency.module').then((m) => m.AgencyModule),
    data: {
      animation: 'agency',
      origin: 'agency/',
    },
    canActivate: [AuthGuard],
  },

  {
    path: 'user/:name/account',
    loadChildren: () =>
      import('@modules/client/client.module').then((m) => m.ClientModule),
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },

  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class AppRoutingModule {}
