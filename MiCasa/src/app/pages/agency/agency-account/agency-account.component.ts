import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { setLocation } from '@utility/location-handler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-account',
  templateUrl: './agency-account.component.html',
  styleUrls: ['./agency-account.component.scss'],
})
export class AgencyAccountComponent implements OnInit, OnDestroy {
  agency!: Agence;

  subscription = new Subscription();

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation(this._router.url);

    this.agency = JSON.parse(localStorage.getItem('a-x')!);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
