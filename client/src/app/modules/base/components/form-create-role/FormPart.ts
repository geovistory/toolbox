import { FormControl, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import { BehaviorSubject, Observable } from '../../../../../../node_modules/rxjs';
import { map, shareReplay } from '../../../../../../node_modules/rxjs/operators';
import { InfAppellation, InfLanguage, InfPlace, InfRole, InfTextProperty, U, ActiveProjectService, InfLangString } from '../../../../core';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { ListDefinition } from '../properties-tree/properties-tree.models';
import { MergeDef } from './form-create-role.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';

/**
 * Factory for a part of the form that can contain multiple FormItems
 */
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

  /**
   *
   * @param formGroup the root form group
   * @param title the title of this form part
   * @param listDefinitions the listDefinitions, needed to create FormItems
   * @param initVal the initial value for this form part
   * @param required wgheter or not a value of this formPart is required
   * @param resultTemplate TODO: this is probably on the wrong level, belongs to the parent instead
   * @param mergeDef TODO: this is probably on the wrong level, belongs to the parent instead
   */
  constructor(
    public formGroup: FormGroup,
    public title: string,
    public listDefinitions: ListDefinition[],
    public initVal: FormPartInitValue,
    public resultTemplate,
    public mergeDef: MergeDef,
    public required = true,
    public defaultLanguage: InfLanguage
  ) {
    // Q: is there an initial value
    if (this.initVal && this.initVal.initListDefinition) {


      this.listDefinitions.forEach(thisList => {
        if (initVal.initListDefinition.listType === 'time-span') {
          if (initVal.initTimeSpan && initVal.initTimeSpan[thisList.property.pkProperty]) {
            // Yes. It is matching a listDefinition, add a form item with initial (language) value
            this.items.push({
              fixed: false,
              required: this.isRequired(thisList),
              classSelect: false,
              formControlDef: this.addFormControlDef(thisList, initVal.initTimeSpan[thisList.property.pkProperty])
            })
          }

        }
        else if (thisList.listType === 'text-property') {
          const initTextProperty = this.initVal.initTextProperty

          if (initTextProperty && initTextProperty.fkClassField === thisList.fkClassField) {
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
          const initProperty = initList.property.pkProperty;

          // we neet to flip source and target, when the list type is a temporal entity
          const initTarget = initList.listType === 'temporal-entity' ? initList.sourceClass : initList.targetClass;
          const initSource = initList.listType === 'temporal-entity' ? initList.targetClass : initList.sourceClass;

          if (
            thisList.property.pkProperty === initProperty
            && thisList.sourceClass === initSource
            && thisList.targetClass === initTarget
          ) {
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
      const initVal = this.listDefinitions[0].listType == 'language' ? this.defaultLanguage : null;
      this.items.push({
        classSelect: false,
        required: this.isRequired(this.listDefinitions[0]),
        formControlDef: this.addFormControlDef(this.listDefinitions[0], initVal)
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


  private mapValue(val, listDefinition: ListDefinition): any {
    if (!listDefinition) throw console.error('No listDefinition provided')

    if (listDefinition.listType === 'appellation') {
      if (!val) return null;

      const value: InfRole = {
        ...{} as any,
        fk_entity: undefined,
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
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
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        language: {
          ...val,
          fk_class: listDefinition.targetClass,
        },
      };
      return value;
    }
    else if (listDefinition.listType === 'lang-string') {
      if (!val) return null;

      const value: InfRole = {
        ...{} as any,
        fk_entity: undefined,
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        lang_string: {
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
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        place: {
          ...val,
          fk_class: listDefinition.targetClass,
        },
      };
      return value;
    }
    else if (
      listDefinition.listType === 'temporal-entity'
      || listDefinition.listType === 'entity-preview'
      || listDefinition.listType === 'has-type'
    ) {
      if (!val) return null;

      let value: InfRole = {
        ...{} as any,
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty
      };

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
          fk_property: parseInt(key, 10),
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


export interface FormPartInitValue {
  initListDefinition: ListDefinition
  initTextProperty?: FormPartInitValueTextProperty
  initRole?: FormPartInitValueRole
  initTimeSpan?: CtrlTimeSpanDialogResult
}
/**
 * A FormPartInitValueRole contains the values pass to a Form Part Val
 */
export interface FormPartInitValueRole {
  targetClass: number
  fkProperty: number
  value: number | InfAppellation | InfPlace | InfLanguage | InfLangString
}

export interface FormPartInitValueTextProperty {
  fkClassField: number
  value: InfTextProperty
}


/**
 * Form item is a container for a form element that potentially can't
 * add a formControl without additional user interaction because of missing
 * information. For example: A property of a class with different target classes,
 * where the target class needs to be selected before showing a formControl
 */
export interface FormItem {
  // if true, user can't change the value of this item (control is disabled)
  fixed?: boolean;
  // if true, value of formControl is required (respective validator is added)
  required: boolean;
  // if true, select dropdown showing target classes is shown
  classSelect: true | false | 'disabled'
  // the form control definition, added as soon as needed information is given
  formControlDef?: FormControlDefinition
}

/**
 * A FormControlDefinition contains everything to connect a form control component
 * to a form control (using the name of the formControl within a formGroup)
 */
export interface FormControlDefinition {
  listDefinition: ListDefinition
  formControlName: string
  sourceValue$: Observable<any>
}

