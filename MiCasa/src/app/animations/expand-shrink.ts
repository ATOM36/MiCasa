import {
  transition,
  trigger,
  style,
  query,
  group,
  animate,
  animateChild,
} from '@angular/animations';

export const expandShrinkAnimation = trigger('expandShrink', [
  transition('hide <=> show', [
    group([
      query('hide', [animate('300ms ease-out', style({ width: '0%' }))]),

      query('show', [
        animate('300ms 320ms ease-out', style({ width: '100%' })),
      ]),
    ]),
  ]),
]);
