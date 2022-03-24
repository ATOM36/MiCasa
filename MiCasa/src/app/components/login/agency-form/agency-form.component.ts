import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgencyFireService } from '@services/firebase/agency/agency-fire.service';
import { AgencyStoreService } from '@services/stores/agency/agency-store.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeIcons,
} from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AgencyFormComponent implements OnInit {
  @Input() agency: Agence | null = {
    AgenceId: null,
    Username: null,
    Password: null,
    Signalement: null,
    NumeroTelephone: null,
    Mail: null,
    Nom: null,
    Latitude: null,
    Longitude: null,
    DateInscription: null,
    Adresse: null,
    IsBlocked: null,
  };

  @Input() decoyAgency!: Agence | null;

  subscription!: Subscription;

  @Input() formAction!: string;

  @ViewChild('Password') password!: HTMLInputElement;
  @ViewChild('confirmPassword') confirmPassword!: HTMLInputElement;

  constructor(
    private _service: AgencyService,
    private _agencyStore: AgencyStoreService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _agencyFire: AgencyFireService
  ) {}

  ngOnInit(): void {}

  showState = () => console.table(this.agency);

  /**
   * @summary
   */
  register() {
    let date = new Date();
    this.agency!.DateInscription = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    this.agency!.IsBlocked = 0;
    this.agency!.Signalement = 0;

    this._agencyFire.registerAgency(this.agency!).then(() => {
      this._confirmationService.confirm({
        header: 'Inscription',

        message: 'Votre compte a été créé avec succès !',

        acceptLabel: 'Explorer MiCasa',

        acceptIcon: PrimeIcons.ARROW_RIGHT,

        rejectLabel: 'Plus tard',

        rejectIcon: PrimeIcons.CLOCK,

        accept: () =>
          this._router.navigate([`/agency/${this.agency?.Nom}/account}`]),
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
      message: `Êtes-vous sûr de vouloir modifier les informations de ${this.agency?.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-question-circle',

      accept: () => {
        this._agencyFire.update(this.agency!).then(() => {
          this._messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `${this.agency?.Nom} mis à jour avec succès`,
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
            this.agency = this.decoyAgency;
            break;

          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'warn',
              summary: 'Annulation',
              detail: "Vous avez annulé l'opération",
              key: 'message',
              life: 2000,
            });
            this.agency = this.decoyAgency;
        }
      },
    });
  }
}
