import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { Agence } from '@models/api/agency';
import { Store } from '@ngxs/store';
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
    // Loading links depending on the context
    if (this.location?.includes('admin')) this.loadLinks();
    else if (this.location?.includes('agency')) this.loadAgencyLinks();
  }

  loadLinks = () => {
    this.links = [
      {
        routerLink: '/admin/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.CHART_LINE,
        tooltip: 'Aller au dashboard',
      },
      {
        routerLink: '/admin/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: 'Gérer vos informations personnelles',
      },
      {
        routerLink: '/admin/agence',
        label: 'Agences',
        icon: PrimeIcons.BUILDING,
        tooltip: 'Section des agences',
      },
      {
        routerLink: '/admin/contracts/agence',
        label: "Contrats d'agence",
        icon: PrimeIcons.BOOK,
        tooltip: 'Les contrats relatifs aux agences',
      },
      {
        routerLink: '/admin/contracts/clients',
        label: 'Contrats de clients',
        icon: PrimeIcons.BOOK,
        tooltip: 'Les contrats relatifs aux clients',
      },
      {
        routerLink: '/admin/user',
        label: 'Utilisateurs',
        icon: PrimeIcons.USERS,
        tooltip: 'Section des utilisateurs',
      },
      {
        routerLink: '/admin/publications',
        label: 'Annonces',
        icon: PrimeIcons.IMAGE,
        tooltip: 'Section des annonces',
      },
      {
        routerLink: '/admin/reports',
        label: 'Les signalements',
        icon: PrimeIcons.THUMBS_DOWN,
        tooltip: 'Sections des signalements',
      },
      {
        label: 'Météo',
        icon: PrimeIcons.CLOUD,
        tooltip: 'Affiche la météo locale',
      },
      {
        routerLink: '/login',
        label: 'Déconnexion',
        icon: PrimeIcons.SIGN_OUT,
        tooltip: 'Terminer votre session',
      },
    ];
  };

  loadAgencyLinks = () => {
    this.links = [
      {
        routerLink: '/agency/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.CHART_LINE,
        tooltip: "Consulter le dashboard de l'agence",
      },
      {
        routerLink: '/agency/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: "Consulter les données relatives à l'agence",
      },
      {
        routerLink: '/agency/create',
        label: 'Publier une annonce',
        icon: PrimeIcons.PLUS_CIRCLE,
        tooltip: 'Ajouter une nouvelle annonce sur la plateforme',
      },
      {
        routerLink: '/agency/:name/contracts',
        label: 'Vos contrats',
        icon: PrimeIcons.BOOK,
        tooltip: 'Consulter vos contrats',
      },
      {
        routerLink: '/agency/publications',
        label: 'Vos annonces',
        icon: PrimeIcons.IMAGES,
        tooltip: 'Consulter toutes les annonces que vous avez publié',
      },
      {
        routerLink: '/agency/edit',
        label: 'Mettre à jour',
        icon: PrimeIcons.USER_EDIT,
        tooltip: "Modifier les informations relative l'agence",
      },
      {
        routerLink: '/login',
        label: 'Déconnexion',
        icon: PrimeIcons.SIGN_OUT,
        tooltip: 'Terminer votre session',
      },
    ];
  };

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
