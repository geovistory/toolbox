import { FormControl, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import { mapObjIndexed } from '../../../../../../node_modules/@types/ramda';
import { BehaviorSubject } from '../../../../../../node_modules/rxjs';
import { map, shareReplay } from '../../../../../../node_modules/rxjs/operators';
import { InfAppellation, InfLanguage, InfPlace, InfRole, InfTextProperty, U } from '../../../../core';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { ListDefinition } from '../properties-tree/properties-tree.models';
import { FormControlDefinition, MergeDef } from './create-role-form.component';
import { DfhConfig } from '../../shared/dfh-config';
export interface FormItem {
  fixed?: boolean; // if true, user can't change this item
  required: boolean;
  classSelect: true | false | 'disabled'
  formControlDef?: FormControlDefinition
}
export interface FormPartInitValueRole {
  targetClass: number
  fkProperty: number
  value: number | InfAppellation | InfPlace | InfLanguage
}

export interface FormPartInitValueTextProperty {
  fkClassField: number
  value: InfTextProperty
}
export type FormPartInitValue = {
  initListDefinition: ListDefinition
  initTextProperty?: FormPartInitValueTextProperty
  initRole?: FormPartInitValueRole
  initTimeSpan?: CtrlTimeSpanDialogResult
}

export class FormPart {
  this$ = new BehaviorSubject(this)

  _classSelect = false;
  get classSelect() {
    return this._classSelect
  }
  set classSelect(val: boolean) {
    this._classSelect = val
    this.this$.next(this);
  }

  public items: FormItem[] = []

  constructor(
    public formGroup: FormGroup,
    public title: string,
    public listDefinitions: ListDefinition[],
    public initVal: FormPartInitValue,
    public resultTemplate,
    public mergeDef: MergeDef,
    public required = true
  ) {
    // Q: is there an initial value
    if (this.initVal && this.initVal.initListDefinition) {


      this.listDefinitions.forEach(thisList => {
        if (initVal.initListDefinition.listType === 'time-span') {
          if (initVal.initTimeSpan && initVal.initTimeSpan[thisList.pkProperty]) {
            // Yes. It is matching a listDefinition, add a form item with initial (language) value
            this.items.push({
              fixed: false,
              required: this.isRequired(thisList),
              classSelect: false,
              formControlDef: this.addFormControlDef(thisList, initVal.initTimeSpan[thisList.pkProperty])
            })
          }

        }
        else if (thisList.listType === 'text-property') {
          const initTextProperty = this.initVal.initTextProperty

          if (initTextProperty.fkClassField === thisList.fkClassField) {
            // Yes. It is matching a listDefinition, add a form item with initial (language) value
            this.items.push({
              fixed: false,
              required: this.isRequired(thisList),
              classSelect: false,
              formControlDef: this.addFormControlDef(thisList, initTextProperty.value)
            })
          }
        }
        // Q: is this list a role list ??
        else {
          // Q: This is a list that connects one role per item
          const initList = this.initVal.initListDefinition
          const machingClass = initList.listType === 'temporal-entity' ? thisList.sourceClass : thisList.targetClass;

          if (initList.pkProperty === thisList.pkProperty
            && initList.targetClass === machingClass) {
            // Yes. It is matching a listDefinition, add a form item where the initial value is set (fixed)
            this.items.push({
              fixed: true,
              required: this.isRequired(thisList),
              classSelect: false,
              formControlDef: this.addFormControlDef(thisList, this.initVal.initRole.value)
            })
          }

        }
      })
    }

    // Q: has there been added an item?
    if (!this.items.length) this.addItem()
    else this.this$.next(this);
  }


  public addItem() {

    if (this.listDefinitions.length === 1) {
      this.items.push({
        classSelect: false,
        required: this.isRequired(this.listDefinitions[0]),
        formControlDef: this.addFormControlDef(this.listDefinitions[0], null)
      });
    }
    else {
      this.items.push({
        required: this.isRequired(this.listDefinitions[0]),
        classSelect: true
      });
    }

    this.this$.next(this);
  }

  classSelected(item: FormItem, listDefinition: ListDefinition) {
    item.classSelect = 'disabled';
    item.formControlDef = this.addFormControlDef(listDefinition, null)
    this.this$.next(this);
  }

  removeItem(i: number) {
    const item = this.items[i]

    if (item.formControlDef) this.removeFormControl(item.formControlDef.formControlName)

    this.items.splice(i, 1)

    if (this.items.length === 0) {
      this.addItem()
    }

    this.this$.next(this)
  }

  private removeFormControl(formControlName: string) {
    this.formGroup.removeControl(formControlName)
  }

  private addFormControlDef(listDefinition: ListDefinition, initialValue): FormControlDefinition {
    const formControlName = U.uuid();

    const validators = this.isRequired(listDefinition) ? [Validators.required] : []
    const formControl = new FormControl(initialValue, validators);
    this.formGroup.addControl(formControlName, formControl);
    setTimeout(() => {
      formControl.setValue(initialValue)
    })
    return {
      listDefinition,
      formControlName,
      sourceValue$: formControl.valueChanges.pipe(shareReplay(), map((value) => {
        return this.mapValue(value, listDefinition);
      })),
      // mergeDef: this.getMergeDef(listDefinition)
    }
  }

  /**
   * Generally, form items are required, except for the case that the form part:
   * - belongs to a temproal-entity or time-span (because there it can have not required fields)
   * - and the field itself is not an identity defining property
   */
  private isRequired(listDefinition: ListDefinition): boolean {

    if (this.initVal && this.initVal.initListDefinition && ['temporal-entity', 'time-span'].includes(this.initVal.initListDefinition.listType)) {
      return listDefinition.isIdentityDefining ? true : false;
    }
    else {
      return true;
    }
  }

  // getMergeDef(listDefinition: ListDefinition): MergeDef {
  //   if (listDefinition.listType === 'appellation') {

  //     return { appendTo: ['te_roles'], appendMethod: 'push' };
  //   }
  //   else if (listDefinition.listType === 'language') {

  //     return { appendTo: ['te_roles'], appendMethod: 'push' };
  //   }
  //   else if (listDefinition.listType === 'place') {

  //     return { appendTo: ['te_roles'], appendMethod: 'push' };
  //   }
  //   else if (listDefinition.listType === 'entity-preview') {

  //     return { appendTo: ['te_roles'], appendMethod: 'push' };
  //   }
  //   else {
  //     return;
  //   }
  // }


  private mapValue(val, listDefinition: ListDefinition): any {
    if (!listDefinition) throw console.error('No listDefinition provided')

    if (listDefinition.listType === 'appellation') {
      if (!val) return null;

      const value: InfRole = {
        ...{} as any,
        fk_entity: undefined,
        fk_property: listDefinition.pkProperty,
        appellation: {
          ...val,
          fk_class: listDefinition.targetClass,
        },
      };
      return value;
    }
    else if (listDefinition.listType === 'language') {
      if (!val) return null;

      const value: InfRole = {
        ...{} as any,
        fk_entity: undefined,
        fk_property: listDefinition.pkProperty,
        language: {
          ...val,
          fk_class: listDefinition.targetClass,
        },
      };
      return value;
    }
    else if (listDefinition.listType === 'place') {
      if (!val) return null;

      const value: InfRole = {
        ...{} as any,
        fk_entity: undefined,
        fk_property: listDefinition.pkProperty,
        place: {
          ...val,
          fk_class: listDefinition.targetClass,
        },
      };
      return value;
    }
    else if (listDefinition.listType === 'temporal-entity' || listDefinition.listType === 'entity-preview') {
      if (!val) return null;

      let value: InfRole = { ...{} as any, fk_property: listDefinition.pkProperty, };

      if (listDefinition.isOutgoing) {
        value = { ...value, fk_entity: val }
      } else {
        value = { ...value, fk_temporal_entity: val }
      }

      return value;
    }
    else if (listDefinition.listType === 'text-property') {
      if (!val) return null;

      const value: InfTextProperty = {
        ...val,
        fk_class_field: listDefinition.fkClassField,
      };
      return value;
    }
    else if (listDefinition.listType === 'time-span') {
      if (!val) return null;

      const v = val as CtrlTimeSpanDialogResult;
      const value: InfRole[] = Object.keys(v).map(key => {
        const role: InfRole = {
          fk_property: parseInt(key),
          time_primitive: {
            ...v[key],
            fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
          },
          ...{} as any
        }
        return role
      });
      return value;
    }
    else {
      throw console.error('No mapping defined for list type', listDefinition.listType)
      return;
    }
  }

}
