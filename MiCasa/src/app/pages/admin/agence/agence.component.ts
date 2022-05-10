import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss'],
})
export class AgenceComponent implements OnInit {
  admin: Administrateur | undefined;
  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation(this._router.url);
    this._store.dispatch(new LocationActions.SetLocation(this._router.url));
  }
}
