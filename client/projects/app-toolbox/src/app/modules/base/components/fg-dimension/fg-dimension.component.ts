import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { MatFormFieldAppearance, MatInput } from '@angular/material';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { InfPersistentItem } from '@kleiolab/lib-sdk-lb3';
import { InfDimension } from '@kleiolab/lib-sdk-lb3';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory.models';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormFactoryConfig";
import { FormNodeConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig";
import { FormFactory } from "projects/app-toolbox/src/app/modules/form-factory/core/form-factory";
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil, filter } from 'rxjs/operators';
import { CtrlAppellationModel } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';
import { DfhConfig } from "@kleiolab/lib-config";

type FgDimensionNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgDimensionInjectData extends FormFactoryCompontentInjectData<Observable<InfDimension>> {
  appearance: MatFormFieldAppearance
  pkClassOfDimension: number; // e.g. 52 for E54 Dimension
}
@Component({
  selector: 'gv-fg-dimension',
  templateUrl: './fg-dimension.component.html',
  styleUrls: ['./fg-dimension.component.scss']
})
export class FgDimensionComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  @Input() initVal$: Observable<InfDimension>
  @Input() appearance: MatFormFieldAppearance
  @Input() pkClassOfDimension: number;

  pkClassOfMeasurementUnit$: Observable<number>;

  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  @ViewChildren(MatInput) ctrlNumber: QueryList<MatInput>
  @ViewChildren(CtrlTypeComponent) ctrlMeasurementUnit: QueryList<CtrlTypeComponent>


  constructor(
    private p: ActiveProjectService,
    private ff: FormFactoryService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: FgDimensionInjectData
  ) {
    /**
     * this gets injected by as child form factory
     */
    if (injectedData) {
      if (injectedData.initVal$) {
        this.initVal$ = injectedData.initVal$
      }
      this.appearance = injectedData.appearance
      this.pkClassOfDimension = injectedData.pkClassOfDimension
    }

    // if (!this.pkClassOfDimension) throw new Error('this.pkClassOfDimension is missing')

    this.pkClassOfMeasurementUnit$ = this.p.sys$.config$.main$.pipe(
      filter(c => !!c),
      map(config => {
        const classConfig = config.classes[this.pkClassOfDimension]
        if (classConfig.valueObjectType && classConfig.valueObjectType.dimension) {
          return classConfig.valueObjectType.dimension.measurementUnitClass
        }
      })
    )
  }

  ngOnInit() {
    if (!this.initVal$) {
      this.initVal$ = new BehaviorSubject<InfDimension>({
        pk_entity: undefined,
        fk_measurement_unit: undefined,
        numeric_value: undefined,
        fk_class: undefined
      })
    }

    if (!this.appearance) this.appearance = 'fill'

    const ffConfig: FormFactoryConfig<any, any, any, any> = {
      rootFormGroup$: of({
        data: {}
      }),
      getChildNodeConfigs: (n: FgDimensionNodeConfig) => this.getChildNodeConfigs(n)
    }
    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      // console.log(v)
    })
  }
  getChildNodeConfigs(n: FgDimensionNodeConfig): Observable<FgDimensionNodeConfig[]> {
    if (n.group) {
      return this.initVal$.pipe(
        map(initVal => {
          const childConfigs: FgDimensionNodeConfig[] = [{
            array: {
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (x: [number, number]) => {
                const value: InfDimension = {
                  fk_class: this.pkClassOfDimension,
                  fk_measurement_unit: x[1],
                  numeric_value: x[0],
                  pk_entity: undefined,
                }
                return value
              }
            }
          }]
          return childConfigs
        }))
    } else if (n.array && n.array.data.type === 'root') {

      return this.initVal$.pipe(
        map((initVal) => {

          const numberCtrl: FgDimensionNodeConfig = {
            control: {
              initValue: initVal.numeric_value,
              required: true,
              data: {
                type: 'number'
              },
              mapValue: x => x,
              placeholder: 'Value'
            }
          }

          const measurementUnitCtrl: FgDimensionNodeConfig = {
            control: {
              initValue: initVal.fk_measurement_unit,
              required: true,
              data: {
                type: 'measurementUnit'
              },
              mapValue: x => x,
              placeholder: 'Unit'
            }
          }

          return [numberCtrl, measurementUnitCtrl]

        })
      )
    }
  }

  focusOnCtrlNumber() {
    if (this.ctrlNumber.length > 0) {
      this.ctrlNumber.first.onContainerClick()
    }
    this.ctrlNumber.changes.pipe(first((x: QueryList<MatInput>) => x.length > 0)).subscribe((items) => {
      items.first.onContainerClick()
    })
  }
  focusOnCtrlMeasurementUnit() {
    if (this.ctrlMeasurementUnit.length > 0) {
      this.ctrlMeasurementUnit.first.onContainerClick()
    }
    this.ctrlMeasurementUnit.changes.pipe(first((x: QueryList<CtrlTypeComponent>) => x.length > 0)).subscribe((items) => {
      items.first.onContainerClick()
    })
  }

  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
