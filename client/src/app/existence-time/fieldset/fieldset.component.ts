// This is a generic component, used with child components!

import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Fieldset } from './fieldset';

@Component({
  selector: 'gv-fieldset',
  template: '<p>this is a generic component, use one of the child classes instead</p>',
  styles: [],
  animations: [
    trigger('slideInOut', [
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
    ])
  ]
})
export class FieldsetComponent implements OnInit {

  @Input() fieldset: Fieldset;

  isExpanded: 'collapsed' | 'expanded';

  constructor() { }

  ngOnInit() {
  }



}
