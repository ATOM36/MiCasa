import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//? Declarations
import { AgencyEditTemplateComponent } from '@components/shared/agency-edit-template/agency-edit-template.component';
import { AgencyTemplateComponent } from '@components/shared/agency-template/agency-template.component';
import { FooterComponent } from '@components/shared/footer/footer.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { PrimebuttonComponent } from '@components/shared/primebutton/primebutton.component';
import { PrimeiconComponent } from '@components/shared/primeicon/primeicon.component';

//? PrimeNg
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

//? Material Design
import { MatStepperModule } from '@angular/material/stepper';
import { LoadingComponent } from '@pages/loading/loading.component';
import { AgencyFormComponent } from '@components/login/agency-form/agency-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { LoginHelperModule } from '@modules/login/helper.module';

@NgModule({
  declarations: [
    FooterComponent,
    AgencyTemplateComponent,
    NotFoundComponent,
    AgencyEditTemplateComponent,
    LoadingComponent,
    PrimebuttonComponent,
    PrimeiconComponent,
    AgencyFormComponent,
  ],
  imports: [
    //? Angular
    CommonModule,
    FormsModule,

    //? Prime
    MessageModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,

    //? Material
    MatStepperModule,
    LoginHelperModule,
  ],
  exports: [
    FooterComponent,
    AgencyTemplateComponent,
    AgencyEditTemplateComponent,
    LoadingComponent,
    AgencyFormComponent,

    //? Modules
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    MatIconModule,
  ],
})
export class SharedModule {}
