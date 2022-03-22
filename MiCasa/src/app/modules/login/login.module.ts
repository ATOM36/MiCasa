import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//? Declarations
import { RegistrationComponent } from '@components/login/registration/registration.component';
import { LoginComponent } from '@pages/login/login.component';
import { LoginFormComponent } from '@components/login/login-form/login-form.component';
import { LoginFormTextComponent } from '@components/login/login-form-text/login-form-text.component';
import { FormComponent } from '@components/login/form/form.component';
import { ImageCarouselComponent } from '@components/login/image-carousel/image-carousel.component';
import { ResetPasswordComponent } from '@components/login/reset-password/reset-password.component';
import { AgencyFormComponent } from '@components/login/agency-form/agency-form.component';
import { UserFormComponent } from '@components/login/user-form/user-form.component';

//? Primeng imports
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

//? Material Design
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoginComponent,

    LoginFormComponent,
    LoginFormTextComponent,
    RegistrationComponent,
    FormComponent,
    ImageCarouselComponent,
    ResetPasswordComponent,
    AgencyFormComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    PasswordModule,
    InputNumberModule,
    MatButtonModule,
    MatStepperModule,
    LoginRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    CarouselModule,
    SkeletonModule,
  ],
  exports: [AgencyFormComponent],
  providers: [
    {
      provide: HashLocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
})
export class LoginModule {}
