import { PrimeIcons } from 'primeng/api';

export interface topcard {
  bgcolor: string;
  icon: string;
  title: string;
  subtitle: string;
}

export const topcards: topcard[] = [
  {
    bgcolor: 'success',
    icon: PrimeIcons.WALLET,
    title: '$21k',
    subtitle: 'Yearly Earning',
  },
  {
    bgcolor: 'danger',
    icon: PrimeIcons.CHART_PIE,
    title: '$1k',
    subtitle: 'Refund given',
  },
  {
    bgcolor: 'warning',
    icon: PrimeIcons.DATABASE,
    title: '456',
    subtitle: 'Yearly Project',
  },
  {
    bgcolor: 'info',
    icon: PrimeIcons.SHOPPING_BAG,
    title: '210',
    subtitle: 'Weekly Sales',
  },
];
