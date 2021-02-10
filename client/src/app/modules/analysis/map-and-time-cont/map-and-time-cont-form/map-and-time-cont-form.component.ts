import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormFactoryComponent } from 'app/modules/form-factory/core/form-factory.models';
import { FormFactoryService } from 'app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from "app/modules/form-factory/services/FormFactoryConfig";
import { FormFactory } from "app/modules/form-factory/core/form-factory";
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { TableFormArrayFactory, TableFormChildData, TableFormControlData, TableFormControlFactory, TableFormGroupData, TableFormGroupFactory, TableFormNodeConfig } from '../../table/table-form/table-form.component';
import { TableFormArrayData, TableFormService } from '../../table/table-form/table-form.service';
import { ClassAndTypeSelectModel } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { InformationPipesService } from 'app/core/redux-queries/services/information-pipes.service';
import { AnalysisTableRequest, AnalysisDefinition } from 'app/core/sdk-lb4';
// TODO Change

export type MapAndTimeContFormArrayFactory = TableFormArrayFactory
export type MapAndTimeContFormControlFactory = TableFormControlFactory
export type MapAndTimeContFormGroupFactory = TableFormGroupFactory

@Component({
  selector: 'gv-map-and-time-cont-form',
  templateUrl: './map-and-time-cont-form.component.html',
  styleUrls: ['./map-and-time-cont-form.component.scss']
})
export class MapAndTimeContFormComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  @Input() initVal$: Observable<AnalysisDefinition>;

  rootClasses$: Observable<number[]>

  constructor(
    private ff: FormFactoryService,
    private t: TableFormService,
    private i: InformationPipesService) { }

  ngOnInit() {
    this.rootClasses$ = of(DfhConfig.CLASS_PKS_GEO_PE_IT)
    this.t.rootClasses$ = this.rootClasses$;

    if (!this.initVal$) {
      const initVal: AnalysisDefinition = {
        queryDefinition: {

          filter: undefined,
          columns: [
            {
              label: 'path',
              id: 'col_1'
            }]
        }
      }
      this.initVal$ = new BehaviorSubject(initVal)
    }
    const ffConfig: FormFactoryConfig<TableFormGroupData, TableFormArrayData, TableFormControlData, TableFormChildData> = {
      rootFormGroup$: of({
        data: {
          initVal$: this.initVal$.pipe(
            map(v => v.queryDefinition)
          )
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
        if (initVal.queryDefinition && initVal.queryDefinition.filter) {

          const x = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal.queryDefinition.filter), initVal.queryDefinition.filter)
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
        const colConfigs = initVal.queryDefinition.columns.map(colDef => {
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
  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }
  checkValidity() {
    this.formFactory.markAllAsTouched()
  }
}

