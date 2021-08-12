
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DfhConfig } from '@kleiolab/lib-config';
import { CtrlTimeSpanDialogResult, Field, FieldTargetClass } from '@kleiolab/lib-queries';
import { InfAppellation, InfLangString, InfPlace, InfStatement } from '@kleiolab/lib-sdk-lb3';
import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { values } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface MergeDef {
  // path of the property in the parent, where the child needs to be appended
  target: string[]

  // type of the target item
  targetType: 'object' | 'array'

  // type of the source item
  sourceType: 'object' | 'array'
}
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
  fieldTarget: FieldTargetClass
  initValTarget: FieldTargetClass
  /**
   *
   * @param formGroup the root form group
   * @param title the title of this form part
   * @param field the field, needed to create FormItems
   * @param initVal the initial value for this form part
   * @param required wgheter or not a value of this formPart is required
   * @param resultTemplate TODO: this is probably on the wrong level, belongs to the parent instead
   * @param mergeDef TODO: this is probably on the wrong level, belongs to the parent instead
   */
  constructor(
    public formGroup: FormGroup,
    public title: string,
    public field: Field,
    public targetClass: number,
    public initVal: FormPartInitValue,
    public resultTemplate,
    public mergeDef: MergeDef,
    public required = true,
    public defaultLanguage: InfLanguage
  ) {
    this.fieldTarget = values(this.field.targets)[0]


    // Q: is there an initial value
    if (this.initVal) {


      if (initVal.initTimeSpan && initVal.initTimeSpan[this.field.property.fkProperty]) {
        // Yes. It is matching a field, add a form item with initial (language) value
        this.items.push({
          fixed: false,
          required: this.isRequired(this.field),
          classSelect: false,
          formControlDef: this.addFormControlDef(this.field, initVal.initTimeSpan[this.field.property.fkProperty])
        })
      }

      // // Q: is this list a statement list ??
      // else {
      //   // Q: This is a list that connects one statement per item
      //   const initList = this.initVal.initField
      //   const initProperty = initList.property.fkProperty;

      //   // we neet to flip source and target, when the list type is a temporal entity
      //   const initTarget = this.initValTarget.listType.temporalEntity ? this.field.sourceClass : this.initValTarget.targetClass;
      //   const initSource = this.initValTarget.listType.temporalEntity ? this.initValTarget.targetClass : this.field.sourceClass;

      //   if (
      //     this.field.property.fkProperty === initProperty
      //     && this.field.sourceClass === initSource
      //     && this.fieldTarget.targetClass === initTarget
      //   ) {
      //     // Yes. It is matching a field, add a form item where the initial value is set (fixed)
      //     this.items.push({
      //       fixed: true,
      //       required: this.isRequired(this.field),
      //       classSelect: false,
      //       formControlDef: this.addFormControlDef(this.field, this.initVal.initStatement.value)
      //     })
      //   }

      // }
    }

    // Q: has there been added an item?
    if (!this.items.length) this.addItem()
    else this.this$.next(this);
  }


  public addItem() {

    if (this.field.targetClasses.length === 1) {
      const initVal = this.fieldTarget.viewType.language ? this.defaultLanguage : null;
      this.items.push({
        classSelect: false,
        required: this.isRequired(this.field),
        formControlDef: this.addFormControlDef(this.field, initVal)
      });
    }
    else {
      this.items.push({
        required: this.isRequired(this.field),
        classSelect: true
      });
    }

    this.this$.next(this);
  }

  classSelected(item: FormItem, field: Field) {
    item.classSelect = 'disabled';
    item.formControlDef = this.addFormControlDef(field, null)
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

  private addFormControlDef(field: Field, initialValue): FormControlDefinition {
    const formControlName = U.uuid();

    const validators = this.isRequired(field) ? [Validators.required] : []
    const formControl = new FormControl(initialValue, validators);
    this.formGroup.addControl(formControlName, formControl);
    setTimeout(() => {
      formControl.setValue(initialValue)
    })
    return {
      field,
      formControlName,
      sourceValue$: formControl.valueChanges.pipe(shareReplay(), map((value) => {
        return this.mapValue(value, field);
      })),
      // mergeDef: this.getMergeDef(field)
    }
  }

  /**
   * Generally, form items are required, except for the case that the form part:
   * - belongs to a temproal-entity or time-span (because there it can have not required fields)
   * - and the field itself is not an identity defining property
   */
  private isRequired(field: Field): boolean {

    if (this.initVal) {
      return field.identityDefiningForSource
    }
    else {
      return true;
    }
  }


  private mapValue(val, field: Field): any {
    if (!field) throw console.error('No field provided')

    if (this.fieldTarget.viewType.appellation) {
      if (!val) return null;

      const value: InfStatement = {
        ...{} as any,
        fk_object_info: undefined,
        fk_property: field.property.fkProperty,
        fk_property_of_property: field.property.fkPropertyOfProperty,
        object_appellation: {
          ...val,
          fk_class: this.fieldTarget.targetClass,
        },
      };
      return value;
    }
    else if (this.fieldTarget.viewType.language) {
      if (!val) return null;

      const value: InfStatement = {
        ...{} as any,
        fk_object_info: undefined,
        fk_property: field.property.fkProperty,
        fk_property_of_property: field.property.fkPropertyOfProperty,
        object_language: {
          ...val,
          fk_class: this.fieldTarget.targetClass,
        },
      };
      return value;
    }
    else if (this.fieldTarget.viewType.langString) {
      if (!val) return null;

      const value: InfStatement = {
        ...{} as any,
        fk_object_info: undefined,
        fk_property: field.property.fkProperty,
        fk_property_of_property: field.property.fkPropertyOfProperty,
        object_lang_string: {
          ...val,
          fk_class: this.fieldTarget.targetClass,
        },
      };
      return value;
    }
    else if (this.fieldTarget.viewType.place) {
      if (!val) return null;

      const value: InfStatement = {
        ...{} as any,
        fk_object_info: undefined,
        fk_property: field.property.fkProperty,
        fk_property_of_property: field.property.fkPropertyOfProperty,
        object_place: {
          ...val,
          fk_class: this.fieldTarget.targetClass,
        },
      };
      return value;
    }
    else if (
      this.fieldTarget.viewType.nestedResource
      || this.fieldTarget.viewType.entityPreview
      || this.fieldTarget.viewType.typeItem
    ) {
      if (!val) return null;

      let value: InfStatement = {
        ...{} as any,
        fk_property: field.property.fkProperty,
        fk_property_of_property: field.property.fkPropertyOfProperty
      };

      if (field.isOutgoing) {
        value = { ...value, fk_object_info: val }
      } else {
        value = { ...value, fk_subject_info: val }
      }

      return value;
    }


    else if (this.fieldTarget.viewType.timeSpan) {
      if (!val) return null;

      const v = val as CtrlTimeSpanDialogResult;
      const value: InfStatement[] = Object.keys(v).map(key => {
        const statement: InfStatement = {
          fk_property: parseInt(key, 10),
          object_time_primitive: {
            ...v[key],
            fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
          },
          ...{} as any
        }
        return statement
      });
      return value;
    }
    else {
      throw console.error('No mapping defined for list type', this.fieldTarget.viewType)
    }
  }

}


export interface FormPartInitValue {
  // initField: Field
  // initTextProperty?: FormPartInitValueTextProperty
  // initStatement?: FormPartInitValueStatement
  initTimeSpan?: CtrlTimeSpanDialogResult
}
/**
 * A FormPartInitValueStatement contains the values pass to a Form Part Val
 */
export interface FormPartInitValueStatement {
  targetClass: number
  fkProperty: number
  value: number | InfAppellation | InfPlace | InfLanguage | InfLangString
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
  field: Field
  formControlName: string
  sourceValue$: Observable<any>
}

