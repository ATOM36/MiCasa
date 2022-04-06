import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  ChildrenOutletContexts,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { routerAnimation } from '@animations/router.animation';
import { getAos } from '@utility/js-libraries';
import { loadAdminLinks, loadAgencyLinks } from '@utility/sidenav-links';

var AOS = getAos();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  hasRefreshed!: boolean;
  links: any;
  location!: string;
  displayWeather: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.getLocation();
    this.setLocationLinks();

    this.hasRefreshed = this.checkRefresh();
    sessionStorage.setItem('reload-loc', 'yes');

    if (this.hasRefreshed) {
      let location = localStorage.getItem('loc');
      this.router.navigate([`${location}`]);
    } else this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.location = event.url;

      if (event instanceof NavigationEnd) {
        if (this.location !== event.url) this.location = event.url;

        this.setLocationLinks();

        if (event.url.includes('login') || event.url.includes('not-found'))
          this.sidenav.close();
      }
    });
  }

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

  /**
   *
   * @param routerLink
   */
  lezgo(routerLink: string) {
    if (routerLink === '/login') {
      sessionStorage.clear();
      this.router.navigate([`${routerLink}`]);
    } else this.router.navigate([`${routerLink}`]);
  }

  /**
   *
   * @returns
   */
  checkLocation = () =>
    this.isInApp().includes('login') || this.isInApp().includes('not-found');

  /**
   *
   * @returns
   */
  getLocation = () => (this.location = localStorage.getItem('loc')!);

  setLocationLinks() {
    if (this.location.includes('admin')) this.links = loadAdminLinks();
    else if (this.location.includes('agency')) this.links = loadAgencyLinks();
  }

  isSmallScreen = () => window.screen.width <= 896;

  isInApp = (): string => window.location.href;
}
