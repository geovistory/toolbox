import { Injectable } from '@angular/core';
import { Observable, Subject, of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { values } from 'd3';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { QueryPathSegment } from '../../../../../../../src/query/query-path-segment';
import { TableFormNodeConfig } from './table-form.component';
import { QueryPathFormComponent } from 'app/modules/queries/forms/query-path/query-path-form/query-path-form.component';
import { FilterDefinition, QueryFilterComponent, QueryFilterInjectData } from 'app/modules/queries/components/query-filter/query-filter.component';
import { ClassAndTypeSelectModel } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { QueryFilter } from '../../../../../../../src/query/query-filter';
import { ColDef, ColDefDefaultType } from '../../../../../../../src/query/col-def';
import { TableInput } from '../../../../../../../src/analysis/table/input/table-input.interface';
import { Validators } from '@angular/forms';
import { ValidationService } from 'app/core/validation/validation.service';
interface PathColumn {
  rootClasses$: Observable<number[]>,
  initVal$: Observable<QueryPathSegment[]>
}
interface RootColumn {
  defaultType: ColDefDefaultType
}
export interface TableFormArrayData {
  root?: boolean;
  columns?: boolean;
  colDef?: ColDef;
}

@Injectable({
  providedIn: 'root'
})
export class TableFormService {
  rootClasses$: Observable<number[]>
  selectedRootClasses$ = new BehaviorSubject<number[]>([]);
  initPathSegments$: Observable<QueryPathSegment[]>
  constructor(private c: ConfigurationPipesService,
  ) {
    this.rootClasses$ = this.c.pipeSelectedClassesInProject().pipe(map(x => values(x)))
  }


  /**
   * Config of a rootNode
   * maps the values of the secondLevel node
   */
  rootNodeConfig = (): TableFormNodeConfig[] => ([{
    array: {
      data: {
        root: true
      },
      placeholder: '',
      mapValue: ([filter, columns]: [QueryFilter, ColDef[]]): TableInput => {
        return ({
          queryDefinition: {
            filter,
            columns
          }
        });
      }
    }
  }]);



  /**
   * Config of queryDefinition
   * queryDefinition is a container for the individual fields needed for a table analisys definition
   * - filter
   * - columns
   * @param rootClasses$ the classes that appear in the query filter root select dropdown
   */
  queryDefinitionConfig = (rootClasses$: Observable<number[]>, initVal$: Observable<FilterDefinition>): {
    config: TableFormNodeConfig[],
    classAndTypeSelection$: Observable<ClassAndTypeSelectModel>
  } => {
    const classAndTypeSelection$ = new Subject<ClassAndTypeSelectModel>()
    return {
      classAndTypeSelection$,
      config: [
        {
          childFactory: {
            component: QueryFilterComponent,
            required: true,
            data: {
              filter: {
                rootClasses$,
                initVal$
              }
            },
            getInjectData: (data) => data.filter,
            mapValue: (x: FilterDefinition) => {
              classAndTypeSelection$.next(x.data)
              return x
            }
          }
        },
        {
          array: {
            data: {
              columns: true
            },
            placeholder: '',
            validators: [ValidationService.arrayLengthValidator(1, Number.POSITIVE_INFINITY)],
            required: true,
            mapValue: (x: ColDef[]): ColDef[] => x.map((c, i) => {
              c.id = 'col_' + i;
              return c;
            })
          }
        },
      ]
    }
  }

  /**
   * Config of columns
   * columns is array of column
   */
  columnConfig = (colDef: ColDef): TableFormNodeConfig => (
    {
      array: {
        data: {
          colDef
        },
        placeholder: '',
        required: true,
        mapValue: ([label, queryPath]: [string, QueryPathSegment[]]): ColDef => ({
          ...colDef,
          label,
          queryPath
        })
      }
    }
  )


  /**
   * Config of a column with a custom path
   * column is a container with those fields
   * - columnLabel
   * - queryPath
   */
  columnFieldsConfig = (colDef: ColDef): TableFormNodeConfig[] => {
    if (colDef.defaultType) {
      return [{
        control: {
          data: {
            columnLabel: true,
          },
          initValue: colDef.label,
          placeholder: 'Name',
          required: true,
          mapValue: (x: string): string => x
        }
      }]
    }
    else {
      return [
        {
          control: {
            data: {
              columnLabel: true,
            },
            placeholder: 'Name',
            initValue: colDef.label,
            required: true,
            mapValue: (x: string): string => x
          }
        },
        {
          childFactory: {
            component: QueryPathFormComponent,
            data: {
              path: {
                rootClasses$: this.rootClasses$,
                initVal$: this.prependFirstQueryPathSegment(colDef.queryPath)
              }
            },
            required: true,
            getInjectData: (data) => data.path,
            mapValue: (x: QueryPathSegment[]): QueryPathSegment[] => this.dropFirstQueryPathSegment(x)
          }
        },
      ]
    }
  }

  /**
   * Prepends a root segment consisting of the selected root classes
   * @param segments
   */
  prependFirstQueryPathSegment(segments: QueryPathSegment[]): Observable<QueryPathSegment[]> {
    return this.selectedRootClasses$.pipe(map(classes => {
      if (!segments || !segments.length || segments[0].type === 'properties') {
        return [
          {
            type: 'classes',
            data: { classes, types: [] }
          },
          ...(segments || [])
        ];
      } else {
        segments[0].data.classes = classes
        return segments
      }
    }))
  }

  /**
   * drops the root segment, consisting of the selected root classes
   * @param segments
   */
  dropFirstQueryPathSegment(segments: QueryPathSegment[]): QueryPathSegment[] {
    const [first, ...rest] = segments
    return rest;
  }

}
