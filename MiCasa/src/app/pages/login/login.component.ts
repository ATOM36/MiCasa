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

  availableUpdate: boolean = false;

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
    }, 2400);
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

  /**
   * @summary Whenever the app is launched, this function checks if an update has been deployed. If yes, then after `30s`
   * the user will be prompted to update the app.
   */
  checkUpdate(): void {
    //the pipe operator combines of three operators : switchMap, filter, and map
    this._update.versionUpdates
      .pipe(
        //switchMap is called when a new version is available
        //it subscribes to the afterDismissed Observable
        //afterDismissed emits when the snackBar is closed wheter using its API methods or clicking on the action button
        switchMap(() => this.showUpdateDialog())
      )
      .subscribe();
  }

  /**
   * @summary Displays a dialog where the user is prompted to update. The user has the free will to do it right now.
   * @returns An observable that describes whether or not the user has decided to update the app
   */
  showUpdateDialog = (): Observable<any> =>
    of(() =>
      this.wantsUpdate
        ? this._update.activateUpdate().then(() => location.reload())
        : null
    );
}
