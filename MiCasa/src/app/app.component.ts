import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { routerAnimation } from '@animations/router.animation';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation],
})
export class AppComponent implements OnInit {
  title = 'MiCasa';

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit(): void {
    AOS.init();

    this.router.navigate(['/admin/dashboard']); /*.then(() =>
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4200)
    );*/
  }

  getRouteAnimationData = () =>
    this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];

  prepareOutlet = (outlet: RouterOutlet) =>
    outlet &&
    outlet.activatedRouteData &&
    outlet.activatedRouteData['animation'];
}
