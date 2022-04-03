import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { routerAnimation } from '@animations/router.animation';
import { getAos } from '@utility/js-libraries';

var AOS = getAos();
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
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit(): void {
    AOS.init();

    this.hasRefreshed = this.checkRefresh();
    sessionStorage.setItem('reload-loc', 'yes');

    if (this.hasRefreshed) {
      let location = localStorage.getItem('loc');
      this.router.navigate([`${location}`]);
    } else this.router.navigate(['/admin/dashboard']);
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
}
