import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  ChildrenOutletContexts,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { routerAnimation } from '@animations/router.animation';
import { Agence } from '@models/api/agency';
import { AgencyService } from '@services/api/agency/agency.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation],
})
export class AppComponent implements OnInit, AfterViewInit {
  hasRefreshed!: boolean;

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private _agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    AOS.init();

    this.hasRefreshed = this.checkRefresh();
    sessionStorage.setItem('reload-loc', 'yes');

    if (this.hasRefreshed) {
      let location = localStorage.getItem('loc');
      this.router.navigate([`${location}`]);
    } else this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {}

  /**
   *@summary
   */
  setRefreshState = (): NodeJS.Timeout =>
    setTimeout(() => {
      if (this.hasRefreshed) this.hasRefreshed = false;
    }, 2400);

  /**
   * @summary Clears the localStorage whenever the app is laucnhed, thus the refresh system won't have problems
   */
  clearMemory = (): void => localStorage.clear();

  /**
   * @summary
   * @returns
   */
  checkRefresh = () => {
    // If the page has been refreshed
    if (sessionStorage.getItem('reload-loc') != null) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @summary Retrieves metadata about the current route that is being used in order to trigger a given
   * animation
   * @returns The animation data's value
   */
  getRouteAnimationData = () =>
    this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];

  trackNavigation = () =>
    this.router.events.subscribe((event) => {
      let fromAgency, isOut;
      let agency!: Agence;

      if (event instanceof NavigationStart) {
        fromAgency = event.url.includes('agency');

        if (fromAgency) {
          agency = JSON.parse(localStorage.getItem('a-x')!);
        }
      }

      if (event instanceof NavigationEnd) {
        isOut = event.url.includes('login');

        if (fromAgency && isOut)
          this._agencyService.logOut(agency.Compte?.CompteId!);
      }
    });

  trackLocation = () =>
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        sessionStorage.setItem('test', event.url);
    });
}
