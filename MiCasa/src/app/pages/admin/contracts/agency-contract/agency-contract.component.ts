import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setLocation } from '@utility/location-handler';

@Component({
  selector: 'app-agency-contract',
  templateUrl: './agency-contract.component.html',
  styleUrls: ['./agency-contract.component.scss'],
})
export class AgencyContractComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    setLocation(this._router.url);
  }
}
