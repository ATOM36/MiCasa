import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    setLocation(this._router.url);
    this._store.dispatch(new LocationActions.SetLocation(this._router.url));
  }
}
