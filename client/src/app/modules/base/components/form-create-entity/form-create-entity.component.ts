import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActiveProjectService, InfPersistentItem, InfRole, InfTemporalEntity, InfTextProperty, U, SysConfig } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { ActionResultObservable } from 'app/core/store/actions';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormArrayConfig, FormFactory, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { clone, flatten, values, equals, indexBy } from 'ramda';
import { combineLatest, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { auditTime, first, map, mergeMap, takeUntil, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { FieldDefinition, ListDefinition, ListType, FieldProperty } from '../properties-tree/properties-tree.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { FgPlaceComponent, FgPlaceInjectData } from '../fg-place/fg-place.component';
import { FgTextPropertyInjectData, FgTextPropertyComponent } from '../fg-text-property/fg-text-property.component';
import { CtrlTimeSpanModel } from '../ctrl-time-span/ctrl-time-span.component';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
export interface FormArrayData {
  arrayContains: 'fields' | 'lists', 'controls'
  pkClass: number
  fieldDefinition?: FieldDefinition
  listDefinition?: ListDefinition
  customCtrlLabel?: string
  stringPartId?: number
  hideFieldTitle: boolean;
  // gets called when removed
  removeHook?: (x: FormArrayData) => any
}
interface FormGroupData {
  pkClass: number
  fieldDefinition?: FieldDefinition
}
export interface FormControlData {
  controlType: ControlType
  fieldDefinition?: FieldDefinition
  listDefinition?: ListDefinition
  nodeConfigs?: LocalNodeConfig[]
}

export interface FormChildData {
  place?: FgPlaceInjectData
  textProperty?: FgTextPropertyInjectData
}

export type ControlType = 'ctrl-target-class' | 'ctrl-appellation' | 'ctrl-entity' | 'ctrl-language' | 'ctrl-place' | 'ctrl-place' | 'ctrl-text-property' | 'ctrl-time-primitive' | 'ctrl-type' | 'ctrl-time-span'

export type LocalArrayConfig = FormArrayConfig<FormArrayData>;
export type LocalNodeConfig = FormNodeConfig<FormGroupData, FormArrayData, FormControlData, FormChildData>;
export type LocalFormArrayFactory = FormArrayFactory<FormControlData, FormArrayData>
export type LocalFormControlFactory = FormControlFactory<FormControlData>

@Component({
  selector: 'gv-form-create-entity',
  templateUrl: './form-create-entity.component.html',
  styleUrls: ['./form-create-entity.component.scss']
})
export class FormCreateEntityComponent implements OnInit, OnDestroy {

  @Input() pkClass: number
  @Input() appContext: number;

  @Input() hideButtons: boolean;
  @Input() hideTitle: boolean;

  @Input() initVal$: Observable<InfPersistentItem | InfTemporalEntity | undefined>;

  @Input() hiddenProperty: FieldProperty;

  @Output() cancel = new EventEmitter<void>()
  @Output() searchString = new EventEmitter<string>()
  @Output() saved = new EventEmitter<InfPersistentItem | InfTemporalEntity>()

  destroy$ = new Subject<boolean>();
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory
  submitted = false;
  saving = false;
  searchStringPartId = 0;
  searchStringParts: { [key: number]: string } = {}
  constructor(
    private formFactoryService: FormFactoryService,
    private c: ConfigurationPipesService,
    private inf: InfActions,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
    if (!this.pkClass) throw new Error('You must provide a pkClass as @Input() on FormCreateEntityComponent');
    if (!this.appContext) throw new Error('You must provide a appContext as @Input() on FormCreateEntityComponent');

    if (!this.initVal$) this.initVal$ = new BehaviorSubject(undefined)

    this.formFactory$ = this.formFactoryService.create<FormGroupData, FormArrayData, FormControlData, any>({
      hideTitle: this.hideTitle,
      rootFormGroup$: of({
        data: { pkClass: this.pkClass, }
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

      return this.getChildNodesOfGroup(nodeConfig)

    }
    else if (nodeConfig.array) {

      const arrayConfig = nodeConfig.array
      const listType = !arrayConfig.data.fieldDefinition ? undefined : arrayConfig.data.fieldDefinition.listType;

      if (nodeConfig.array.data.arrayContains == 'fields') {

        return this.getFieldNodes(arrayConfig, listType)

      }

      else if (nodeConfig.array.data.arrayContains == 'controls') {

        return this.getControlNodes(arrayConfig, listType)

      }
    }
  }

  /**
   * returns true if control is required
   */
  private ctrlRequired(fieldDefinition: FieldDefinition): boolean {
    return (
      fieldDefinition.isOutgoing &&
      fieldDefinition.identityDefiningForSource
    )
  }

  private getChildNodesOfGroup(nodeConfig: LocalNodeConfig): Observable<LocalNodeConfig[]> {
    const childConfs: LocalNodeConfig[] = [];

    return combineLatest(
      this.c.pipeListTypeOfClass(nodeConfig.group.data.pkClass),
      this.c.pipeClassLabel(nodeConfig.group.data.pkClass)
    ).pipe(auditTime(10), map(([listType, label]) => {
      const mapFn = createContainerMapValue(nodeConfig.group.data.pkClass)
      const mapValue = (x) => {
        this.emitNewSearchString();
        return mapFn(x)
      }
      if (listType === 'entity-preview') listType = 'persistent-item';
      if (listType === 'temporal-entity' || listType === 'persistent-item') {
        const n: LocalNodeConfig = {
          array: {
            isList: false,
            required: true,
            maxLength: 1,
            placeholder: label,
            data: {
              arrayContains: 'fields',
              pkClass: nodeConfig.group.data.pkClass,
              fieldDefinition: {
                listType,
                ...{} as any
              },
              hideFieldTitle: false
            },
            mapValue
          },
        };
        childConfs.push(n);
      }
      return childConfs;
    }));
  }

  /**
   * This Funciton returns an observable array of form array
   * each of these form arrays contain lists, or if needed, a target class selector
   */
  private getFieldNodes(arrayConfig: LocalArrayConfig, parentListType: ListType): Observable<LocalNodeConfig[]> {

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
            // auditTime(100),
            switchMap((fieldDefs) => {
              return new Observable<LocalNodeConfig[]>(subscriber => {

                const childConfs: LocalNodeConfig[] = []

                // Add a form array as list
                // const fieldDefs = [...defaultFieldDefs, ...specificFieldDefs];
                fieldDefs.forEach((fDef, index) => {


                  // Q: is this field not circular or hidden?
                  const prop = arrayConfig.data.fieldDefinition.property;
                  const parentPropety = prop ? prop.pkProperty : undefined;
                  if (
                    (!parentPropety || parentPropety !== fDef.property.pkProperty) &&
                    !equals(fDef.property, this.hiddenProperty)
                  ) {
                    // A: no. Add a a child array config.

                    // Q: is there only one list definition?
                    if (fDef.listDefinitions.length === 1) {
                      // A. yes: add the array list
                      const lDef = fDef.listDefinitions[0];
                      const initValListNode = this.getInitValueForListNode(lDef, { initTeEn, initPeIt })
                      const n = this.getListNode(parentListType, fDef, lDef, false, initValListNode);
                      childConfs.push(n);

                    } else {
                      // A. no: add a control for selecting the target class

                      // TODO INIT
                      // const n: LocalNodeConfig = {
                      //   control: {
                      //     // initValue: this.getInitValueForTargetClassCtrl(fDef, { initTeEn, initPeIt }),
                      //     placeholder: fDef.label,
                      //     required: this.ctrlRequired(fDef),
                      //     mapValue: () => { },
                      //     data: {
                      //       controlType: 'ctrl-target-class',
                      //       fieldDefinition: fDef,
                      //       nodeConfigs: fDef.listDefinitions
                      //         // filter fields targeting temporal-entity except for appellation for language
                      //         .filter(l => l.listType !== 'temporal-entity' || l.targetClass === DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE)
                      //         .map(lDef => this.getListNode(
                      //           parentListType,
                      //           fDef,
                      //           lDef,
                      //           false,
                      //           this.getInitValueForListNode(lDef, { initTeEn, initPeIt }),
                      //           lDef.targetClassLabel,
                      //           lDef.label + ' ' + lDef.targetClassLabel
                      //         ))
                      //     },
                      //   },
                      //   id: U.uuid()
                      // };
                      const n: LocalNodeConfig = {
                        array: {
                          // initValue: this.getInitValueForTargetClassCtrl(fDef, { initTeEn, initPeIt }),
                          placeholder: fDef.label,
                          required: this.ctrlRequired(fDef),
                          mapValue: () => { },
                          data: {
                            arrayContains: 'lists',
                            fieldDefinition: fDef,
                            hideFieldTitle: false,
                            controls: [],
                            pkClass: undefined,
                          },
                        },
                        id: U.uuid()
                      };
                      childConfs.push(n);
                      // -> use the mapValue as a Hook to add a array list after when a class is selected
                      // -> and remove the array list, if the class is deselected
                      n.control.mapValue = (lDef: ListDefinition) => {
                        const newChildren = clone(childConfs)
                        const i = newChildren.findIndex(item => item.id === n.id)

                        // if selected
                        if (lDef) {
                          // insert the array config with the selected list definition
                          const newChildConfig = this.getListNode(
                            parentListType,
                            fDef,
                            lDef,
                            true,
                            this.getInitValueForListNode(lDef, { initTeEn, initPeIt }),
                            'Select ' + lDef.targetClassLabel
                          );

                          newChildConfig.array.addOnInit = 1;
                          newChildren.splice(i + 1, 0, newChildConfig)

                          // disable 'ctrl-target-class'

                          // update the form factory
                          subscriber.next(newChildren)
                        }

                        return
                      }
                    }
                  }
                });

                subscriber.next(childConfs)
              })

            }));
        })
      )



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
   * gets the init value for the list definition out of the initial entity value
   */
  getInitValueForListNode(lDef: ListDefinition, initVal: { initTeEn: InfTemporalEntity, initPeIt: InfPersistentItem }) {
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
   *
   * @param parentListType
   * @param fieldDefinition
   * @param listDefinition
   * @param hideFieldTitle
   * @param customCtrlLabel
   * @param customPlaceholder
   */
  getListNode(
    parentListType: string,
    fieldDefinition: FieldDefinition,
    listDefinition: ListDefinition,
    hideFieldTitle: boolean,
    initValue: any,
    customCtrlLabel?: string,
    customPlaceholder?: string
  ): LocalNodeConfig {

    let childListType = listDefinition.listType;
    const stringPartId = this.searchStringPartId++;

    const mapValue = (x): MapValueItem => {
      if (parentListType === 'temporal-entity') {
        if (childListType === 'language' || childListType === 'place' || childListType === 'entity-preview') {
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: x.filter((i) => !!i)
          };
        }
        else if (childListType === 'appellation') {
          const roles: InfRole[] = this.appellationsHook(x, stringPartId);
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: roles
          };
        }
        else if (childListType === 'temporal-entity') {
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: x.filter(item => !!item).map(item => ({
              fk_property: listDefinition.property.pkProperty,
              temporal_entity: item
            }))
          };
        }
        else if (childListType === 'time-span') {
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: flatten(x).filter((i) => !!i)
          };
        }
        else if (childListType === 'text-property') {
          const textProps: InfTextProperty[] = this.textPropHook(x, stringPartId);
          return { key: 'text_properties', value: textProps };
        }
        else if (childListType === 'has-type') {
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: x.filter((i) => !!i)
          };
        }
      }
      else if (parentListType === 'persistent-item') {
        if (childListType === 'text-property') {
          const textProps: InfTextProperty[] = this.textPropHook(x, stringPartId);
          return { key: 'text_properties', value: textProps };
        }
        else if (childListType === 'temporal-entity') {
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: x.filter(item => !!item)
            // .map(item => ({
            //   fk_property: listDefinition.property.pkProperty,
            //   temporal_entity: item
            // }))
          };
        }
        else if (childListType === 'has-type') {
          return {
            key: getRoleKey(parentListType, listDefinition),
            value: x.filter((i) => !!i)
          };
        }
      };
      // if not returned earlier, we have an error
      throw new Error(`No mapValue defined for ${childListType} as child of ${parentListType}`);
    };

    const removeHook = (data: FormArrayData) => {
      const id = data.stringPartId;
      if (id && this.searchStringParts[id]) {
        delete this.searchStringParts[id];
      }
      this.emitNewSearchString();
    };

    const required = listDefinition.identityDefiningForSource;
    let maxLength = listDefinition.targetMaxQuantity === -1 ? Number.POSITIVE_INFINITY : listDefinition.targetMaxQuantity;
    let addOnInit = maxLength === 1 ? 1 : required ? 1 : 0;
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
          arrayContains: 'controls',
          pkClass: listDefinition.targetClass,
          fieldDefinition: {
            ...fieldDefinition,
            ...listDefinition,
            listType: childListType
          },
          listDefinition: {
            ...listDefinition,
            listType: childListType
          },
          customCtrlLabel,
          stringPartId,
          removeHook,
          hideFieldTitle
        },
        mapValue,
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
      this.save((apiCall: ActionResultObservable<any>) => {
        apiCall.resolved$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
          if (res) {
            if (!res.items || !res.items.length) {
              throw new Error('bad result')
            }
            this.saved.emit(res.items[0])
            this.saving = false;
          }
        })
      })

    } else {
      const f = this.formFactory.formGroup.controls.childControl as FormArray;
      U.recursiveMarkAsTouched(f)
    }
  }

  save(cb: (actionResult: ActionResultObservable<any>) => void) {
    const formGroupFactory = this.formFactory.formGroupFactory;
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const rootFormArray = this.formFactory.formGroupFactory.child as LocalFormArrayFactory;
      const rootListType = rootFormArray.config.data.fieldDefinition.listType;
      let apiCall;
      if (rootListType === 'persistent-item') {
        const value: InfPersistentItem = formGroupFactory.valueChanges$.value
        apiCall = this.inf.persistent_item.upsert([value], pkProject)
      }
      else if (rootListType === 'temporal-entity') {
        const value: InfTemporalEntity = formGroupFactory.valueChanges$.value
        apiCall = this.inf.temporal_entity.upsert([value], pkProject)
      }
      else {
        throw new Error(`Submitting ${rootListType} is not implemented`);
      }
      cb(apiCall)
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
        placeholder: arrayConfig.data.fieldDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: { controlType: 'ctrl-time-span' },
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

      const listDefinition = arrayConfig.data.listDefinition;
      // with [{}] we make sure at least one item is added
      const initItems = arrayConfig.initValue || [{}];
      const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => ({
        control: {
          placeholder: listDefinition.label,
          required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
          data: { controlType: 'ctrl-language' },
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
    const listDefinition = arrayConfig.data.listDefinition;
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
          required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
          data: {
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
    const listDefinition = arrayConfig.data.listDefinition;
    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => ({
      control: {
        initValue: initVal.appellation,
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: { controlType: 'ctrl-appellation' },
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
    const listDefinition = arrayConfig.data.listDefinition;
    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((initVal: InfRole) => ({
      childFactory: {
        component: FgPlaceComponent,
        getInjectData: (d) => {
          return d.place
        },
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: {
          place: {
            appearance: 'fill',
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
    const listDefinition = arrayConfig.data.listDefinition;

    // with [{}] we make sure at least one item is added
    const initItems = arrayConfig.initValue || [{}];
    const controlConfigs: LocalNodeConfig[] = initItems.map((textProperty: InfTextProperty) => ({
      childFactory: {
        component: FgTextPropertyComponent,
        getInjectData: (d) => {
          return d.textProperty
        },
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: {
          textProperty: {
            appearance: 'fill',
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

    // return this.p.defaultLanguage$.pipe(
    //   filter(l => !!l),
    //   map(defaultLanguage => {

    //   }))

  }

  // TODO INIT
  private entityCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.listDefinition;
    const controlConfig: LocalNodeConfig = {
      control: {
        placeholder: arrayConfig.data.customCtrlLabel ? arrayConfig.data.customCtrlLabel : listDefinition.label,
        required: true,
        data: {
          controlType: 'ctrl-entity',
          listDefinition,
        },
        mapValue: (val: CtrlEntityModel) => {
          if (!val) return null;

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
          } else if (val.temporalEntity) {
            value = { ...value, temporal_entity: val.temporalEntity }
          } else if (val.persistentItem) {
            value = { ...value, persistent_item: val.persistentItem }
          }

          return value;
        }
      }
    };
    return of([controlConfig]);
  }


}

function getRoleKey(listType: ListType, listDefinition: ListDefinition) {
  if (listType === 'temporal-entity') {
    return listDefinition.isOutgoing ? 'te_roles' : 'ingoing_roles';
  }
  else if (listType === 'persistent-item') {
    return listDefinition.isOutgoing ? 'outgoing_roles' : 'pi_roles';
  }
}

function getContainerArrayConfig(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
  const mapValue = createContainerMapValue(arrayConfig.data.pkClass);
  return of([{ array: { ...arrayConfig, isList: false, mapValue } }]);
}
export interface MapValueItem { key: string, value: any }
function createContainerMapValue(pkClass: number) {
  return function mapContainerValue(items: MapValueItem[]) {
    const result = {} as InfTemporalEntity | InfPersistentItem;
    items.forEach(item => {
      if (item && item.value && item.value.length) {
        result[item.key] = [...result[item.key] || [], ...item.value]
      }
    })
    if (Object.keys(result).length) {
      result.fk_class = pkClass
      return result
    }
    else {
      return null
    }
  }
}
