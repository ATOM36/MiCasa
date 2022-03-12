import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  ressources = [
    {
      icon: PrimeIcons.FACEBOOK,
      link: '#',
      id: 0,
    },
    {
      icon: PrimeIcons.TWITTER,
      link: '#',
      id: 1,
    },
    {
      icon: PrimeIcons.YOUTUBE,
      link: '#',
      id: 2,
    },
    {
      icon: PrimeIcons.INSTAGRAM,
      link: '#',
      id: 3,
    },
    {
      icon: PrimeIcons.TELEGRAM,
      link: '#',
      id: 4,
    },
  ];

  currentYear = new Date().getFullYear();
  constructor() {}

  ngOnInit(): void {}

  trackFunc = (index: number, ressource: any) => ressource.id;
}
