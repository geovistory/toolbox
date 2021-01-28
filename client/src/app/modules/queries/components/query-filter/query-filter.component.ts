import { Component, forwardRef, Input, OnDestroy, OnInit, Inject, Optional, AfterViewInit } from '@angular/core';
import { FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor, Validators } from '@angular/forms';
import { U } from 'app/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormGroupFactory } from 'app/modules/form-factory/core/form-group-factory';
import { FormArrayConfig, FormFactory, FormFactoryConfig, FormFactoryService, FormGroupConfig, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { values } from 'd3';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ClassAndTypeSelectModel, classOrTypeRequiredValidator } from '../class-and-type-select/class-and-type-select.component';
import { propertiesRequiredValidator, PropertyOption, PropertySelectModel } from '../property-select/property-select.component';
import { CONTAINER_DATA } from 'app/modules/form-factory/core/form-child-factory';
import { FormFactoryCompontentInjectData, FormFactoryComponent } from 'app/modules/form-factory/core/form-factory.models';
import { QueryFilterService } from './query-filter.service';
import { InformationPipesService } from 'app/modules/base/services/information-pipes.service';
import { equals } from 'ramda';
import { QueryFilterData } from 'app/core/sdk-lb4/model/queryFilterData';
import { QueryFilter } from 'app/core/sdk-lb4';

export type ClassFilterCondition = 'IS' | 'IS NOT' | 'ENTITY_LABEL_CONTAINS';
export type SubgroupOperator = 'AND' | 'OR';

export interface ArrSubgroupData {
  operator?: SubgroupOperator,
  subgroup?: QueryFilterData.SubgroupEnum
}

export type ArrClassesData = ClassAndTypeSelectModel;
export interface ArrConditionData {
  operator?: ClassFilterCondition

  outgoingProperties?: number[]
  ingoingProperties?: number[]

  searchTerm?: string;
}

export interface ArrPropertiesData extends PropertySelectModel {
  outgoingProperties?: number[]
  ingoingProperties?: number[]

  searchTerm?: string;
};

export interface FilterDefNode {
  data: ArrSubgroupData | ArrClassesData | ArrPropertiesData | ArrConditionData
  children: FilterDefNode[]
}

// export interface FilterDefinition {
//   data: ArrClassesData
//   children: FilterDefNode[]
// }
export type FilterDefinition = QueryFilter

export interface QfArrayConditionInitVal {
  data: ArrConditionData
  children: QfArraySubgroupInitVal[]
}
export interface QfArrayCondition {
  propertyOptions$: Observable<PropertyOption[]>
  initVal: QfArrayConditionInitVal
}

export interface QfArrayPropertiesInitVal {
  data: ArrPropertiesData
  children: FilterDefNode[]
}
export interface QfArrayProperties {
  propertyOptions$: Observable<PropertyOption[]>
  initVal: QfArrayPropertiesInitVal
}
export interface QfArrayClassesInitVal {
  data: ArrClassesData
  children: QfArraySubgroupInitVal[]
}
export interface QfArrayClasses {
  pkClasses$?: Observable<number[]>
  initVal: QfArrayClassesInitVal
  disabled?: boolean
}
export interface QfArraySubgroupInitVal {
  data: ArrSubgroupData
  children: FilterDefNode[]
}
export interface QfArraySubgroup {
  // the pkClasses available as options for CtrlClasses of this Subgroup
  pkClasses$?: Observable<number[]>
  // the propertiers available as options for CtrlProperties of this Subgroup
  propertyOptions$?: Observable<PropertyOption[]>

  initVal: QfArraySubgroupInitVal
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

export type CtrlSearchTerm = boolean

export interface QfFormArrayData {
  arrayProperties?: QfArrayProperties
  arrayClasses?: QfArrayClasses
  arraySubgroup?: QfArraySubgroup
  arrayCondition?: QfArrayCondition
}

export interface QfFormGroupData {
  initVal: QfArrayClassesInitVal
  pkClasses$: Observable<number[]>
}

export interface QfFormControlData {
  ctrlClasses?: CtrlClasses
  ctrlCondition?: CtrlCondition
  ctrlProperties?: CtrlProperties
  ctrlOperator?: CtrlOperator
  ctrlSearchTerm?: CtrlSearchTerm
}

export type QfFormGroupConfig = FormGroupConfig<QfFormGroupData>
export type QfFormNodeConfig = FormNodeConfig<QfFormGroupData, QfFormArrayData, QfFormControlData, null>;
export type QfFormGroupFactory = FormGroupFactory;
export type QfFormArrayFactory = FormArrayFactory<QfFormControlData, QfFormArrayData, any>;
export type QfFormControlFactory = FormControlFactory<QfFormControlData>;

export interface QueryFilterInjectData {
  rootClasses$?: Observable<number[]>
  initVal$: Observable<FilterDefinition>
  disableRootCtrl?: boolean
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
export class QueryFilterComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor, FormFactoryComponent {

  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory

  @Input() initVal$: Observable<FilterDefinition>
  model$ = new BehaviorSubject<FilterDefinition>(null);
  // If rootClasses$ is provided, the emitted array of pk_class will be used to
  // set the classes in the root form control, users can select from.
  @Input() rootClasses$: Observable<number[]>

  @Input() disableRootCtrl: boolean;

  constructor(
    private ff: FormFactoryService,
    private c: ConfigurationPipesService,
    private i: InformationPipesService,
    private qfs: QueryFilterService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: QueryFilterInjectData & FormFactoryCompontentInjectData<Observable<FilterDefinition>>
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
      if (injectedData.disableRootCtrl) {
        this.disableRootCtrl = injectedData.disableRootCtrl
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
      pkClasses$ = this.c.pipeClassesInEntitiesOrSources().pipe(
        map(x => values(x))
      )
    }
    const config: FormFactoryConfig<QfFormGroupData, QfFormArrayData, QfFormControlData, null> = {
      rootFormGroup$: new BehaviorSubject({
        data: {
          initVal,
          pkClasses$
        }
      }),
      getChildNodeConfigs: (c) => this.getChildNodeConfigs(c)
    }
    this.ff.create(config, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      console.log(v)
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

      /**
      * Create children of root FromGroup
      */

      const childConfigs: QfFormNodeConfig[] = [this.qfs.createArrClasses(
        n.group.data.pkClasses$,
        n.group.data.initVal,
        this.disableRootCtrl
      )]
      return new BehaviorSubject(childConfigs)
    }

    else if (n.array && n.array.data.arrayClasses) {

      /**
       * Create children of ArrClasses
       */

      // create ctrlClasses
      const d = n.array.data.arrayClasses;
      const x = this.qfs.createCtrlClasses(
        d.pkClasses$,
        d.initVal.data,
        new BehaviorSubject(d.disabled)
      )

      // create children according to initVal
      const propertyOptions$ = this.i.getPropertyOptions$(x.value$)
      const children = d.initVal.children.map(child => {
        return this.qfs.createArrSubgroupOfClasses(propertyOptions$, child)
      })

      return new BehaviorSubject([x.ctrlClasses, ...children])


    } else if (n.array && n.array.data.arraySubgroup) {

      /**
       * Create children of ArrSoubgroup
       */

      const d = n.array.data.arraySubgroup;
      const initVal = d.initVal;

      // create the and/or control
      const ctrlOperator = this.qfs.createCtrlOperator(d.initVal.data.operator)

      // create other children
      const children = (initVal.children.length < 1 ?
        [null] : // add one child by default
        initVal.children
      ).map(child => this.qfs.createSubgroupOfArrSoubgroup(n.array.data.arraySubgroup, child));

      return new BehaviorSubject([ctrlOperator, ...children])

    } else if (n.array && n.array.data.arrayCondition) {

      /**
      * Create children of arrayCondition
      */

      const d = n.array.data.arrayCondition;
      const {
        operator,
        ingoingProperties,
        outgoingProperties,
        searchTerm
      } = d.initVal.data;

      // create the codition control  (ENTITY_LABEL_CONTAINS / IS NOT / ...)
      const y = this.qfs.createCtrlCondition(operator)
      return y.value$.pipe(
        distinctUntilChanged(equals),
        filter(x => !!x),
        map((condition: ClassFilterCondition) => {

          // const rest: QfFormNodeConfig[] = [];

          if (condition == 'ENTITY_LABEL_CONTAINS') {

            return [
              y.ctrlCondition,
              this.qfs.createCtrlSearchTerm(searchTerm)
            ]
            // rest.push(this.qfs.createCtrlSearchTerm(searchTerm))

          } else if (
            condition === 'IS' ||
            condition === 'IS NOT'
          ) {

            const z = this.qfs.createCtrlProperties(d.propertyOptions$, {
              ingoingProperties,
              outgoingProperties
            })
            const pkClasses$ = this.i.getPkClassesFromPropertySelectModel$(z.value$);

            return [
              y.ctrlCondition,
              z.ctrlProperties,
              ...d.initVal.children.map(child => {
                return this.qfs.createArrSubgroupOfProperties(pkClasses$, child)
              })
            ]
            // rest.push(z.ctrlProperties)

            // d.initVal.children.forEach(child => {
            //   rest.push(this.qfs.createArrSubgroupOfProperties(pkClasses$, child))
            // })
          }

          // return [y.ctrlCondition];
        })
      )


    }
    //  else if (n.array && n.array.data.arrayProperties) {
    //   const d = n.array.data.arrayProperties;
    //   const initValue = d.initVal ? d.initVal.data : {};
    //   const ctrlProperties = this.qfs.createCtrlProperties(d.propertyOptions$, initValue)

    //   return new BehaviorSubject([ctrlProperties])

    // }
    else {
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

  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }

}
