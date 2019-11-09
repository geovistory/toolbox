import { Component, forwardRef, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { U } from 'app/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormGroupFactory } from 'app/modules/form-factory/core/form-group-factory';
import { FormArrayConfig, FormFactory, FormFactoryConfig, FormFactoryService, FormGroupConfig, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { values } from 'd3';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil, filter, switchMap } from 'rxjs/operators';
import { ClassAndTypeSelectModel, classOrTypeRequiredValidator } from '../class-and-type-select/class-and-type-select.component';
import { propertiesRequiredValidator, PropertyOption, PropertySelectModel } from '../property-select/property-select.component';
import { CONTAINER_DATA } from 'app/modules/form-factory/core/form-child-factory';
import { FormFactoryCompontentInjectData } from 'app/modules/form-factory/core/form-factory.models';

export interface ArrSubgroupData {
  operator: 'AND' | 'OR',
  subgroup: 'property' | 'classAndType'
}

export type ArrClassesData = ClassAndTypeSelectModel;

export interface ArrPropertiesData extends PropertySelectModel {
  operator: 'IS' | 'IS NOT'
};

export interface FilterDefNode {
  data: ArrSubgroupData | ArrClassesData | ArrPropertiesData
  children: FilterDefNode[]
}

export interface FilterDefinition {
  data: ArrClassesData
  children: FilterDefNode[]
}

export interface QfArrayProperties {
  propertyOptions$: Observable<PropertyOption[]>
  initVal: FilterDefNode
}

export interface QfArrayClasses {
  pkClasses$?: Observable<number[]>
  initVal: FilterDefNode
}

export interface QfArraySubgroup {
  // the pkClasses available as options for CtrlClasses of this Subgroup
  pkClasses$?: Observable<number[]>
  // the propertiers available as options for CtrlProperties of this Subgroup
  propertyOptions$?: Observable<PropertyOption[]>

  initVal: FilterDefNode
}

export interface CtrlClasses {
  pkClasses$: Observable<number[]>
}

export interface CtrlProperties {
  options$: Observable<PropertyOption[]>
}

export interface CtrlCondition {
  options: { value: string, label: string }[]
}

export interface CtrlOperator {
  options: { value: string, label: string }[]
}

export interface QfFormArrayData {
  arrayProperties?: QfArrayProperties
  arrayClasses?: QfArrayClasses
  arraySubgroup?: QfArraySubgroup
}

export interface QfFormGroupData {
  initVal: FilterDefinition
  pkClasses$: Observable<number[]>
}

export interface QfFormControlData {
  ctrlClasses?: CtrlClasses
  ctrlCondition?: CtrlCondition
  ctrlProperties?: CtrlProperties
  ctrlOperator?: CtrlOperator
}

export type QfFormGroupConfig = FormGroupConfig<QfFormGroupData>
export type QfFormNodeConfig = FormNodeConfig<QfFormGroupData, QfFormArrayData, QfFormControlData, null>;
export type QfFormGroupFactory = FormGroupFactory;
export type QfFormArrayFactory = FormArrayFactory<QfFormControlData, QfFormArrayData>;
export type QfFormControlFactory = FormControlFactory<QfFormControlData>;

export interface QueryFilterInjectData {
  rootClasses$?: Observable<number[]>
}

export interface FormFactoryComponent {
  initVal$?: Observable<FilterDefinition>
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory;
}

@Component({
  selector: 'gv-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QueryFilterComponent),
      multi: true
    }
  ]
})
export class QueryFilterComponent implements OnInit, OnDestroy, ControlValueAccessor, FormFactoryComponent {

  destroy$ = new Subject<boolean>();
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory

  @Input() initVal$: Observable<FilterDefinition>
  model$ = new BehaviorSubject<FilterDefinition>(null);
  // If rootClasses$ is provided, the emitted array of pk_class will be used to
  // set the classes in the root form control, users can select from.
  @Input() rootClasses$: Observable<number[]>

  constructor(
    private ff: FormFactoryService,
    private c: ConfigurationPipesService,
    @Inject(CONTAINER_DATA) public injectedData: QueryFilterInjectData & FormFactoryCompontentInjectData<Observable<FilterDefinition>>
  ) {
    /**
     * this is used if the query filter gets injected by as child form factory
     */
    if (injectedData) {
      if (injectedData.initVal$) {
        this.initVal$ = injectedData.initVal$
      }
      if (injectedData.rootClasses$) {
        this.rootClasses$ = injectedData.rootClasses$
      }
    }
  }



  ngOnInit() {
    if (this.initVal$) {
      this.initVal$.pipe(takeUntil(this.destroy$)).subscribe(f => {
        this.model$.next(f)
      })
    }

    this.model$.pipe(takeUntil(this.destroy$)).subscribe(initVal => {
      this.initForm(initVal)
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initForm(initVal: any) {
    this.formFactory = undefined;
    // get all classes
    let pkClasses$: Observable<number[]>;

    if (this.rootClasses$) {
      // if the root classes are defined by input, use those
      pkClasses$ = this.rootClasses$;
    } else {
      // else use the selected classes in this project
      pkClasses$ = this.c.pipeSelectedClassesInProject().pipe(
        map(x => values(x))
      )
    }
    const config: FormFactoryConfig<QfFormGroupData, QfFormArrayData, QfFormControlData, null> = {
      rootFormGroup$: of({
        data: {
          initVal,
          pkClasses$
        }
      }),
      getChildNodeConfigs: this.getChildNodeConfigs
    }
    this.ff.create(config, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
    })
    this.formFactory$.pipe(
      filter(o => o !== null),
      switchMap(f => f.formGroupFactory.valueChanges$),
      takeUntil(this.destroy$)
    ).subscribe((x: FilterDefinition) => {
      this.onChange(x)
    });
  }


  getChildNodeConfigs(n: QfFormNodeConfig): Observable<QfFormNodeConfig[]> {
    if (n.group) {

      const childConfigs: QfFormNodeConfig[] = [{
        array: createArrayClassesNodeConfig(n.group.data.pkClasses$, n.group.data.initVal)
      }]
      return of(childConfigs)
    } else if (n.array && n.array.data.arrayClasses) {

      const childConfigs: QfFormNodeConfig[] = [{
        control: {
          required: true,
          validators: [classOrTypeRequiredValidator()],
          placeholder: 'Select Classes and Types',
          data: {
            ctrlClasses: {
              pkClasses$: n.array.data.arrayClasses.pkClasses$
            }
          },
          mapValue: (val) => val,
          initValue: n.array.data.arrayClasses.initVal.data
        },
      }]

      return of(childConfigs)
    } else if (n.array && n.array.data.arraySubgroup) {
      const initVal = n.array.data.arraySubgroup.initVal;

      const ctrlOperator: QfFormNodeConfig = {
        control: {
          data: {
            ctrlOperator: {
              options: [
                { value: 'OR', label: 'or' },
                { value: 'AND', label: 'and' }
              ]
            }
          },
          mapValue: (val) => {
            return val
          },
          placeholder: 'Operator',
          required: true,
          initValue: (initVal.data as ArrSubgroupData).operator || 'AND'
        }
      }


      const children = (initVal.children.length < 1 ?
        [null] : // add one child by default
        initVal.children
      ).map(child => createSubgroupNodeConfig(n.array.data.arraySubgroup, child));
      return of([ctrlOperator, ...children])

    } else if (n.array && n.array.data.arrayProperties) {
      const arrayProperties = n.array.data.arrayProperties;
      const initData = (arrayProperties.initVal ? arrayProperties.initVal.data : {}) as ArrPropertiesData;
      return new Observable<QfFormNodeConfig[]>(subscriber => {
        const { operator, ...rest } = initData;

        const childConfigs: QfFormNodeConfig[] = []
        const ctrlProperties: QfFormNodeConfig = {
          id: 'properties',
          control: {
            required: true,
            validators: [propertiesRequiredValidator()],
            placeholder: 'Properties',
            data: {
              ctrlProperties: {
                options$: arrayProperties.propertyOptions$
              }
            },
            mapValue: (x) => x,
            initValue: rest
          }
        }
        const mapOperatorVal = (val) => {
          if (childConfigs.length === 1) {
            childConfigs.push(ctrlProperties);
            subscriber.next(childConfigs)
          }
          return val
        }
        const ctrlCondition: QfFormNodeConfig = {
          id: 'condition',
          control: {
            required: true,
            placeholder: 'Condition',
            data: {
              ctrlCondition: {
                options: [
                  { value: 'IS', label: 'has / is' },
                  { value: 'IS NOT', label: 'has not / is not' },
                ]
              }
            },
            mapValue: mapOperatorVal,
            initValue: operator || 'IS'
          },
        }

        childConfigs.push(ctrlCondition)

        if (initData) {
          childConfigs.push(ctrlProperties)
        }

        subscriber.next(childConfigs)
      })
    } else {
      console.error(`No children found for:`, n)
    }
  }

  markAllAsTouched() {
    const f = this.formFactory.formGroup.controls.childControl as FormArray;
    U.recursiveMarkAsTouched(f)
  }

  onChange(value: FilterDefinition) { }

  onTouch() { }

  /***
   * Control Value Accessor
   */
  writeValue(obj: FilterDefinition): void {
    this.model$.next(obj)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
export function createSubgroupNodeConfig(arraySubgroup: QfArraySubgroup, initValue?: FilterDefNode) {
  const initVal = initValue || { data: {}, children: [] }
  let n: QfFormNodeConfig;
  if (arraySubgroup.propertyOptions$) {
    n = {
      array: {
        placeholder: '',
        data: {
          arrayProperties: {
            propertyOptions$: arraySubgroup.propertyOptions$,
            initVal
          }
        },
        mapValue: (x) => {
          const [condition, data, ...children] = x;
          return {
            data: {
              operator: condition,
              ...data
            },
            children
          }
        }
      }
    };
  }
  else if (arraySubgroup.pkClasses$) {
    n = {
      array: createArrayClassesNodeConfig(arraySubgroup.pkClasses$, initVal)
    };
  }
  else {
    throw new Error('arraySubgroup not properly defined.');
  }
  return n;
}

function createArrayClassesNodeConfig(pkClasses$: Observable<number[]>, initVal: FilterDefNode): FormArrayConfig<QfFormArrayData> {
  return {
    placeholder: '',
    data: {
      arrayClasses: {
        pkClasses$: pkClasses$,
        initVal: initVal || { data: {}, children: [] }
      }
    },
    mapValue: (x) => {
      try {
        const [data, ...children] = x;
        return {
          data,
          children
        };
      } catch (error) {
        console.error(error)
      }
    }
  }


}
