import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class TemplateErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export class ReactiveErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    throw new Error('Method not implemented.');
  }
}
