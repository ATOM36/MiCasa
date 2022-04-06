import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setLocation } from '@utility/location-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    //? Saving the current path
    setLocation(this._router.url);
  }
}
