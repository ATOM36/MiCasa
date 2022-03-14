import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@components/shared/footer/footer.component';
import { AgencyTemplateComponent } from '../../components/shared/agency-template/agency-template.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';

@NgModule({
  declarations: [FooterComponent, AgencyTemplateComponent, NotFoundComponent],
  imports: [CommonModule],
  exports: [FooterComponent],
})
export class SharedModule {}
