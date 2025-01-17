import { NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassAndTypeSelectModel, InformationPipesService } from '@kleiolab/lib-redux';
import { AnalysisDefinition, QueryDefinition } from '@kleiolab/lib-sdk-lb4';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { FormArrayFactory } from '../../../../lib/form-factory/core/form-array-factory';
import { FormChildFactory } from '../../../../lib/form-factory/core/form-child-factory';
import { FormControlFactory } from '../../../../lib/form-factory/core/form-control-factory';
import { FormFactory } from '../../../../lib/form-factory/core/form-factory';
import { FormFactoryComponent } from '../../../../lib/form-factory/core/form-factory.models';
import { FormGroupFactory } from '../../../../lib/form-factory/core/form-group-factory';
import { FormFactoryService } from '../../../../lib/form-factory/services/form-factory.service';
import { FormFactoryConfig } from '../../../../lib/form-factory/types/FormFactoryConfig';
import { FormNodeConfig } from '../../../../lib/form-factory/types/FormNodeConfig';
import { TableFormArrayData, TableFormService } from '../../../../services/table-form.service';
import { CtrlClasses, QueryFilterInjectData } from '../query-filter/query-filter.component';
import { QueryPathInjectData } from '../query-path/query-path-form/query-path-form.component';
import { getLabelForDefaulType } from '../table-form-array/table-form-array.component';
import { TableFormGroupComponent } from '../table-form-group/table-form-group.component';


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
export type TableFormArrayFactory = FormArrayFactory<TableFormControlData, TableFormArrayData, TableFormChildData>;
export type TableFormControlFactory = FormControlFactory<TableFormControlData>;
export type TableFormChildFactory = FormChildFactory<TableFormChildData>;


@Component({
  selector: 'gv-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
  providers: [TableFormService],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, TableFormGroupComponent]
})
export class TableFormComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);
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
      filter((value: AnalysisDefinition) => (!!value && !!value.queryDefinition && !!value.queryDefinition.filter && !!value.queryDefinition.filter.data && !!value.queryDefinition.filter.data.classes)),
      map((value: AnalysisDefinition) => value.queryDefinition.filter.data),
      switchMap((classesAndTypes: ClassAndTypeSelectModel) => this.i.pipeClassesFromClassesAndTypes(classesAndTypes)),
      distinctUntilChanged<number[]>(equals),
      takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.t.selectedRootClasses$.next(v)
    })

    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
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

  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  checkValidity() {
    this.formFactory.markAllAsTouched()
  }
}

