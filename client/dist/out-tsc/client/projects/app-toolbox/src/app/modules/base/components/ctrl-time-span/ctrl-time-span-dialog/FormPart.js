import { DfhConfig } from "@kleiolab/lib-config";
import { BehaviorSubject } from 'rxjs';
import { Validators, FormControl } from '@angular/forms';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { shareReplay, map } from 'rxjs/operators';
/**
 * Factory for a part of the form that can contain multiple FormItems
 */
export class FormPart {
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
    constructor(formGroup, title, listDefinitions, initVal, resultTemplate, mergeDef, required = true, defaultLanguage) {
        this.formGroup = formGroup;
        this.title = title;
        this.listDefinitions = listDefinitions;
        this.initVal = initVal;
        this.resultTemplate = resultTemplate;
        this.mergeDef = mergeDef;
        this.required = required;
        this.defaultLanguage = defaultLanguage;
        this.this$ = new BehaviorSubject(this);
        this._classSelect = false;
        this.items = [];
        // Q: is there an initial value
        if (this.initVal && this.initVal.initSubfield) {
            this.listDefinitions.forEach(thisList => {
                if (initVal.initSubfield.listType.timeSpan) {
                    if (initVal.initTimeSpan && initVal.initTimeSpan[thisList.property.pkProperty]) {
                        // Yes. It is matching a listDefinition, add a form item with initial (language) value
                        this.items.push({
                            fixed: false,
                            required: this.isRequired(thisList),
                            classSelect: false,
                            formControlDef: this.addFormControlDef(thisList, initVal.initTimeSpan[thisList.property.pkProperty])
                        });
                    }
                }
                // Q: is this list a statement list ??
                else {
                    // Q: This is a list that connects one statement per item
                    const initList = this.initVal.initSubfield;
                    const initProperty = initList.property.pkProperty;
                    // we neet to flip source and target, when the list type is a temporal entity
                    const initTarget = initList.listType.temporalEntity ? initList.sourceClass : initList.targetClass;
                    const initSource = initList.listType.temporalEntity ? initList.targetClass : initList.sourceClass;
                    if (thisList.property.pkProperty === initProperty
                        && thisList.sourceClass === initSource
                        && thisList.targetClass === initTarget) {
                        // Yes. It is matching a listDefinition, add a form item where the initial value is set (fixed)
                        this.items.push({
                            fixed: true,
                            required: this.isRequired(thisList),
                            classSelect: false,
                            formControlDef: this.addFormControlDef(thisList, this.initVal.initStatement.value)
                        });
                    }
                }
            });
        }
        // Q: has there been added an item?
        if (!this.items.length)
            this.addItem();
        else
            this.this$.next(this);
    }
    get classSelect() {
        return this._classSelect;
    }
    set classSelect(val) {
        this._classSelect = val;
        this.this$.next(this);
    }
    addItem() {
        if (this.listDefinitions.length === 1) {
            const initVal = this.listDefinitions[0].listType.language ? this.defaultLanguage : null;
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
    classSelected(item, listDefinition) {
        item.classSelect = 'disabled';
        item.formControlDef = this.addFormControlDef(listDefinition, null);
        this.this$.next(this);
    }
    removeItem(i) {
        const item = this.items[i];
        if (item.formControlDef)
            this.removeFormControl(item.formControlDef.formControlName);
        this.items.splice(i, 1);
        if (this.items.length === 0) {
            this.addItem();
        }
        this.this$.next(this);
    }
    removeFormControl(formControlName) {
        this.formGroup.removeControl(formControlName);
    }
    addFormControlDef(listDefinition, initialValue) {
        const formControlName = U.uuid();
        const validators = this.isRequired(listDefinition) ? [Validators.required] : [];
        const formControl = new FormControl(initialValue, validators);
        this.formGroup.addControl(formControlName, formControl);
        setTimeout(() => {
            formControl.setValue(initialValue);
        });
        return {
            listDefinition,
            formControlName,
            sourceValue$: formControl.valueChanges.pipe(shareReplay(), map((value) => {
                return this.mapValue(value, listDefinition);
            })),
        };
    }
    /**
     * Generally, form items are required, except for the case that the form part:
     * - belongs to a temproal-entity or time-span (because there it can have not required fields)
     * - and the field itself is not an identity defining property
     */
    isRequired(listDefinition) {
        if (this.initVal && this.initVal.initSubfield && (this.initVal.initSubfield.listType.temporalEntity || this.initVal.initSubfield.listType.timeSpan)) {
            return listDefinition.identityDefiningForSource ? true : false;
        }
        else {
            return true;
        }
    }
    mapValue(val, listDefinition) {
        if (!listDefinition)
            throw console.error('No listDefinition provided');
        if (listDefinition.listType.appellation) {
            if (!val)
                return null;
            const value = Object.assign({}, {}, { fk_object_info: undefined, fk_property: listDefinition.property.pkProperty, fk_property_of_property: listDefinition.property.pkPropertyOfProperty, object_appellation: Object.assign({}, val, { fk_class: listDefinition.targetClass }) });
            return value;
        }
        else if (listDefinition.listType.language) {
            if (!val)
                return null;
            const value = Object.assign({}, {}, { fk_object_info: undefined, fk_property: listDefinition.property.pkProperty, fk_property_of_property: listDefinition.property.pkPropertyOfProperty, object_language: Object.assign({}, val, { fk_class: listDefinition.targetClass }) });
            return value;
        }
        else if (listDefinition.listType.langString) {
            if (!val)
                return null;
            const value = Object.assign({}, {}, { fk_object_info: undefined, fk_property: listDefinition.property.pkProperty, fk_property_of_property: listDefinition.property.pkPropertyOfProperty, object_lang_string: Object.assign({}, val, { fk_class: listDefinition.targetClass }) });
            return value;
        }
        else if (listDefinition.listType.place) {
            if (!val)
                return null;
            const value = Object.assign({}, {}, { fk_object_info: undefined, fk_property: listDefinition.property.pkProperty, fk_property_of_property: listDefinition.property.pkPropertyOfProperty, object_place: Object.assign({}, val, { fk_class: listDefinition.targetClass }) });
            return value;
        }
        else if (listDefinition.listType.temporalEntity
            || listDefinition.listType.entityPreview
            || listDefinition.listType.typeItem) {
            if (!val)
                return null;
            let value = Object.assign({}, {}, { fk_property: listDefinition.property.pkProperty, fk_property_of_property: listDefinition.property.pkPropertyOfProperty });
            if (listDefinition.isOutgoing) {
                value = Object.assign({}, value, { fk_object_info: val });
            }
            else {
                value = Object.assign({}, value, { fk_subject_info: val });
            }
            return value;
        }
        else if (listDefinition.listType.timeSpan) {
            if (!val)
                return null;
            const v = val;
            const value = Object.keys(v).map(key => {
                const statement = Object.assign({ fk_property: parseInt(key, 10), object_time_primitive: Object.assign({}, v[key], { fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE }) }, {});
                return statement;
            });
            return value;
        }
        else {
            throw console.error('No mapping defined for list type', listDefinition.listType);
            return;
        }
    }
}
//# sourceMappingURL=FormPart.js.map