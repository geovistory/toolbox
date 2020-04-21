import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormControlConfig } from 'app/modules/form-factory/services/form-factory.service';
import { CtrlEntityComponent } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';
import { FormControlData } from '../form-create-entity/form-create-entity.component';
import { CtrlTimeSpanComponent } from '../ctrl-time-span/ctrl-time-span.component';
import { SearchExistingRelatedStatement, DisableIfHasStatement } from '../pe-it-search-existing/pe-it-search-existing.component';

export interface ChildComponents {
  ctrlEntity: CtrlEntityComponent,
  ctrlType: CtrlTypeComponent,
  ctrlTimeSpan: CtrlTimeSpanComponent
}

@Component({
  selector: 'gv-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit, AfterViewInit {


  @Input() formControlFactory: FormControlFactory<FormControlData>

  @ViewChild(CtrlEntityComponent, { static: false }) ctrlEntity: CtrlEntityComponent;
  @ViewChild(CtrlTypeComponent, { static: false }) ctrlType: CtrlTypeComponent;
  @ViewChild(CtrlTimeSpanComponent, { static: false }) ctrlTimeSpan: CtrlTimeSpanComponent;

  public config: FormControlConfig<FormControlData>




  entityCtrlDisableStatement: DisableIfHasStatement;

  constructor() { }

  ngOnInit() {
    this.config = this.formControlFactory.config

    const lDef = this.config.data.listDefinition
    if (lDef && lDef.identityDefiningForSource && lDef.sourceMaxQuantity === 1) {
      this.entityCtrlDisableStatement = {
        sourceClassLabel: lDef.sourceClassLabel,
        propertyLabel: lDef.label,
        relatedStatement: {
          filter: {
            key: this.getKeyOfRelatedStatement(),
            value: (lDef.property.pkProperty || lDef.property.pkPropertyOfProperty)
          },
          relateBy: this.getRelateByOfRelatedStatement()
        }
      }
    }

  }

  getKeyOfRelatedStatement() {
    const lDef = this.config.data.listDefinition
    if (lDef.property.pkProperty) return 'fk_property';
    else if (lDef.property.pkPropertyOfProperty) return 'fk_property_of_property';
    console.error('key to relate related statement not found');
  }

  getRelateByOfRelatedStatement() {
    const lDef = this.config.data.listDefinition
    return lDef.isOutgoing ? 'fk_entity' : 'fk_temporal_entity';
  }

  ngAfterViewInit() {
    const childComponents: ChildComponents = {
      ctrlEntity: this.ctrlEntity,
      ctrlType: this.ctrlType,
      ctrlTimeSpan: this.ctrlTimeSpan
    }
    this.formControlFactory.childComponent$.next(childComponents)
  }


}
