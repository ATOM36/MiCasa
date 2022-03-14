import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';
import { AgencyStoreService } from '@services/stores/agency/agency-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
})
export class AgencyFormComponent implements OnInit {
  agency: Agence = {
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
  };

  subscription!: Subscription;

  constructor(
    private _service: AgencyService,
    private _agencyStore: AgencyStoreService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    console.table(this.agency);
  }

  showState = () => console.table(this.agency);

  lezgo() {
    sessionStorage.setItem('ag', JSON.stringify(this.agency));
    this._router.navigate(['/agency/account']);
  }
}
