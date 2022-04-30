import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { getSweetAlert } from '@utility/js-libraries';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeIcons,
} from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Subscription } from 'rxjs';

var Swal = getSweetAlert();

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AgencyFormComponent implements OnInit, AfterViewInit {
  @Input() agency: Agence = {
    AgenceId: 0,
    Adresse: null,
    Signalement: 0,
    Latitude: 0,
    Longitude: 0,
    Compte: {
      CompteId: 0,
      DateInscription: null,
      IsBlocked: 0,
      IsConnected: 0,
      Mail: null,
      Nom: null,
      NumeroTelephone: null,
      Password: null,
      Prenom: null,
      Username: null,
    },
  };

  @Input() decoyAgency!: Agence | null;

  subscription!: Subscription;

  @Input() formAction!: string;

  @ViewChild('Password') password!: HTMLInputElement;
  @ViewChild('confirmPassword') confirmPassword!: HTMLInputElement;

  constructor(
    private _service: AgencyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  showState = () => console.table(this.agency);

  /**
   * @summary
   */
  register() {
    this._matDialog.open(ProgressSpinner);

    let date = new Date();
    this.agency!.Compte!.DateInscription = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    this._service.creerCompte(this.agency!).subscribe(async ($response) => {
      this._matDialog.closeAll();

      Swal.fire({
        title: 'Inscription',
        icon: $response.State ? 'success' : 'error',
        html: `<p>${$response.Content}</p>`,
      });
    });
  }

  /**
   *
   * @returns
   */
  getAction = () =>
    this._activatedRoute.data.subscribe(($data) => {
      this.formAction = $data['action'];
    });

  /**
   *
   */
  updateAgency() {
    this._confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir modifier les informations de ${this.agency?.Compte?.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-question-circle',

      accept: () => {
        this._matDialog.open(ProgressSpinner);

        this._service
          .updateProfile(this.agency!)
          .subscribe(async ($response) => {
            this._matDialog.closeAll();

            this._messageService.add({
              severity: $response.State ? 'success' : 'warn',
              summary: 'Mise à jour',
              detail: $response.Content,
              key: 'message',
              life: 2000,
            });
          });
      },

      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.add({
              severity: 'warn',
              summary: 'Refus',
              detail: "Vous avez refusé l'action",
              key: 'message',
              life: 2000,
            });
            this.agency = this.decoyAgency!;
            break;

          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'warn',
              summary: 'Annulation',
              detail: "Vous avez annulé l'opération",
              key: 'message',
              life: 2000,
            });
            this.agency = this.decoyAgency!;
        }
      },
    });
  }
}
