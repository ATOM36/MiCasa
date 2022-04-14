import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setLocation } from '@utility/location-handler';

@Component({
  selector: 'app-agency',
  templateUrl: './agency-dashboard.component.html',
  styleUrls: ['./agency-dashboard.component.scss'],
})
export class AgencyDashboardComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation(this._router.url);
  }
}
