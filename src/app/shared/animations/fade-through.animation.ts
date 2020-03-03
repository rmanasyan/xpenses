import { trigger, animate, transition, style, state } from '@angular/animations';

// https://material.io/design/motion/the-motion-system.html#fade-through
export const fadeThroughAnimation = trigger('fadeThroughAnimation', [
  state(
    '*',
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transformOrigin: 'top'
    })
  ),

  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.92)'
    }),

    animate(
      '210ms 90ms ease-in',
      style({
        opacity: 1,
        transform: 'scale(1)'
      })
    )
  ]),

  transition(':leave', [animate('90ms ease-out', style({ opacity: 0 }))])
]);
