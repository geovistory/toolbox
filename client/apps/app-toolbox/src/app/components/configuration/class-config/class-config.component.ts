import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OntoClassInfoComponent } from '../../misc/onto-class-info/onto-class-info.component';
import { ClassFieldsComponent } from '../class-fields/class-fields.component';
import { LabelsComponent } from '../labels/labels.component';


@Component({
  selector: 'gv-class-config',
  templateUrl: './class-config.component.html',
  styleUrls: ['./class-config.component.scss'],
  standalone: true,
  imports: [MatTabsModule, ClassFieldsComponent, LabelsComponent, OntoClassInfoComponent]
})
export class ClassConfigComponent {

  @Input() fkClass: number
  @Input() fkProject: number

}
