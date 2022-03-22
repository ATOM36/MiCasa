import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { Agence } from '@models/api/agency';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  links: any;

  @Input() location!: string;

  @Input() isVisible!: boolean;

  @Output() closeNotifier = new EventEmitter<boolean>();

  @Input() agency: Agence | undefined;

  @Input() admin: Administrateur | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Loading links depending on the context
    if (this.location?.includes('admin')) this.loadLinks();
    else if (this.location?.includes('agency')) this.loadAgencyLinks();
  }

  loadLinks = () => {
    this.links = [
      {
        route: '/admin/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.CHART_LINE,
        tooltip: 'Aller au dashboard',
      },
      {
        route: '/admin/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: 'Gérer vos informations personnelles',
      },
      {
        route: '/admin/agence',
        label: 'Agences',
        icon: PrimeIcons.BUILDING,
        tooltip: 'Section des agences',
      },
      {
        route: '/admin/users',
        label: 'Utilisateurs',
        icon: PrimeIcons.USERS,
        tooltip: 'Section des utilisateurs',
      },
      {
        route: '/admin/publications',
        label: 'Annonces',
        icon: PrimeIcons.IMAGE,
        tooltip: 'Section des annonces',
      },
      {
        route: '/admin/reports',
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
    this.links = [
      {
        route: '/agency/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.CHART_LINE,
        tooltip: "Consulter le dashboard de l'agence",
      },
      {
        route: '/agency/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: "Consulter les données relatives à l'agence",
      },
      {
        route: '/agency/create',
        label: 'Publier une annonce',
        icon: PrimeIcons.PLUS_CIRCLE,
        tooltip: 'Ajouter une nouvelle annonce sur la plateforme',
      },
      {
        route: '/agency/publications',
        label: 'Vos annonces',
        icon: PrimeIcons.IMAGES,
        tooltip: 'Consulter toutes les annonces que vous avez publié',
      },
      {
        route: '/agency/edit',
        label: 'Mettre à jour',
        icon: PrimeIcons.USER_EDIT,
        tooltip: "Modifier les informations relative l'agence",
      },
      {
        route: '/login',
        label: 'Déconnexion',
        icon: PrimeIcons.SIGN_OUT,
        tooltip: 'Terminer votre session',
      },
    ];
  };

  lezgo(route: string) {
    if (route === '/login') {
      sessionStorage.clear();
      this.router.navigate([`${route}`]);
    } else this.router.navigate([`${route}`]);
  }

  notifyClosing = () => this.closeNotifier.emit(false);
}
