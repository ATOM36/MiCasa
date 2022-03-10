import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() components: any[] = [];
  links: any;
  location: string | undefined;
  isToggled: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadLinks();
    this.getLocation();
  }

  toggleDrawer = (state: boolean) => (this.isToggled = !state);

  isMobile = () => window.screen.width <= 900;

  loadLinks = () => {
    this.links = [
      {
        route: '/admin/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.HOME,
        tooltip: 'Aller au dashboard',
      },
      {
        route: '/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: 'Gérer vos informations personnelles',
      },
      {
        route: '/agency',
        label: 'Agences',
        icon: PrimeIcons.PLUS_CIRCLE,
        tooltip: 'Section des agences',
      },
      {
        route: '/users',
        label: 'Utilisateurs',
        icon: PrimeIcons.CALENDAR,
        tooltip: 'Section des utilisateurs',
      },
      {
        route: '/publications',
        label: 'Annonces',
        icon: PrimeIcons.STAR,
        tooltip: 'Section des annonces',
      },
      {
        route: '/reports',
        label: 'Les signalements',
        icon: PrimeIcons.DESKTOP,
        tooltip: 'Sections des signalements',
      },
      {
        route: '/login',
        label: 'Déconnexion',
        icon: PrimeIcons.SIGN_OUT,
        tooltip: 'Terminer votre session',
      },
    ];
  };

  getLocation = () =>
    (this.location = this.activatedRoute.snapshot.params['location']);
}
