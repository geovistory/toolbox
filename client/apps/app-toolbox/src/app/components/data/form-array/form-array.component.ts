import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Field } from '@kleiolab/lib-redux';
import { equals, sum } from 'ramda';
import { first } from 'rxjs/operators';
import { FormArrayChild, ParentFactory } from '../../../modules/form-factory/core/form-array-factory';
import { openClose } from '../../../modules/information/shared/animations';
import { FgAppellationTeEnComponent } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';
import { ChildComponents, FormControlComponent } from '../form-control/form-control.component';
import type { FormArrayData, FormChildData, FormControlData, LocalFormArrayFactory } from '../form-create-data/form-create-data.component';
import { FormCreateDataService } from '../form-create-data/form-create-data.service';
import { FormFieldHeaderComponent } from '../form-field-header/form-field-header.component';
import { FormSectionHeaderComponent } from '../form-section-header/form-section-header.component';

@Component({
  selector: 'gv-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
  animations: [openClose],
  standalone: true,
  imports: [NgIf, FormSectionHeaderComponent, FormFieldHeaderComponent, NgFor, NgClass, FormControlComponent, PortalModule, MatIconModule, AsyncPipe]
})
export class FormArrayComponent implements OnInit, OnDestroy {

  @Input() formArrayFactory: LocalFormArrayFactory
  parent: ParentFactory<FormControlData, FormArrayData, FormChildData>;
  data: FormArrayData
  control: UntypedFormArray


  get targetClasssesLength() {
    return this.parent?.arrayFactory?.config?.data?.gvFormField?.field?.targetClasses?.length
  }

  showRemoveBtn(child: FormArrayChild<FormControlData, FormArrayData, FormChildData>) {
    const requiredLength = this.parent?.arrayFactory?.config?.data?.gvFormField?.config?.required;
    if (requiredLength) {
      const currentLength = this.parent?.arrayFactory?.children?.[0]?.arrayFactory?.children?.length;
      if (currentLength <= requiredLength) return false
    }
    if (this.parent?.arrayFactory?.config?.data?.gvFormField?.config?.hideRemoveBtn) return false
    return this.targetClasssesLength > 1 ||
      (
        (child.factoryType === 'control' || child.factoryType == 'childFactory')
        && this.parentLength > this.parentMinLength
      )
  }

  get maxLength() {
    if (this.formArrayFactory.config.data.gvFormField) {
      return this.formArrayFactory.config.data.gvFormField.maxLength;
    }
  }

  get minLength() {
    if (this.formArrayFactory.config.data.gvFormField) {
      return this.formArrayFactory.config.data.gvFormField.minLength;
    }
  }

  get length() {
    return sum(this.formArrayFactory.formArray.controls.map((ctrl: UntypedFormArray) => ctrl.controls ? ctrl.controls.length : 0))
  }

  get parentMinLength() {
    return this.parent?.arrayFactory?.config?.data?.gvFormField?.minLength;
  }

  get parentLength() {
    const formArray = this.parent?.arrayFactory?.formArray;
    if (formArray?.controls?.length > 0) {
      return sum(formArray.controls.map((ctrl: UntypedFormArray) => ctrl.controls ? ctrl.controls.length : 0))
    }
    return 0;
  }


  constructor(
    private formCreateDataService: FormCreateDataService,
  ) { }

  ngOnInit() {
    this.parent = this.formArrayFactory.parent
    this.data = this.formArrayFactory.config.data
    this.control = this.formArrayFactory.formArray
  }

  trackByFn(i: number, _) {
    return i
  }

  remove(i) {
    this.formArrayFactory.remove(i)
  }

  addItemInField(field: Field, targetClass: number) {

    // try to find the existing child FormArray containing the controls
    let formArrayChild = this.formArrayFactory.children.find(c => {
      if (c.arrayFactory) {
        const d = c.arrayFactory.config.data;
        return equals({ field: d.gvFieldItem.field, targetClass: d.gvFieldItem.targetClass }, { field, targetClass })
      }
      return false
    })

    // if not available, add a child FormArray containing the controls
    if (!formArrayChild) {
      const config = this.formCreateDataService.component.getFieldItem(field, targetClass, undefined)
      config.array.addOnInit = 0;
      formArrayChild = this.formArrayFactory.prepend(config)
    }
    const arrayChild = formArrayChild.arrayFactory.prependDefault()

    // Do some actions after the control is added
    if (arrayChild.controlFactory) {

      // Wait for the controls to be initialized by angular and emitted by childFactory
      arrayChild.controlFactory.childComponent$
        .pipe(first())
        .subscribe((childComponents: ChildComponents) => {
          // if child is gv-ctrl-entity
          if (childComponents.ctrlEntity) {
            childComponents.ctrlEntity.onContainerClick();
          }
          // if child is gv-ctrl-entity
          else if (childComponents.ctrlType) {
            childComponents.ctrlType.onContainerClick();
          }
          else if (childComponents.ctrlTimeSpan) {
            childComponents.ctrlTimeSpan.onContainerClick();
          }

        })
    }
    else if (arrayChild.childFactory) {
      arrayChild.childFactory.childComponent$
        .pipe(first())
        .subscribe((childComponent) => {
          if (childComponent['FgPlaceComponent']) {
            (childComponent['FgPlaceComponent'] as FgPlaceComponent).focusOnCtrlLat()
          } else if (childComponent['FgLangStringComponent']) {
            (childComponent['FgLangStringComponent'] as FgLangStringComponent).focusOnCtrlText()
          } else if (childComponent['FgDimensionComponent']) {
            (childComponent['FgDimensionComponent'] as FgDimensionComponent).focusOnCtrlNumber()
          } else if (childComponent['FgAppellationTeEnComponent']) {
            (childComponent['FgAppellationTeEnComponent'] as FgAppellationTeEnComponent).focusOnCtrlText()
          }
        })
    }

  }

  ngOnDestroy() {
    if (this.formArrayFactory.config.data.removeHook) {
      this.formArrayFactory.config.data.removeHook(this.formArrayFactory.config.data)
    }
  }

}
