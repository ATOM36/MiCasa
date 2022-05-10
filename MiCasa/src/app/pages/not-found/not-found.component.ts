import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private _store: Store, private _router: Router) {}

  ngOnInit(): void {
    setLocation(this._router.url);
    this._store.dispatch(new LocationActions.SetLocation(this._router.url));
  }
}
