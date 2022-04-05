import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [MatFormFieldModule, MatInputModule, MatIconModule],
})
export class LoginHelperModule {}
