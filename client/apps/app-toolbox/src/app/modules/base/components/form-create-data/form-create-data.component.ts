import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, CtrlTimeSpanDialogResult, DisplayType, Field, SectionName, StateFacade, TableName } from '@kleiolab/lib-redux';
import { GvFieldProperty, GvFieldSourceEntity, InfAppellation, InfData, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfResourceWithRelations, InfStatement, InfStatementWithRelations, Section, SysConfigFormCtrlType, SysConfigValueObjectType, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { TimeSpanResult, U, combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { equals, flatten, groupBy, sum, values } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ValidationService } from '../../../../core/validation/validation.service';
import { FormArrayFactory } from '../../../../modules/form-factory/core/form-array-factory';
import { FormChildFactory } from '../../../../modules/form-factory/core/form-child-factory';
import { FormControlFactory } from '../../../../modules/form-factory/core/form-control-factory';
import { FormFactory } from '../../../../modules/form-factory/core/form-factory';
import { FormArrayConfig } from '../../../../modules/form-factory/services/FormArrayConfig';
import { FormNodeConfig } from '../../../../modules/form-factory/services/FormNodeConfig';
import { FormFactoryService } from '../../../../modules/form-factory/services/form-factory.service';
import { C_53_TYPE_ID, C_54_LANGUAGE_ID } from '../../../../ontome-ids';
import { InfValueObject } from '../../../../shared/components/value-preview/value-preview.component';
import type { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanModel } from '../ctrl-time-span/ctrl-time-span.component';
import { FgAppellationTeEnComponent, FgAppellationTeEnInjectData } from '../fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent, FgDimensionInjectData } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent, FgLangStringInjectData } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent, FgPlaceInjectData } from '../fg-place/fg-place.component';
import { FgTextWithLangComponent, FgTextWithLangInjectData } from '../fg-text-with-lang/fg-text-with-lang.component';
import { getFormTargetClasses } from '../form-field-header/form-field-header.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormCreateDataService } from './form-create-data.service';
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
  gvFieldItem?: {
    field: Field
    targetClass: number
    targetType: FormControlType
  }

  // gets called when removed
  removeHook?: (x: FormArrayData) => any
}


interface FormControlType extends SysConfigFormCtrlType {
  typeItem?: boolean,
  platformVocabItem?: boolean,
  timeSpan?: 'true'
}



export interface FormField {
  field: Field
  config?: Section
  addItemsOnInit: number
  minLength: number
  maxLength: number
}

interface FormGroupData {
  pkClass: number
  section?: boolean
  value?: {
    config: SysConfigValueObjectType,
    initVal: InfValueObject
  }
}
export interface FormControlData {
  controlType: FormControlType
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
  selector: 'gv-form-create-data',
  templateUrl: './form-create-data.component.html',
  styleUrls: ['./form-create-data.component.scss'],
  providers: [FormCreateDataService],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, FormGroupComponent, MatButtonModule, AsyncPipe]
})
export class FormCreateDataComponent implements OnInit, OnDestroy {


  @Input() pkClass: number

  @Input() source: GvFieldSourceEntity;
  @Input() field: Field;

  @Input() hideButtons = false // : boolean;
  @Input() hideTitle: boolean;

  @Input() initVal$: Observable<InfData>;


  @Input() hiddenProperty: GvFieldProperty;

  @Output() cancel = new EventEmitter<void>()
  @Output() searchString = new EventEmitter<string>()
  // @Output() saved = new EventEmitter<InfResourceWithRelations | InfStatementWithRelations>()
  @Output() data = new EventEmitter<InfData>()

  appearance: MatFormFieldAppearance = 'outline';

  _initVal$ = new BehaviorSubject<InfData>(undefined)
  destroy$ = new Subject<boolean>();
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory
  submitted = false;
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
  timeSpanSection: FieldSection = {
    showHeader$: new BehaviorSubject(true),
    expanded$: new BehaviorSubject(true),
    key: SectionName.timeSpan,
    label: 'Time Span',
    pipeFields: (pk) => this.c.pipeSection(pk, DisplayType.form, SectionName.timeSpan)
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
  isValue$: Observable<SysConfigValueObjectType>;

  constructor(
    private formFactoryService: FormFactoryService,
    private c: ConfigurationPipesService,
    private state: StateFacade,
    private ap: ActiveProjectPipesService,
    formCreateDataServices: FormCreateDataService
  ) {
    formCreateDataServices.registerComponent(this)
  }

  ngOnInit() {

    if (!this.pkClass) throw new Error('You must provide a pkClass');

    this.c.pipeClassLabel(this.pkClass).subscribe(label => this.classLabel = label);

    this.isValue$ = this.state.data.sys.config.sysConfig$.pipe(map(config => config.classes[this.pkClass]?.valueObjectType))

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
      if (a?.data?.rootArray?.section) return this.getGvFormSections(n.array?.data?.rootArray.pkClass)
      if (a?.data?.rootArray?.value) {
        return this.getValueLeafControl(
          a?.data?.rootArray.value.config,
          a?.data?.rootArray.value.initVal, this.pkClass
        )
      }
      if (a.data.gvFormSection) return this.getGvFormFields(a)
      if (a.data.gvFormField) return this.getFieldItems(a.data.gvFormField, a.initValue)
      if (a.data.gvFieldItem) {
        const w = a.data.gvFieldItem
        return this.getLeafControl(w.targetType, w.targetClass, w.field, a.initValue)
      }

    }
    console.error('no child node created for this nodeConfig:', n)
  }

  private getRootArray(data: FormGroupData): Observable<LocalNodeConfig[]> {

    return combineLatest([
      this.isValue$
    ]).pipe(
      switchMap(([isValue]) => {

        let rootArray, mapValue;
        // if is value -> we need the initval now
        if (isValue) {
          return this._initVal$.pipe(
            map(initVal => {
              rootArray = {
                ...data,
                value: {
                  config: isValue,
                  initVal
                }
              }

              mapValue = (items?: InfData[]): InfData => items[0]

              const n: LocalNodeConfig = {
                array: {
                  placeholder: '',
                  data: { rootArray: rootArray },
                  mapValue: mapValue
                }
              }
              return [n]
            })
          )
        }
        // else, do this later
        else {
          rootArray = {
            ...data,
            section: true
          }

          mapValue = (items?: InfData[]): InfData => {
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

          const n: LocalNodeConfig = {
            array: {
              placeholder: '',
              data: { rootArray: rootArray },
              mapValue: mapValue
            }
          }
          return of([n])
        }

      })
    )


  }

  /**
   * generate the top level sections of the form
   */
  private getGvFormSections(pkClass: number): Observable<LocalNodeConfig[]> {
    // console.log('aaa aaaaaaaaa')// freezing bug log
    return combineLatest([
      this.advancedMode$,
      // freezing bug log
      // .pipe(tap(x => console.log('aaa advancedMode$'))),
      this._initVal$,
      // freezing bug log
      // .pipe(tap(x => console.log('aaa _initVal$'))),
      this.state.data.dfh.klass.select.byPkClass(pkClass),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa by_pk_class$'))),
      this.c.pipeTargetTypesOfClass(pkClass),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa pipeTargetTypesOfClass$'))),
      this.c.pipeTableNameOfClass(pkClass),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa pipeTableNameOfClass$'))),
      this.c.pipeClassLabel(pkClass).pipe(
        distinctUntilChanged(),
        // freezing bug log
        //  tap(x => console.log('aaa pipeClassLabel$', pkClass, x))
      ),
    ]).pipe(
      switchMap(([advancedMode, initVal, klass, targets, parentModel, label]) => {
        const fct = targets.formControlType
        // if we don't create an entity but a value object
        if (!fct.entity && !fct.appellationTeEn) { // skip all the sections and wrap control directly

          const c = this.getFieldItem(this.field, pkClass);
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
            if (isPersistentItem) {
              this.simpleFormSection.pipeFields = (pk) => this.c.pipeSimpleForm(pk, 'PeIt');
              this.sections = [this.simpleFormSection]
            } else {
              this.simpleFormSection.pipeFields = (pk) => this.c.pipeSimpleForm(pk, 'TeEn');
              this.timeSpanSection.showHeader$.next(false)
              this.sections = [this.timeSpanSection, this.simpleFormSection]
            }
          } else if (isPersistentItem) {
            this.sections = [this.basicSection, this.metadataSection, this.specificSection]
          } else {
            this.sections = [this.timeSpanSection, this.specificSection, this.metadataSection, this.basicSection]
          }
          // console.log('aaa sections: ', this.sections) // freezing bug log

          // pipe the fields of each section
          const sectionsWithFields$ = combineLatestOrEmpty(
            this.sections.map(section => section.pipeFields(pkClass).pipe(
              map(fields => {
                // console.log('aaa section', pkClass, section) // freezing bug log
                return fields.filter(fDef => {
                  // Q: is this field hidden?
                  if (equals(fDef.property, this.hiddenProperty)) return false;
                  return true;
                })
              }),
              map(fields => ({ section, fields }))
            ))
          )




          // const nb = 0 // freezing bug log
          // if (this.sections[nb]) this.sections[nb].pipeFields(pkClass).subscribe(() => console.log('section', nb)) // freezing bug log
          // console.log(this.sections) // freezing bug log


          return sectionsWithFields$.pipe(
            map(sectionsWithFields => {

              // console.log('aaa ---') // freezing bug log

              // if simple mode
              if (!advancedMode) {

                // Q: does init val need advanced mode?
                const requiredFieldKeys = []
                for (const s of initVal?.resource?.incoming_statements ?? []) {
                  requiredFieldKeys.push('in_' + s.fk_property + '_' + s.fk_property_of_property)
                }
                for (const s of initVal?.resource?.outgoing_statements ?? []) {
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


              // console.log('aaa place2') // freezing bug log

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
                        initValue: initVal?.resource,
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

                      this.emitNewSearchString(curHasNames[0] ? focusName : '');

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
    const section = arrayConfig.data.gvFormSection.section;
    const fields = arrayConfig.data.gvFormSection.fields;
    const initVal = arrayConfig.data.gvFormSection.initValue

    // if the section is time-span section, add a timespan ctrl
    if (section.key === SectionName.timeSpan) {
      const n = this.timeSpanCtrl2<InfResourceWithRelations>(50, 'has time-span', 'Time Span', false, initVal?.outgoing_statements, (v) => {
        const statements: InfStatementWithRelations[] = Object.keys(v).map(key => {
          const timePrim: TimeSpanResult = v[key]
          const statement: InfStatementWithRelations = {
            fk_property: parseInt(key, 10),
            object_time_primitive: {
              julian_day: timePrim.julianDay,
              duration: timePrim.duration,
              fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
              calendar: timePrim.calendar
            }
          }
          return statement
        });
        const resource: InfResourceWithRelations = {
          fk_class: arrayConfig.data.pkClass,
          outgoing_statements: statements
        };
        return resource
      })
      return of([n])
    }

    return combineLatest([
      this.state.data.dfh.klass.select.byPkClass(arrayConfig.data.pkClass)
    ])
      .pipe(
        filter(([klass]) => !!klass),
        map(([dfhClass]) => {

          const isPersistentItem = (dfhClass.basic_type === 8 || dfhClass.basic_type === 30);

          return fields.map(f => {

            // // make one definition required for each persistent item
            // if (isPersistentItem && f.property.fkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
            //   f.targetMinQuantity = 1;
            //   f.identityDefiningForSource = true;
            // }
            let addItemsOnInit = 0;
            // if (isPersistentItem && f.isOutgoing === false && f.property.fkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF) {
            //   addItemsOnInit = 1
            // }

            // Add default controls to some properties according to the config
            const config = f.display.formSections?.[section.key]
            if (config?.controlsOnInit) {
              addItemsOnInit = config.controlsOnInit;
            }
            const required = config?.required > 0;

            const maxLength = f.targetMaxQuantity == -1 ? Number.POSITIVE_INFINITY : f.targetMaxQuantity;
            const minLength = f.identityDefiningForSource ? f.targetMinQuantity : 0;

            const n: LocalNodeConfig = {
              array: {
                data: {
                  gvFormField: {
                    minLength,
                    maxLength,
                    field: f,
                    config,
                    addItemsOnInit
                  },
                  pkClass: undefined,
                },
                initValue: this.getInitValueForFieldNode(f, initVal),
                placeholder: f.label,
                required: required ? true : this.ctrlRequired(f),
                validators: [
                  (control: UntypedFormArray): { [key: string]: any } | null => {
                    const length = sum(
                      control.controls.map((ctrl: UntypedFormArray) => ctrl.controls
                        .filter(c => c.status === 'VALID').length))
                    return length >= minLength
                      ? null : { 'minLength': { value: control.value, minLength } }
                  },
                  (control: UntypedFormArray): { [key: string]: any } | null => {
                    const length = sum(control.controls.map((ctrl: UntypedFormArray) => ctrl.controls.length))
                    return length <= maxLength
                      ? null : { 'maxLength': { value: control.value, maxLength } }
                  }
                ],
                mapValue: (x: InfStatementWithRelations[]): Partial<InfResourceWithRelations> => {
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
   * Generate the array of FieldItems
   */
  private getFieldItems(
    gvFormField: FormArrayData['gvFormField'],
    initStatements: InfStatementWithRelations[] = [],
  ): Observable<LocalNodeConfig[]> {

    const field = gvFormField.field;
    const targetClasses = getFormTargetClasses(field).map(f => f.targetClass);
    const isOutgoing = field.isOutgoing

    if (field.isSpecialField === 'time-span') {
      return of([this.getFieldItem(
        field,
        targetClasses[0],
        initStatements
      )])
    }

    // get the target class for each initial statement
    const o$ = initStatements.map((s) => {
      // -> for each initVal

      const target = isOutgoing ?

        s.object_resource ||
        s.object_appellation ||
        s.object_language ||
        s.object_place ||
        s.object_lang_string ||
        s.object_dimension ||
        s.object_time_primitive :
        s.subject_resource;
      if (target) {
        // --> if statement.appellation, .place, .lang_string, .time_primitive, .language, .dimension
        return of({ fk_class: target.fk_class, statement: s })
      } else {
        // --> else get related entity preview and its class

        // related can also be in ressource so:
        let pkEntity;
        if (isOutgoing) pkEntity = s.fk_object_info ?? s.object_resource.pk_entity;
        else pkEntity = s.fk_subject_info ?? s.subject_resource.pk_entity;

        return this.ap.streamEntityPreview(pkEntity).pipe(
          map(preview => ({ fk_class: preview.fk_class, statement: s }))
        )
      }
    })
    // add a list, where initial statements are available
    const listNodes$ = combineLatestOrEmpty(o$).pipe(
      map((items) => {


        if (items.length == 0 && gvFormField.maxLength > 0 && targetClasses.length == 1) {
          return [this.getFieldItem(field, targetClasses[0], undefined, gvFormField.addItemsOnInit)]
        }

        const node: LocalNodeConfig[] = []
        try {
          const byClass = groupBy((i) => i.fk_class.toString(), items)
          for (const pkClass in byClass) {
            if (byClass[pkClass]) {
              const initStmts = byClass[pkClass].map(e => e.statement);
              node.push(this.getFieldItem(field, parseInt(pkClass, 10), initStmts))
            }
          }
        } catch (e) {
          // override the class of the items (initval)
          const initStmts = items.map(e => e.statement);
          node.push(...targetClasses.map(cls => this.getFieldItem(field, cls, initStmts)))

        }

        return node;
      })
    )
    return listNodes$
  }

  /**
   * Generate the FieldItem
   */
  getFieldItem(
    field: Field,
    targetClass: number,
    initValue?: InfStatementWithRelations[],
    addOnInit = 0,
  ): LocalNodeConfig {

    let formControlType: FormControlType = field.targets[targetClass].formControlType;
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
    if (addOnInit === 0) addOnInit = required ? minLength : addOnInit;

    // further distinguish different form controls for creation of entities
    if (formControlType.entity) {

      if (this.ap.getIsPlatformVocabClass(targetClass)) {
        formControlType = { platformVocabItem: true }
        maxLength = 1;
        addOnInit = 1;
      }
      else if (this.ap.getIsSubclassOf(targetClass, C_53_TYPE_ID) && targetClass !== C_54_LANGUAGE_ID) {
        formControlType = { typeItem: true }
        maxLength = 1;
        addOnInit = 1;
      }
    }

    return {
      array: {
        isList: true,
        addOnInit,
        required,
        maxLength,
        placeholder: field.label,
        initValue,
        data: {
          gvFieldItem: {
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
    formCtrlType: FormControlType,
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}]
  ): Observable<LocalNodeConfig[]> {



    // Place Control
    if (formCtrlType.place) {
      return of(initStmts.map((initVal) => {
        return this.placeCtrl(this.ctrlRequired(field), initVal.object_place, (val: InfPlace) => {
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
        })
      }));
    }

    // Appellation Temporal Entity Control
    else if (formCtrlType.appellationTeEn) return this.appellationTeEnCtrl(targetClass, field, initStmts)

    // Entity Control
    else if (formCtrlType.entity) return this.entityCtrl(targetClass, field, initStmts)

    // Language Control
    else if (formCtrlType.language) {
      return this.state.data.getProjectLanguage(this.state.pkProject).pipe(map(defaultLanguage => {
        return initStmts.map((initVal) => this.languageCtrl(
          this.ctrlRequired(field),
          field.label,
          targetClass,
          field.targets[targetClass].targetClassLabel,
          initVal.object_language,
          defaultLanguage,
          (val: InfLanguage) => {
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
          }))
      }))
    }

    // Appellation Control
    else if (formCtrlType.appellation) {
      return of(initStmts.map((initVal) => {
        return this.appellationCtrl(
          this.ctrlRequired(field),
          field.label,
          targetClass,
          field.targets[targetClass].targetClassLabel,
          initVal.object_appellation,
          formCtrlType,
          (val: InfAppellation) => {
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
          },
        )
      }))
    }

    // Language String Control
    else if (formCtrlType.langString) {
      return of(initStmts.map((initVal) => {
        const initLangString = {
          ...initVal?.object_lang_string,
          fk_class: targetClass,
        }
        return this.langStringCtrl(this.ctrlRequired(field), initLangString, (val: InfLangString) => {
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
        })
      }))
    }

    // Dimension Control
    else if (formCtrlType.dimension) {
      return of(initStmts.map((initVal) => {
        return this.dimensionCtrl(this.ctrlRequired(field), targetClass, initVal.object_dimension, (val: InfDimension) => {
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
        })
      }))
    }

    // Type Control
    else if (formCtrlType.typeItem) return this.typeCtrl(targetClass, field, initStmts)


    // Platform Vocab Item Control
    else if (formCtrlType.platformVocabItem) return this.platformVocabItemCtrl(targetClass, field, initStmts)

    // Time Primitive Control
    else if (formCtrlType.timePrimitive) {
      return of(initStmts.map((initVal) => {
        const initValWithCal: TimePrimitiveWithCal = {
          julianDay: initVal?.object_time_primitive?.julian_day,
          duration: initVal?.object_time_primitive?.duration,
          calendar: initVal?.object_time_primitive?.calendar
        }
        return this.timePrimitiveCtrl(this.ctrlRequired(field), field.label, targetClass, field.targets[targetClass].targetClassLabel, initValWithCal, (val: TimePrimitiveWithCal) => {
          if (!val) return null;
          const value: InfStatementWithRelations = {

            fk_object_info: undefined,
            fk_property: field.property.fkProperty,
            object_time_primitive: {
              calendar: val.calendar,
              julian_day: val.julianDay,
              duration: val.duration,
              fk_class: targetClass,
            },
          };
          return value;
        })
      }))
    }

    // Text with language (Entity) Control
    else if (formCtrlType.textWithLang) return this.textWithLangCtrl(targetClass, field, initStmts)

    else console.error('formCtrlType not found: ', JSON.stringify(formCtrlType))
  }

  private getValueLeafControl(
    formCtrlType: SysConfigFormCtrlType,
    initVal: InfValueObject,
    targetClass: number,
  ): Observable<LocalNodeConfig[]> {

    // Place
    if (formCtrlType.place) {
      return of([this.placeCtrl(true, initVal?.place, (val: InfPlace): InfData => {
        return { place: { ...val, fk_class: targetClass } }

      })])
    }

    // Language
    else if (formCtrlType.language) {
      return combineLatest([
        this.c.pipeClassLabel(targetClass),
        this.state.data.getProjectLanguage(this.state.pkProject)])
        .pipe(map(([label, defaultLanguage]) => [this.languageCtrl(
          true,
          '',
          targetClass,
          label,
          initVal?.language,
          defaultLanguage,
          (val: InfLanguage): InfData => {
            return { language: { ...val, fk_class: targetClass } }
          }
        )]))
    }

    // Appellation
    else if (formCtrlType.appellation) {
      return this.c.pipeClassLabel(targetClass).pipe(map(label => [this.appellationCtrl(
        true,
        '',
        targetClass,
        label,
        initVal?.appellation,
        formCtrlType,
        (val: InfAppellation): InfData => {
          return {
            appellation: {
              ...val,
              fk_class: targetClass
            }
          }
        }
      )]))
    }

    // Language String
    else if (formCtrlType.langString) {
      const initLangString = {
        ...initVal?.langString,
        fk_class: targetClass,
      }
      return of([this.langStringCtrl(true, initLangString, (val: InfLangString): InfData => {
        if ((val as any).language) delete (val as any).language
        return { langString: { ...val, fk_class: targetClass } }
      })])
    }

    // Dimension
    else if (formCtrlType.dimension) {
      return of([this.dimensionCtrl(true, targetClass, initVal?.dimension, (val: InfDimension): InfData => {
        return { dimension: { ...val, fk_class: targetClass } }
      })])
    }

    // Time Primitive
    else if (formCtrlType.timePrimitive) {
      const initValWithCal: TimePrimitiveWithCal = {
        julianDay: initVal?.timePrimitive?.julian_day,
        duration: initVal?.timePrimitive?.duration,
        calendar: initVal?.timePrimitive?.calendar
      }
      return this.c.pipeClassLabel(targetClass).pipe(
        map(label => [this.timePrimitiveCtrl(true, '', targetClass, label, initValWithCal, (val: TimePrimitiveWithCal): InfData => {
          return {
            timePrimitive: {
              calendar: val.calendar,
              duration: val.duration,
              julian_day: val.julianDay,
              fk_class: targetClass
            }
          }
        })]
        ))
    }

    else console.error('formCtrlType not found: ', JSON.stringify(formCtrlType))
  }



  private emitNewSearchString(str: string) {
    this.searchString.emit(str);
  }


  checkValidation(): boolean {
    this.submitted = true
    if (!this.formFactory.formGroup.valid) {
      const f = this.formFactory.formGroup.controls['childControl'] as UntypedFormArray;
      U.recursiveMarkAsTouched(f)
    }

    return this.formFactory.formGroup.valid;
  }

  getData(): InfData {
    return this.formFactory.formGroupFactory.valueChanges$.value
  }


  /**
   * Leaf nodes generators
   */

  // private timeSpanCtrl(
  //   required: boolean,
  //   placeholder: string,
  //   targetClass: number,
  //   targetClassLabel: string,
  //   initValue: CtrlTimeSpanModel,
  //   mapValue: (val) => any
  // ): LocalNodeConfig {
  //   return {
  //     control: {
  //       initValue,
  //       placeholder,
  //       required,
  //       data: {
  //         appearance: this.appearance,
  //         controlType: formControlType,
  //         targetClass,
  //         targetClassLabel
  //       },
  //       mapValue: mapValue
  //     }
  //   }
  // }

  private timeSpanCtrl2<R>(
    targetClass: number,
    placeholder: string,
    targetClassLabel: string,
    required: boolean,
    initStmts: InfStatementWithRelations[] = [{}],
    mapValue: (val: CtrlTimeSpanDialogResult | null | undefined) => R
  ): LocalNodeConfig {
    const initValue: CtrlTimeSpanModel = {}
    for (let i = 0; i < initStmts.length; i++) {
      const element = initStmts[i];
      if (DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.includes(element.fk_property)) {
        initValue[element.fk_property] = {
          duration: element?.object_time_primitive?.duration,
          julianDay: element?.object_time_primitive?.julian_day,
          fk_class: element?.object_time_primitive?.fk_class,
          calendar: element?.object_time_primitive?.calendar
        }
      }
    }
    const controlConfig: LocalNodeConfig = {
      control: {
        initValue,
        placeholder,
        required,
        data: {
          appearance: this.appearance,
          controlType: { timeSpan: 'true' },
          targetClass,
          targetClassLabel
        },
        mapValue
      }
    };
    return controlConfig;
  }


  private languageCtrl(
    required: boolean,
    placeholder: string,
    targetClass: number,
    targetClassLabel: string,
    initValue: InfLanguage,
    defaultLanguage: any,
    mapValue: (val) => any
  ): LocalNodeConfig {
    return {
      control: {
        placeholder,
        required,
        data: {
          appearance: this.appearance,
          controlType: { language: 'true' },
          targetClass,
          targetClassLabel
        },
        initValue: initValue || defaultLanguage,
        mapValue: mapValue
      }
    }
  }

  private typeCtrl(
    targetClass: number,
    field: Field,
    initItems: InfStatementWithRelations[] = [{}],
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
            controlType: { typeItem: true },
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

  private platformVocabItemCtrl(
    targetClass: number,
    field: Field,
    initItems: InfStatementWithRelations[] = [{}],
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
            controlType: { platformVocabItem: true },
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
    required: boolean,
    placeholder: string,
    targetClass: number,
    targetClassLabel: string,
    initValue: InfAppellation,
    controlType: SysConfigFormCtrlType,
    mapValue: (val) => any
  ): LocalNodeConfig {
    return {
      control: {
        initValue: initValue,
        placeholder,
        required,
        validators: [ValidationService.appellationValidator()],
        data: {
          appearance: this.appearance,
          controlType,
          targetClass,
          targetClassLabel
        },
        mapValue: mapValue
      }
    }
  }


  private placeCtrl(
    required: boolean,
    initVal: InfPlace,
    mapValue: (val) => any
  ): LocalNodeConfig {
    // with [{}] we make sure at least one item is added
    return {
      childFactory: {
        component: FgPlaceComponent,
        getInjectData: (d) => {
          return d.place
        },
        required: required,
        data: {
          place: {
            appearance: this.appearance,
            initVal$: of(initVal)
          }
        },
        mapValue: mapValue
      }
    };
  }

  private langStringCtrl(
    required: boolean,
    initVal: InfLangString,
    mapValue: (val) => any
  ): LocalNodeConfig {
    return {
      childFactory: {
        component: FgLangStringComponent,
        getInjectData: (d) => {
          return d.langString
        },
        required,
        data: {
          langString: {
            appearance: this.appearance,
            initVal$: of(initVal)
          }
        },
        mapValue: mapValue
      }
    }
  }

  private dimensionCtrl(
    required: boolean,
    targetClass: number,
    initVal: InfDimension,
    mapValue: (val) => any
  ): LocalNodeConfig {
    return {
      childFactory: {
        component: FgDimensionComponent,
        getInjectData: (d) => {
          return d.dimension
        },
        required,
        data: {
          dimension: {
            appearance: this.appearance,
            pkClassOfDimension: targetClass,
            initVal$: of(initVal)
          }
        },
        mapValue: mapValue
      }
    }
  }





  private entityCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}],
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
                controlType: { entity: 'true' },
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
    required: boolean,
    placeholder: string,
    targetClass: number,
    targetClassLabel: string,
    initVal: TimePrimitiveWithCal,
    mapValue: (val: TimePrimitiveWithCal) => any
  ): LocalNodeConfig {
    return {
      control: {
        initValue: initVal,
        placeholder,
        required,
        validators: [],
        data: {
          appearance: this.appearance,
          controlType: { timePrimitive: 'true' },
          targetClass,
          targetClassLabel
        },
        mapValue: mapValue
      }
    }
  }

  private appellationTeEnCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}],
  ): Observable<LocalNodeConfig[]> {
    const component = FgAppellationTeEnComponent
    return this.customizedEntityCtrl<typeof FgAppellationTeEnComponent, Partial<FgAppellationTeEnInjectData>>(
      initStmts, component, {}, field, targetClass
    );
  }

  private textWithLangCtrl(
    targetClass: number,
    field: Field,
    initStmts: InfStatementWithRelations[] = [{}],
  ): Observable<LocalNodeConfig[]> {
    return this.customizedEntityCtrl<typeof FgTextWithLangComponent, Partial<FgTextWithLangInjectData>>(
      initStmts,
      FgTextWithLangComponent,
      { stringFieldPlaceholder: field.targets[targetClass].targetClassLabel },
      field,
      targetClass
    );
  }



  private customizedEntityCtrl<Comp, CompInjectData>(
    initStmts: InfStatementWithRelations[],
    component: Comp,
    injectData: CompInjectData,
    field: Field,
    targetClass: number
  ) {
    const controlConfigs: LocalNodeConfig[] = initStmts.map((initVal) => ({
      childFactory: {
        component,
        getInjectData: (d) => {
          return d.appellationTeEn;
        },
        required: this.ctrlRequired(field),
        data: {
          appellationTeEn: {
            pkClass: targetClass,
            appearance: this.appearance,
            initVal$: of(field.isOutgoing ? initVal.object_resource : initVal.subject_resource),
            ...injectData
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
  private ctrlRequired(f: Field): boolean {
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
