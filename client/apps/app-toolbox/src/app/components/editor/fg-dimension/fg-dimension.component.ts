import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { StateFacade } from '@kleiolab/lib-redux';
import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { CONTAINER_DATA } from '../../../lib/form-factory/core/form-child-factory';
import { FormFactory } from '../../../lib/form-factory/core/form-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from '../../../lib/form-factory/core/form-factory.models';
import { FormFactoryService } from '../../../lib/form-factory/services/form-factory.service';
import { FormFactoryConfig } from '../../../lib/form-factory/types/FormFactoryConfig';
import { FormNodeConfig } from '../../../lib/form-factory/types/FormNodeConfig';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';

type FgDimensionNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgDimensionInjectData extends FormFactoryCompontentInjectData<Observable<InfDimension>> {
  appearance: MatFormFieldAppearance
  pkClassOfDimension: number; // e.g. 52 for E54 Dimension
}
@Component({
  selector: 'gv-fg-dimension',
  templateUrl: './fg-dimension.component.html',
  styleUrls: ['./fg-dimension.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgFor, MatFormFieldModule, MatInputModule, CtrlTypeComponent, AsyncPipe]
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
    private state: StateFacade,
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

    this.pkClassOfMeasurementUnit$ = this.state.data.sys.config.sysConfig$.pipe(
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
              initValue: initVal ? initVal.numeric_value : undefined,
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
              initValue: initVal ? initVal.fk_measurement_unit : undefined,
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
