import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    //? Saving the current location in case of page refresh
    setLocation(this._router.url);
    this._store.dispatch(new LocationActions.SetLocation(this._router.url));
  }
}
