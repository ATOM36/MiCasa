import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { SharedModule } from '@modules/shared/shared.module';

// Declarations
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '@pages/home/home.component';

// PrimeNg

// Material Design

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
