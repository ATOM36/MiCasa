import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls: ['./top-cards.component.scss'],
})
export class TopCardsComponent implements OnInit {
  topcards: any;

  constructor() {}

  ngOnInit(): void {
    this.topcards = this.loadData();
  }

  /**
   * @returns Fake data that will be displayed
   */
  loadData() {
    return [
      {
        bgcolor: 'success',
        icon: PrimeIcons.DOLLAR,
        title: '21,000 DT',
        subtitle: 'Revenus annuels',
      },
      {
        bgcolor: 'danger',
        icon: PrimeIcons.BUILDING,
        title: '15',
        subtitle: 'Agences inscrites',
      },
      {
        bgcolor: 'warning',
        icon: PrimeIcons.USERS,
        title: '456',
        subtitle: 'Utilisateurs inscrits',
      },
      {
        bgcolor: 'info',
        icon: PrimeIcons.CHART_LINE,
        title: '210',
        subtitle: 'Annonces',
      },
    ];
  }
}
