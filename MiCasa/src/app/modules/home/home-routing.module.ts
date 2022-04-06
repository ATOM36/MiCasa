import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
    data: {
      animation: 'home',
    },
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
