import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { OntoPropertyInfoComponent } from '../../misc/onto-property-info/onto-property-info.component';
import { LabelsComponent } from '../labels/labels.component';

@Component({
  selector: 'gv-field-config',
  templateUrl: './field-config.component.html',
  styleUrls: ['./field-config.component.scss'],
  standalone: true,
  imports: [MatTabsModule, LabelsComponent, OntoPropertyInfoComponent]
})
export class FieldConfigComponent implements OnInit {
  @Input() fkProject: number

  @Input() fkSourceClass: number
  @Input() isOutgoing: boolean
  @Input() fkProperty: number
  @Input() fkPropertyDomain?: number
  @Input() fkPropertyRange?: number

  fieldLabel$: Observable<string>;

  constructor(
    private c: ConfigurationPipesService
  ) { }

  ngOnInit() {
    this.fieldLabel$ = this.c.pipeFieldLabel(this.fkSourceClass, this.isOutgoing, this.fkProperty)

  }

}
