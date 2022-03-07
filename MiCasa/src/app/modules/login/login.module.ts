import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

// Declarations
import { RegistrationComponent } from '@components/login/registration/registration.component';
import { LoginComponent } from '@pages/login/login.component';
import { LoginFormComponent } from '@components/login/login-form/login-form.component';
import { LoginFormTextComponent } from '@components/login/login-form-text/login-form-text.component';
import { FormButtonComponent } from '@components/login/form-button/form-button.component';
import { FormComponent } from '@components/login/form/form.component';
import { ImageCarouselComponent } from '@components/login/image-carousel/image-carousel.component';

// Primeng imports
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { ResetPasswordComponent } from '../../components/login/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginFormTextComponent,
    RegistrationComponent,
    FormButtonComponent,
    FormComponent,
    ImageCarouselComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    CarouselModule,
  ],
})
export class LoginModule {}
