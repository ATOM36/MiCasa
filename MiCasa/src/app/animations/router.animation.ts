import {
  transition,
  trigger,
  style,
  query,
  group,
  animate,
  animateChild,
} from '@angular/animations';

export const routerAnimation = trigger('routing', [
  // from login to home
  transition('login => home', [
    //! During a transition, a new view is inserted directly after the old one and both elements appear on screen at the same time.
    //! To prevent this behavior, update the host view to use relative positioning.
    style({ position: 'relative' }),

    //? Update the removed and inserted child views to use absolute positioning.
    //? Adding these styles to the views animates the containers in place and prevents one view from affecting the position of the other on the page.
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),

    query(':enter', [style({ left: '-100%' })]),

    query(':leave', animateChild()),

    group([
      query(':leave', [animate('600ms ease-out', style({ left: '100%' }))]),

      query(':enter', [animate('600ms ease-out', style({ left: '0%' }))]),
    ]),
  ]),

  //?from home to login
  transition('home => login', [
    style({ position: 'relative' }),

    query(':enter, :leave', [
      style({
        position: 'absoulte',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),

    query(':enter', [style({ right: '-100%' })]),

    query(':leave', animateChild()),

    group([
      query(':leave', [animate('600ms ease-out', style({ right: '100%' }))]),

      query(':enter', animate('600ms ease-out', style({ right: '0%' }))),
    ]),
  ]),

  //? from login to admin
  transition('login => admin', [
    style({ position: 'relative' }),

    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),

    query(':enter', [style({ right: '-100%' })]),

    query(':leave', animateChild()),

    group([
      query(':leave', [animate('600ms ease-out', style({ right: '100%' }))]),

      query(':enter', [animate('600ms ease-out', style({ right: '0%' }))]),
    ]),
  ]),
]);
