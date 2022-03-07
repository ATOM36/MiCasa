import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  assetImages = [
    {
      id: 1,
      path: 'assets/img/login/first.webp',
    },
    {
      id: 2,
      path: 'assets/img/login/second.webp',
    },
    {
      id: 3,
      path: 'assets/img/login/third.webp',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
