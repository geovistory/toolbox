import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClassItemI } from '../../containers/project-settings-data/api/project-settings-data.models';

@Component({
  selector: 'gv-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent {

  @Input() cla: ClassItemI;
  @Output() enable = new EventEmitter<void>();
  @Output() disable = new EventEmitter<void>();
  @Output() configure = new EventEmitter<void>();

  get enabled(): boolean {
    return !this.cla.projRel ? false : this.cla.projRel.is_in_project;
  }
}
