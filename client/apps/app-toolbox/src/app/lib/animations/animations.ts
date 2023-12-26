import {
  animate,

  keyframes, state,
  style,

  transition, trigger
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


// export const openClose = trigger('openClose',
//   [
//     state('open', style({
//       height: '*',
//     })),
//     state('closed', style({
//       height: '0px',
//       overflow: 'hidden'
//     })),
//     transition('open => closed', animate('300ms ease-in-out', keyframes([
//       style({
//         height: '*',
//         overflow: 'hidden',
//         offset: 0
//       }),
//       style({
//         height: '0px',
//         display: 'hidden',
//         offset: 1
//       })
//     ]))),
//     transition('closed => open', animate('300ms ease-in-out', keyframes([
//       style({
//         height: '0px',
//         overflow: 'hidden',
//         offset: 0
//       }),
//       style({
//         height: '*',
//         display: 'hidden',
//         offset: 1
//       })
//     ])))
// ]);

export const openClose = trigger('openClose', [
  state('open', style({
    height: '*',
    overflow: 'hidden',
  })),
  state('closed', style({
    height: '0',
    overflow: 'hidden',
  })),
  transition('open <=> closed', [
    animate('300ms ease-out')
  ]),
  transition('* => closed', [
    animate('0s')
  ]),
  transition('* => open', [
    animate('0s')
  ]),
])
