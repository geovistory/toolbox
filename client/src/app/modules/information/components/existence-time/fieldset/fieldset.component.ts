// This is a generic component, used with child components!

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Fieldset } from './fieldset';
import { ExistenceTime } from '../existence-time';
import { Field } from '../field/field';

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

  @Input() formGroup: FormGroup;

  @Input() fieldset: Fieldset;

  @Input() existenceTime: ExistenceTime;


  @Output() onEdit: EventEmitter<Field> = new EventEmitter();
  @Output() onRemove: EventEmitter<Field> = new EventEmitter();
  @Output() onCancel: EventEmitter<Field> = new EventEmitter();
  @Output() onSubmit: EventEmitter<Field> = new EventEmitter();

  isExpanded: 'collapsed' | 'expanded';

  constructor() {
    this.isExpanded = 'collapsed'
  }

  ngOnInit() {
  }

  toggle() {
    this.isExpanded = (this.isExpanded === 'collapsed' ? 'expanded' : 'collapsed');
  }



}
