import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { setLocation } from '@utility/location-handler';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss'],
})
export class AgenceComponent implements OnInit {
  admin: Administrateur | undefined;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation(this._router.url);
  }
}
