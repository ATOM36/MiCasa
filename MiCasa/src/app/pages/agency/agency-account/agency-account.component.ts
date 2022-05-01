import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agence } from '@models/api/agency';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { Subscription } from 'rxjs';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-agency-account',
  templateUrl: './agency-account.component.html',
  styleUrls: ['./agency-account.component.scss'],
})
export class AgencyAccountComponent implements OnInit, OnDestroy {
  agency!: Agence;

  subscription = new Subscription();

  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation(this._router.url);

    this._store.dispatch(new LocationActions.SetLocation(this._router.url));

    this.agency = this._store.selectSnapshot<Agence>((state) => state.agency);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
