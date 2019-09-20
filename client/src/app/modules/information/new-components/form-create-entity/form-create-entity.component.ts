import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActiveProjectService, InfPersistentItem, InfRole, InfTemporalEntity, InfTextProperty, U, SysConfig } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { ActionResultObservable } from 'app/core/store/actions';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormArrayConfig, FormFactory, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { clone, flatten, values } from 'ramda';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { auditTime, first, map, mergeMap, takeUntil, switchMap } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { DfhConfig } from '../../shared/dfh-config';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { FieldDefinition, ListDefinition, ListType } from '../properties-tree/properties-tree.models';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
export interface FormArrayData {
  pkClass: number
  fieldDefinition?: FieldDefinition
  listDefinition?: ListDefinition
  customCtrlLabel?: string
  stringPartId?: number
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
export type ControlType = 'ctrl-target-class' | 'ctrl-appellation' | 'ctrl-entity' | 'ctrl-language' | 'ctrl-place' | 'ctrl-place' | 'ctrl-text-property' | 'ctrl-time-primitive' | 'ctrl-type' | 'ctrl-time-span'

export type LocalArrayConfig = FormArrayConfig<FormArrayData>;
export type LocalNodeConfig = FormNodeConfig<FormGroupData, FormArrayData, FormControlData>;
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

    this.formFactory$ = this.formFactoryService.create<FormGroupData, FormArrayData, FormControlData>({
      hideTitle: this.hideTitle,
      rootFormGroup$: of({
        data: { pkClass: this.pkClass, }
      }),
      getChildNodeConfigs: this.getChildNodeConfigs
    }, this.destroy$)

    console.log('formFactory', this.formFactory$)

    this.formFactory$.pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory = v
    })
    this.formFactory$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((v) => {
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

      if (listType === 'time-span') {

        return this.timeSpanCtrl(arrayConfig)

      } else if (listType === 'place') {

        return this.placeCtrl(arrayConfig)

      } else if (listType === 'entity-preview') {

        return this.entityCtrl(arrayConfig)

      } else if (listType === 'text-property') {

        return this.textPropertyCtrl(arrayConfig)

      } else if (listType === 'language') {

        return this.languageCtrl(arrayConfig)

      } else if (listType === 'appellation') {

        return this.appellationCtrl(arrayConfig)

      } else if (arrayConfig.isList) {
        // Add a form array as object / container
        return getContainerArrayConfig(arrayConfig)

      } else {

        return this.getListArrayConfig(arrayConfig, listType)
      }
    }
  }

  /**
   * returns true if control is required
   */
  private ctrlRequired(fieldDefinition: FieldDefinition): boolean {
    return (
      fieldDefinition.isOutgoing &&
      fieldDefinition.isIdentityDefining
    )
  }

  private timeSpanCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const controlConfig: LocalNodeConfig = {
      control: {
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

  private placeCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.listDefinition;
    const controlConfig: LocalNodeConfig = {
      control: {
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: {
          controlType: 'ctrl-place'
        },
        mapValue: (val) => {
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
      }
    };
    return of([controlConfig]);
  }


  private languageCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    return this.p.defaultLanguage$.pipe(map(defaultLanguage => {

      const listDefinition = arrayConfig.data.listDefinition;
      const controlConfig: LocalNodeConfig = {
        control: {
          placeholder: listDefinition.label,
          required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
          data: { controlType: 'ctrl-language' },
          initValue: defaultLanguage,
          mapValue: (val) => {
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
        }
      };
      return [controlConfig];
    })
    )
  }

  private appellationCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {

    const listDefinition = arrayConfig.data.listDefinition;
    const controlConfig: LocalNodeConfig = {
      control: {
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: { controlType: 'ctrl-appellation' },
        mapValue: (val) => {
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
      }
    };
    return of([controlConfig]);
  }
  private textPropertyCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    return this.p.defaultLanguage$.pipe(map(defaultLanguage => {
      const listDefinition = arrayConfig.data.listDefinition;
      const initValue: InfTextProperty = {
        fk_language: defaultLanguage.pk_entity,
        language: defaultLanguage,
        ...{} as any
      }
      const controlConfig: LocalNodeConfig = {
        control: {
          placeholder: listDefinition.label,
          required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
          data: { controlType: 'ctrl-text-property' },
          initValue,
          mapValue: (val) => {
            if (!val) return null;

            const value: InfTextProperty = {
              ...val,
              fk_class_field: listDefinition.fkClassField,
            };
            return value;
          }
        }
      };
      return [controlConfig];
    }))
  }
  private entityCtrl(arrayConfig: LocalArrayConfig): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.listDefinition;
    const controlConfig: LocalNodeConfig = {
      control: {
        placeholder: arrayConfig.data.customCtrlLabel ? arrayConfig.data.customCtrlLabel : listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: {
          controlType: 'ctrl-entity',
          listDefinition,
        },
        mapValue: (val) => {
          if (!val) return null;

          let value: InfRole = { ...{} as any, fk_property: listDefinition.pkProperty, };

          if (listDefinition.isOutgoing) {
            value = { ...value, fk_entity: val }
          } else {
            value = { ...value, fk_temporal_entity: val }
          }

          return value;
        }
      }
    };
    return of([controlConfig]);
  }

  private getListArrayConfig(arrayConfig: LocalArrayConfig, listType: ListType): Observable<LocalNodeConfig[]> {
    return this.c.pipeFieldDefinitions(arrayConfig.data.pkClass, this.appContext).pipe(
      auditTime(100), mergeMap(fieldDefinitions => {
        return new Observable<LocalNodeConfig[]>(subscriber => {

          const childConfs: LocalNodeConfig[] = []

          // Add a form array as list
          fieldDefinitions.forEach((f, index) => {

            const createArrayConfig = (listDefinition: ListDefinition, customCtrlLabel?: string, customPlaceholder?: string): LocalNodeConfig => {

              const childListType = listDefinition.listType;
              const stringPartId = this.searchStringPartId++;
              const mapValue = (x): MapValueItem => {

                if (listType === 'temporal-entity') {

                  if (childListType === 'language' || childListType === 'place' || childListType === 'entity-preview') {

                    return {
                      key: getRoleKey(listType, listDefinition),
                      value: x.filter((i) => !!i)
                    }

                  }
                  else if (childListType === 'appellation') {

                    const roles: InfRole[] = this.appellationsHook(x, stringPartId);
                    return {
                      key: getRoleKey(listType, listDefinition),
                      value: roles
                    }

                  } else if (childListType === 'temporal-entity') {

                    return {
                      key: getRoleKey(listType, listDefinition),
                      value: x.filter(item => !!item).map(item => ({
                        fk_property: listDefinition.pkProperty,
                        temporal_entity: item
                      }))
                    }

                  } else if (childListType === 'time-span') {

                    return {
                      key: getRoleKey(listType, listDefinition),
                      value: flatten(x).filter((i) => !!i)
                    }

                  } else if (childListType === 'text-property') {

                    const textProps: InfTextProperty[] = this.textPropHook(x, stringPartId);
                    return { key: 'text_properties', value: textProps }

                  }
                }
                else if (listType === 'persistent-item') {

                  if (childListType === 'text-property') {

                    const textProps: InfTextProperty[] = this.textPropHook(x, stringPartId);
                    return { key: 'text_properties', value: textProps }

                  } else if (childListType === 'temporal-entity') {

                    return {
                      key: getRoleKey(listType, listDefinition),
                      value: x.filter(item => !!item).map(item => ({
                        fk_property: listDefinition.pkProperty,
                        temporal_entity: item
                      }))
                    }

                  }
                };
                // if not returned earlier, we have an error
                throw new Error(`No mapValue defined for ${childListType} as child of ${listType}`)
              }


              const removeHook = (data: FormArrayData) => {
                const id = data.stringPartId;
                if (id && this.searchStringParts[id]) delete this.searchStringParts[id];
                this.emitNewSearchString();
              }

              const required = listDefinition.isIdentityDefining;
              const maxLength = listDefinition.targetMaxQuantity === -1 ? Number.POSITIVE_INFINITY : listDefinition.targetMaxQuantity;
              const addOnInit = maxLength === 1 ? 1 : required ? 1 : 0;

              return {
                array: {
                  isList: true,
                  addOnInit,
                  required,
                  maxLength,
                  placeholder: customPlaceholder || listDefinition.label,
                  data: {
                    pkClass: listDefinition.targetClass,
                    fieldDefinition: f,
                    listDefinition,
                    customCtrlLabel,
                    stringPartId,
                    removeHook
                  },
                  mapValue,
                },
                id: U.uuid()
              }
            }
            // Q: is this field not circular ?
            const parentPropety = arrayConfig.data.fieldDefinition.pkProperty;
            if (!parentPropety || parentPropety !== f.pkProperty) {
              // A: no. Add a a child array config.

              // Q: is there only one list definition?
              if (f.listDefinitions.length === 1) {
                // A. yes: add the array list
                const l = f.listDefinitions[0];
                const n = createArrayConfig(l);
                childConfs.push(n);

              } else {
                // A. no: add a control for selecting the target class
                const n: LocalNodeConfig = {
                  control: {
                    placeholder: f.label,
                    required: this.ctrlRequired(f),
                    mapValue: () => { },
                    data: {
                      controlType: 'ctrl-target-class',
                      fieldDefinition: f,
                      nodeConfigs: f.listDefinitions.map(l => createArrayConfig(l, l.targetClassLabel, l.label + ' ' + l.targetClassLabel))
                    },
                  },
                  id: U.uuid()
                };
                childConfs.push(n);
                // -> use the mapValue as a Hook to add a array list after when a class is selected
                // -> and remove the array list, if the class is deselected
                n.control.mapValue = (s: ListDefinition) => {
                  const newChildren = clone(childConfs)
                  const i = newChildren.findIndex(item => item.id === n.id)

                  // if selected
                  if (s) {
                    // insert the array config with the selected list definition
                    newChildren.splice(i + 1, 0, createArrayConfig(s, 'Select ' + s.targetClassLabel))

                    // disable 'ctrl-target-class'

                    // update the form factory
                  }
                  subscriber.next(newChildren)

                  return
                }
              }
            }
          });

          subscriber.next(childConfs)
        })

      }));


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

  private getChildNodesOfGroup(nodeConfig: LocalNodeConfig): Observable<LocalNodeConfig[]> {
    const childConfs: LocalNodeConfig[] = [];

    return combineLatest(this.c.pipeListTypeOfClass(nodeConfig.group.data.pkClass), this.c.pipeLabelOfClass(nodeConfig.group.data.pkClass)).pipe(auditTime(10), map(([listType, label]) => {
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
              pkClass: nodeConfig.group.data.pkClass,
              fieldDefinition: {
                listType,
                ...{} as any
              }
            },
            mapValue
          },
        };
        childConfs.push(n);
      }
      return childConfs;
    }));
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
      const recursiveMarkAsTouched = (f: FormArray) => {
        f.controls.forEach((c: FormArray) => {
          c.markAsTouched()
          if (c.controls) recursiveMarkAsTouched(c)
        })

      }
      const f = this.formFactory.formGroup.controls.childControl as FormArray;
      recursiveMarkAsTouched(f)

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
