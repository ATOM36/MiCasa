import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fadeIn } from '@animations/fade';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  animations: [fadeIn],
})
export class ImageCarouselComponent implements OnInit, AfterViewInit {
  assetImages = [
    /* {
      id: 1,
      path: 'assets/img/login/first.webp',
    },
    {
      id: 2,
      path: 'assets/img/login/second.webp',
    },*/
    {
      id: 3,
      path: 'assets/img/login/third.webp',
    },
    {
      id: 4,
      path: 'assets/img/login/fourth.webp',
    },
    {
      id: 5,
      path: 'assets/img/login/fifth.webp',
    },
    {
      id: 6,
      path: 'assets/img/login/sixth.webp',
    },
  ];

  showSkeleton: boolean = true;
  carouselState: string = 'skeleton';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.carouselState = 'image';
      this.showSkeleton = false;
    }, 500);
  }
}
