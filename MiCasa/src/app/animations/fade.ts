import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition('void => *', animate('500ms ease-out')),
  state(
    'void',
    style({
      opacity: 0,
    })
  ),

  transition('skeleton => image', animate('1000ms 0ms ease-out')),
  state(
    'void',
    style({
      opacity: 0,
    })
  ),
]);
