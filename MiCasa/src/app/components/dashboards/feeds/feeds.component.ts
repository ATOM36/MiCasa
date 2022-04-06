import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent implements OnInit {
  feeds: any;
  constructor() {}

  ngOnInit(): void {
    this.feeds = this.loadFeeds();
  }

  loadFeeds() {
    return [
      {
        class: 'info',
        icon: PrimeIcons.BELL,
        task: 'You have 4 pending tasks.',
        time: 'Just Now',
      },
      {
        class: 'success',
        icon: PrimeIcons.TRASH,
        task: 'Server #1 overloaded.',
        time: '2 Hours ago',
      },
      {
        class: 'warning',
        icon: PrimeIcons.SHOPPING_BAG,
        task: 'New order received.',
        time: '31 May',
      },
      {
        class: 'danger',
        icon: PrimeIcons.USER,
        task: 'New user registered.',
        time: '30 May',
      },
      {
        class: 'primary',
        icon: PrimeIcons.USER_EDIT,
        task: 'You have new password.',
        time: '21 May',
      },
    ];
  }
}
