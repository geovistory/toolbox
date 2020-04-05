import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormChildFactory } from 'app/modules/form-factory/core/form-child-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormFactoryComponent } from 'app/modules/form-factory/core/form-factory.models';
import { FormGroupFactory } from 'app/modules/form-factory/core/form-group-factory';
import { FormFactory, FormFactoryConfig, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { ClassAndTypeSelectModel } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { QueryFilterInjectData, CtrlClasses } from 'app/modules/queries/components/query-filter/query-filter.component';
import { QueryPathInjectData } from 'app/modules/queries/forms/query-path/query-path-form/query-path-form.component';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { QueryDefinition, TableInput } from '../../../../../../../src/common/interfaces';
import { getLabelForDefaulType } from '../table-form-array/table-form-array.component';
import { TableFormArrayData, TableFormService } from './table-form.service';
import { InformationPipesService } from 'app/modules/base/new-services/information-pipes.service';


export interface TableFormGroupData {
  initVal$: Observable<QueryDefinition>;
}

export interface TableFormControlData {
  columnLabel?: boolean,
  ctrlClasses?: CtrlClasses
}

export interface TableFormChildData {
  filter?: QueryFilterInjectData
  path?: QueryPathInjectData
}

export type TableFormNodeConfig = FormNodeConfig<TableFormGroupData, TableFormArrayData, TableFormControlData, TableFormChildData>;
export type TableFormGroupFactory = FormGroupFactory;
export type TableFormArrayFactory = FormArrayFactory<TableFormControlData, TableFormArrayData>;
export type TableFormControlFactory = FormControlFactory<TableFormControlData>;
export type TableFormChildFactory = FormChildFactory<TableFormChildData>;


@Component({
  selector: 'gv-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
  providers: [TableFormService]
})
export class TableFormComponent implements OnInit, OnDestroy, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  @Input() initVal$: Observable<QueryDefinition>;

  constructor(
    private ff: FormFactoryService,
    private t: TableFormService,
    private i: InformationPipesService) { }

  ngOnInit() {

    if (!this.initVal$) {
      const initVal: QueryDefinition = {
        filter: undefined,
        columns: [{
          defaultType: 'entity_preview',
          label: getLabelForDefaulType('entity_preview'),
          ofRootTable: true,
          id: 'col_0'
        }]
      }
      this.initVal$ = new BehaviorSubject(initVal)
    }
    const ffConfig: FormFactoryConfig<TableFormGroupData, TableFormArrayData, TableFormControlData, TableFormChildData> = {
      rootFormGroup$: of({
        data: {
          initVal$: this.initVal$
        }
      }),
      getChildNodeConfigs: (n: TableFormNodeConfig) => this.getChildNodeConfigs(n)
    }
    this.formFactory$.pipe(
      switchMap(ff => ff.formGroupFactory.valueChanges$),
      filter((value: TableInput) => (!!value && !!value.queryDefinition && !!value.queryDefinition.filter && !!value.queryDefinition.filter.data && !!value.queryDefinition.filter.data.classes)),
      map((value: TableInput) => value.queryDefinition.filter.data),
      switchMap((classesAndTypes: ClassAndTypeSelectModel) => this.i.pipeClassesFromClassesAndTypes(classesAndTypes)),
      distinctUntilChanged<number[]>(equals),
      takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.t.selectedRootClasses$.next(v)
    })

    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      console.log(v)
      this.formFactory$.next(v)
      this.formFactory = v;
    })

  }


  getChildNodeConfigs(n: TableFormNodeConfig): Observable<TableFormNodeConfig[]> {
    if (n.group) {
      const childConfigs: TableFormNodeConfig[] = this.t.rootNodeConfig()
      return of(childConfigs)
    } else if (n.array && n.array.data.root) {

      return this.initVal$.pipe(map(initVal => {
        /**
         * if the root classes are selected
         */
        if (initVal.filter) {
          const x = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal.filter), initVal.filter)
          this.t.initPathSegments$ = this.t.selectedRootClasses$.pipe(map(classes => ([
            { type: 'classes', data: { classes } }
          ])))
          return x.config
        }

        /**
         * else, the root classes are not yet selected
         */
        else {
          return [this.t.ctrlRootClassesConfig(this.t.rootClasses$, undefined, new BehaviorSubject(false))]
        }
      }))


    }
    else if (n.array && n.array.data.columns) {
      return this.initVal$.pipe(map(initVal => {
        const colConfigs = initVal.columns.map(colDef => {
          return this.t.columnConfig(colDef)
        })
        return colConfigs
      }))
    }
    else if (n.array && n.array.data.colDef) {
      return new Observable<TableFormNodeConfig[]>(subscriber => {
        subscriber.next(this.t.columnFieldsConfig(n.array.data.colDef))
      })
    }
    else if (n.control) {

    } else {
      console.error(`No children found for:`, n)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  checkValidity() {
    this.formFactory.markAllAsTouched()
  }
}

