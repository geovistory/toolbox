import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Field } from '@kleiolab/lib-redux';
import { equals } from 'ramda';
import { first } from 'rxjs/operators';
import { openClose } from '../../../lib/animations/animations';
import { getFormTargetClasses } from '../../../lib/converters/getFormTargetClasses';
import { FgAppellationTeEnComponent } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';
import { ChildComponents } from '../form-control/form-control.component';
import type { FormField, LocalFormArrayFactory } from '../form-create-data/form-create-data.component';
import { FormCreateDataService } from '../form-create-data/form-create-data.service';
export interface TargetClassOption { label: string, pkClass: number }

@Component({
  selector: 'gv-form-field-header',
  templateUrl: './form-field-header.component.html',
  styleUrls: ['./form-field-header.component.scss'],
  animations: [openClose],
  standalone: true,
  imports: [NgIf, MatTooltipModule, MatDividerModule, MatIconModule, MatMenuModule, NgFor]
})
export class FormFieldHeaderComponent implements OnInit {

  @Input() formArrayFactory: LocalFormArrayFactory;
  @Input() formField: FormField;
  @Input() control: UntypedFormArray;
  @Input() length: number;
  @Input() maxLength: number;

  targetClasses: TargetClassOption[]
  targetClassLabel: string

  constructor(
    private formCreateDataService: FormCreateDataService,
  ) { }
  ngOnInit() {

    this.targetClasses = getFormTargetClasses(this.formField?.field).
      map(target => ({ label: target.targetClassLabel, pkClass: target.targetClass }));
    this.targetClassLabel = this.targetClasses.map(t => t.label).join(' / ')
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

  isInfinity(nb: number): boolean {
    return nb == Number.POSITIVE_INFINITY;
  }
}


