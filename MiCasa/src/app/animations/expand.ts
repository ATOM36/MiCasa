import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expandAnimation = trigger('expand', [
  transition(
    ':enter',

    animate(
      '1500ms 500ms ease-out',
      style({
        opacity: 1,
        width: '100%',
      })
    )
  ),
]);
