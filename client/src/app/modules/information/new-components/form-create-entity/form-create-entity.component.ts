import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { InfRole, InfTextProperty, U } from 'app/core';
import { FormArrayConfig, FormFactory, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { clone, flatten } from 'ramda';
import { combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { auditTime, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { DfhConfig } from '../../shared/dfh-config';
import { CtrlTimeSpanDialogResult } from '../ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { FieldDefinition, ListDefinition, ListType } from '../properties-tree/properties-tree.models';
import { AbstractControl, FormArray } from '@angular/forms';
export interface FormArrayData {
  pkClass: number
  fieldDefinition?: FieldDefinition
  listDefinition?: ListDefinition
  customCtrlLabel?: string
}
interface FormGroupData {
  pkClass: number
  fieldDefinition?: FieldDefinition
}
export interface FormControlData {
  controlType: ControlType
  fieldDefinition?: FieldDefinition
  listDefinition?: ListDefinition
}
export type ControlType = 'ctrl-target-class' | 'ctrl-appellation' | 'ctrl-entity' | 'ctrl-language' | 'ctrl-place' | 'ctrl-place' | 'ctrl-text-property' | 'ctrl-time-primitive' | 'ctrl-type' | 'ctrl-time-span'

type LocalNodeConfig = FormNodeConfig<FormGroupData, FormArrayData, FormControlData>;

@Component({
  selector: 'gv-form-create-entity',
  templateUrl: './form-create-entity.component.html',
  styleUrls: ['./form-create-entity.component.scss']
})
export class FormCreateEntityComponent implements OnInit, OnDestroy {

  @Input() pkClass: number

  destroy$ = new Subject<boolean>();
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory
  submitted = false;
  constructor(
    private formFactoryService: FormFactoryService,
    private c: ConfigurationPipesService
  ) { }

  ngOnInit() {
    if (!this.pkClass) throw new Error('You must provide a pkClass as @Input() on FormCreateEntityComponent');

    this.formFactory$ = this.formFactoryService.create<FormGroupData, FormArrayData, FormControlData>({
      rootFormGroup$: of({
        placeholder: 'Main',
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

  private timeSpanCtrl(arrayConfig: FormArrayConfig<FormArrayData>): Observable<LocalNodeConfig[]> {
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

  private placeCtrl(arrayConfig: FormArrayConfig<FormArrayData>): Observable<LocalNodeConfig[]> {
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


  private languageCtrl(arrayConfig: FormArrayConfig<FormArrayData>): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.listDefinition;
    const controlConfig: LocalNodeConfig = {
      control: {
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: { controlType: 'ctrl-language' },
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
    return of([controlConfig]);
  }

  private appellationCtrl(arrayConfig: FormArrayConfig<FormArrayData>): Observable<LocalNodeConfig[]> {

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
  private textPropertyCtrl(arrayConfig: FormArrayConfig<FormArrayData>): Observable<LocalNodeConfig[]> {
    const listDefinition = arrayConfig.data.listDefinition;
    const controlConfig: LocalNodeConfig = {
      control: {
        placeholder: listDefinition.label,
        required: this.ctrlRequired(arrayConfig.data.fieldDefinition),
        data: { controlType: 'ctrl-text-property' },
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
    return of([controlConfig]);
  }
  private entityCtrl(arrayConfig: FormArrayConfig<FormArrayData>): Observable<LocalNodeConfig[]> {
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

  private getListArrayConfig(arrayConfig: FormArrayConfig<FormArrayData>, listType: ListType): Observable<LocalNodeConfig[]> {
    return this.c.pipeFieldDefinitions(arrayConfig.data.pkClass, 45).pipe(
      auditTime(100), mergeMap(fieldDefinitions => {
        return new Observable<LocalNodeConfig[]>(subscriber => {

          const childConfs: LocalNodeConfig[] = []

          // Add a form array as list
          fieldDefinitions.forEach((f, index) => {



            const createArrayConfig = (listDefinition: ListDefinition, customCtrlLabel?: string): LocalNodeConfig => {
              let mapValue: (x) => MapValueItem
              const childListType = listDefinition.listType;

              if (listType === 'temporal-entity') {
                mapValue = (x) => {
                  if (childListType === 'appellation' || childListType === 'language' || childListType === 'place' || childListType === 'entity-preview') {
                    return { key: 'te_roles', value: x.filter((i) => !!i) }
                  } else if (childListType === 'temporal-entity') {
                    return {
                      key: 'te_roles',
                      value: x.map(item => ({
                        fk_property: listDefinition.pkProperty,
                        temporal_entity: item
                      }))
                    }
                  } else if (childListType === 'time-span') {
                    return { key: 'te_roles', value: flatten(x).filter((i) => !!i) }
                  } else if (childListType === 'text-property') {
                    return { key: 'text_properties', value: x.filter((i) => !!i) }
                  }
                  throw new Error(`No mapValue defined for ${childListType} as child of ${listType}`)
                };
              }
              else if (listType === 'persistent-item') {
                mapValue = (x) => {
                  if (childListType === 'text-property') {
                    return { key: 'text_properties', value: x.filter((i) => !!i) }
                  } else if (childListType === 'temporal-entity') {
                    return {
                      key: 'pi_roles',
                      value: x.map(item => ({
                        fk_property: listDefinition.pkProperty,
                        temporal_entity: item
                      }))
                    }
                  }
                  throw new Error(`No mapValue defined for ${childListType} as child of ${listType}`)
                };
              }
              else {
                mapValue = (x) => {
                  const ac = arrayConfig;
                  return x
                };
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
                  placeholder: listDefinition.label,
                  data: {
                    pkClass: listDefinition.targetClass,
                    fieldDefinition: f,
                    listDefinition,
                    customCtrlLabel
                  },
                  mapValue
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

  private getChildNodesOfGroup(nodeConfig: LocalNodeConfig): Observable<LocalNodeConfig[]> {
    const childConfs: LocalNodeConfig[] = [];

    return combineLatest(this.c.pipeListTypeOfClass(nodeConfig.group.data.pkClass), this.c.pipeLabelOfClass(nodeConfig.group.data.pkClass)).pipe(auditTime(10), map(([listType, label]) => {
      const mapValue = createContainerMapValue(nodeConfig.group.data.pkClass)
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

  submit() {
    this.submitted = true
    if (this.formFactory.formGroup.valid) {

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

}

function getContainerArrayConfig(arrayConfig: FormArrayConfig<FormGroupData>): Observable<LocalNodeConfig[]> {
  const mapValue = createContainerMapValue(arrayConfig.data.pkClass);
  return of([{ array: { ...arrayConfig, isList: false, mapValue } }]);
}
export interface MapValueItem { key: string, value: any }
function createContainerMapValue(pkClass: number) {
  return function mapContainerValue(items: MapValueItem[]) {
    const result = {
      pk_class: pkClass
    }
    items.forEach(item => {
      if (item && item.value) {
        result[item.key] = [...result[item.key] || [], ...item.value]
      }
    })
    return result
  }
}
