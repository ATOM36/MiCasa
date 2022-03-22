import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@modules/shared/shared.module';
import { LoadingComponent } from '@pages/loading/loading.component';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from '@modules/admin/admin.module';
import { AgencyModule } from '@modules/agency/agency.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AdminModule,
    AgencyModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ConfirmDialogModule,
    MatSnackBarModule,
    AppRoutingModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
