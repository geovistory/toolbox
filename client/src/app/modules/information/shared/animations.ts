import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

export const slideInOut = trigger('slideInOut',
  [
    state('expanded', style({
      height: '*',
    })),
    state('collapsed', style({
      height: '0px',
      overflow: 'hidden'
    })),
    transition('expanded => collapsed', animate('400ms ease-in-out', keyframes([
      style({
        height: '*',
        overflow: 'hidden',
        offset: 0
      }),
      style({
        height: '0px',
        display: 'hidden',
        offset: 1
      })
    ]))),
    transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
      style({
        height: '0px',
        overflow: 'hidden',
        offset: 0
      }),
      style({
        height: '*',
        display: 'hidden',
        offset: 1
      })
    ])))
  ]);
