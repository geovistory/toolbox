import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Field } from '@kleiolab/lib-queries';
import { equals } from 'ramda';
import { first } from 'rxjs/operators';
import { openClose } from '../../../information/shared/animations';
import { FgAppellationTeEnComponent } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';
import { ChildComponents } from '../form-control/form-control.component';
import { FormCreateEntityComponent, FormField, LocalFormArrayFactory } from '../form-create-entity/form-create-entity.component';

@Component({
  selector: 'gv-form-field-header',
  templateUrl: './form-field-header.component.html',
  styleUrls: ['./form-field-header.component.scss'],
  animations: [openClose]
})
export class FormFieldHeaderComponent {

  @Input() formArrayFactory: LocalFormArrayFactory;
  @Input() formField: FormField;
  @Input() control: FormArray;
  @Input() length: number;
  @Input() maxLength: number;

  constructor(
    private formCreateEntity: FormCreateEntityComponent,
  ) { }

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

  isInfinity(nb: number): boolean {
    return nb == Number.POSITIVE_INFINITY;
  }
}
