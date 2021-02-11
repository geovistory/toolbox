import { Component, OnDestroy, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormArrayFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-array-factory';
import { FormChildFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormControlFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-control-factory';
import { FormFactoryComponent } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory.models';
import { FormGroupFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-group-factory';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormFactoryConfig";
import { FormNodeConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig";
import { FormFactory } from "projects/app-toolbox/src/app/modules/form-factory/core/form-factory";
import { ConfigurationPipesService } from 'projects/app-toolbox/src/app/core/redux-queries/services/configuration-pipes.service';
import { QueryFilterComponent, QueryFilterInjectData } from 'projects/app-toolbox/src/app/modules/queries/components/query-filter/query-filter.component';
import { values } from 'ramda';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TimeChartContLine } from "@kleiolab/lib-sdk-lb4";
export interface TimeChartContInput {
  lines: TimeChartContLine[]
}
interface LineControlInitVal {
  queryFilter: QueryFilterInjectData,
  lineLabel: string
}

export interface TccFormArrayData {
  type: 'lineArray' | 'line' | 'queryFilter'
  lineArray?: {
    initVal: TimeChartContLine[]
  }
  line?: {
    initVal: TimeChartContLine
  }
  queryFilter?: {
    initVal: LineControlInitVal
  }
}

export interface TccFormGroupData {
  initVal$: Observable<TimeChartContInput>;
}

export interface TccFormControlData {
  type: 'lineLabel'
}
export interface TccFormChildData {
  type: 'queryFilter'
  queryFilter: QueryFilterInjectData
}

export type TccFormNodeConfig = FormNodeConfig<TccFormGroupData, TccFormArrayData, TccFormControlData, TccFormChildData>;
export type TccFormGroupFactory = FormGroupFactory;
export type TccFormArrayFactory = FormArrayFactory<TccFormControlData, TccFormArrayData, TccFormChildData>;
export type TccFormControlFactory = FormControlFactory<TccFormControlData>;
export type TccFormChildFactory = FormChildFactory<TccFormChildData>;


/**
 * Config of a lineArray
 * lineArray contains a list of lines
 */
export const lineArrayConfig = (initVal: TimeChartContLine[]): TccFormNodeConfig => ({
  array: {
    data: {
      type: 'lineArray',
      lineArray: { initVal }
    },
    placeholder: '',
    mapValue: (x: TimeChartContLine[]): TimeChartContInput => ({
      lines: x
    })
  }
});

/**
 * Config of a line
 * line is a container for the lineControls
 */
export const lineConfig = (initVal: TimeChartContLine = {
  visualizationDefinition: {
    label: 'My new line'
  },
  queryDefinition: { filter: undefined, columns: undefined }
}): TccFormNodeConfig => {
  return {
    array: {
      data: {
        type: 'line',
        line: { initVal }
      },
      placeholder: '',
      mapValue: (x): TimeChartContLine => {
        const [filter, label] = x;
        return {
          queryDefinition: {
            filter,
            columns: [{
              id: 'col_0',
              ofRootTable: true,
              preventGroupBy: true,
              defaultType: 'temporal_distribution'
            }]
          },
          visualizationDefinition: {
            label
          }
        }
      }
    }
  }
};
/**
 * Config of lineControls
 * lineControls is a container for the individual fields needed for each line
 * @param rootClasses$ the classes that appear in the query filter root select dropdown
 */
export const lineControlConfigs = (initVal: LineControlInitVal): TccFormNodeConfig[] => ([
  {
    childFactory: {
      component: QueryFilterComponent,
      required: true,
      data: {
        type: 'queryFilter',
        queryFilter: initVal.queryFilter
      },
      getInjectData: (d) => (d.queryFilter),
      mapValue: (x) => x
    }
  },
  {
    control: {
      data: {
        type: 'lineLabel',
      },
      required: true,
      initValue: initVal.lineLabel,
      placeholder: 'Name of the line',
      mapValue: (x) => x
    }
  },
])

@Component({
  selector: 'gv-time-chart-cont-form',
  templateUrl: './time-chart-cont-form.component.html',
  styleUrls: ['./time-chart-cont-form.component.scss']
})
export class TimeChartContFormComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  rootClasses$: Observable<number[]>
  @Input() initVal$: Observable<TimeChartContInput>

  constructor(private ff: FormFactoryService, private c: ConfigurationPipesService) { }

  ngOnInit() {
    if (!this.initVal$) {
      const initVal: TimeChartContInput = {
        lines: [
          {
            visualizationDefinition: {
              label: 'My first line'
            },
            queryDefinition: { filter: undefined, columns: undefined }
          }
        ]
      }
      this.initVal$ = new BehaviorSubject(initVal)
    }
    this.rootClasses$ = this.c.pipeSelectedTeEnClassesInProject().pipe(map(x => values(x)))
    const ffConfig: FormFactoryConfig<TccFormGroupData, TccFormArrayData, TccFormControlData, TccFormChildData> = {
      rootFormGroup$: of({
        data: {
          initVal$: this.initVal$
        }
      }),
      getChildNodeConfigs: (n: TccFormNodeConfig) => this.getChildNodeConfigs(n)
    }
    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
    })
  }


  getChildNodeConfigs(n: TccFormNodeConfig): Observable<TccFormNodeConfig[]> {
    if (n.group) {
      return n.group.data.initVal$.pipe(
        map((initVal) => [lineArrayConfig(initVal.lines)])
      )
    } else if (n.array && n.array.data.lineArray) {

      return new BehaviorSubject(n.array.data.lineArray.initVal.map(line => lineConfig(line)))

    } else if (n.array && n.array.data.line) {
      const initVal = n.array.data.line.initVal
      const c: LineControlInitVal = {
        queryFilter: {
          rootClasses$: this.rootClasses$,
          initVal$: of(initVal.queryDefinition.filter)
        },
        lineLabel: initVal.visualizationDefinition.label
      }
      return new BehaviorSubject(lineControlConfigs(c))
    } else if (n.control) {

    } else {
      console.error(`No children found for:`, n)
    }
  }
  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

