import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  agencies!: Agence[];

  loading!: boolean;

  selectedAgency!: Agence | undefined;

  editedAgency!: Agence;

  displayEditModal!: boolean;

  startIndex!: number;
  stopIndex!: number;
  subscription!: Subscription;

  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.startIndex = 0;
    this.stopIndex = 10;
    this._agencyService
      .getAgencies(this.startIndex, this.stopIndex)
      .subscribe(async ($res) => {
        this.agencies = $res.Data;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
        this._agencyService
          .bloquerCompteAgence(agence.AgenceId!)
          .subscribe(async (response) => {
            this._messageService.add({
              severity: 'success',
              summary: 'Statut',
              detail: `${response.Content}`,
              key: 'message',
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
}
