import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Field } from '@kleiolab/lib-queries';
import { FormArrayChild, ParentFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-array-factory';
import { equals, sum } from 'ramda';
import { first } from 'rxjs/operators';
import { openClose } from '../../../information/shared/animations';
import { FgAppellationTeEnComponent } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';
import { ChildComponents } from '../form-control/form-control.component';
import { FormArrayData, FormChildData, FormControlData, FormCreateEntityComponent, LocalFormArrayFactory } from '../form-create-entity/form-create-entity.component';

@Component({
  selector: 'gv-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
  animations: [openClose]
})
export class FormArrayComponent implements OnInit, OnDestroy {

  @Input() formArrayFactory: LocalFormArrayFactory
  parent: ParentFactory<FormControlData, FormArrayData, FormChildData>;
  data: FormArrayData
  control: FormArray


  get parentListDefsLength() {
    return this.parent?.arrayFactory?.config?.data?.gvFormField?.field?.targetClasses?.length
  }

  showRemoveBtn(child: FormArrayChild<FormControlData, FormArrayData, FormChildData>) {
    return this.parentListDefsLength > 1 ||
      (
        (child.factoryType === 'control' || child.factoryType == 'childFactory')
        && this.parentLength > this.parentMinLength
        && !(
          (child?.controlFactory?.config.data.controlType) == 'ctrl-time-span'
        )
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
    return sum(this.formArrayFactory.control.controls.map((ctrl: FormArray) => ctrl.controls ? ctrl.controls.length : 0))
  }

  get parentMinLength() {
    return this.parent?.arrayFactory?.config?.data?.gvFormField?.minLength;
  }

  get parentLength() {
    const formArray = this.parent?.arrayFactory.control;
    if (formArray.controls && formArray.controls.length > 0) {
      return sum(formArray.controls.map((ctrl: FormArray) => ctrl.controls ? ctrl.controls.length : 0))
    }
    return 0;
  }


  constructor(
    private formCreateEntity: FormCreateEntityComponent,
  ) { }

  ngOnInit() {
    this.parent = this.formArrayFactory.parent
    this.data = this.formArrayFactory.config.data
    this.control = this.formArrayFactory.control
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
        return equals({ field: d.controlWrapper.field, targetClass: d.controlWrapper.targetClass }, { field, targetClass })
      }
      return false
    })

    // if not available, add a child FormArray containing the controls
    if (!formArrayChild) {
      const config = this.formCreateEntity.getControlWrapper(field, targetClass, undefined)
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
          if (childComponent.FgPlaceComponent) {
            (childComponent.FgPlaceComponent as FgPlaceComponent).focusOnCtrlLat()
          } else if (childComponent.FgLangStringComponent) {
            (childComponent.FgLangStringComponent as FgLangStringComponent).focusOnCtrlText()
          } else if (childComponent.FgDimensionComponent) {
            (childComponent.FgDimensionComponent as FgDimensionComponent).focusOnCtrlNumber()
          } else if (childComponent.FgAppellationTeEnComponent) {
            (childComponent.FgAppellationTeEnComponent as FgAppellationTeEnComponent).focusOnCtrlText()
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
