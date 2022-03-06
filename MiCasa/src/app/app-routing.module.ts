import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from '@pages/loading/loading.component';

const routes: Routes = [
  {
    path: 'w',
    component: LoadingComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@modules/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
