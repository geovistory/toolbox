import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material';
import { InfDimension, InfLangString, InfPersistentItem, InfStatement, InfTemporalEntity, InfTextProperty } from '@kleiolab/lib-sdk-lb3';
import { InfActions } from 'projects/app-toolbox/src/app/core/inf/inf.actions';
import { ActiveProjectPipesService } from 'projects/app-toolbox/src/app/core/redux-queries/services/active-project-pipes.service';
import { ConfigurationPipesService, TableName } from 'projects/app-toolbox/src/app/core/redux-queries/services/configuration-pipes.service';
import { SchemaSelectorsService } from 'projects/app-toolbox/src/app/core/redux-queries/services/schema-selectors.service';
import { SchemaObjectService } from 'projects/app-toolbox/src/app/core/redux-store/schema-object.service';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { ValidationService } from "projects/app-toolbox/src/app/core/validation/validation.service";
import { FormArrayFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-array-factory';
import { FormChildFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormControlFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-control-factory';
import { FormFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormArrayConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormArrayConfig";
import { FormNodeConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig";
import { DfhConfig } from "@kleiolab/lib-config";
import { equals, flatten, groupBy, indexBy, keys, sum, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { auditTime, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { CtrlTimeSpanModel } from '../ctrl-time-span/ctrl-time-span.component';
import { FgDimensionComponent, FgDimensionInjectData } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent, FgLangStringInjectData } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent, FgPlaceInjectData } from '../fg-place/fg-place.component';
import { FgTextPropertyInjectData } from '../fg-text-property/fg-text-property.component';
import { Field, FieldProperty, Subfield, SubfieldType } from '../properties-tree/properties-tree.models';
type EntityModel = 'persistent_item' | 'temporal_entity'
export interface FormArrayData {
  // arrayContains: 'fields' | 'lists' | 'controls'
  pkClass: number
  // fieldDefinition?: FieldDefinition
  // listDefinition?: Subfield
  customCtrlLabel?: string
  stringPartId?: number
  hideFieldTitle: boolean;

  fields?: {
    parentModel: EntityModel;
    parentProperty: FieldProperty
  }

  lists?: {
    parentModel?: EntityModel;
    fieldDefinition: Field
    minLength: number
    maxLength: number
  }

  controls?: {
    listDefinition: Subfield
  }

  /**
   * if the entry point is a statement
   */
  addStatement?: {
    listDefinition: Subfield
  }


  // gets called when removed
  removeHook?: (x: FormArrayData) => any
}
interface FormGroupData {
  pkClass?: number
  listDefinition?: Subfield
}
export interface FormControlData {
  controlType: ControlType
  listDefinition?: Subfield
  nodeConfigs?: LocalNodeConfig[]
  appearance: MatFormFieldAppearance
  ctrlEntity?: {
    model: TableName
  }
}

export interface FormChildData {
  place?: FgPlaceInjectData
  textProperty?: FgTextPropertyInjectData
  langString?: FgLangStringInjectData
  dimension?: FgDimensionInjectData
}

export type ControlType = 'ctrl-target-class' | 'ctrl-appellation' | 'ctrl-entity' | 'ctrl-language' | 'ctrl-place' | 'ctrl-text-property' | 'ctrl-time-primitive' | 'ctrl-type' | 'ctrl-time-span'

export type LocalArrayConfig = FormArrayConfig<FormArrayData>;
export type LocalNodeConfig = FormNodeConfig<FormGroupData, FormArrayData, FormControlData, FormChildData>;
export type LocalFormArrayFactory = FormArrayFactory<FormControlData, FormArrayData, FormChildData>
export type LocalFormControlFactory = FormControlFactory<FormControlData>
export type LocalFormChildFactory = FormChildFactory<FormChildData>
@Component({
  selector: 'gv-form-create-entity',
  templateUrl: './form-create-entity.component.html',
  styleUrls: ['./form-create-entity.component.scss']
})
export class FormCreateEntityComponent implements OnInit, OnDestroy {


  @Input() pkClass: number

  @Input() pkSourceEntity: number;
  @Input() listDefinition: Subfield;

  @Input() hideButtons: boolean;
  @Input() hideTitle: boolean;

  @Input() initVal$: Observable<InfPersistentItem | InfTemporalEntity | undefined>;

  @Input() hiddenProperty: FieldProperty;

  @Output() cancel = new EventEmitter<void>()
  @Output() searchString = new EventEmitter<string>()
  @Output() saved = new EventEmitter<InfPersistentItem | InfTemporalEntity | InfStatement | InfTextProperty>()

  appearance: MatFormFieldAppearance = 'outline';

  destroy$ = new Subject<boolean>();
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory
  submitted = false;
  saving = false;
  searchStringPartId = 0;
  searchStringParts: { [key: number]: string } = {}

  temporalEntitiesToAdd: InfTemporalEntity[] = []
  constructor(
    private formFactoryService: FormFactoryService,
    private c: ConfigurationPipesService,
    private inf: InfActions,
    private ss: SchemaSelectorsService,
    public ap: ActiveProjectPipesService,
    public s: SchemaObjectService
  ) { }

  ngOnInit() {
    if (!this.pkClass && !this.listDefinition) throw new Error('You must provide a pkClass or a listDefinition as @Input() on FormCreateEntityComponent');

    if (!this.initVal$) this.initVal$ = new BehaviorSubject(undefined)

    this.formFactory$ = this.formFactoryService.create<FormGroupData, FormArrayData, FormControlData, any>({
      hideTitle: this.hideTitle,
      rootFormGroup$: of({
        data: { pkClass: this.pkClass, listDefinition: this.listDefinition }
      }),
      getChildNodeConfigs: this.getChildNodeConfigs
    }, this.destroy$)


    this.formFactory$.pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory = v
      // console.log(v)
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getChildNodeConfigs = (nodeConfig: LocalNodeConfig): Observable<LocalNodeConfig[]> => {

    if (nodeConfig.group) {

      return this.getChildNodesOfGroup(nodeConfig.group.data)

    }
    else if (nodeConfig.array) {

      const arrayConfig = nodeConfig.array

      if (nodeConfig.array.data.fields) {

        return this.getFieldNodes(arrayConfig, arrayConfig.data.fields.parentModel)

      }
      else if (nodeConfig.array.data.lists) {

        return this.getListNodes(arrayConfig, arrayConfig.data.lists.fieldDefinition)

      }
      else if (nodeConfig.array.data.controls) {

        return this.getControlNodes(arrayConfig, arrayConfig.data.controls.listDefinition.listType)

      }
      else if (nodeConfig.array.data.addStatement) {
        const x = nodeConfig.array.data.addStatement
        return this.getChildNodesOfClassAndListDef(x.listDefinition.targetClass, x.listDefinition);
      }
    }

    console.error('no child node created for this nodeConfig:', nodeConfig)
  }


  /**
   * returns true if control is required
   * TODO!
   */
  private ctrlRequired(lDef: Subfield | Field): boolean {
    return (
      lDef &&
      lDef.isOutgoing &&
      lDef.identityDefiningForSource
    )
  }

  private getChildNodesOfGroup(data: FormGroupData): Observable<LocalNodeConfig[]> {

    if (data.pkClass) {

      return this.getChildNodesOfClassAndListDef(data.pkClass)
    }
    else if (data.listDefinition) {
      this.hiddenProperty = data.listDefinition.property;
      const n: LocalNodeConfig = {
        array: {
          placeholder: data.listDefinition.targetClassLabel,
          data: {
            addStatement: {
              listDefinition: data.listDefinition
            },
            hideFieldTitle: false,
            pkClass: null
          },
          mapValue: (items: CtrlEntityModel[] | InfTextProperty[] | InfStatement[]): { statement?: Partial<InfStatement>, text_property?: Partial<InfTextProperty> } => {

            const isInfStatement = (obj: any): obj is InfStatement => {
              return !!obj && (
                !!obj.object_lang_string ||
                !!obj.object_place ||
                !!obj.object_language ||
                !!obj.object_appellation ||
                !!obj.object_time_primitive ||
                !!obj.object_dimension
              )
            }

            const isCtrlEntityModel = (obj: any): obj is CtrlEntityModel => {
              return !!obj && (
                !!obj.persistent_item ||
                !!obj.temporal_entity ||
                !!obj.pkEntity
              )
            }


            const item = items[0]

            const statement: Partial<InfStatement> = {
              fk_property: data.listDefinition.property.pkProperty,
              fk_property_of_property: data.listDefinition.property.pkPropertyOfProperty,
            }


            if (data.listDefinition.isOutgoing) {
              // assign subject
              statement.fk_subject_info = this.pkSourceEntity;

              // assign object
              if (isCtrlEntityModel(item) && item.persistent_item) {
                statement.object_persistent_item = item.persistent_item
              }
              else if (isCtrlEntityModel(item) && item.temporal_entity) {
                statement.object_temporal_entity = item.temporal_entity
              }
              else if (isInfStatement(item)) {
                statement.object_lang_string = item.object_lang_string;
                statement.object_place = item.object_place;
                statement.object_appellation = item.object_appellation;
                statement.object_language = item.object_language;
                statement.object_time_primitive = item.object_time_primitive;
                statement.object_dimension = item.object_dimension;
              }

            } else {
              // assign object
              statement.fk_object_info = this.pkSourceEntity;

              // assign subject
              if (isCtrlEntityModel(item) && item.persistent_item) {
                statement.subject_persistent_item = item.persistent_item
              }
              else if (isCtrlEntityModel(item) && item.temporal_entity) {
                statement.subject_temporal_entity = item.temporal_entity
              }

            }
            return { statement }

          }
        },
      }
      return of([n])
    };
  }


  private getChildNodesOfClassAndListDef(pkTargetClass: number, listDef?: Subfield): Observable<LocalNodeConfig[]> {

    return combineLatest(
      this.c.pipeTableNameOfClass(pkTargetClass),
      this.c.pipeClassLabel(pkTargetClass)
    ).pipe(auditTime(10), map(([parentModel, label]) => {
      const mapValue = (items: InfTemporalEntity[] | InfPersistentItem[]): CtrlEntityModel => {
        this.emitNewSearchString();

        const result = {} as InfTemporalEntity | InfPersistentItem;
        items.forEach(item => {
          for (const key in item) {
            if (item.hasOwnProperty(key) && item[key].length > 0) {
              result[key] = [...(result[key] || []), ...item[key]];
            }
          }
        })
        result.fk_class = pkTargetClass
        if (parentModel == 'persistent_item') {
          return {
            persistent_item: result
          }
        } else if (parentModel == 'temporal_entity') {
          return {
            temporal_entity: result
          }
        } else {
          console.error('this parent model is unsupported:', parentModel)
        }

      }
      if (parentModel === 'temporal_entity' || parentModel === 'persistent_item') {
        const n: LocalNodeConfig = {
          array: {
            isList: false,
            required: true,
            maxLength: 1,
            placeholder: label,
            data: {
              ...{} as any,
              fields: {
                parentModel
              },
              pkClass: pkTargetClass,
              hideFieldTitle: false
            },
            mapValue
          }
        }
        return [n];
      }
      else {
        const c = this.getListNode(listDef, false, null);
        c.array.addOnInit = 1;
        c.array.mapValue = (items => items[0])
        return [c];
      }
    }));

  }


  /**
   * This Funciton returns an observable array of form array
   * each of these form arrays contain lists, or if needed, a target class selector
   */
  private getFieldNodes(arrayConfig: LocalArrayConfig, parentModel: EntityModel): Observable<LocalNodeConfig[]> {

    return combineLatest(
      this.ss.dfh$.class$.by_pk_class$.key(arrayConfig.data.pkClass),
      this.initVal$
    )
      .pipe(
        filter(([klass]) => !!klass),
        switchMap(([dfhClass, initValEntity]) => {

          let fields$: Observable<Field[]>;
          let initPeIt: InfPersistentItem;
          let initTeEn: InfTemporalEntity;

          if (dfhClass.basic_type === 8 || dfhClass.basic_type === 30) {
            fields$ = this.c.pipeBasicFieldsOfClass(arrayConfig.data.pkClass)
            initPeIt = initValEntity
          } else {
            // For temporal_entity
            fields$ = this.c.pipeFieldsForTeEnForm(arrayConfig.data.pkClass)
            initTeEn = initValEntity;
          }

          return fields$.pipe(
            map((fieldDefs) => fieldDefs.filter(fDef => {
              // Q: is this field not circular or hidden?
              const prop = arrayConfig.data.fields.parentProperty;
              const parentPropety = prop ? prop.pkProperty : undefined;
              if (
                (!parentPropety || parentPropety !== fDef.property.pkProperty) &&
                !equals(fDef.property, this.hiddenProperty)
              ) {
                return true;
              }
              return false;
            })
            ),
            switchMap((fieldDefs) => {


              return combineLatestOrEmpty(fieldDefs.map(fDef => {

                // make one definition required for each persistent item
                if (parentModel === 'persistent_item' && fDef.property.pkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
                  fDef.targetMinQuantity = 1;
                  fDef.identityDefiningForSource = true;
                }

                const maxLength = fDef.targetMaxQuantity == -1 ? Number.POSITIVE_INFINITY : fDef.targetMaxQuantity;
                const minLength = fDef.identityDefiningForSource ? fDef.targetMinQuantity : 0;

                const n: LocalNodeConfig = {
                  array: {
                    initValue: this.getInitValueForFieldNode(fDef, { initTeEn, initPeIt }),
                    placeholder: fDef.label,
                    required: this.ctrlRequired(fDef),
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
                      const key = getStatementKey(parentModel, fDef.isOutgoing)
                      return { [key]: items }
                    },
                    data: {
                      lists: {
                        minLength,
                        maxLength,
                        parentModel,
                        fieldDefinition: fDef,
                      },
                      hideFieldTitle: false,
                      pkClass: undefined,
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
  getListNodes(arrayConfig: FormArrayConfig<FormArrayData>, field: Field): Observable<LocalNodeConfig[]> {
    const initialValue = arrayConfig.initValue || [];
    const textProps: InfTextProperty[] = initialValue.filter((v) => !!v.fk_class_field)
    const statements: InfStatement[] = initialValue.filter((v) => !v.fk_class_field)
    const listDefinitions = arrayConfig.data.lists.fieldDefinition.listDefinitions;
    const parentModel = arrayConfig.data.lists.parentModel;
    const listDefIdx = indexBy((lDef) => (lDef.targetClass || 0).toString(), listDefinitions)
    const isOutgoing = arrayConfig.data.lists.fieldDefinition.isOutgoing

    if (field.isSpecialField === 'time-span') {
      return of([this.getListNode(
        listDefinitions[0],
        false,
        statements
      )])
    }

    // get the target class for each initial statement
    const o$ = statements.map((s) => {
      // -> for each initVal
      const relObj = s.object_appellation || s.object_language || s.object_place || s.object_lang_string || s.subject_temporal_entity || s.object_persistent_item || s.object_dimension;
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

        if (items.length == 0 && arrayConfig.data.lists.maxLength > 0 && listDefinitions.length == 1) {
          return [this.getListNode(listDefinitions[0], false, null)]
        }

        const listDefs: LocalNodeConfig[] = []
        const byClass = groupBy((i) => i.fk_class.toString(), items)
        for (const pkClass in byClass) {
          if (byClass.hasOwnProperty(pkClass)) {
            const initStatements = byClass[pkClass].map(e => e.statement);
            listDefs.push(this.getListNode(listDefIdx[pkClass], false, initStatements))
          }
        }
        return listDefs;
      })
    )
    return listNodes$
  }
  /**
    * gets the init value for the ctrl target class that is shown when
    * FieldDefinition has multiple target classes
    */
  getInitValueForTargetClassCtrl(fDef: Field, initVal: { initTeEn: InfTemporalEntity, initPeIt: InfPersistentItem }): Observable<Subfield> {

    if (fDef.isSpecialField == 'time-span') {
      return;
    }
    else if (initVal.initTeEn) {
      if (fDef.isOutgoing && initVal.initTeEn.outgoing_statements) {
        return this.getInitListDef(fDef, initVal.initTeEn.outgoing_statements);
      }
      else if (!fDef.isOutgoing && initVal.initTeEn.incoming_statements) {
        return this.getInitListDef(fDef, initVal.initTeEn.incoming_statements);
      }
    }
    else if (initVal.initPeIt) {
      if (fDef.isOutgoing && initVal.initPeIt.outgoing_statements) {
        return this.getInitListDef(fDef, initVal.initPeIt.outgoing_statements);
      }
      else if (!fDef.isOutgoing && initVal.initPeIt.incoming_statements) {
        return this.getInitListDef(fDef, initVal.initPeIt.incoming_statements);
      }
    }
    return;
  }



  private getInitListDef(fDef: Field, statements: InfStatement[]): Observable<Subfield> {
    const statement = statements.find(r => this.sameProperty(r, fDef) && !!((r.fk_subject_info || r.fk_object_info)))
    if (!statement) return of(undefined);

    return this.ap.streamEntityPreview(statement.fk_subject_info || statement.fk_object_info).pipe(
      map(entity => {
        const lDef = fDef.listDefinitions.find(ld => ld.targetClass === entity.fk_class);
        return lDef;
      })
    )

  };


  /**
   * gets the init value for the field definition out of the initial entity value
   */
  getInitValueForFieldNode(lDef: Field, initVal: { initTeEn: InfTemporalEntity, initPeIt: InfPersistentItem }): InfStatement[] {
    if (lDef.isSpecialField == 'time-span') {
      if (initVal.initTeEn && initVal.initTeEn.outgoing_statements) {
        return initVal.initTeEn.outgoing_statements.filter(r => DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.includes(r.fk_property))
      }
    }
    else if (initVal.initTeEn) {
      if (lDef.isOutgoing && initVal.initTeEn.outgoing_statements) {
        return initVal.initTeEn.outgoing_statements.filter(r => this.sameProperty(r, lDef))
      }
      else if (!lDef.isOutgoing && initVal.initTeEn.incoming_statements) {
        return initVal.initTeEn.incoming_statements.filter(r => this.sameProperty(r, lDef))
      }
    }
    else if (initVal.initPeIt) {
      if (lDef.isOutgoing && initVal.initPeIt.outgoing_statements) {
        return initVal.initPeIt.outgoing_statements.filter(r => this.sameProperty(r, lDef))
      }
      else if (!lDef.isOutgoing && initVal.initPeIt.incoming_statements) {
        return initVal.initPeIt.incoming_statements.filter(r => this.sameProperty(r, lDef))
      }
    }
    return undefined;
  }

  /**
   * Returns true if property of statement and listDefinition match
   * @param r
   * @param lDef
   */
  sameProperty(r: InfStatement, lDef: Subfield | Field): boolean {
    return r.fk_property ?
      r.fk_property === lDef.property.pkProperty :
      r.fk_property_of_property ? r.fk_property_of_property === lDef.property.pkPropertyOfProperty : false
  }

  /**
   * This function returns a form array containing controls
   * It defines how to map the values of the controls to an array of statements
   */
  getListNode(
    listDefinition: Subfield,
    hideFieldTitle: boolean,
    initValue: any,
    customCtrlLabel?: string,
    customPlaceholder?: string
  ): LocalNodeConfig {

    let childListType = listDefinition.listType;
    const stringPartId = this.searchStringPartId++;

    const removeHook = (data: FormArrayData) => {
      const id = data.stringPartId;
      if (id && this.searchStringParts[id]) {
        delete this.searchStringParts[id];
      }
      this.emitNewSearchString();
    };

    const required = listDefinition.identityDefiningForSource;
    let maxLength = listDefinition.targetMaxQuantity === -1 ? Number.POSITIVE_INFINITY : listDefinition.targetMaxQuantity;
    const minLength = listDefinition.targetMinQuantity === -1 ? Number.POSITIVE_INFINITY : listDefinition.targetMinQuantity;
    let addOnInit = required ? minLength : 0;

    if (childListType.typeItem) {
      maxLength = 1;
      addOnInit = 1;
    }
    if (childListType.temporalEntity && !listDefinition.identityDefiningForTarget) {
      childListType = { entityPreview: 'true' };
    }



    return {
      array: {
        isList: true,
        addOnInit,
        required,
        maxLength,
        placeholder: customPlaceholder || listDefinition.label,
        initValue,
        data: {
          controls: {
            listDefinition: {
              ...listDefinition,
              listType: childListType
            },
          },
          pkClass: listDefinition.targetClass,
          customCtrlLabel,
          stringPartId,
          removeHook,
          hideFieldTitle
        },
        mapValue: x => x.filter(item => !!item),
      },
      id: U.uuid()
    };
  };


  private getControlNodes(arrayConfig: LocalArrayConfig, listType: SubfieldType): Observable<LocalNodeConfig[]> {

    if (listType.timeSpan) {

      return this.timeSpanCtrl(arrayConfig)

    } else if (listType.place) {

      return this.placeCtrl(arrayConfig)

    } else if (listType.entityPreview || listType.temporalEntity) {

      return this.entityCtrl(arrayConfig)

    }
    else if (listType.language) {

      return this.languageCtrl(arrayConfig)

    } else if (listType.appellation) {

      return this.appellationCtrl(arrayConfig)

    }
    else if (listType.langString) {

      return this.langStringCtrl(arrayConfig)

    }
    else if (listType.dimension) {

      return this.dimensionCtrl(arrayConfig)

    }
    else if (listType.typeItem) {

      return this.typeCtrl(arrayConfig)

    } else if (arrayConfig.isList) {
      // Add a form array as object / container
      // return getContainerArrayConfig(arrayConfig)

    }
  }


  private appellationsHook(x: any, id: number) {
    const statements: InfStatement[] = x.filter((i) => !!i);
    this.searchStringParts[id] = statements
      .map((item) => (U.stringFromQuillDoc(item.object_appellation.quill_doc)))
      .join(' ');
    return statements;
  }

  private textPropHook(x: any, id: number) {
    const textProps: InfTextProperty[] = x.filter((i) => !!i);
    this.searchStringParts[id] = textProps
      .map((item) => (U.stringFromQuillDoc(item.quill_doc)))
      .join(' ');
    return textProps;
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
      const value = this.formFactory.formGroupFactory.valueChanges$.value
      const obs$ = []
      if (value.persistent_item) {
        obs$.push(this.inf.persistent_item.upsert([value.persistent_item], pkProject).resolved$.pipe(filter(x => !!x)))
      }
      else if (value.temporal_entity) {
        obs$.push(this.inf.temporal_entity.upsert([value.temporal_entity], pkProject).resolved$.pipe(filter(x => !!x)))
      }
      else if (value.statement) {
        obs$.push(this.inf.statement.upsert([value.statement], pkProject).resolved$.pipe(filter(x => !!x)))
      }
      else if (value.text_property) {
        obs$.push(this.inf.text_property.upsert([value.text_property], pkProject).resolved$.pipe(filter(x => !!x)))
      }
      else {
        throw new Error(`Submitting ${value} is not implemented`);
      }

      uniq(this.temporalEntitiesToAdd).forEach(pkEntity => {
        obs$.push(this.s.api.addEntityToProject(pkProject, pkEntity))
      })

      combineLatest(obs$).pipe(takeUntil(this.destroy$)).subscribe(([res]: [any]) => {
        if (res) {
          if (!res.items || !res.items.length) {
            throw new Error('bad result')
          }
          this.saved.emit(res.items[0])
          this.saving = false;
        }
      })
    })
  }


  /**
   * Leaf nodes generators
   */

  private timeSpanCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const initStatements: InfStatement[] = arrayConfig.initValue || [];
    const initValue: CtrlTimeSpanModel = {}
    for (let i = 0; i < initStatements.length; i++) {
      const element = initStatements[i];
      initValue[element.fk_property] = element.object_time_primitive;
    }
    const controlConfig: LocalNodeConfig = {
      control: {
        initValue,
        placeholder: arrayConfig.data.controls.listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          appearance: this.appearance,
          controlType: 'ctrl-time-span'
        },
        mapValue: (val) => {
          if (!val) return null;
          const v = val as CtrlTimeSpanDialogResult;
          const value: InfStatement[] = keys(v).map(key => {
            const timePrim = v[key]
            const statement: InfStatement = {
              entity_version_project_rels: [
                {
                  is_in_project: true,
                  calendar: timePrim.calendar
                }
              ],
              fk_property: key,
              object_time_primitive: {
                ...timePrim,
                fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
              },
              ...{} as any
            }
            return statement
          });
          return value;
        }
      }
    };
    return of([controlConfig]);
  }


  private languageCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    return this.ap.pipeActiveDefaultLanguage().pipe(map(defaultLanguage => {

      const listDefinition = arrayConfig.data.controls.listDefinition;
      // with [{}] we make sure at least one item is added
      const initItems = arrayConfig.initValue || [{}];
      const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfStatement) => ({
        control: {
          placeholder: listDefinition.label,
          required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
          data: {
            appearance: this.appearance,
            controlType: 'ctrl-language'
          },
          initValue: initVal.object_language || defaultLanguage,
          mapValue: (val) => {
            if (!val) return null;
            const value: InfStatement = {
              ...{} as any,
              fk_object_info: undefined,
              fk_property: listDefinition.property.pkProperty,
              object_language: {
                ...val,
                fk_class: listDefinition.targetClass,
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

  private typeCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;
    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfStatement) => {
      const initValue = !initVal ?
        undefined : listDefinition.isOutgoing ?
          initVal.fk_object_info : initVal.fk_subject_info;
      return {
        control: {
          initValue,
          placeholder: arrayConfig.data.customCtrlLabel ? arrayConfig.data.customCtrlLabel : listDefinition.label,
          required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
          data: {
            appearance: this.appearance,
            controlType: 'ctrl-type',
            listDefinition,
          },
          mapValue: (val) => {
            if (!val) return null;

            let value: InfStatement = {
              ...{} as any,
              fk_property: listDefinition.property.pkProperty,
            };

            if (listDefinition.isOutgoing) {
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


  private appellationCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;
    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfStatement) => ({
      control: {
        initValue: initVal.object_appellation,
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        validators: [ValidationService.appellationValidator()],
        data: {
          appearance: this.appearance,
          controlType: 'ctrl-appellation'
        },
        mapValue: (val) => {
          if (!val) return null;
          const value: InfStatement = {
            ...{} as any,
            fk_object_info: undefined,
            fk_property: listDefinition.property.pkProperty,
            object_appellation: {
              ...val,
              fk_class: listDefinition.targetClass,
            },
          };
          return value;
        }
      }
    }))

    return of(controlConfigs);
  }


  private placeCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;
    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfStatement) => ({
      childFactory: {
        component: FgPlaceComponent,
        getInjectData: (d) => {
          return d.place
        },
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          place: {
            appearance: this.appearance,
            initVal$: of(initVal.object_place)
          }
        },
        mapValue: (val) => {
          if (!val) return null;
          const value: InfStatement = {
            ...{} as any,
            fk_object_info: undefined,
            fk_property: listDefinition.property.pkProperty,
            object_place: {
              ...val,
              fk_class: listDefinition.targetClass,
            },
          };
          return value;
        }
      }
    }));
    return of(controlConfigs);


  }


  private langStringCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;

    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((langString: InfLangString) => ({
      childFactory: {
        component: FgLangStringComponent,
        getInjectData: (d) => {
          return d.langString
        },
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          langString: {
            appearance: this.appearance,
            initVal$: of(langString)
          }
        },
        mapValue: (val: InfLangString) => {
          const value: InfStatement = {
            ...{} as any,
            fk_object_info: undefined,
            fk_property: listDefinition.property.pkProperty,
            fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
            object_lang_string: {
              ...val,
              fk_class: listDefinition.targetClass,
            },
          };
          return value;
        }
      }
    }));
    return of(controlConfigs);

  }

  private dimensionCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;

    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];

    const controlConfigs: LocalNodeConfig[] = initItems.map((dimension: InfDimension) => ({
      childFactory: {
        component: FgDimensionComponent,
        getInjectData: (d) => {
          return d.dimension
        },
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          dimension: {
            appearance: this.appearance,
            pkClassOfDimension: arrayConfig.data.pkClass,
            initVal$: of(dimension)
          }
        },
        mapValue: (val: InfDimension) => {
          const value: InfStatement = {
            ...{} as any,
            fk_object_info: undefined,
            fk_property: listDefinition.property.pkProperty,
            fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
            object_dimension: {
              ...val,
              fk_class: listDefinition.targetClass,
            },
          };
          return value;
        }
      }
    }));
    return of(controlConfigs);

  }

  private entityCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;
    const initItems = arrayConfig.initValue || [{}];
    return this.c.pipeTableNameOfClass(listDefinition.targetClass).pipe(
      map(basicModel => {

        const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfStatement) => {
          let initValue: CtrlEntityModel = {}

          if (listDefinition.isOutgoing) {
            // assign the object as init value for ctrl-entity
            if (initVal.object_persistent_item) initValue.persistent_item = initVal.object_persistent_item
            else if (initVal.object_temporal_entity) initValue.temporal_entity = initVal.object_temporal_entity
            else if (initVal.fk_object_info) initValue.pkEntity = initVal.fk_object_info
          } else {
            // assign the subject as init value for ctrl-entity
            if (initVal.subject_persistent_item) initValue.persistent_item = initVal.subject_persistent_item
            else if (initVal.subject_temporal_entity) initValue.temporal_entity = initVal.subject_temporal_entity
            else if (initVal.fk_subject_info) initValue.pkEntity = initVal.fk_subject_info
          }


          initValue = (!initValue.pkEntity && !initValue.temporal_entity && !initValue.persistent_item) ? null : initValue;

          const c: LocalNodeConfig = {
            control: {
              initValue,
              placeholder: arrayConfig.data.customCtrlLabel ? arrayConfig.data.customCtrlLabel : listDefinition.label,
              required: true,
              data: {
                appearance: this.appearance,
                controlType: 'ctrl-entity',
                listDefinition,
                ctrlEntity: {
                  model: basicModel
                }
              },
              mapValue: (val: CtrlEntityModel) => {
                if (!val || (!val.pkEntity && !val.temporal_entity && !val.persistent_item)) return null;

                const statement: InfStatement = {
                  ...{} as any,
                  fk_property: listDefinition.property.pkProperty,
                  fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
                };

                if (listDefinition.isOutgoing) {
                  // assign object
                  if (val.pkEntity) statement.fk_object_info = val.pkEntity;
                  else if (val.persistent_item) statement.object_persistent_item = val.persistent_item
                  else if (val.temporal_entity) statement.object_temporal_entity = val.temporal_entity

                } else {
                  // assign subject
                  if (val.pkEntity) statement.fk_subject_info = val.pkEntity;
                  else if (val.persistent_item) statement.subject_persistent_item = val.persistent_item
                  else if (val.temporal_entity) statement.subject_temporal_entity = val.temporal_entity
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


}

function getStatementKey(m: EntityModel, isOutgoing: boolean) {
  if (m === 'temporal_entity') {
    return isOutgoing ? 'outgoing_statements' : 'incoming_statements';
  }
  else if (m === 'persistent_item') {
    return isOutgoing ? 'outgoing_statements' : 'incoming_statements';
  }
}

// export interface MapValueItem { key: string, value: any }
