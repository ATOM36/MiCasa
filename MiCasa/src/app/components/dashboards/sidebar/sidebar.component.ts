import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { Agence } from '@models/api/agency';
import { Store } from '@ngxs/store';
import { getAdminLinks, getAgencyLinks } from '@utility/location-handler';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AdminActions } from 'src/app/store/actions/admin.action';
import { AgencyActions } from 'src/app/store/actions/agency.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  links!: MenuItem[];

  @Input() location!: string;

  @Input() isVisible!: boolean;

  @Output() closeNotifier = new EventEmitter<boolean>();

  @Input() agency: Agence | undefined;

  @Input() admin: Administrateur | undefined;

  displayWeather: boolean = false;

  constructor(private _router: Router, private _store: Store) {}

  ngOnInit(): void {
    //? Loading links depending on the context
    if (this.location?.includes('admin')) this.links = getAdminLinks();
    else if (this.location?.includes('agency')) this.links = getAgencyLinks();
  }

  lezgo(routerLink: string) {
    if (routerLink === '/login') {
      if (this.admin !== null)
        this._store.dispatch(
          new AdminActions.LogOut(this.admin?.AdministratorId!)
        );

      if (this.agency !== null)
        this._store.dispatch(new AgencyActions.LogOut(this.agency?.AgenceId!));

      sessionStorage.clear();
      this._router.navigate([`${routerLink}`]);
    } else this._router.navigate([`${routerLink}`]);
  }

  displayWeatherDialog = () => (this.displayWeather = true);

  notifyClosing = () => this.closeNotifier.emit(false);
}
