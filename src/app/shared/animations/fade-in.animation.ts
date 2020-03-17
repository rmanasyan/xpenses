import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('*', style({ position: 'absolute', top: 0, left: 0, width: '100%' })),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('210ms 90ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('90ms ease-in', style({ opacity:  0 }))
  ])
]);
