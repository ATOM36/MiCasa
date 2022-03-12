import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  links: any;
  agencyLinks: any;
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
        icon: PrimeIcons.CHART_LINE,
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
        icon: PrimeIcons.BUILDING,
        tooltip: 'Section des agences',
      },
      {
        route: '/users',
        label: 'Utilisateurs',
        icon: PrimeIcons.USERS,
        tooltip: 'Section des utilisateurs',
      },
      {
        route: '/publications',
        label: 'Annonces',
        icon: PrimeIcons.IMAGE,
        tooltip: 'Section des annonces',
      },
      {
        route: '/reports',
        label: 'Les signalements',
        icon: PrimeIcons.THUMBS_DOWN,
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

  loadAgencyLinks = () => {
    this.agencyLinks = [
      {
        route: '/admin/agency/details',
        label: 'Consulter',
        icon: PrimeIcons.LIST,
        tooltip: "Consulter les données relatives à l'agence",
      },
      {
        route: '/admin/agency/create',
        label: 'Enregistrer',
        icon: PrimeIcons.PLUS_CIRCLE,
        tooltip: 'Ajouter une nouvelle agence sur la plateforme',
      },
      {
        route: '/admin/agency/update',
        label: 'Mettre à jour',
        icon: PrimeIcons.USER_EDIT,
        tooltip: "Modifier les informations relative l'agence",
      },
      {
        route: '/admin/agency/stat',
        label: 'Statut des agences',
        icon: PrimeIcons.CHART_LINE,
        tooltip: "Consulter le statut de l'agence",
      },
    ];
  };

  getLocation = () =>
    (this.location = this.activatedRoute.snapshot.params['location']);
}
