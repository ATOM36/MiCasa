import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngxs/store';
import { setLocation } from '@utility/location-handler';
import { Observable, of, switchMap } from 'rxjs';
import { LocationActions } from 'src/app/store/actions/location.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  isLoading!: boolean;

  availableUpdate: boolean = true;

  wantsUpdate: boolean = false;

  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    this.removeToken();

    //? Saving the current location's path
    setLocation(this._router.url);
    this._store.dispatch(new LocationActions.SetLocation(this._router.url));

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

  removeToken = () =>
    localStorage.getItem('token') ? localStorage.removeItem('token') : null;
}
