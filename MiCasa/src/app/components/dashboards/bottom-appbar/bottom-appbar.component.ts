import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-appbar',
  templateUrl: './bottom-appbar.component.html',
  styleUrls: ['./bottom-appbar.component.scss'],
})
export class BottomAppbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Designed by:  Mauricio Bucardo
    // Original image:
    // https://dribbble.com/shots/5619509-Animated-Tab-Bar

    'use strict';

    const body = document.body;
    const bgColorsBody = [
      '#ffb457',
      '#ff96bd',
      '#9999fb',
      '#ffe797',
      '#cffff1',
    ];
    const menu = body.querySelector('.menu') as HTMLElement;
    const menuItems = menu.querySelectorAll('.menu__item');
    const menuBorder = menu.querySelector('.menu__border');
    let activeItem = menu.querySelector('.active');

    function clickItem(item: any, index: any) {
      menu.style.removeProperty('--timeOut');

      if (activeItem == item) return;

      if (activeItem) {
        activeItem.classList.remove('active');
      }

      item.classList.add('active');
      body.style.backgroundColor = bgColorsBody[index];
      activeItem = item;
      offsetMenuBorder(activeItem, menuBorder);
    }

    function offsetMenuBorder(element: any, menuBorder: any) {
      const offsetActiveItem = element.getBoundingClientRect();
      const left =
        Math.floor(
          offsetActiveItem.left -
            menu.offsetLeft -
            (menuBorder.offsetWidth - offsetActiveItem.width) / 2
        ) + 'px';
      menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
    }

    offsetMenuBorder(activeItem, menuBorder);

    menuItems.forEach((item, index) => {
      item.addEventListener('click', () => clickItem(item, index));
    });

    window.addEventListener('resize', () => {
      offsetMenuBorder(activeItem, menuBorder);
      menu.style.setProperty('--timeOut', 'none');
    });
  }
}
