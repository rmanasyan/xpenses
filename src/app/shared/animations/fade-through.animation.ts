import { trigger, animate, transition, style, query, group } from '@angular/animations';

/**
 * https://material.io/design/motion/the-motion-system.html#fade-through
 */
export const fadeThrough = trigger('fadeThrough', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transformOrigin: 'top'
        })
      ],
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({
            opacity: 0,
            transform: 'scale(0.92)'
          }),
          animate(
            '210ms 90ms ease-out',
            style({
              opacity: 1,
              transform: 'scale(1)'
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          animate(
            '90ms ease-in',
            style({
              opacity: 0
            })
          )
        ],
        { optional: true }
      )
    ])
  ])
]);
