import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgencyStoreService } from '@services/stores/agency/agency-store.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AgencyFormComponent implements OnInit {
  @Input() agency: Agence | undefined = {
    AgenceId: undefined,
    NumeroTelephone: undefined,
    Mail: undefined,
    Nom: undefined,
    Latitude: undefined,
    Longitude: undefined,
    DateInscription: undefined,
    IsBlocked: undefined,
    Adresse: undefined,
    Password: undefined,
    Username: undefined,
    Signalement: undefined,
  };

  @Input() decoyAgency: Agence | undefined;

  subscription!: Subscription;

  @Input() formAction!: string;

  @Output() editValidator = new EventEmitter<Agence>();

  @ViewChild('Password') password!: HTMLInputElement;
  @ViewChild('confirmPassword') confirmPassword!: HTMLInputElement;

  constructor(
    private _service: AgencyService,
    private _agencyStore: AgencyStoreService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {}

  showState = () => console.table(this.agency);

  lezgo() {
    sessionStorage.setItem('ag', JSON.stringify(this.agency));
    this._router.navigate(['/agency/account']);
  }

  validateEdit = () => this.editValidator.emit(this.agency);

  getAction = () =>
    this._activatedRoute.data.subscribe(($data) => {
      this.formAction = $data['action'];
    });

  updateAgency() {
    this._confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir modifier les informations de ${this.agency?.Nom} ?`,

      header: 'Confirmation en attente !',

      icon: 'pi pi-question-circle',

      accept: () => {
        this.validateEdit();
        this._messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${this.agency?.Nom} mis à jour avec succès`,
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
}
