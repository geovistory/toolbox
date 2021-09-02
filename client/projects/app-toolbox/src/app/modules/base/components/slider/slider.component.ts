import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'gv-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('leftRight', [
            state(
                'left',
                style({
                    'box-sizing': 'border-box',
                    height: '100%',
                    display: 'flex',
                    width: '150%',
                    'margin-left': 0
                })
            ),
            state(
                'right',
                style({
                    'box-sizing': 'border-box',
                    height: '100%',
                    display: 'flex',
                    width: '150%',
                    'margin-left': '-50%'
                })
            ),
            transition('left <=> right', [group([query('.divider', style({ opacity: 1 })), animate('300ms ease-out')])])
        ]),
        trigger('divider', [
            state('off', style({ opacity: 0 })),
            state('on', style({ opacity: 1 }))
        ])
    ]
})
export class SliderComponent {

    @Input() slide?: 'left' | 'right' = 'left';

    constructor() { }

    slideRight() {
        this.slide = 'right';
    }

    slideLeft() {
        this.slide = 'left';
    }

}
