import { Component, Input, OnInit } from '@angular/core';
import { ClassItemI } from '../../containers/project-settings-data/api/project-settings-data.models';

@Component({
  selector: 'gv-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent {

  @Input() cla: ClassItemI;
  // @Input() highlightTerm: string;
}
