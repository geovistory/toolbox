import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControlFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-control-factory';
import { FormControlConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormControlConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CtrlEntityComponent, CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanComponent } from '../ctrl-time-span/ctrl-time-span.component';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';
import { FormControlData, FormCreateEntityComponent } from '../form-create-entity/form-create-entity.component';
import { DisableIfHasStatement } from '../search-existing-entity/search-existing-entity.component';

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
export class FormControlComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() formControlFactory: FormControlFactory<FormControlData>

  @ViewChild(CtrlEntityComponent, { static: false }) ctrlEntity: CtrlEntityComponent;
  @ViewChild(CtrlTypeComponent, { static: false }) ctrlType: CtrlTypeComponent;
  @ViewChild(CtrlTimeSpanComponent, { static: false }) ctrlTimeSpan: CtrlTimeSpanComponent;

  public config: FormControlConfig<FormControlData>




  entityCtrlDisableStatement: DisableIfHasStatement;

  constructor(private createForm: FormCreateEntityComponent) { }

  ngOnInit() {
    this.config = this.formControlFactory.config

    if (this.config.data.controlType == 'ctrl-entity') {

      this.configureEntityCtrl();

      this.syncTeEnToAdd();
    }


  }


  private syncTeEnToAdd() {
    let pkTeEnToAdd;
    this.formControlFactory.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: CtrlEntityModel) => {
        if (pkTeEnToAdd) {
          const i = this.createForm.temporalEntitiesToAdd.indexOf(pkTeEnToAdd);
          this.createForm.temporalEntitiesToAdd.splice(i, 1);
        }
        if (this.config.data.ctrlEntity.model === 'temporal_entity' && val.pkEntity) {
          pkTeEnToAdd = val.pkEntity;
          this.createForm.temporalEntitiesToAdd.push(pkTeEnToAdd);
        }
      });
    this.destroy$.subscribe(() => {
      if (pkTeEnToAdd) {
        const i = this.createForm.temporalEntitiesToAdd.indexOf(pkTeEnToAdd);
        this.createForm.temporalEntitiesToAdd.splice(i, 1);
      }
    });
  }

  private configureEntityCtrl() {
    const lDef = this.config.data.field;
    if (lDef && lDef.identityDefiningForSource && lDef.sourceMaxQuantity !== -1) {
      this.entityCtrlDisableStatement = {
        sourceClassLabel: lDef.sourceClassLabel,
        propertyLabel: lDef.label,
        maxQuantity: lDef.sourceMaxQuantity,
        relatedStatement: {
          filter: {
            key: this.getKeyOfRelatedStatement(),
            value: (lDef.property.fkProperty || lDef.property.fkPropertyOfProperty)
          },
          relateBy: this.getRelateByOfRelatedStatement()
        }
      };
    }
  }

  getKeyOfRelatedStatement() {
    const lDef = this.config.data.field
    if (lDef.property.fkProperty) return 'fk_property';
    else if (lDef.property.fkPropertyOfProperty) return 'fk_property_of_property';
    console.error('key to relate related statement not found');
  }

  getRelateByOfRelatedStatement() {
    const lDef = this.config.data.field
    return lDef.isOutgoing ? 'fk_object_info' : 'fk_subject_info';
  }

  ngAfterViewInit() {
    const childComponents: ChildComponents = {
      ctrlEntity: this.ctrlEntity,
      ctrlType: this.ctrlType,
      ctrlTimeSpan: this.ctrlTimeSpan
    }
    this.formControlFactory.childComponent$.next(childComponents)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
