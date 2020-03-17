import { animate, group, query, style, transition, trigger } from '@angular/animations';

/**
 * https://material.io/design/motion/the-motion-system.html#fade
 */
export const fade = trigger('fade', [
  transition(':enter', [
    group([
      query('.animation-dialog', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        group([
          animate('45ms ease-in', style({ opacity: 1 })),
          animate('150ms ease-out', style({ transform: 'scale(1)' }))
        ])
      ]),
      query('.animation-scrim', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: '*' }))
      ])
    ]),
  ]),
  transition(':leave', [
    query('.animation-dialog, .animation-scrim', [
      animate('75ms ease-in', style({ opacity: 0 }))
    ])
  ])
]);
