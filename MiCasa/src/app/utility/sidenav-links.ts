import { PrimeIcons } from 'primeng/api';

export const loadAdminLinks = () => [
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
    routerLink: '/admin/users',
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

export const loadAgencyLinks = () => [
  {
    routerLink: '/agency/lelo/dashboard',
    label: 'Dashboard',
    icon: PrimeIcons.CHART_LINE,
    tooltip: "Consulter le dashboard de l'agence",
  },
  {
    routerLink: '/agency/lelo/account',
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
