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
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgencyFireService } from '@services/firebase/agency/agency-fire.service';
import { getSweetAlert } from '@utility/js-libraries';
import { isSmallScreen } from '@utility/screen-size';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Observable, of, Subscription, switchMap } from 'rxjs';

var Swal = getSweetAlert();

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

  isSmall!: boolean;

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

  availableUpdate: boolean = false;

  wantsUpdate!: boolean;

  @Output() registrationModalController = new EventEmitter<boolean>();

  constructor(
    private _router: Router,
    private _agencyService: AgencyService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _agencyFire: AgencyFireService,
    private _update: SwUpdate
  ) {}

  ngOnInit(): void {
    this.isSmall = isSmallScreen();
    this.checkUpdate();
  }

  ngOnDestroy(): void {
    this._messageService.clear();
  }

  ngAfterViewInit(): void {}

  /**
   * @summary If the two entries have a value, then the login button can be called
   */
  @HostListener('window:keydown.enter')
  onEnter() {
    if (this.myForm.get('email')?.value && this.myForm.get('password')?.value)
      document.getElementById('goButton')?.click();
  }

  /**
   * @summary Gets all data of a given agency, does some control and then redirect it to its account page
   */
  lezgo(): void {
    let emailEntry = String(this.myForm.get('email')?.value);

    if (emailEntry.endsWith('agence')) {
      this.subscription = this._agencyService
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
            this.loadData($response.Data);
            if (this.agency.IsBlocked) this.userIsBlocked = true;
            else {
              localStorage.setItem('a-x', JSON.stringify(this.agency));
              this._router.navigate([`agency/${this.agency.Nom}/account`]);
            }
          }
        });

      /* console.log('Is agency');
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
        });*/
    } else if (emailEntry.endsWith('admin'))
      this._router.navigate(['/admin/dashboard']);
  }

  /**
   * @summary Listens to to FormButtonComponent displayModal event and then sends its result to the LoginFormComponent
   * @param answer sent by the FormButtonComponent
   * @emits a boolean set to true
   */
  displayRegistrationModal(answer: boolean): void {
    this.displayRegistration = answer;
  }

  /**
   * @summary Leads a user to the home page, even though he has no account but with some restrictions
   */
  browseContent = () => this._router.navigate(['/home']);

  /**
   * @summary Displays a form so that an agency can be registered
   */
  choseAgency(): void {
    this.choosenType = 'Agency';
    this.displayRegistration = true;
  }

  /**
   * @summary Displays a form so that a user can sign up
   */
  choseUser(): void {
    this.choosenType = 'User';
    this.displayRegistration = true;
  }

  /**
   * @summary Hides signing up buttons
   */
  hideRegistration(): void {
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

  /**
   * @summary Checks whether or not a `new version` of the app has been deployed.
   * If yes, then a confirmation dialog will be shown to the user after `30s`.
   */
  checkUpdate(): void {
    this._update.versionUpdates
      .pipe(
        //? switchMap is called when a new version is available
        //? By doing this, the confirmation dialog will be shown to the user
        switchMap(() => this.showUpdateDialog())
      )
      .subscribe();
  }

  /**
   * @summary This function holds the whole process of updating the app.
   * When the `SwUpdate` service checks whether or not an update is avaible, this function will show a
   * confirmation modal to control the update operation
   * @returns A observable of `ConfirmationService` to which we can subscribe to control the app's update state
   */
  showUpdateDialog = (): Observable<ConfirmationService> =>
    of(
      this._confirmationService.confirm({
        header: 'Mise à jour disponible',

        message:
          'Une nouvelle version est disponible !\nVoulez vous effectué une mise à jour ?',

        icon: 'pi pi-question-circle',

        accept: () => {
          Swal.fire({
            icon: 'success',
            title: 'Mise à jour',
            html: '<p> Mise à jour en cours </p>',
          })
            .then(() => this._update.activateUpdate())
            .then((response: boolean) =>
              response
                ? location.reload()
                : Swal.fire({
                    title: 'Mise à jour',
                    icon: 'error',
                    html:
                      '<p>Erreur lors de la mise à jour!</p><br/>' +
                      '<p>Vous pourrez réesayer plus tard',
                  })
            );
        },

        reject: () => {
          Swal.fire({
            title: 'Annulation',
            icon: 'info',
            html: '<p>Vous pourrez effectuer la mise à jour plus </p>',
            showCloseButton: true,
          });
        },
      })
    );
}
