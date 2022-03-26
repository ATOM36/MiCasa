import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgencyFireService } from '@services/firebase/agency/agency-fire.service';
import { setLocation } from '@utility/location-handler';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
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

  userIsBlocked: boolean = false;

  agency: Agence = {
    AgenceId: null,
    NumeroTelephone: null,
    Mail: null,
    Nom: null,
    Latitude: null,
    Longitude: null,
    DateInscription: null,
    IsBlocked: null,
    Adresse: null,
    Password: null,
    Username: null,
    Signalement: null,
  };

  subscription!: Subscription;

  @Output() registrationModalController = new EventEmitter<boolean>();

  /**
   * @summary If the two entries have a value, then the login button is pressed
   */
  @HostListener('window:keydown.enter') onEnter() {
    if (this.myForm.get('email')?.value && this.myForm.get('password')?.value)
      document.getElementById('goButton')?.click();
  }

  constructor(
    private _router: Router,
    private _agencyService: AgencyService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _agencyFire: AgencyFireService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._messageService.clear();
  }

  ngAfterViewInit(): void {
    // could be anything
    // if (document.cookie.indexOf('mycookie') == -1) {
    //   // cookie doesn't exist, create it now
    // } else {
    //   // not first visit, so alert
    //   alert('You refreshed!');
    // }
  }

  // checkReload = () => setInterval(() => {
  //   if(document.cookie.)
  // }, 200);

  /**
   * @summary Gets all data of a given agency, does some control and then redirect it to its account page
   */
  lezgo() {
    let emailEntry = String(this.myForm.get('email')?.value);

    console.log('Request sent');

    if (emailEntry.endsWith('agence')) {
      console.log('Is agency');
      this._agencyFire
        .logIn(
          //? removing useless data
          emailEntry.replace('agence', '').trim(),
          this.myForm.get('password')?.value
        )
        .subscribe(async ($response: Agence) => {
          console.log($response);
          //? Controlling the user's state after the request has been sent
          //? If the account is blocked, then display an error message
          if (await $response.IsBlocked) this.userIsBlocked = true;
          //? If not, then save user's data in the session storage and it's done
          else {
            sessionStorage.setItem('a-x', JSON.stringify($response));
            this._router.navigate([`agency/${$response.Nom}/account`]);
          }
        });
    } else if (emailEntry.endsWith('admin'))
      this._router.navigate(['/admin/dashboard']);

    /* this.subscription = this._agencyService
      .logIn(
        this.myForm.get('email')?.value,
        this.myForm.get('password')?.value
      )
      .subscribe(async ($response) => {
        if ($response.State == false) {
          this._messageService.add({
            severity: 'danger',
            summary: 'Echec !',
            detail: `${$response.Data}`,
            key: 'message',
          });
        } else {
          // const keys: string[] = [
          //   'AgenceId',
          //   'Username',
          //   'Password',
          //   'Signalement',
          //   'NumeroTelephone',
          //   'Mail',
          //   'Nom',
          //   'Latitude',
          //   'Longitude',
          //   'DateInscription',
          //   'Adresse',
          //   'IsBlocked',
          // ];
          this.loadData($response.Data);
          sessionStorage.setItem('a-x', JSON.stringify(this.agency));
          this.router.navigate(['/agency/account']);
        }
      });*/
  }

  /**
   * @summary Listens to to FormButtonComponent displayModal event and then sends its result to the LoginFormComponent
   * @param answer sent by the FormButtonComponent
   * @emits a boolean set to true
   */
  displayRegistrationModal(answer: boolean) {
    this.displayRegistration = answer;
  }

  /**
   * @summary Leads a user to the home page, even though he has no account but with some restrictions
   */
  browseContent = () => this._router.navigate(['/home']);

  /**
   * @summary Displays a form so that an agency can be registered
   */
  choseAgency() {
    this.choosenType = 'Agency';
    this.displayRegistration = true;
  }

  /**
   * @summary Displays a form so that a user can sign up
   */
  choseUser() {
    this.choosenType = 'User';
    this.displayRegistration = true;
  }

  /**
   * @summary Hides signing up buttons
   */
  hideRegistration() {
    this.displayRegistration = false;
    this.displayOptions = false;
  }

  /**
   *@summary Initialize the agency property with some values that will be used during the whole session
  of an agency
   * @param Data
   */
  loadData = (Data: any[]) => {
    this.agency.AgenceId = Data[0];
    this.agency.Username = Data[1];
    this.agency.Password = Data[2];
    this.agency.Signalement = Data[3];
    this.agency.NumeroTelephone = Data[4];
    this.agency.Mail = Data[5];
    this.agency.Nom = Data[6];
    this.agency.Latitude = Data[7];
    this.agency.Longitude = Data[8];
    this.agency.DateInscription = Data[9];
    this.agency.Adresse = Data[10];
    this.agency.IsBlocked = Data[11];
  };
}
