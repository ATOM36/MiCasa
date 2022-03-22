import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
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
      animation: 'admin',
      origin: 'admin/',
    },
  },
  {
    path: 'agency/dashboard',
    loadChildren: () =>
      import('@modules/agency/agency.module').then((m) => m.AgencyModule),
    data: {
      animation: 'agency',
      origin: 'agency/',
    },
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
      preloadingStrategy: PreloadAllModules,
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
