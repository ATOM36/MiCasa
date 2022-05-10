import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-client-contract',
  templateUrl: './client-contract.component.html',
  styleUrls: ['./client-contract.component.scss'],
})
export class ClientContractComponent implements OnInit {
  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation(this._router.url);
    this._store.dispatch(new LocationActions.SetLocation(this._router.url));
  }
}
