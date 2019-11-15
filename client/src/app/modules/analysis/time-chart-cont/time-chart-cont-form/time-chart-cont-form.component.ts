import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormChildFactory } from 'app/modules/form-factory/core/form-child-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormFactoryComponent } from 'app/modules/form-factory/core/form-factory.models';
import { FormGroupFactory } from 'app/modules/form-factory/core/form-group-factory';
import { FormFactory, FormFactoryConfig, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { QueryFilterComponent, QueryFilterInjectData } from 'app/modules/queries/components/query-filter/query-filter.component';
import { values } from 'ramda';
import { Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TimeChartContInput, TimeChartContLine } from '../../../../../../../src/common/interfaces';

export interface TccFormArrayData {
  type: 'lineArray' | 'line' | 'queryFilter'
}

export interface TccFormGroupData {

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
export type TccFormArrayFactory = FormArrayFactory<TccFormControlData, TccFormArrayData>;
export type TccFormControlFactory = FormControlFactory<TccFormControlData>;
export type TccFormChildFactory = FormChildFactory<TccFormChildData>;


/**
 * Config of a lineArray
 * lineArray contains a list of lines
 */
export const lineArrayConfig = (): TccFormNodeConfig => ({
  array: {
    data: {
      type: 'lineArray',
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
export const lineConfig = (): TccFormNodeConfig => ({
  array: {
    data: {
      type: 'line',
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
});
/**
 * Config of lineControls
 * lineControls is a container for the individual fields needed for each line
 * @param rootClasses$ the classes that appear in the query filter root select dropdown
 */
export const lineControlConfigs = (rootClasses$: Observable<number[]>): TccFormNodeConfig[] => ([
  {
    childFactory: {
      component: QueryFilterComponent,
      required: true,
      data: {
        type: 'queryFilter',
        queryFilter: {
          initVal$: of(undefined),
          rootClasses$,
        }
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
      initValue: 'Line xyz',
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
export class TimeChartContFormComponent implements OnInit, OnDestroy, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  rootClasses$: Observable<number[]>
  constructor(private ff: FormFactoryService, private c: ConfigurationPipesService) { }

  ngOnInit() {
    this.rootClasses$ = this.c.pipeSelectedTeEnClassesInProject().pipe(map(x => values(x)))
    const ffConfig: FormFactoryConfig<TccFormGroupData, TccFormArrayData, TccFormControlData, TccFormChildData> = {
      rootFormGroup$: of({
        data: {}
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
      const childConfigs: TccFormNodeConfig[] = [lineArrayConfig()]
      return of(childConfigs)
    } else if (n.array && n.array.data.type === 'lineArray') {
      return new Observable<TccFormNodeConfig[]>(subscriber => {
        subscriber.next([lineConfig()])
      })
    } else if (n.array && n.array.data.type === 'line') {
      return new Observable<TccFormNodeConfig[]>(subscriber => {
        subscriber.next(lineControlConfigs(this.rootClasses$))
      })
    } else if (n.control) {

    } else {
      console.error(`No children found for:`, n)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

