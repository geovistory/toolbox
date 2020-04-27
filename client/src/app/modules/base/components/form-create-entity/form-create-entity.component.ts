import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, AbstractControl } from '@angular/forms';
import { ActiveProjectService, InfPersistentItem, InfRole, InfTemporalEntity, InfTextProperty, U, ValidationService, SysConfig, InfLangString, InfTemporalEntityApi } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { ActionResultObservable } from 'app/core/store/actions';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormArrayConfig, FormFactory, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { equals, flatten, indexBy, values, groupBy, sum, uniq } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { auditTime, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ConfigurationPipesService, BasicModel } from '../../services/configuration-pipes.service';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { CtrlTimeSpanModel } from '../ctrl-time-span/ctrl-time-span.component';
import { FgPlaceComponent, FgPlaceInjectData } from '../fg-place/fg-place.component';
import { FgTextPropertyComponent, FgTextPropertyInjectData } from '../fg-text-property/fg-text-property.component';
import { FieldDefinition, FieldProperty, ListDefinition, ListType } from '../properties-tree/properties-tree.models';
import { FormChildFactory } from 'app/modules/form-factory/core/form-child-factory';
import { MatFormFieldAppearance } from '@angular/material';
import { Appearance } from 'cesium';
import { FgLangStringComponent, FgLangStringInjectData } from '../fg-lang-string/fg-lang-string.component';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
type EntityModel = 'persistent_item' | 'temporal_entity'
export interface FormArrayData {
  // arrayContains: 'fields' | 'lists' | 'controls'
  pkClass: number
  // fieldDefinition?: FieldDefinition
  // listDefinition?: ListDefinition
  customCtrlLabel?: string
  stringPartId?: number
  hideFieldTitle: boolean;

  fields?: {
    parentModel: EntityModel;
    parentProperty: FieldProperty
  }

  lists?: {
    parentModel?: EntityModel;
    fieldDefinition: FieldDefinition
    minLength: number
    maxLength: number
  }

  controls?: {
    listDefinition: ListDefinition
  }

  /**
   * if the entry point is a statement
   */
  addStatement?: {
    listDefinition: ListDefinition
  }


  // gets called when removed
  removeHook?: (x: FormArrayData) => any
}
interface FormGroupData {
  pkClass?: number
  listDefinition?: ListDefinition
}
export interface FormControlData {
  controlType: ControlType
  listDefinition?: ListDefinition
  nodeConfigs?: LocalNodeConfig[]
  appearance: MatFormFieldAppearance
  ctrlEntity?: {
    model: BasicModel
  }
}

export interface FormChildData {
  place?: FgPlaceInjectData
  textProperty?: FgTextPropertyInjectData
  langString?: FgLangStringInjectData
}

export type ControlType = 'ctrl-target-class' | 'ctrl-appellation' | 'ctrl-entity' | 'ctrl-language' | 'ctrl-place' | 'ctrl-place' | 'ctrl-text-property' | 'ctrl-time-primitive' | 'ctrl-type' | 'ctrl-time-span'

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
  @Input() listDefinition: ListDefinition;

  @Input() hideButtons: boolean;
  @Input() hideTitle: boolean;

  @Input() initVal$: Observable<InfPersistentItem | InfTemporalEntity | undefined>;

  @Input() hiddenProperty: FieldProperty;

  @Output() cancel = new EventEmitter<void>()
  @Output() searchString = new EventEmitter<string>()
  @Output() saved = new EventEmitter<InfPersistentItem | InfTemporalEntity | InfRole | InfTextProperty>()

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
    private p: ActiveProjectService,
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
      console.log(v)
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

        return this.getListNodes(arrayConfig, arrayConfig.data.lists.fieldDefinition.listType)

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
  private ctrlRequired(lDef: ListDefinition | FieldDefinition): boolean {
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
          mapValue: (items) => {
            const item = items[0]
            if (data.listDefinition.listType == 'text-property') {
              const text_property: Partial<InfTextProperty> = {
                ...item,
                fk_concerned_entity: this.pkSourceEntity,
              };
              return { text_property }
            } else {
              return {
                statement: {
                  [data.listDefinition.isOutgoing ? 'fk_temporal_entity' : 'fk_entity']: this.pkSourceEntity,
                  fk_property: data.listDefinition.property.pkProperty,
                  fk_property_of_property: data.listDefinition.property.pkPropertyOfProperty,
                  ...item
                }
              }
            }
          }
        },
      }
      return of([n])
    };
  }


  private getChildNodesOfClassAndListDef(pkTargetClass: number, listDef?: ListDefinition): Observable<LocalNodeConfig[]> {

    if (listDef && listDef.listType == 'text-property') {
      const c = this.getListNode(listDef, false, null);
      c.array.addOnInit = 1;
      c.array.mapValue = (items => items[0])
      return of([c]);
    }
    return combineLatest(
      this.c.pipeModelOfClass(pkTargetClass),
      this.c.pipeClassLabel(pkTargetClass)
    ).pipe(auditTime(10), map(([parentModel, label]) => {
      const mapValue = (items): CtrlEntityModel => {
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
      this.p.dfh$.class$.by_pk_class$.key(arrayConfig.data.pkClass),
      this.initVal$
    )
      .pipe(
        filter(([klass]) => !!klass),
        switchMap(([dfhClass, initValEntity]) => {

          let fields$: Observable<FieldDefinition[]>;
          let initPeIt: InfPersistentItem;
          let initTeEn: InfTemporalEntity;

          if (dfhClass.basic_type === 8 || dfhClass.basic_type === 30) {
            fields$ = this.c.pipeDefaultFieldDefinitions(arrayConfig.data.pkClass)
            initPeIt = initValEntity
          } else {
            // For temporal_entity
            fields$ = this.c.pipeFieldDefinitionsForTeEnForm(arrayConfig.data.pkClass)
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
                if (parentModel === 'persistent_item' && fDef.fkClassField === SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION) {
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
                      if (fDef.listType == 'text-property') {
                        return { text_properties: items }
                      } else {
                        const key = getRoleKey(parentModel, fDef.isOutgoing)
                        return { [key]: items }
                      }
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
  getListNodes(arrayConfig: FormArrayConfig<FormArrayData>, listType: ListType): Observable<LocalNodeConfig[]> {
    const initialValue = arrayConfig.initValue || [];
    const textProps: InfTextProperty[] = initialValue.filter((v) => !!v.fk_class_field)
    const statements: InfRole[] = initialValue.filter((v) => !v.fk_class_field)
    const listDefinitions = arrayConfig.data.lists.fieldDefinition.listDefinitions;
    const parentModel = arrayConfig.data.lists.parentModel;
    const listDefIdx = indexBy((lDef) => (lDef.targetClass || 0).toString(), listDefinitions)
    const isOutgoing = arrayConfig.data.lists.fieldDefinition.isOutgoing
    if (listType == 'text-property') {
      return of([this.getListNode(
        listDefinitions[0],
        false,
        textProps
      )])
    }
    else if (listType == 'time-span') {
      return of([this.getListNode(
        listDefinitions[0],
        false,
        statements
      )])
    }

    // get the target class for each initial statement
    const o$ = statements.map((s) => {
      // -> for each initVal
      const relObj = s.appellation || s.language || s.place || s.lang_string || s.temporal_entity || s.persistent_item;
      if (relObj) {
        // --> if statement.appellation, .place, .lang_string, .time_primitive, .language
        return of({ fk_class: relObj.fk_class, statement: s })
      } else {
        // --> else get related entity preview and its class
        return this.p.streamEntityPreview(isOutgoing ? s.fk_entity : s.fk_temporal_entity).pipe(
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
  getInitValueForTargetClassCtrl(fDef: FieldDefinition, initVal: { initTeEn: InfTemporalEntity, initPeIt: InfPersistentItem }): Observable<ListDefinition> {

    if (fDef.listType == 'time-span' || fDef.listType === 'text-property') {
      return;
    }
    else if (initVal.initTeEn) {
      if (fDef.isOutgoing && initVal.initTeEn.te_roles) {
        return this.getInitListDef(fDef, initVal.initTeEn.te_roles);
      }
      else if (!fDef.isOutgoing && initVal.initTeEn.ingoing_roles) {
        return this.getInitListDef(fDef, initVal.initTeEn.ingoing_roles);
      }
    }
    else if (initVal.initPeIt) {
      if (fDef.isOutgoing && initVal.initPeIt.te_roles) {
        return this.getInitListDef(fDef, initVal.initPeIt.te_roles);
      }
      else if (!fDef.isOutgoing && initVal.initPeIt.pi_roles) {
        return this.getInitListDef(fDef, initVal.initPeIt.pi_roles);
      }
    }
    return;
  }



  private getInitListDef(fDef: FieldDefinition, roles: InfRole[]): Observable<ListDefinition> {
    const statement = roles.find(r => this.sameProperty(r, fDef) && !!((r.fk_temporal_entity || r.fk_entity)))
    if (!statement) return of(undefined);

    return this.p.streamEntityPreview(statement.fk_temporal_entity || statement.fk_entity).pipe(
      map(entity => {
        const lDef = fDef.listDefinitions.find(ld => ld.targetClass === entity.fk_class);
        return lDef;
      })
    )

  };


  /**
   * gets the init value for the field definition out of the initial entity value
   */
  getInitValueForFieldNode(lDef: FieldDefinition, initVal: { initTeEn: InfTemporalEntity, initPeIt: InfPersistentItem }): InfRole[] | InfTextProperty[] {
    if (lDef.listType == 'time-span') {
      if (initVal.initTeEn && initVal.initTeEn.te_roles) {
        return initVal.initTeEn.te_roles.filter(r => DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.includes(r.fk_property))
      }
    }
    if (lDef.listType === 'text-property') {
      if (initVal.initTeEn && initVal.initTeEn.text_properties) {
        return initVal.initTeEn.text_properties.filter(t => t.fk_class_field == lDef.fkClassField)
      }
      else if (initVal.initPeIt && initVal.initPeIt.text_properties) {
        return initVal.initPeIt.text_properties.filter(t => t.fk_class_field == lDef.fkClassField)
      }
    }
    else if (initVal.initTeEn) {
      if (lDef.isOutgoing && initVal.initTeEn.te_roles) {
        return initVal.initTeEn.te_roles.filter(r => this.sameProperty(r, lDef))
      }
      else if (!lDef.isOutgoing && initVal.initTeEn.ingoing_roles) {
        return initVal.initTeEn.ingoing_roles.filter(r => this.sameProperty(r, lDef))
      }
    }
    else if (initVal.initPeIt) {
      if (lDef.isOutgoing && initVal.initPeIt.te_roles) {
        return initVal.initPeIt.te_roles.filter(r => this.sameProperty(r, lDef))
      }
      else if (!lDef.isOutgoing && initVal.initPeIt.pi_roles) {
        return initVal.initPeIt.pi_roles.filter(r => this.sameProperty(r, lDef))
      }
    }
    return undefined;
  }

  /**
   * Returns true if property of role and listDefinition match
   * @param r
   * @param lDef
   */
  sameProperty(r: InfRole, lDef: ListDefinition | FieldDefinition): boolean {
    return r.fk_property ?
      r.fk_property === lDef.property.pkProperty :
      r.fk_property_of_property ? r.fk_property_of_property === lDef.property.pkPropertyOfProperty : false
  }

  /**
   * This function returns a form array containing controls
   * It defines how to map the values of the controls to an array of statements
   */
  getListNode(
    listDefinition: ListDefinition,
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

    if (childListType === 'has-type') {
      maxLength = 1;
      addOnInit = 1;
    }
    if (childListType === 'temporal-entity' && !listDefinition.identityDefiningForTarget) {
      childListType = 'entity-preview';
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


  private getControlNodes(arrayConfig: LocalArrayConfig, listType: ListType): Observable<LocalNodeConfig[]> {

    if (listType === 'time-span') {

      return this.timeSpanCtrl(arrayConfig)

    } else if (listType === 'place') {

      return this.placeCtrl(arrayConfig)

    } else if (listType === 'entity-preview' || listType === 'temporal-entity') {

      return this.entityCtrl(arrayConfig)

    } else if (listType === 'text-property') {

      return this.textPropertyCtrl(arrayConfig)

    } else if (listType === 'language') {

      return this.languageCtrl(arrayConfig)

    } else if (listType === 'appellation') {

      return this.appellationCtrl(arrayConfig)

    }
    else if (listType === 'lang-string') {

      return this.langStringCtrl(arrayConfig)

    } else if (listType === 'has-type') {

      return this.typeCtrl(arrayConfig)

    } else if (arrayConfig.isList) {
      // Add a form array as object / container
      // return getContainerArrayConfig(arrayConfig)

    }
  }


  private appellationsHook(x: any, id: number) {
    const roles: InfRole[] = x.filter((i) => !!i);
    this.searchStringParts[id] = roles
      .map((item) => (U.stringFromQuillDoc(item.appellation.quill_doc)))
      .join(' ');
    return roles;
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

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const value = this.formFactory.formGroupFactory.valueChanges$.value
      const obs$ = []
      if (value.persistent_item) {
        obs$.push(this.inf.persistent_item.upsert([value.persistent_item], pkProject).resolved$.pipe(filter(x => !!x)))
      }
      else if (value.temporal_entity) {
        obs$.push(this.inf.temporal_entity.upsert([value.temporal_entity], pkProject).resolved$.pipe(filter(x => !!x)))
      }
      else if (value.statement) {
        obs$.push(this.inf.role.upsert([value.statement], pkProject).resolved$.pipe(filter(x => !!x)))
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
    const initRoles: InfRole[] = arrayConfig.initValue || [];
    const initValue: CtrlTimeSpanModel = {}
    for (let i = 0; i < initRoles.length; i++) {
      const element = initRoles[i];
      initValue[element.fk_property] = element.time_primitive;
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
      }
    };
    return of([controlConfig]);
  }


  private languageCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    return this.p.defaultLanguage$.pipe(map(defaultLanguage => {

      const listDefinition = arrayConfig.data.controls.listDefinition;
      // with [{}] we make sure at least one item is added
      const initItems = arrayConfig.initValue || [{}];
      const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => ({
        control: {
          placeholder: listDefinition.label,
          required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
          data: {
            appearance: this.appearance,
            controlType: 'ctrl-language'
          },
          initValue: initVal.language || defaultLanguage,
          mapValue: (val) => {
            if (!val) return null;
            const value: InfRole = {
              ...{} as any,
              fk_entity: undefined,
              fk_property: listDefinition.property.pkProperty,
              language: {
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
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => {
      const initValue = !initVal ?
        undefined : listDefinition.isOutgoing ?
          initVal.fk_entity : initVal.fk_temporal_entity;
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

            let value: InfRole = {
              ...{} as any,
              fk_property: listDefinition.property.pkProperty,
            };

            if (listDefinition.isOutgoing) {
              value = { ...value, fk_entity: val }
            } else {
              value = { ...value, fk_temporal_entity: val }
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
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => ({
      control: {
        initValue: initVal.appellation,
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          appearance: this.appearance,
          controlType: 'ctrl-appellation'
        },
        mapValue: (val) => {
          if (!val) return null;
          const value: InfRole = {
            ...{} as any,
            fk_entity: undefined,
            fk_property: listDefinition.property.pkProperty,
            appellation: {
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
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => ({
      childFactory: {
        component: FgPlaceComponent,
        getInjectData: (d) => {
          return d.place
        },
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          place: {
            appearance: this.appearance,
            initVal$: of(initVal.place)
          }
        },
        mapValue: (val) => {
          if (!val) return null;
          const value: InfRole = {
            ...{} as any,
            fk_entity: undefined,
            fk_property: listDefinition.property.pkProperty,
            place: {
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

  private textPropertyCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;

    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((textProperty: InfTextProperty) => ({
      childFactory: {
        component: FgTextPropertyComponent,
        getInjectData: (d) => {
          return d.textProperty
        },
        required: this.ctrlRequired(arrayConfig.data.controls.listDefinition),
        data: {
          textProperty: {
            appearance: this.appearance,
            initVal$: of(textProperty)
          }
        },
        mapValue: (val: InfTextProperty) => {
          if (!val) return null;
          const value: InfTextProperty = {
            ...val,
            fk_class_field: listDefinition.fkClassField,
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
      }
    }));
    return of(controlConfigs);

  }


  private entityCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.controls.listDefinition;
    const initItems = arrayConfig.initValue || [{}];
    return this.c.pipeModelOfClass(listDefinition.targetClass).pipe(
      map(basicModel => {

        const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => {
          let initValue: CtrlEntityModel = {}
          if (initVal.temporal_entity) initValue.temporal_entity = initVal.temporal_entity;
          if (initVal.persistent_item) initValue.temporal_entity = initVal.persistent_item;
          if (listDefinition.isOutgoing ? initVal.fk_entity : initVal.fk_temporal_entity) {
            initValue.pkEntity = listDefinition.isOutgoing ? initVal.fk_entity : initVal.fk_temporal_entity;
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

                let value: InfRole = {
                  ...{} as any,
                  fk_property: listDefinition.property.pkProperty,
                };
                if (val.pkEntity) {

                  if (listDefinition.isOutgoing) {
                    value = { ...value, fk_entity: val.pkEntity }
                  } else {
                    value = { ...value, fk_temporal_entity: val.pkEntity }
                  }
                } else if (val.temporal_entity) {
                  value = { ...value, temporal_entity: val.temporal_entity }
                } else if (val.persistent_item) {
                  value = { ...value, persistent_item: val.persistent_item }
                }

                return value;
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

function getRoleKey(m: EntityModel, isOutgoing: boolean) {
  if (m === 'temporal_entity') {
    return isOutgoing ? 'te_roles' : 'ingoing_roles';
  }
  else if (m === 'persistent_item') {
    return isOutgoing ? 'outgoing_roles' : 'pi_roles';
  }
}

// export interface MapValueItem { key: string, value: any }
