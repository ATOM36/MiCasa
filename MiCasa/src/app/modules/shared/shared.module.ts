import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//? Declarations
import { AgencyEditTemplateComponent } from '@components/shared/agency-edit-template/agency-edit-template.component';
import { AgencyTemplateComponent } from '@components/shared/agency-template/agency-template.component';
import { FooterComponent } from '@components/shared/footer/footer.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

//? PrimeNg
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

//? Material Design
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    FooterComponent,
    AgencyTemplateComponent,
    NotFoundComponent,
    AgencyEditTemplateComponent,
  ],
  imports: [
    CommonModule,
    MessageModule,
    FormsModule,
    InputTextModule,
    MatStepperModule,
    ButtonModule,
  ],
  exports: [
    FooterComponent,
    AgencyTemplateComponent,
    AgencyEditTemplateComponent,
  ],
})
export class SharedModule {}
