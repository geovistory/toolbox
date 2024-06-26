import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

export enum SliderEnum {
    left = 'left',
    right = 'right',
    center = 'center'
}

@Component({
    selector: 'gv-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('leftRight', [
            state('left', style({
                'box-sizing': 'border-box',
                height: '100%',
                display: 'flex',
                width: '150%',
                'margin-left': 0
            })),
            state('right', style({
                'box-sizing': 'border-box',
                height: '100%',
                display: 'flex',
                width: '150%',
                'margin-left': '-50%'
            })),
            state('center', style({
                'box-sizing': 'border-box',
                height: '100%',
                display: 'flex',
                width: '300%',
                'margin-left': '0'
            })),
            transition('left <=> right', [group([query('.divider', style({ opacity: 1 })), animate('300ms ease-out')])])
        ]),
        trigger('divider', [
            state('off', style({ opacity: 0 })),
            state('on', style({ opacity: 1 }))
        ])
    ],
    standalone: true,
    imports: [MatDividerModule]
})
export class SliderComponent {

    @Input() slide?: 'left' | 'right' | 'center' = 'left';
    @Input() right: ''

    constructor() { }

    slideRight() {
        this.slide = 'right';
    }

    slideLeft() {
        this.slide = 'left';
    }

}
