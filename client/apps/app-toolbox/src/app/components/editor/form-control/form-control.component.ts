import { NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { FormControlFactory } from '../../../lib/form-factory/core/form-control-factory';
import { FormControlConfig } from '../../../lib/form-factory/types/FormControlConfig';
import { CtrlAppellationComponent } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlEntityComponent } from '../ctrl-entity/ctrl-entity.component';
import { CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';
import { CtrlPlatformVocabItemComponent } from '../ctrl-platform-vocab-item/ctrl-platform-vocab-item.component';
import { CtrlTimePrimitiveComponent } from '../ctrl-time-primitive/ctrl-time-primitive.component';
import { CtrlTimeSpanComponent } from '../ctrl-time-span/ctrl-time-span.component';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';
import { FormControlData } from '../form-create-data/form-create-data.component';
import { DisableIfHasStatement } from '../search-existing-entity/search-existing-entity.component';

export interface ChildComponents {
  ctrlEntity: CtrlEntityComponent,
  ctrlType: CtrlTypeComponent,
  ctrlTimeSpan: CtrlTimeSpanComponent
}

@Component({
  selector: 'gv-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  standalone: true,
  imports: [NgIf, MatFormFieldModule, CtrlAppellationComponent, FormsModule, ReactiveFormsModule, CtrlLanguageComponent, CtrlTimePrimitiveComponent, MatIconModule, CtrlTimeSpanComponent, CtrlEntityComponent, CtrlTypeComponent, CtrlPlatformVocabItemComponent]
})
export class FormControlComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() formControlFactory: FormControlFactory<FormControlData>

  @ViewChild(CtrlEntityComponent) ctrlEntity: CtrlEntityComponent;
  @ViewChild(CtrlTypeComponent) ctrlType: CtrlTypeComponent;
  @ViewChild(CtrlTimeSpanComponent) ctrlTimeSpan: CtrlTimeSpanComponent;

  public config: FormControlConfig<FormControlData>

  entityCtrlDisableStatement: DisableIfHasStatement;

  ngOnInit() {
    this.config = this.formControlFactory.config

    if (this.config.data.controlType.entity) {
      this.configureEntityCtrl();
    }
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
