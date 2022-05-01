import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Agence } from '@models/api/agency';
import { Message } from '@models/api/message';
import { Store } from '@ngxs/store';
import { AgencyService } from '@services/api/agency/agency.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Subscription, tap } from 'rxjs';
import { AgenciesActions } from 'src/app/store/actions/agencies.action';
import { MessageActions } from 'src/app/store/actions/message.action';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  agencies: Agence[] = [];

  loading: boolean = true;

  selectedAgency!: Agence | null;

  editedAgency!: Agence;

  displayEditModal!: boolean;

  @ViewChild('refresher') refresher?: ElementRef;

  startIndex: number = 0;
  stopIndex: number = 10;
  subscription!: Subscription;
  isLoading: boolean = true;
  recordsNumber: number = 0;

  columns = [
    'AgenceId',
    'Compte.Nom',
    'Compte.Mail',
    'Compte.NumeroTelephone',
    'Compte.DateInscription',
    'Signalement',
    'Compte.IsBlocked',
  ];

  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _agencyService: AgencyService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.initState();

    this.loadData();

    this.initState();

    this.isLoading = false;
    this.recordsNumber = this.getRecordsNumber();
  }

  ngOnDestroy(): void {
    // this._store.dispatch(new AgenciesActions.ClearState());
  }

  ngAfterViewInit(): void {}

  //TODO: Le template pour visualiser les données d'une agence

  /**
   * @summary Loads all retrieved agencies data to
   */
  initState = () =>
    (this.agencies = this._store.selectSnapshot<Agence[]>(
      (state) => state.agencies
    ));

  /**
   * @summary
   */
  loadData = () =>
    this.agencies.length <= 0
      ? this._agencyService
          .getAgencies(this.startIndex, this.stopIndex)
          .subscribe(($response) => {
            if ($response.State)
              this._store.dispatch(
                new AgenciesActions.LoadAgencies($response.Data as Agence[])
              );
            else
              this._store.dispatch(
                new MessageActions.AddMessage($response.Data as Message)
              );
          })
      : null;

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
        .subscribe(($response) => {
          this._store.dispatch(
            new AgenciesActions.LoadAgencies($response.Data as Agence[])
          );

          this.initState();
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

        this._store.dispatch(
          new AgenciesActions.DeleteAccount(agence.AgenceId!)
        );
        this.initState();
        // this.agencies.splice(this.agencies.indexOf(agence), 1);
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
