import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor(private router: Router, private _store: Store) {}

  ngOnInit(): void {
    setLocation(this.router.url);
    this._store.dispatch(new LocationActions.SetLocation(this.router.url));
  }
}
