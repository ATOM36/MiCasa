import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8),
      Validators.pattern('[a-zA-Z0-9]{8,20}'),
    ]),
  });

  displayResetModal: boolean = false;
  displayRegistration: boolean = false;

  @Output() registrationModalController = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  lezgo = () => this.router.navigate(['/admin/dashboard']);

  /**
   * @summary Listens to to FormButtonComponent displayModal event and then sends its result to the LoginFormComponent
   * @param answer sent by the FormButtonComponent
   * @emits a boolean set to true
   */
  displayRegistrationModal(answer: boolean) {
    this.displayRegistration = answer;
    setTimeout(() => {
      console.log('Form received');
    }, 1500);
  }

  browseContent = () => this.router.navigate(['/home']);
}
