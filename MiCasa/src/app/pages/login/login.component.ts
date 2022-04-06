import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { setLocation } from '@utility/location-handler';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  isLoading!: boolean;

  availableUpdate: boolean = true;

  wantsUpdate: boolean = false;

  constructor(private _router: Router, private _update: SwUpdate) {}

  ngOnInit(): void {
    //? Saving the current location's path
    setLocation('/login');

    this.isLoading = this.checkRefresh();
    sessionStorage.setItem('reloaded', 'yes');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isLoading) this.isLoading = false;
    }, 1200);
  }

  /**
   * @summary
   * @returns
   */
  checkRefresh = () => {
    // If the page has been refreshed
    if (sessionStorage.getItem('reloaded') != null) {
      return false;
    } else {
      return true;
    }
  };
}
