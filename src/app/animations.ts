import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(350),
  ]),
]);

export const swimUp = trigger('swimUp', [
  state(
    'in',
    style({
      opacity: 1,
      transform: 'translateY(0px)',
    })
  ),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(50px)',
    }),
    animate(250),
  ]),
]);
