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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Administrateur } from '@models/api/administrator';
import { Agence } from '@models/api/agency';
import { Message } from '@models/api/message';
import { Store } from '@ngxs/store';
import { AdministratorService } from '@services/api/admin/administrator.service';
import { AgencyService } from '@services/api/agency/agency.service';
import { getLodash, getSweetAlert } from '@utility/js-libraries';
import { isSmallScreen } from '@utility/screen-size';
import { fireError, fireInfo } from '@utility/swal.utility';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { AdminActions } from 'src/app/store/actions/admin.action';
import { AgencyActions } from 'src/app/store/actions/agency.action';
import { MessageActions } from 'src/app/store/actions/message.action';

var Swal = getSweetAlert();

var _ = getLodash();

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ConfirmationService, MessageService, MatDialog],
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

  isSmall!: boolean;

  agency!: Agence | null;

  subscription!: Subscription;

  availableUpdate: boolean = false;

  wantsUpdate!: boolean;

  @Output() registrationModalController = new EventEmitter<boolean>();

  constructor(
    private _router: Router,
    private _agencyService: AgencyService,
    private _adminService: AdministratorService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _update: SwUpdate,
    private _matDialog: MatDialog,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.isSmall = isSmallScreen();
    this.checkUpdate();
  }

  ngOnDestroy(): void {
    this._messageService.clear();

    if (this.subscription) this.subscription.unsubscribe();
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
    this._matDialog.open(ProgressSpinner, {});

    let emailEntry = String(this.myForm.get('email')?.value);

    //? Agency login case
    if (emailEntry.endsWith('@agence')) {
      this.subscription = this._agencyService
        .logIn(
          this.myForm.get('email')?.value,
          this.myForm.get('password')?.value
        )
        .subscribe(async ($response) => {
          this._matDialog.closeAll();

          //? Displaying an error message
          if ($response.State === false) {
            fireError(
              'Connection',
              `<p>Email ou mot de passe incorrect</p>\n<p>Veuillez réessayer.</p>`
            );

            this._store.dispatch(
              new MessageActions.AddMessage($response.Data as Message)
            );
          }

          //? If no error occured then....
          else {
            this.agency = $response.Data as Agence;

            if (this.agency?.Compte?.IsBlocked)
              fireError(
                'Connection',
                "<p>Votre compte a été bloqué! <br />Veuillez contacter l'administrateur pour plus " +
                  "d'informations</p>"
              );
            else {
              this._store.dispatch(new AgencyActions.LogIn(this.agency));

              this._router.navigate([
                `agency/${this.agency?.Compte?.Nom}/account`,
              ]);
            }
          }
        });

      //? Admin login case
    } else if (emailEntry.endsWith('@admin')) {
      // this.subscription = this._store
      //   .dispatch(
      //     new AdminActions.LogIn(
      //       this.myForm.get('email')?.value,
      //       this.myForm.get('password')?.value
      //     )
      //   )
      //   .subscribe(() => {
      //     setTimeout(() => {
      //       const $message = _.last(
      //         this._store.selectSnapshot<Message[]>((state) => state.messages)
      //       );

      //       this._matDialog.closeAll();

      //       if ($message?.State) this._router.navigate(['/admin/dashboard']);
      //       else fireError('Connection', $message?.Content);
      //     }, 350);
      //   });

      this.subscription = this._adminService
        .logIn(
          this.myForm.get('email')?.value,
          this.myForm.get('password')?.value
        )
        .subscribe(async ($response) => {
          this._matDialog.closeAll();

          if ($response.State == false) {
            const $message = $response.Data as Message;
            fireError('Connection', `<p>${$message.Content}</p>`);

            this._store.dispatch(new MessageActions.AddMessage($message));
          }

          //? If no error occured then ....
          else {
            this._store.dispatch(
              new AdminActions.LogIn($response.Data as Administrateur)
            );

            if (localStorage.getItem('token'))
              this._router.navigate(['/admin/dashboard']);
            else
              fireError(
                'Connection',
                "<p>Vous n'êtes pas autorisé à acceder à cette ressource</p>"
              );
          }
        });
    } else {
      this._matDialog.closeAll();
      fireInfo('Connection', '<p>Fonction en cours de développement</p>');
    }
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
                : fireError(
                    'Mise à jour',
                    '<p>Erreur lors de la mise à jour!</p><br/>' +
                      '<p>Vous pourrez réesayer plus tard'
                  )
            );
        },

        reject: () =>
          fireInfo(
            'Mise à jour',
            '<p>Vous pourrez effectuer la mise à jour plus </p>',
            true
          ),
      })
    );
}
