import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  agencies: Agence[] = [];

  loading!: boolean;

  selectedAgency!: Agence | null;

  editedAgency!: Agence;

  displayEditModal!: boolean;

  startIndex!: number;
  stopIndex!: number;
  subscription!: Subscription;
  isLoading!: boolean;
  recordsNumber: number = 0;

  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.startIndex = 0;
    this.stopIndex = 10;
    this.loadData();

    this.recordsNumber = this.getRecordsNumber();
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  //TODO: Le template pour visualiser les données d'une agence

  /**
   * @summary
   */
  loadData = () => {
    this.isLoading = true;
    this._agencyService
      .getAgencies(this.startIndex, this.stopIndex)
      .subscribe(async ($response) => {
        this.agencies = $response.Data as Agence[];
      });
    this.isLoading = false;
  };

  /**
   * @summary
   * @param event
   * @returns
   */
  loadMoreData = (event: Paginator) =>
    event.changePageToNext(() => {
      this.startIndex = this.stopIndex;
      this.stopIndex += 10;
      this._agencyService
        .getAgencies(this.startIndex, this.stopIndex)
        .subscribe(async ($response) => {
          this.agencies = this.agencies.concat($response.Data as Agence[]);
        });
    });

  /**
   * @
   * @returns The number of agencies recorded in the database
   */
  getRecordsNumber = () => this.agencies.length;

  /**
   * @summary
   * @param agence The agency that is about to get deleted
   */
  deleteSelectedAgency(agence: Agence) {
    this._confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer ${agence.Compte?.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this._agencyService
          .supprimerCompte(agence)
          .subscribe(async ($response) => {
            this._messageService.add({
              severity: $response.State == true ? 'success' : 'danger',
              summary: 'Succès',
              detail: `${$response.Content}`,
              key: 'message',
              life: 2000,
            });
          });
        this.agencies.splice(this.agencies.indexOf(agence), 1);
      },

      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.add({
              severity: 'info',
              summary: 'Refus',
              detail: "Vous avez annulé l'action",
              key: 'message',
              life: 2000,
            });
            break;

          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'info',
              summary: 'Annulation',
              detail: "Vous avez annulé l'opération",
              key: 'message',
              life: 2000,
            });
        }
      },
    });
  }

  /**
   * @summary
   * @param agence The agency that is about to get updated
   */
  changeAgencyStatus(agence: Agence) {
    this._confirmationService.confirm({
      message: agence.Compte?.IsBlocked
        ? `Êtes-vous sûr de vouloir débloquer ${agence.Compte.Nom} ?`
        : `Êtes-vous sûr de vouloir bloquer ${agence.Compte?.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        if (agence.Compte?.IsBlocked) {
          this._agencyService
            .debloquerCompte(agence.AgenceId!)
            .subscribe(async ($response) => {
              this._messageService.add({
                severity: $response.State == true ? 'success' : 'danger',
                summary: 'Statut',
                detail: `${$response.Content}`,
                key: 'message',
              });
            });

          agence.Compte.IsBlocked = 0;
        } else {
          this._agencyService
            .bloquerCompteAgence(agence.AgenceId!)
            .subscribe(async ($response) => {
              this._messageService.add({
                severity: $response.State == true ? 'success' : 'danger',
                summary: 'Statut',
                detail: `${$response.Content}`,
                key: 'message',
              });
            });

          agence.Compte!.IsBlocked = 1;
        }
      },

      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.add({
              severity: 'info',
              summary: 'Refus',
              detail: "Vous avez refusé l'action",
              key: 'message',
              life: 2000,
            });
            break;

          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'info',
              summary: 'Annulation',
              detail: "Vous avez annulé l'opération",
              key: 'message',
              life: 2000,
            });
        }
      },
    });
  }

  /**
   * @summary
   * @param agence
   */
  editAgency(agence: Agence) {
    this.selectedAgency = agence;
    this.displayEditModal = true;
  }
}
