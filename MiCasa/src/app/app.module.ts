import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

//? Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';

//? Feature modules
import { LoginModule } from '@modules/login/login.module';
import { HomeModule } from '@modules/home/home.module';
import { AdminModule } from '@modules/admin/admin.module';
import { AgencyModule } from '@modules/agency/agency.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from '@utility/auth';
import { AuthGuard } from '@guards/auth-guard.guard';
import { ClientModule } from '@modules/client/client.module';

//? NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './store/index.state';
import { MessageState } from './store/states/message.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    AdminModule,
    AgencyModule,
    ClientModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: [],
      },
    }),

    //? Ngxs
    //? Ngxs Module
    NgxsModule.forRoot([...AppState, MessageState], {
      developmentMode: !environment.production,
    }),

    //? Logger
    NgxsLoggerPluginModule.forRoot({}),

    //? Storage
    NgxsStoragePluginModule.forRoot({
      key: [...AppState],
    }),

    //? Devtools
    NgxsReduxDevtoolsPluginModule.forRoot({}),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
