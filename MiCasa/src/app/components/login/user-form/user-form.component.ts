import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '@models/api/client.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  generalForm = new FormGroup({
    Nom: new FormControl('', [Validators.required]),

    Username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),

    NumeroTelephone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),

    Mail: new FormControl('', [Validators.email, Validators.required]),
  });

  securityForm = new FormGroup({
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  client?: Client;

  @Input()
  formAction?: 'registration' | 'edition';

  constructor() {}

  ngOnInit(): void {}

  register() {
    console.log(this.generalForm.value);
  }

  updateUser() {}

  /**
   * @summary getter for form control
   * @param fieldName The field that will be returned
   * @returns The control of the field
   */
  getControl = (fieldName: string) => this.generalForm.get(fieldName);

  /**
   * @summary getter for form control's value
   * @param fieldName The field whose value will be returned
   * @returns The value of the field
   */
  getValue = (fieldName: string) => this.generalForm.get(fieldName)?.value;
}
