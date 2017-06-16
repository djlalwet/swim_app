import { trigger, state, style, transition, animate, keyframes} from '@angular/animations'

export const homeAnimations = [
    trigger('slideLogo', [
      state('show', style({
        display: 'block',
      })),
      state('hide', style({
        transform: 'translateY(-100%)',
      })),
      transition('show => hide', [
        animate(250, style({transform: 'translateY(-100%)'}))
      ]),
      transition('hide => show', [
        animate(250, style({transform: 'translateY(0)'}))
      ])
    ]),
    trigger('slideEventList', [
      state('show', style({
        display: 'block',
        transform: 'translateY(-120%)'
      })),
      state('hide', style({
        transform: 'translateY(0)'
      })),
      transition('show => hide', [
        animate(250, style({transform: 'translateY(0)'}))
      ]),
      transition('hide => show', [
        animate(250, style({transform: 'translateY(-120%)'}))
      ])
    ]),
  ];