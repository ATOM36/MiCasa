import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TableComponent implements OnInit, AfterViewInit {
  agencies!: Agence[];

  loading!: boolean;

  selectedAgency!: Agence | undefined;

  editedAgency!: Agence;

  displayEditModal!: boolean;

  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  deleteSelectedAgency(agence: Agence) {
    this._confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer ${agence.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.agencies.splice(this.agencies.indexOf(agence), 1);
        this._messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${agence.Nom} supprimé avec succès`,
          key: 'message',
          life: 2000,
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
            break;

          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'warn',
              summary: 'Annulation',
              detail: "Vous avez annulé l'opération",
              key: 'message',
              life: 2000,
            });
        }
      },
    });
  }

  changeAgencyStatus(agence: Agence) {
    this._confirmationService.confirm({
      message: agence.IsBlocked
        ? `Êtes-vous sûr de vouloir débloquer ${agence.Nom} ?`
        : `Êtes-vous sûr de vouloir bloquer ${agence.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        if (agence.IsBlocked) {
          agence.IsBlocked = 0;
          this._messageService.add({
            severity: 'success',
            summary: 'Changement de status',
            detail: `${agence.Nom} débloqué avec succès !`,
            key: 'message',
            life: 2000,
          });
        } else {
          agence.IsBlocked = 1;
          this._messageService.add({
            severity: 'success',
            summary: 'Changement de status',
            detail: `${agence.Nom} bloqué avec succès !`,
            key: 'message',
            life: 2000,
          });
        }
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
            break;

          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'warn',
              summary: 'Annulation',
              detail: "Vous avez annulé l'opération",
              key: 'message',
              life: 2000,
            });
        }
      },
    });
  }

  editAgency(agence: Agence) {
    this.selectedAgency = agence;
    this.displayEditModal = true;
  }

  validateEdit(agence: Agence) {
    this.agencies[this.agencies.indexOf(this.selectedAgency!)] = agence;
    this.selectedAgency = undefined;
  }

  loadData() {
    this.loading = true;

    this.agencies = [
      {
        AgenceId: 1,
        NumeroTelephone: '95412456',
        Mail: 'zx@gd.com',
        Nom: 'Alzeim',
        Latitude: 12.5,
        Longitude: 0.2,
        DateInscription: '12/05/2020',
        IsBlocked: 0,
        Adresse: 'Rue de la république',
        Password: '123456789',
        Username: 'grizou',
        Signalement: 15,
      },
      {
        AgenceId: 2,
        NumeroTelephone: '00255123',
        Mail: 'az@fds',
        Nom: 'Vivo 5',
        Latitude: 54.5,
        Longitude: 123.2,
        DateInscription: '12/03/2022',
        IsBlocked: 1,
        Adresse: 'Fsm',
        Password: undefined,
        Username: undefined,
        Signalement: 20,
      },
      {
        AgenceId: 3,
        NumeroTelephone: '79812456',
        Mail: 'lilo@f.or',
        Nom: 'Lolipop',
        Latitude: undefined,
        Longitude: undefined,
        DateInscription: '01/01/2021',
        IsBlocked: 0,
        Adresse: 'Station métro',
        Password: undefined,
        Username: undefined,
        Signalement: 5,
      },
      {
        AgenceId: 4,
        NumeroTelephone: '95412456',
        Mail: 'zx@gd.com',
        Nom: 'Alzeim',
        Latitude: 12.5,
        Longitude: 0.2,
        DateInscription: '12/05/2020',
        IsBlocked: 0,
        Adresse: 'Rue de la république',
        Password: undefined,
        Username: undefined,
        Signalement: 15,
      },
      {
        AgenceId: 5,
        NumeroTelephone: '00255123',
        Mail: 'az@fds',
        Nom: 'Vivo 5',
        Latitude: 54.5,
        Longitude: 123.2,
        DateInscription: '12/03/2022',
        IsBlocked: 1,
        Adresse: 'Fsm',
        Password: undefined,
        Username: undefined,
        Signalement: 20,
      },
      {
        AgenceId: 6,
        NumeroTelephone: '79812456',
        Mail: 'lilo@f.or',
        Nom: 'Lolipop',
        Latitude: undefined,
        Longitude: undefined,
        DateInscription: '01/01/2021',
        IsBlocked: 0,
        Adresse: 'Station métro',
        Password: undefined,
        Username: undefined,
        Signalement: 5,
      },
      {
        AgenceId: 7,
        NumeroTelephone: '95412456',
        Mail: 'zx@gd.com',
        Nom: 'Alzeim',
        Latitude: 12.5,
        Longitude: 0.2,
        DateInscription: '12/05/2020',
        IsBlocked: 0,
        Adresse: 'Rue de la république',
        Password: undefined,
        Username: undefined,
        Signalement: 15,
      },
      {
        AgenceId: 8,
        NumeroTelephone: '00255123',
        Mail: 'az@fds',
        Nom: 'Vivo 5',
        Latitude: 54.5,
        Longitude: 123.2,
        DateInscription: '12/03/2022',
        IsBlocked: 1,
        Adresse: 'Fsm',
        Password: undefined,
        Username: undefined,
        Signalement: 20,
      },
      {
        AgenceId: 9,
        NumeroTelephone: '79812456',
        Mail: 'lilo@f.or',
        Nom: 'Lolipop',
        Latitude: undefined,
        Longitude: undefined,
        DateInscription: '01/01/2021',
        IsBlocked: 0,
        Adresse: 'Station métro',
        Password: undefined,
        Username: undefined,
        Signalement: 5,
      },
      {
        AgenceId: 10,
        NumeroTelephone: '95412456',
        Mail: 'zx@gd.com',
        Nom: 'Alzeim',
        Latitude: 12.5,
        Longitude: 0.2,
        DateInscription: '12/05/2020',
        IsBlocked: 0,
        Adresse: 'Rue de la république',
        Password: undefined,
        Username: undefined,
        Signalement: 15,
      },
      {
        AgenceId: 11,
        NumeroTelephone: '00255123',
        Mail: 'az@fds',
        Nom: 'Vivo 5',
        Latitude: 54.5,
        Longitude: 123.2,
        DateInscription: '12/03/2022',
        IsBlocked: 1,
        Adresse: 'Fsm',
        Password: undefined,
        Username: undefined,
        Signalement: 20,
      },
      {
        AgenceId: 12,
        NumeroTelephone: '79812456',
        Mail: 'lilo@f.or',
        Nom: 'Lolipop',
        Latitude: undefined,
        Longitude: undefined,
        DateInscription: '01/01/2021',
        IsBlocked: 0,
        Adresse: 'Station métro',
        Password: undefined,
        Username: undefined,
        Signalement: 5,
      },
    ];

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
