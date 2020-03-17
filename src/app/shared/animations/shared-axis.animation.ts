import { trigger, animate, transition, style, query, group, animation, useAnimation } from '@angular/animations';

/**
 * https://material.io/design/motion/the-motion-system.html#shared-axis
 */
const zAxis = animation([
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transformOrigin: 'top'
    })
  ], { optional: true }),
  group([
    query(':enter', [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      group([
        animate('210ms 90ms ease-out', style({ opacity: 1 })),
        animate('255ms 45ms ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      group([
        animate('90ms ease-in', style({ opacity:  0 })),
        animate('255ms 45ms ease-in-out', style({ transform: 'scale(1.1)' }))
      ])
    ], { optional: true })
  ])
]);

const xAxis = animation([
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transformOrigin: 'top'
    })
  ], { optional: true }),
  group([
    query(':enter', [
      style({ opacity: 0, transform: 'translateX({{directionEnter}}30px)' }),
      group([
        animate('210ms 90ms ease-out', style({ opacity: 1 })),
        animate('255ms 45ms ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      group([
        animate('90ms ease-in', style({ opacity:  0 })),
        animate('255ms 45ms ease-in-out', style({ transform: 'translateX({{directionLeave}}30px)' }))
      ])
    ], { optional: true })
  ])
]);

export const sharedAxis = trigger('sharedAxis', [
  transition('* => categorized, * => history', [
    useAnimation(zAxis)
  ]),
  transition('* <=> *', [
    useAnimation(xAxis)
  ])
]);
