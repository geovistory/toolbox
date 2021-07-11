import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, CtrlTimeSpanDialogResult, Field, SchemaSelectorsService, Subfield, TableName } from '@kleiolab/lib-queries';
import { SchemaService } from '@kleiolab/lib-redux';
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
import { ReduxMainService } from 'projects/lib-redux/src/lib/redux-store/state-schema/services/reduxMain.service';
import { equals, flatten, groupBy, sum, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { auditTime, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanModel } from '../ctrl-time-span/ctrl-time-span.component';
import { FgAppellationTeEnComponent, FgAppellationTeEnInjectData } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent, FgDimensionInjectData } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent, FgLangStringInjectData } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent, FgPlaceInjectData } from '../fg-place/fg-place.component';
export interface FormArrayData {
  pkClass?: number
  // customCtrlLabel?: string
  stringPartId?: number

  // rootArray where one static item is used by the formGroupFactory
  rootArray?: FormGroupData,

  // wraps the whole form in a statement, where the new entity is subject or object
  wrapperStatement?: {
    field: Field
    targetClass: number
    targetType: SysConfigFormCtrlType
  }

  // is a section of the form, containing gvFormFields
  gvFormSection?: {
    parentProperty?: GvFieldProperty
    section: FieldSection
  }

  // a gv-form-field (with header, plus button, ect.)
  gvFormField?: {
    field: Field
    addItemsOnInit: number
    minLength: number
    maxLength: number
  }

  // a last wrapper before the leaf (FormControlData / FormChildData)
  controlWrapper?: {
    field: Field
    targetClass: number
    targetType: SysConfigFormCtrlType
  }

  // gets called when removed
  removeHook?: (x: FormArrayData) => any
}
interface FormGroupData {
  pkClass?: number
  field?: Field
  targetClass?: number
  targetClassLabel?: string
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
  key: 'basic' | 'specific',
  label: string,
  showHeader$: BehaviorSubject<boolean>,
  expanded$: BehaviorSubject<boolean>,
  pipeFields: (pkClass: number) => Observable<Field[]>
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
  @Input() targetClass: number;

  @Input() hideButtons: boolean;
  @Input() hideTitle: boolean;

  @Input() initVal$: Observable<InfResourceWithRelations | undefined>;


  @Input() hiddenProperty: GvFieldProperty;

  @Output() cancel = new EventEmitter<void>()
  @Output() searchString = new EventEmitter<string>()
  @Output() saved = new EventEmitter<InfResourceWithRelations | InfStatementWithRelations>()

  appearance: MatFormFieldAppearance = 'outline';

  _initVal$ = new BehaviorSubject(undefined)
  destroy$ = new Subject<boolean>();
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory
  submitted = false;
  saving = false;
  searchStringPartId = 0;
  searchStringParts: { [key: number]: string } = {}

  resourcesToAdd: InfResource[] = []

  basicSection: FieldSection = {
    showHeader$: new BehaviorSubject(false),
    expanded$: new BehaviorSubject(false),
    key: 'basic',
    label: 'Basics',
    pipeFields: (pk) => this.c.pipeBasicFieldsOfClass(pk)
  }
  specificSection: FieldSection = {
    showHeader$: new BehaviorSubject(false),
    expanded$: new BehaviorSubject(false),
    key: 'specific',
    label: 'Specific Fields',
    pipeFields: (pk) => this.c.pipeSpecificFieldOfClass(pk)
  }
  sections: FieldSection[] = []

  constructor(
    private formFactoryService: FormFactoryService,
    private c: ConfigurationPipesService,
    private dataService: ReduxMainService,
    private ss: SchemaSelectorsService,
    public ap: ActiveProjectPipesService,
    public s: SchemaService
  ) { }

  ngOnInit() {
    if (!this.pkClass && !(this.field && this.targetClass)) throw new Error('You must provide a pkClass or a field+targetClass as @Input() on FormCreateEntityComponent');

    if (this.initVal$) this.initVal$.subscribe(b => this._initVal$.next(b))


    const data: FormGroupData = {
      pkClass: this.pkClass,
      field: this.field,
      targetClass: this.targetClass,
      targetClassLabel: this.field ? this.field.targets[this.targetClass].targetClassLabel : undefined
    }

    this.formFactory$ = this.formFactoryService.create<FormGroupData, FormArrayData, FormControlData, any>({
      hideTitle: this.hideTitle,
      rootFormGroup$: of({ data }),
      getChildNodeConfigs: this.getChildNodeConfigs
    }, this.destroy$)


    this.formFactory$.pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory = v
      // TMP GM
      // console.log(v)
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setAdvanced(b: boolean) {
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
      if (n.array?.data?.rootArray?.pkClass) return this.getGvFormSections(n.array?.data?.rootArray.pkClass)
      else if (n.array?.data?.rootArray?.field) return this.getWrapperStatement(n.array?.data?.rootArray)
      const a = n.array
      if (a.data.wrapperStatement) return this.getGvFormSections(a.data.wrapperStatement.targetClass, a.data.wrapperStatement.field);
      else if (a.data.gvFormSection) return this.getGvFormFields(a)
      else if (a.data.gvFormField) return this.getControlWrappers(a.data.gvFormField, a.initValue)
      else if (a.data.controlWrapper) {
        const w = a.data.controlWrapper
        return this.getLeafControl(w.targetType, w.targetClass, w.field, a.initValue)
      }

    }
    console.error('no child node created for this nodeConfig:', n)
  }


  /**
   * wrap the whole form in a form node that maps child values into a InfStatementWithRelations
   */
  private getWrapperStatement(data: FormGroupData): Observable<LocalNodeConfig[]> {
    this.hiddenProperty = data.field.property;
    const n: LocalNodeConfig = {
      array: {
        placeholder: data.targetClassLabel,
        data: {
          wrapperStatement: {
            field: data.field,
            targetClass: data.targetClass,
            targetType: data.field.targets[data.targetClass].formControlType
          },
          pkClass: null
        },
        mapValue: (items: GvSectionsModel[]): { statement?: Partial<InfStatementWithRelations> } => {
          const item = items[0]
          let statement: Partial<InfStatementWithRelations> = { ...item.statement ?? {} }
          if (data.field.isOutgoing) {
            // assign subject
            statement.fk_subject_info = this.source.fkInfo;
            statement.fk_subject_data = this.source.fkData;
            statement.fk_subject_tables_cell = this.source.fkTablesCell;
            statement.fk_subject_tables_row = this.source.fkTablesRow;
            // assign object
            if (item.resource) statement.object_resource = item.resource
          } else {
            // assign object
            statement.fk_object_info = this.source.fkInfo;
            statement.fk_object_data = this.source.fkData;
            statement.fk_object_tables_cell = this.source.fkTablesCell;
            statement.fk_object_tables_row = this.source.fkTablesRow;
            // assign subject
            if (item.resource) statement.subject_resource = item.resource
          }

          // assign property
          statement = {
            ...statement,
            fk_property: data.field.property.fkProperty,
            fk_property_of_property: data.field.property.fkPropertyOfProperty,
          }
          return { statement }

        }
      },
    }
    return of([n])
  }

  private getRootArray(data: FormGroupData): Observable<LocalNodeConfig[]> {
    const n: LocalNodeConfig = {
      array: {
        placeholder: '',
        data: { rootArray: data },
        mapValue: (items: { resource?: InfResourceWithRelations, statement?: InfStatementWithRelations }[]) => {
          if (items?.[0]?.resource) {
            // merge the resources produced by each section
            const outgoing_statements: InfStatementWithRelations[] = []
            const incoming_statements: InfStatementWithRelations[] = []
            items.forEach(i => {
              outgoing_statements.push(...i.resource?.outgoing_statements ?? [])
              incoming_statements.push(...i.resource?.incoming_statements ?? [])
            })
            return { resource: { ...items[0].resource, outgoing_statements, incoming_statements } }
          } else {
            return items?.[0]
          }
        }
      }
    }
    return of([n])
  }

  // }
  /**
   * generate the top level sections of the form
   */
  private getGvFormSections(pkClass: number, field?: Field): Observable<LocalNodeConfig[]> {
    return combineLatest([
      // fetch the formControlType of class
      this.ss.dfh$.class$.by_pk_class$.key(pkClass),
      this.c.pipeTargetTypesOfClass(pkClass, field?.targetMaxQuantity),
      this.c.pipeTableNameOfClass(pkClass),
      this.c.pipeClassLabel(pkClass)
    ]).pipe(auditTime(10), map(([klass, targets, parentModel, label]) => {

      const formControlType = targets.formControlType;

      if (formControlType.entity || !field) { // generate a the generic form

        // initialize the sections
        if (klass.basic_type === 8 || klass.basic_type === 30) {
          this.sections = [this.basicSection, this.specificSection]
        } else {
          this.sections = [this.specificSection, this.basicSection]
        }
        this.sections[0].expanded$.next(true)

        const nodes: LocalNodeConfig[] = this.sections.map(section => {
          const n: LocalNodeConfig = {
            array: {
              isList: false,
              required: true,
              maxLength: 1,
              placeholder: label,
              data: {
                gvFormSection: {
                  section
                },
                pkClass: pkClass,
              },
              mapValue: (items: InfResourceWithRelations[]): GvSectionsModel => {
                this.emitNewSearchString();

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
        return nodes
      }

      // else we have control belonging to a field

      const c = this.getControlWrapper(field, pkClass);
      c.array.addOnInit = 1;
      const mapValue = (items: InfStatementWithRelations): GvSectionsModel => {
        return { statement: items[0] ?? {} }
      }
      c.array.mapValue = mapValue
      return [c]

    }));

  }


  /**
   * Generates the array of gvFormFields
   */
  private getGvFormFields(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {

    return combineLatest([
      this.ss.dfh$.class$.by_pk_class$.key(arrayConfig.data.pkClass),
      this._initVal$,
    ])
      .pipe(
        filter(([klass]) => !!klass),
        switchMap(([dfhClass, initVal]) => {

          const initResource = initVal

          /**
           * Here we define different simple forms for TeEn / PeIt
           */
          const isPersistentItem = (dfhClass.basic_type === 8 || dfhClass.basic_type === 30);
          // const section = arrayConfig.data.gvFormSection.section;
          // if (isPersistentItem && section.key === 'basic') section.expanded$.next(true)
          // else if (!isPersistentItem && section.key === 'specific') section.expanded$.next(true)

          return arrayConfig.data.gvFormSection.section.pipeFields(dfhClass.pk_class).pipe(
            map((fields) => fields.filter(fDef => {
              // Q: is this field not circular or hidden?
              const prop = arrayConfig.data.gvFormSection.parentProperty;
              const parentPropety = prop ? prop.fkProperty : undefined;
              if (
                (!parentPropety || parentPropety !== fDef.property.fkProperty) &&
                !equals(fDef.property, this.hiddenProperty)
              ) {
                return true;
              }
              return false;
            })
            ),
            switchMap((fields) => {


              return combineLatestOrEmpty(fields.map(f => {

                // make one definition required for each persistent item
                if (isPersistentItem && f.property.fkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
                  f.targetMinQuantity = 1;
                  f.identityDefiningForSource = true;
                }
                let addItemsOnInit = 0;
                if (isPersistentItem && f.isOutgoing === false && f.property.fkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF) {
                  addItemsOnInit = 1
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
                    initValue: this.getInitValueForFieldNode(f, { initResource }),
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
                return of(n)
              })

              )
            }));
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
    const targetClasses = field.targetClasses;
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
      this.emitNewSearchString();
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
  getInitValueForFieldNode(lDef: Field, initVal: { initResource: InfResourceWithRelations }): InfStatementWithRelations[] {
    if (lDef.isSpecialField == 'time-span') {
      if (initVal.initResource && initVal.initResource.outgoing_statements) {
        return initVal.initResource.outgoing_statements
          .filter(r => DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.includes(r.fk_property))
      }
    }
    else if (initVal.initResource) {
      if (lDef.isOutgoing && initVal.initResource.outgoing_statements) {
        return initVal.initResource.outgoing_statements.filter(r => this.sameProperty(r, lDef))
      }
      else if (!lDef.isOutgoing && initVal.initResource.incoming_statements) {
        return initVal.initResource.incoming_statements.filter(r => this.sameProperty(r, lDef))
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




  private emitNewSearchString() {
    this.searchString.emit(values(this.searchStringParts).filter(string => !!string).join(' '));
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
      const addEntities$ = uniq(this.resourcesToAdd).map(pkEntity => this.s.api.addEntityToProject(pkProject, pkEntity))
      const value = this.formFactory.formGroupFactory.valueChanges$.value
      let upsert$: Observable<GvSchemaModifier>;
      if (value.resource) {
        upsert$ = this.dataService.upsertInfResourcesWithRelations(pkProject, [value.resource])
      }
      else if (value.statement) {
        upsert$ = this.dataService.upsertInfStatementsWithRelations(pkProject, [value.statement])
      }
      else {
        throw new Error(`Submitting ${value} is not implemented`);
      }


      combineLatest([upsert$, ...addEntities$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([res]: [GvSchemaModifier]) => {
          if (res) {
            if (value.resource) {
              if (!res.positive.inf.resource.length) throw new Error('bad result')
              this.saved.emit(res.positive.inf.resource[0])
            }
            if (value.statement) {
              if (!res.positive.inf.statement.length) throw new Error('bad result')
              this.saved.emit(res.positive.inf.statement[0])
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
      initValue[element.fk_property] = element.object_time_primitive;
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
                  if (val.pkEntity) statement.fk_object_info = val.pkEntity;
                  else if (val.resource) statement.object_resource = val.resource

                } else {
                  // assign subject
                  if (val.pkEntity) statement.fk_subject_info = val.pkEntity;
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
