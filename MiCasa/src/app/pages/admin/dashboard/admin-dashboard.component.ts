import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setLocation } from '@utility/location-handler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    //? Saving the current location in case of page refresh
    setLocation(this._router.url);
  }
}
