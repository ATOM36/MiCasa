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
  }
}
