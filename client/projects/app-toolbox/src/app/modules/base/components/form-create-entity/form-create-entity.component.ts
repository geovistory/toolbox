import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, CtrlTimeSpanDialogResult, DisplayType, Field, SchemaSelectorsService, SectionName, Subfield, TableName } from '@kleiolab/lib-queries';
import { ReduxMainService, SchemaService } from '@kleiolab/lib-redux';
import { GvFieldProperty, GvFieldSourceEntity, GvSchemaModifier, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfResourceWithRelations, InfStatement, InfStatementWithRelations, SysConfigFormCtrlType, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty, U } from '@kleiolab/lib-utils';
import { ValidationService } from 'projects/app-toolbox/src/app/core/validation/validation.service';
import { FormArrayFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-array-factory';
import { FormChildFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormControlFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-control-factory';
import { FormFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormArrayConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormArrayConfig';
import { FormNodeConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig';
import { equals, flatten, groupBy, sum, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanModel } from '../ctrl-time-span/ctrl-time-span.component';
import { FgAppellationTeEnComponent, FgAppellationTeEnInjectData } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent, FgDimensionInjectData } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent, FgLangStringInjectData } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent, FgPlaceInjectData } from '../fg-place/fg-place.component';
import { getFormTargetClasses } from '../form-field-header/form-field-header.component';
export interface FormArrayData {
  pkClass?: number
  // customCtrlLabel?: string
  stringPartId?: number

  // rootArray where one static item is used by the formGroupFactory
  rootArray?: FormGroupData,

  // is a section of the form, containing gvFormFields
  gvFormSection?: {
    section: FieldSection
    fields: Field[]
    initValue: InfResourceWithRelations
  }

  // a gv-form-field (with header, plus button, ect.)
  gvFormField?: FormField

  // a last wrapper before the leaf (FormControlData / FormChildData)
  controlWrapper?: {
    field: Field
    targetClass: number
    targetType: SysConfigFormCtrlType
  }

  // gets called when removed
  removeHook?: (x: FormArrayData) => any
}


export interface FormCreateEntityValue {
  resource?: InfResourceWithRelations;
  statement?: InfStatementWithRelations;
}

export interface FormField {
  field: Field
  addItemsOnInit: number
  minLength: number
  maxLength: number
}

interface FormGroupData {
  pkClass: number
}
export interface FormControlData {
  controlType: ControlType
  field?: Field
  targetClass: number
  targetClassLabel: string
  nodeConfigs?: LocalNodeConfig[]
  appearance: MatFormFieldAppearance
  ctrlEntity?: {
    model: TableName
  }
}
export interface FormChildData {
  place?: FgPlaceInjectData
  appellationTeEn?: FgAppellationTeEnInjectData
  langString?: FgLangStringInjectData
  dimension?: FgDimensionInjectData
}
interface GvSectionsModel {
  resource?: InfResourceWithRelations,
  statement?: InfStatementWithRelations,
}

export type ControlType = 'ctrl-appellation' | 'ctrl-entity' | 'ctrl-language' | 'ctrl-place' | 'ctrl-time-primitive' | 'ctrl-type' | 'ctrl-time-span'
export type LocalArrayConfig = FormArrayConfig<FormArrayData>;
export type LocalNodeConfig = FormNodeConfig<FormGroupData, FormArrayData, FormControlData, FormChildData>;
export type LocalFormArrayFactory = FormArrayFactory<FormControlData, FormArrayData, FormChildData>
export type LocalFormControlFactory = FormControlFactory<FormControlData>
export type LocalFormChildFactory = FormChildFactory<FormChildData>
export interface FieldSection {
  key: SectionName,
  label: string,
  showHeader$: BehaviorSubject<boolean>,
  expanded$: BehaviorSubject<boolean>,
  pipeFields?: (pkClass: number) => Observable<Field[]>
}
@Component({
  selector: 'gv-form-create-entity',
  templateUrl: './form-create-entity.component.html',
  styleUrls: ['./form-create-entity.component.scss']
})
export class FormCreateEntityComponent implements OnInit, OnDestroy {


  @Input() pkClass: number

  @Input() source: GvFieldSourceEntity;
  @Input() field: Field;

  @Input() hideButtons = false // : boolean;
  @Input() hideTitle: boolean;

  @Input() initVal$: Observable<InfResourceWithRelations | undefined>;


  @Input() hiddenProperty: GvFieldProperty;

  @Output() cancel = new EventEmitter<void>()
  @Output() searchString = new EventEmitter<string>()
  @Output() saved = new EventEmitter<InfResourceWithRelations | InfStatementWithRelations>()

  appearance: MatFormFieldAppearance = 'outline';

  _initVal$ = new BehaviorSubject<InfResourceWithRelations>(undefined)
  destroy$ = new Subject<boolean>();
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory
  submitted = false;
  saving = false;
  searchStringPartId = 0;
  searchStringParts: { [key: number]: string } = {}

  resourcesToAdd: InfResource[] = []

  basicSection: FieldSection = {
    showHeader$: new BehaviorSubject(true),
    expanded$: new BehaviorSubject(true),
    key: SectionName.basic,
    label: 'Basics',
    pipeFields: (pk) => this.c.pipeSection(pk, DisplayType.form, SectionName.basic)
  }
  specificSection: FieldSection = {
    showHeader$: new BehaviorSubject(true),
    expanded$: new BehaviorSubject(true),
    key: SectionName.specific,
    label: 'Specific Fields',
    pipeFields: (pk) => this.c.pipeSection(pk, DisplayType.form, SectionName.specific)
  }
  metadataSection: FieldSection = {
    showHeader$: new BehaviorSubject(true),
    expanded$: new BehaviorSubject(true),
    key: SectionName.metadata,
    label: 'Metadata Fields',
    pipeFields: (pk) => this.c.pipeSection(pk, DisplayType.form, SectionName.metadata)
  }
  simpleFormSection: FieldSection = {
    showHeader$: new BehaviorSubject(false),
    expanded$: new BehaviorSubject(true),
    key: SectionName.simpleForm,
    label: 'Simple Form Fields'
  }
  sections: FieldSection[] = []

  advancedMode$ = new BehaviorSubject(false);

  previousHasNames: Array<string> = [];
  previousFocusName = '';

  classLabel = '';

  constructor(
    private formFactoryService: FormFactoryService,
    private c: ConfigurationPipesService,
    private dataService: ReduxMainService,
    private ss: SchemaSelectorsService,
    public ap: ActiveProjectPipesService,
    public s1: SchemaService,
    private s2: SchemaSelectorsService,
  ) { }

  ngOnInit() {

    if (!this.pkClass) throw new Error('You must provide a pkClass');

    this.c.pipeClassLabel(this.pkClass).subscribe(label => this.classLabel = label);

    if (this.initVal$) {
      this.initVal$.subscribe(b => {
        this._initVal$.next(b)
      })
    }

    const data: FormGroupData = {
      pkClass: this.pkClass
    }

    this.formFactory$ = this.formFactoryService.create<FormGroupData, FormArrayData, FormControlData, any>({
      hideTitle: this.hideTitle,
      rootFormGroup$: of({ data }),
      getChildNodeConfigs: this.getChildNodeConfigs
    }, this.destroy$)

    this.formFactory$.pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => this.formFactory = v)

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setAdvanced(b: boolean) {
    const val = this.formFactory?.formGroupFactory?.valueChanges$.value
    if (val) this._initVal$.next(val)
    this.advancedMode$.next(b);

    if (b) { // switch to advanced mode
      for (const section of this.sections) {
        section.showHeader$.next(true)
        section.expanded$.next(true)
      }
    } else { // switch to simple mode
      let firstSection = true;
      for (const section of this.sections) {
        if (firstSection) {
          section.expanded$.next(true) // expand first
          firstSection = false
        }
        else section.expanded$.next(false) // collapse rest
      }
    }
  }

  getChildNodeConfigs = (n: LocalNodeConfig): Observable<LocalNodeConfig[]> => {
    if (n.group?.data) return this.getRootArray(n.group.data)
    else if (n.array) {
      const a = n.array
      if (a?.data?.rootArray) return this.getGvFormSections(n.array?.data?.rootArray.pkClass)
      if (a.data.gvFormSection) return this.getGvFormFields(a)
      if (a.data.gvFormField) return this.getControlWrappers(a.data.gvFormField, a.initValue)
      if (a.data.controlWrapper) {
        const w = a.data.controlWrapper
        return this.getLeafControl(w.targetType, w.targetClass, w.field, a.initValue)
      }

    }
    console.error('no child node created for this nodeConfig:', n)
  }

  private getRootArray(data: FormGroupData): Observable<LocalNodeConfig[]> {

    const n: LocalNodeConfig = {
      array: {
        placeholder: '',
        data: { rootArray: data },
        mapValue: (items?: FormCreateEntityValue[]): FormCreateEntityValue => {
          if (items?.[0]?.resource) {
            // merge the resources produced by each section
            const outgoing_statements: InfStatementWithRelations[] = []
            const incoming_statements: InfStatementWithRelations[] = []
            items.forEach(i => {
              outgoing_statements.push(...i.resource?.outgoing_statements ?? [])
              incoming_statements.push(...i.resource?.incoming_statements ?? [])
            })
            return { resource: { ...items[0].resource, outgoing_statements, incoming_statements } }

          } else if (items?.[0]?.statement) return items[0]
          else return {}
        }
      }
    }
    return of([n])
  }

  /**
   * generate the top level sections of the form
   */
  private getGvFormSections(pkClass: number): Observable<LocalNodeConfig[]> {
    return combineLatest([
      this.advancedMode$,
      this._initVal$,
      this.ss.dfh$.class$.by_pk_class$.key(pkClass),
      this.c.pipeTargetTypesOfClass(pkClass),
      this.c.pipeTableNameOfClass(pkClass),
      this.c.pipeClassLabel(pkClass),
    ]).pipe(
      switchMap(([advancedMode, initVal, klass, targets, parentModel, label]) => {

        // if we don't create an entity but a value object
        if (!targets.formControlType.entity) { // skip all the sections and wrap control directly

          const c = this.getControlWrapper(this.field, pkClass);
          c.array.addOnInit = 1;
          const mapValue = (items: InfStatementWithRelations): GvSectionsModel => {
            return { statement: items[0] ?? {} }
          }
          c.array.mapValue = mapValue
          return of([c])
        }
        else { // else create a form with sections and fields

          // initialize the correct sections
          const isPersistentItem = (klass.basic_type === 8 || klass.basic_type === 30);
          if (!advancedMode) {
            const basicType = isPersistentItem ? 'PeIt' : 'TeEn'
            this.simpleFormSection.pipeFields = (pk) => this.c.pipeSimpleForm(pk, basicType);
            this.sections = [this.simpleFormSection]
          } else if (isPersistentItem) {
            this.sections = [this.basicSection, this.metadataSection, this.specificSection]
          } else {
            this.sections = [this.specificSection, this.metadataSection, this.basicSection]
          }
          // pipe the fields of each section
          const sectionsWithFields$ = combineLatestOrEmpty(
            this.sections.map(section => section.pipeFields(pkClass).pipe(
              map(fields => {
                return fields.filter(fDef => {
                  // Q: is this field hidden?
                  if (equals(fDef.property, this.hiddenProperty)) return false;
                  return true;
                })
              }),
              map(fields => ({ section, fields }))
            ))
          )

          return sectionsWithFields$.pipe(
            map(sectionsWithFields => {

              // if simple mode
              if (!advancedMode) {

                // Q: does init val need advanced mode?
                const requiredFieldKeys = []
                for (const s of initVal?.incoming_statements ?? []) {
                  requiredFieldKeys.push('in_' + s.fk_property + '_' + s.fk_property_of_property)
                }
                for (const s of initVal?.outgoing_statements ?? []) {
                  requiredFieldKeys.push('out_' + s.fk_property + '_' + s.fk_property_of_property)
                }
                const existingFieldKeys = {}
                for (const s of sectionsWithFields) {
                  for (const field of s.fields) {
                    const directionPrefix = field.isOutgoing ? 'out_' : 'in_'
                    existingFieldKeys[directionPrefix + field.property.fkProperty + '_' + field.property.fkPropertyOfProperty] = true
                  }
                }
                let needsAdvancedMode = false
                for (const requiredFieldKey of requiredFieldKeys) {
                  // check if init value requires fields not available in simple form
                  if (!existingFieldKeys[requiredFieldKey]) {
                    needsAdvancedMode = true
                    break;
                  }
                }

                // A: yes.
                if (needsAdvancedMode) {
                  // return empty array (which will stop the pipe) and then set to advanced mode
                  setTimeout(() => this.advancedMode$.next(true))
                  return [];
                }
              }


              return sectionsWithFields.map(s => {
                // then create the child nodes
                const n: LocalNodeConfig = {
                  id: U.uuid(),
                  array: {
                    isList: false,
                    required: true,
                    maxLength: 1,
                    placeholder: label,
                    data: {
                      gvFormSection: {
                        initValue: initVal,
                        section: s.section,
                        fields: s.fields
                      },
                      pkClass: pkClass,
                    },
                    mapValue: (items: InfResourceWithRelations[]): GvSectionsModel => {

                      // fetch the appellation for language string
                      const curHasNames = items.filter(it => it?.incoming_statements)?.[0]?.incoming_statements
                        ?.filter(is => is.fk_property == 1111)
                        ?.map(appe => appe.subject_resource.outgoing_statements
                          ?.find(stm => stm.fk_property == 1113)
                          ?.object_appellation?.quill_doc?.ops.map(op => op.insert).join('').slice(0, -1)) ?? [];

                      let focusName = curHasNames.find(name => !this.previousHasNames.some(old => old == name));
                      if (!focusName) focusName = this.previousFocusName;
                      else this.previousFocusName = focusName;

                      this.previousHasNames = curHasNames;

                      this.emitNewSearchString(focusName);

                      const result: InfResourceWithRelations = {} as InfResourceWithRelations;
                      items.forEach(item => {
                        for (const key in item) {
                          if (item.hasOwnProperty(key) && item[key].length > 0) {
                            result[key] = [...(result[key] || []), ...item[key]];
                          }
                        }
                      })
                      result.fk_class = pkClass
                      if (parentModel == 'resource') return { resource: result }
                      else console.error('this parent model is unsupported:', parentModel)
                    }
                  }
                }
                return n
              })
            })
          )

        }

      })
    );

  }


  /**
   * Generates the array of gvFormFields
   */
  private getGvFormFields(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    return combineLatest([
      this.ss.dfh$.class$.by_pk_class$.key(arrayConfig.data.pkClass)
    ])
      .pipe(
        filter(([klass]) => !!klass),
        map(([dfhClass]) => {

          const section = arrayConfig.data.gvFormSection.section;
          const fields = arrayConfig.data.gvFormSection.fields;
          const initVal: any = arrayConfig.data.gvFormSection.initValue;
          const isPersistentItem = (dfhClass.basic_type === 8 || dfhClass.basic_type === 30);

          return fields.map(f => {

            // make one definition required for each persistent item
            if (isPersistentItem && f.property.fkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
              f.targetMinQuantity = 1;
              f.identityDefiningForSource = true;
            }
            let addItemsOnInit = 0;
            if (isPersistentItem && f.isOutgoing === false && f.property.fkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF) {
              addItemsOnInit = 1
            }

            // Add default controls to some properties according to the config
            if (f.display.formSections?.[section.key]?.controlsOnInit) {
              addItemsOnInit = f.display.formSections[section.key].controlsOnInit;
            }

            const maxLength = f.targetMaxQuantity == -1 ? Number.POSITIVE_INFINITY : f.targetMaxQuantity;
            const minLength = f.identityDefiningForSource ? f.targetMinQuantity : 0;

            const n: LocalNodeConfig = {
              array: {
                data: {
                  gvFormField: {
                    minLength,
                    maxLength,
                    field: f,
                    addItemsOnInit
                  },
                  pkClass: undefined,
                },
                initValue: this.getInitValueForFieldNode(f, initVal?.resource ?? initVal),
                placeholder: f.label,
                required: this.ctrlRequired(f),
                validators: [
                  (control: FormArray): { [key: string]: any } | null => {
                    const length = sum(control.controls.map((ctrl: FormArray) => ctrl.controls.length))
                    return length >= minLength
                      ? null : { 'minLength': { value: control.value, minLength } }
                  },
                  (control: FormArray): { [key: string]: any } | null => {
                    const length = sum(control.controls.map((ctrl: FormArray) => ctrl.controls.length))
                    return length <= maxLength
                      ? null : { 'maxLength': { value: control.value, maxLength } }
                  }
                ],
                mapValue: (x) => {
                  const items = flatten(x) // Flattens the values of the lists of this field
                  const key = getStatementKey(f.isOutgoing)
                  return { [key]: items }
                },
              },
              id: U.uuid()
            };
            return n
          })

        })
      )
  }

  /**
   * Generate the array of controlWrappers
   */
  private getControlWrappers(
    gvFormField: FormArrayData['gvFormField'],
    initStatements: InfStatementWithRelations[] = [],
  ): Observable<LocalNodeConfig[]> {

    const field = gvFormField.field;
    const targetClasses = getFormTargetClasses(field).map(f => f.targetClass);
    const isOutgoing = field.isOutgoing

    if (field.isSpecialField === 'time-span') {
      return of([this.getControlWrapper(
        field,
        targetClasses[0],
        initStatements
      )])
    }

    // get the target class for each initial statement
    const o$ = initStatements.map((s) => {
      // -> for each initVal
      const relObj = s.object_appellation ||
        s.object_language ||
        s.object_place ||
        s.object_lang_string ||
        s.subject_resource ||
        s.object_dimension;
      if (relObj) {
        // --> if statement.appellation, .place, .lang_string, .time_primitive, .language, .dimension
        return of({ fk_class: relObj.fk_class, statement: s })
      } else {
        // --> else get related entity preview and its class
        return this.ap.streamEntityPreview(isOutgoing ? s.fk_object_info : s.fk_subject_info).pipe(
          map(preview => ({ fk_class: preview.fk_class, statement: s }))
        )
      }
    })
    // add a list, where initial statements are available
    const listNodes$ = combineLatestOrEmpty(o$).pipe(
      map((items) => {

        if (items.length == 0 && gvFormField.maxLength > 0 && targetClasses.length == 1) {
          return [this.getControlWrapper(field, targetClasses[0], undefined, gvFormField.addItemsOnInit)]
        }

        const byClass = groupBy((i) => i.fk_class.toString(), items)
        const node: LocalNodeConfig[] = []
        for (const pkClass in byClass) {
          if (byClass.hasOwnProperty(pkClass)) {
            const initStmts = byClass[pkClass].map(e => e.statement);
            node.push(this.getControlWrapper(field, parseInt(pkClass, 10), initStmts))
          }
        }
        return node;
      })
    )
    return listNodes$
  }

  /**
   * Generate the controlWrapper
   */
  getControlWrapper(
    field: Field,
    targetClass: number,
    initValue?: InfStatementWithRelations[],
    addOnInit = 0,
  ): LocalNodeConfig {

    const formControlType = field.targets[targetClass].formControlType;
    const stringPartId = this.searchStringPartId++;

    const removeHook = (data: FormArrayData) => {
      const id = data.stringPartId;
      if (id && this.searchStringParts[id]) {
        delete this.searchStringParts[id];
      }
      this.emitNewSearchString(values(this.searchStringParts).filter(string => !!string).join(' '));
    };

    const required = field.identityDefiningForSource;
    let maxLength = field.targetMaxQuantity === -1 ? Number.POSITIVE_INFINITY : field.targetMaxQuantity;
    const minLength = field.targetMinQuantity === -1 ? Number.POSITIVE_INFINITY : field.targetMinQuantity;
    addOnInit = required ? minLength : addOnInit;

    if (formControlType.typeItem) {
      maxLength = 1;
      addOnInit = 1;
    }
    // if (formControlType.entity && !field.identityDefiningForTarget) {
    //   formControlType = { entityPreview: 'true' };
    // }

    return {
      array: {
        isList: true,
        addOnInit,
        required,
        maxLength,
        placeholder: field.label,
        initValue,
        data: {
          controlWrapper: {
            field,
            targetClass,
            targetType: formControlType
          },
          pkClass: targetClass,
          stringPartId,
          removeHook,
        },
        mapValue: x => x.filter(item => !!item),
      },
      id: U.uuid()
    };
  };

  /**
   * gets the init value for the field definition out of the initial entity value
   */
  getInitValueForFieldNode(lDef: Field, initVal: InfResourceWithRelations): InfStatementWithRelations[] {
    if (lDef.isSpecialField == 'time-span') {
      if (initVal && initVal.outgoing_statements) {
        return initVal.outgoing_statements
          .filter(r => DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.includes(r.fk_property))
      }
    }
    else if (initVal) {
      if (lDef.isOutgoing && initVal.outgoing_statements) {
        return initVal.outgoing_statements.filter(r => this.sameProperty(r, lDef))
      }
      else if (!lDef.isOutgoing && initVal.incoming_statements) {
        return initVal.incoming_statements.filter(r => this.sameProperty(r, lDef))
      }
    }

    return undefined;
  }

  /**
   * Returns true if property of statement and field match
   * @param r
   * @param field
   */
  sameProperty(r: InfStatementWithRelations, field: Field): boolean {
    return r.fk_property ?
      r.fk_property === field.property.fkProperty :
      r.fk_property_of_property ? r.fk_property_of_property === field.property.fkPropertyOfProperty : false
  }




  private getLeafControl(

    formCtrlType: SysConfigFormCtrlType,
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    if (formCtrlType.timeSpan) return this.timeSpanCtrl(targetClass, field, initStmts)
    else if (formCtrlType.place) return this.placeCtrl(targetClass, field, initStmts)
    else if (formCtrlType.appellationTeEn) return this.appellationTeEnCtrl(targetClass, field, initStmts)
    else if (formCtrlType.entity) return this.entityCtrl(targetClass, field, initStmts)
    else if (formCtrlType.language) return this.languageCtrl(targetClass, field, initStmts)
    else if (formCtrlType.appellation) return this.appellationCtrl(targetClass, field, initStmts)
    else if (formCtrlType.langString) return this.langStringCtrl(targetClass, field, initStmts)
    else if (formCtrlType.dimension) return this.dimensionCtrl(targetClass, field, initStmts)
    else if (formCtrlType.typeItem) return this.typeCtrl(targetClass, field, initStmts)
    else if (formCtrlType.timePrimitive) return this.timePrimitiveCtrl(targetClass, field, initStmts)
    else console.error('formCtrlType not found: ', JSON.stringify(formCtrlType))
  }




  private emitNewSearchString(str: string) {
    // this.searchString.emit(values(this.searchStringParts).filter(string => !!string).join(' '));
    this.searchString.emit(str);
  }

  submit() {
    this.submitted = true
    if (this.formFactory.formGroup.valid) {
      this.saving = true;
      this.save()

    } else {
      const f = this.formFactory.formGroup.controls.childControl as FormArray;
      U.recursiveMarkAsTouched(f)
    }
  }

  save() {

    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const value = this.formFactory.formGroupFactory.valueChanges$.value
      let upsert$: Observable<GvSchemaModifier>;
      if (value.resource) {
        upsert$ = this.dataService.upsertInfResourcesWithRelations(pkProject, [value.resource])
      }
      else {
        throw new Error(`Submitting ${value} is not implemented`);
      }

      upsert$.pipe(takeUntil(this.destroy$))
        .subscribe((res: GvSchemaModifier) => {
          if (res) {
            if (value.resource) {
              if (!res.positive.inf.resource.length) throw new Error('bad result')
              this.saved.emit(res.positive.inf.resource[0])
            }
            this.saving = false;
          }
        })
    })
  }


  /**
   * Leaf nodes generators
   */

  private timeSpanCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const initValue: CtrlTimeSpanModel = {}
    for (let i = 0; i < initStmts.length; i++) {
      const element = initStmts[i];
      const calendar = element?.entity_version_project_rels?.[0].calendar
      initValue[element.fk_property] = { ...element.object_time_primitive, calendar }
    }
    const targetClassLabel = field.targets[targetClass].targetClassLabel
    const controlConfig: LocalNodeConfig = {
      control: {
        initValue,
        placeholder: field.label,
        required: this.ctrlRequired(field),
        data: {
          appearance: this.appearance,
          controlType: 'ctrl-time-span',
          targetClass,
          targetClassLabel
        },
        mapValue: (val) => {
          if (!val) return null;
          const v = val as CtrlTimeSpanDialogResult;
          const value: InfStatementWithRelations[] = Object.keys(v).map(key => {
            const timePrim: TimePrimitiveWithCal = v[key]
            const statement: InfStatementWithRelations = {
              entity_version_project_rels: [
                {
                  is_in_project: true,
                  calendar: timePrim.calendar
                }
              ],
              fk_property: parseInt(key, 10),
              object_time_primitive: {
                julian_day: timePrim.julianDay,
                duration: timePrim.duration,
                fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
              }
            }
            return statement
          });
          return value;
        }
      }
    };
    return of([controlConfig]);
  }


  private languageCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    return this.ap.pipeActiveDefaultLanguage().pipe(map(defaultLanguage => {
      const targetClassLabel = field.targets[targetClass].targetClassLabel
      // with [{}] we make sure at least one item is added
      const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal: InfStatementWithRelations) => ({
        control: {
          placeholder: field.label,
          required: this.ctrlRequired(field),
          data: {
            appearance: this.appearance,
            controlType: 'ctrl-language',
            targetClass,
            targetClassLabel
          },
          initValue: initVal.object_language || defaultLanguage,
          mapValue: (val: InfLanguage) => {
            if (!val) return null;
            const value: InfStatementWithRelations = {
              fk_object_info: undefined,
              fk_property: field.property.fkProperty,
              object_language: {
                ...val,
                fk_class: targetClass,
              },
            };
            return value;
          }
        }
      }));
      return controlConfigs;
    })
    )
  }

  private typeCtrl(
    targetClass: number,
    field: Field,
    initItems: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const targetClassLabel = field.targets[targetClass].targetClassLabel
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfStatement) => {
      const initValue = !initVal ?
        undefined : field.isOutgoing ?
          initVal.fk_object_info : initVal.fk_subject_info;
      return {
        control: {
          initValue,
          placeholder: field.label,
          required: this.ctrlRequired(field),
          data: {
            appearance: this.appearance,
            controlType: 'ctrl-type',
            field,
            targetClass,
            targetClassLabel
          },
          mapValue: (val: number) => {
            if (!val) return null;

            let value: InfStatementWithRelations = {
              fk_property: field.property.fkProperty,
            };

            if (field.isOutgoing) {
              value = { ...value, fk_object_info: val }
            } else {
              value = { ...value, fk_subject_info: val }
            }

            return value;
          }
        }
      }
    });
    return of(controlConfigs);
  }


  private appellationCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const targetClassLabel = field.targets[targetClass].targetClassLabel

    const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal: InfStatementWithRelations) => ({
      control: {
        initValue: initVal.object_appellation,
        placeholder: field.label,
        required: this.ctrlRequired(field),
        validators: [ValidationService.appellationValidator()],
        data: {
          appearance: this.appearance,
          controlType: 'ctrl-appellation',
          targetClass,
          targetClassLabel
        },
        mapValue: (val: InfAppellation) => {
          if (!val) return null;
          const value: InfStatementWithRelations = {
            fk_object_info: undefined,
            fk_property: field.property.fkProperty,
            object_appellation: {
              ...val,
              fk_class: targetClass,
            },
          };
          return value;
        }
      }
    }))

    return of(controlConfigs);
  }


  private placeCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    // with [{}] we make sure at least one item is added
    const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal) => ({
      childFactory: {
        component: FgPlaceComponent,
        getInjectData: (d) => {
          return d.place
        },
        required: this.ctrlRequired(field),
        data: {
          place: {
            appearance: this.appearance,
            initVal$: of(initVal.object_place)
          }
        },
        mapValue: (val: InfPlace) => {
          if (!val) return null;
          const value: InfStatementWithRelations = {
            fk_object_info: undefined,
            fk_property: field.property.fkProperty,
            object_place: {
              ...val,
              fk_class: targetClass,
            },
          };
          return value;
        }
      }
    }));
    return of(controlConfigs);


  }


  private langStringCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {

    const controlConfigs: LocalNodeConfig[] = initStmts.map((stmt) => ({
      childFactory: {
        component: FgLangStringComponent,
        getInjectData: (d) => {
          return d.langString
        },
        required: this.ctrlRequired(field),
        data: {
          langString: {
            appearance: this.appearance,
            initVal$: of(stmt.object_lang_string)
          }
        },
        mapValue: (val: InfLangString) => {
          const value: InfStatementWithRelations = {
            fk_object_info: undefined,
            fk_property: field.property.fkProperty,
            fk_property_of_property: field.property.fkPropertyOfProperty,
            object_lang_string: {
              ...val,
              fk_class: targetClass,
            },
          };
          return value;
        }
      }
    }));
    return of(controlConfigs);

  }

  private dimensionCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const controlConfigs: LocalNodeConfig[] = initStmts.map((stmt) => ({
      childFactory: {
        component: FgDimensionComponent,
        getInjectData: (d) => {
          return d.dimension
        },
        required: this.ctrlRequired(field),
        data: {
          dimension: {
            appearance: this.appearance,
            pkClassOfDimension: targetClass,
            initVal$: of(stmt.object_dimension)
          }
        },
        mapValue: (val: InfDimension) => {
          const value: InfStatementWithRelations = {
            fk_object_info: undefined,
            fk_property: field.property.fkProperty,
            fk_property_of_property: field.property.fkPropertyOfProperty,
            object_dimension: {
              ...val,
              fk_class: targetClass,
            },
          };
          return value;
        }
      }
    }));
    return of(controlConfigs);

  }

  private entityCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const targetClassLabel = field.targets[targetClass].targetClassLabel

    return this.c.pipeTableNameOfClass(targetClass).pipe(
      map(basicModel => {

        const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal: InfStatementWithRelations) => {
          let initValue: CtrlEntityModel = {}

          if (field.isOutgoing) {
            // assign the object as init value for ctrl-entity
            if (initVal.object_resource) initValue.resource = initVal.object_resource
            else if (initVal.fk_object_info) initValue.pkEntity = initVal.fk_object_info
          } else {
            // assign the subject as init value for ctrl-entity
            if (initVal.subject_resource) initValue.resource = initVal.subject_resource
            else if (initVal.fk_subject_info) initValue.pkEntity = initVal.fk_subject_info
          }


          initValue = (!initValue.pkEntity && !initValue.resource) ? null : initValue;

          const c: LocalNodeConfig = {
            control: {
              initValue,
              placeholder: field.label,
              required: true,
              data: {
                appearance: this.appearance,
                controlType: 'ctrl-entity',
                field,
                targetClass,
                targetClassLabel,
                ctrlEntity: {
                  model: basicModel
                }
              },
              mapValue: (val: CtrlEntityModel) => {
                if (!val || (!val.pkEntity && !val.resource)) return null;

                const statement: InfStatementWithRelations = {
                  fk_property: field.property.fkProperty,
                  fk_property_of_property: field.property.fkPropertyOfProperty,
                };

                if (field.isOutgoing) {
                  // assign object
                  if (val.pkEntity) statement.object_resource = { pk_entity: val.pkEntity, fk_class: targetClass };
                  else if (val.resource) statement.object_resource = val.resource

                } else {
                  // assign subject
                  if (val.pkEntity) statement.subject_resource = { pk_entity: val.pkEntity, fk_class: targetClass };
                  else if (val.resource) statement.subject_resource = val.resource
                }

                return statement;
              }
            }
          }
          return c
        });
        return controlConfigs;
      })
    )
  }


  private timePrimitiveCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const targetClassLabel = field.targets[targetClass].targetClassLabel
    // with [{}] we make sure at least one item is added
    const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal) => ({
      control: {
        initValue: initVal.object_time_primitive,
        placeholder: field.label,
        required: this.ctrlRequired(field),
        validators: [],
        data: {
          appearance: this.appearance,
          controlType: 'ctrl-time-primitive',
          targetClass,
          targetClassLabel
        },
        mapValue: (val: TimePrimitiveWithCal) => {
          if (!val) return null;
          const { calendar, ...timePrim } = val;
          const value: InfStatementWithRelations = {
            entity_version_project_rels: [
              { calendar: val.calendar }
            ],
            fk_object_info: undefined,
            fk_property: field.property.fkProperty,
            object_time_primitive: {
              julian_day: timePrim.julianDay,
              duration: timePrim.duration,
              fk_class: targetClass,
            },
          };
          return value;
        }
      }
    }))

    return of(controlConfigs);
  }

  private appellationTeEnCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {
    const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal) => ({
      childFactory: {
        component: FgAppellationTeEnComponent,
        getInjectData: (d) => {
          return d.appellationTeEn
        },
        required: this.ctrlRequired(field),
        data: {
          appellationTeEn: {
            pkClass: getFormTargetClasses(field)?.[0].targetClass,
            appearance: this.appearance,
            initVal$: of(field.isOutgoing ? initVal.object_resource : initVal.subject_resource)
          }
        },
        mapValue: (val: InfResourceWithRelations) => {
          if (!val) return null;
          let value: InfStatementWithRelations;
          if (field.isOutgoing) {
            value = {
              fk_subject_info: undefined,
              fk_property: field.property.fkProperty,
              object_resource: {
                ...val,
                fk_class: targetClass,
              },
            };
          } else {
            value = {
              fk_object_info: undefined,
              fk_property: field.property.fkProperty,
              subject_resource: {
                ...val,
                fk_class: targetClass,
              },
            };
          }
          return value;
        }
      }
    }));
    return of(controlConfigs);
  }


  /**
   * returns true if control is required
   * TODO!
   */
  private ctrlRequired(f: Subfield | Field): boolean {
    return (
      f &&
      f.isOutgoing &&
      f.identityDefiningForSource
    )
  }

}

function getStatementKey(isOutgoing: boolean) {
  return isOutgoing ? 'outgoing_statements' : 'incoming_statements';
}

// export interface MapValueItem { key: string, value: any }
