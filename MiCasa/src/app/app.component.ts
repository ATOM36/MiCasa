import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { routerAnimation } from '@animations/router.animation';
import * as AOS from 'aos';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { filter, map, Observable, of, switchMap, switchMapTo } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService],
  animations: [routerAnimation],
})
export class AppComponent implements OnInit {
  title = 'MiCasa';

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private _confirmationService: ConfirmationService,
    private _snackBar: MatSnackBar,
    private _update: SwUpdate
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.checkUpdate();
    this.router.navigate(['/loading']).then(() =>
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4200)
    );
  }

  getRouteAnimationData = () =>
    this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];

  checkUpdate() {
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

  showUpdateDialog = (): Observable<ConfirmationService> =>
    of(
      this._confirmationService.confirm({
        header: 'Mise à jour disponible',
        message:
          'Une nouvelle version est disponible !\nVoulez vous effectué une mise à jour ?',
        icon: 'pi pi-question-circle',
        accept: () => {
          this._update.activateUpdate().then(() => location.reload());
        },
      })
    );
}
