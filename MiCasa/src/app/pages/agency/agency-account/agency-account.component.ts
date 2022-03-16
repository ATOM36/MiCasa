import { Component, OnDestroy, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';
import { AgencyStoreService } from '@services/stores/agency/agency-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-account',
  templateUrl: './agency-account.component.html',
  styleUrls: ['./agency-account.component.scss'],
})
export class AgencyAccountComponent implements OnInit, OnDestroy {
  agency!: Agence;

  subscription = new Subscription();

  constructor(private $agencyStore: AgencyStoreService) {}

  ngOnInit(): void {
    this.agency = JSON.parse(sessionStorage.getItem('a-x')!);
    alert(this.agency.Username);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
