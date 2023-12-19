import { Injectable } from '@angular/core';
import { ClassAndTypeSelectModel, ConfigurationPipesService } from '@kleiolab/lib-redux';
import { AnalysisDefinition, ColDef, QueryFilter, QueryPathSegment } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableFormNodeConfig } from '../components/analysis/forms/table-form/table-form.component';
import { classOrTypeRequiredValidator } from '../modules/queries/components/class-and-type-select/class-and-type-select.component';
import { FilterDefinition, QueryFilterComponent } from '../modules/queries/components/query-filter/query-filter.component';
import { QueryPathFormComponent } from '../modules/queries/forms/query-path/query-path-form/query-path-form.component';
import { ValidationService } from './validation.service';


interface PathColumn {
  rootClasses$: Observable<number[]>,
  initVal$: Observable<QueryPathSegment[]>
}
interface RootColumn {
  defaultType: ColDef.DefaultTypeEnum
}
export interface TableFormArrayData {
  root?: boolean;
  columns?: boolean;
  colDef?: Partial<ColDef>;
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
    this.rootClasses$ = this.c.pipeClassesOfProject().pipe(
      map(items => items
        // .filter(item => values(item.belongsToCategory)?.[0]?.showInAddMenu)
        .filter(item => !item.classConfig.valueObjectType)
        .map(item => item.dfhClass.pk_class)
      ))
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
      validators: [ValidationService.arrayLengthValidator(2, Number.POSITIVE_INFINITY)],
      mapValue: ([rootClasses, columns, filter]: [ClassAndTypeSelectModel, ColDef[], QueryFilter]): AnalysisDefinition => {
        return ({
          queryDefinition: {
            columns,
            filter,
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
  queryDefinitionConfig = (rootClasses$: Observable<number[]>, initVal$: Observable<FilterDefinition>, initVal: FilterDefinition): {
    config: TableFormNodeConfig[],
    classAndTypeSelection$: Observable<ClassAndTypeSelectModel>
  } => {
    const classAndTypeSelection$ = new Subject<ClassAndTypeSelectModel>()
    return {
      classAndTypeSelection$,
      config: [
        this.ctrlRootClassesConfig(rootClasses$, initVal.data, new BehaviorSubject(true)),
        {
          array: {
            data: {
              columns: true
            },
            placeholder: '',
            validators: [ValidationService.arrayLengthValidator(1, Number.POSITIVE_INFINITY)],
            required: true,
            mapValue: (x: Partial<ColDef>[]): ColDef[] => x.map((c, i) => {
              const colDef: ColDef = {
                ...c,
                id: 'col_' + i
              }
              return colDef;
            })
          }
        },
        {
          childFactory: {
            component: QueryFilterComponent,
            required: true,
            data: {
              filter: {
                rootClasses$,
                initVal$,
                disableRootCtrl: true
              }
            },
            getInjectData: (data) => data.filter,
            mapValue: (x: FilterDefinition) => {
              classAndTypeSelection$.next(x.data)
              return x
            }
          }
        },

      ]
    }
  }

  /**
 * Config of control for selecting the root classes
 */
  ctrlRootClassesConfig = (rootClasses$: Observable<number[]>, selectedRootClasses: ClassAndTypeSelectModel, disabled$: BehaviorSubject<boolean>): TableFormNodeConfig => {
    return {
      control: {
        data: {
          ctrlClasses: {
            pkClasses$: rootClasses$,
          },
        },
        disabled$,
        validators: [classOrTypeRequiredValidator()],
        initValue: selectedRootClasses,
        placeholder: 'Select Classes / Types',
        required: true,
        mapValue: (x: string): string => x
      }
    }
  }


  /**
   * Config of columns
   * columns is array of column
   */
  columnConfig = (colDef: Partial<ColDef>): TableFormNodeConfig => (
    {
      array: {
        data: {
          colDef
        },
        placeholder: '',
        required: true,
        mapValue: ([label, queryPath]: [string, QueryPathSegment[]]): Partial<ColDef> => ({
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
  columnFieldsConfig = (colDef: Partial<ColDef>): TableFormNodeConfig[] => {
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
        this.queryPathChildConfig(colDef),
      ]
    }
  }

  queryPathChildConfig(colDef: Partial<ColDef>): TableFormNodeConfig {
    return {
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
    };
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
