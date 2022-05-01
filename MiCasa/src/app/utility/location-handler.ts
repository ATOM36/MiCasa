import { PrimeIcons } from 'primeng/api';

/**
 * @summary Whenever a new page is loaded, then it's path will be registered so that
 * if can be used directly if the same page is refreshed
 * @param location The new path the will be used if the page is refreshed
 */
export const setLocation = (location: string): void => {
  if (localStorage.getItem('loc') != null) localStorage.removeItem('loc');
  localStorage.setItem('loc', location);
};

/**
 * @summary Retrieves the latest `path` used by the `router` so that on `refresh`, the same page will be reloaded
 * @returns The current path used by the router
 */
export const getLocation = (): string | null => localStorage.getItem('loc');

/**
 * @returns A list of links to be displayed in the sidebar for the admin's navigation purpose
 */
export const getAdminLinks = () => [
  {
    routerLink: '/admin/dashboard',
    label: 'Dashboard',
    icon: PrimeIcons.CHART_LINE,
    tooltip: 'Aller au dashboard',
  },
  {
    routerLink: '/home',
    label: 'Accueil',
    icon: PrimeIcons.HOME,
    tooltip: "Aller à l'accueil",
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

/**
 * @returns A list of links to be displayed in the sidebar for the agency's navigation purpose
 */
export const getAgencyLinks = () => [
  {
    routerLink: '/agency/dashboard',
    label: 'Dashboard',
    icon: PrimeIcons.CHART_LINE,
    tooltip: 'Consulter votre dashboard',
  },
  {
    routerLink: '/home',
    label: 'Accueil',
    icon: PrimeIcons.HOME,
    tooltip: "Aller à l'accueil",
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
    routerLink: '/login',
    label: 'Déconnexion',
    icon: PrimeIcons.SIGN_OUT,
    tooltip: 'Terminer votre session',
  },
];

/**
 * @returns A list of links to be displayed in the sidebar for the client's navigation purpose
 */
export const getClientLinks = () => [];
