import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FormComponent implements OnInit, OnDestroy {
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required]),

    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8),
      Validators.pattern('[a-zA-Z0-9]{8,20}'),
    ]),
  });

  displayResetModal: boolean = false;

  displayRegistration: boolean = false;

  displayOptions: boolean = false;

  choosenType!: string;

  greenColor: string = '#007200ff';

  agency: Agence | undefined;

  subscription!: Subscription;

  @Output() registrationModalController = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private _agencyService: AgencyService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._messageService.clear();
  }

  lezgo() {
    this.subscription = this._agencyService
      .logIn(
        this.myForm.get('email')?.value,
        this.myForm.get('password')?.value
      )
      .subscribe(async (response) => {
        this.agency = await response.Data;

        console.table(this.agency);

        sessionStorage.setItem('a-x', JSON.stringify(this.agency));
      });
  }

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

  choseAgency() {
    this.choosenType = 'Agency';
    this.displayRegistration = true;
  }

  choseUser() {
    this.choosenType = 'User';
    this.displayRegistration = true;
  }

  hideRegistration() {
    this.displayRegistration = false;
    this.displayOptions = false;
  }
}
