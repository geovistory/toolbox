import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { U } from 'app/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { CONTAINER_DATA, FormChildFactory } from 'app/modules/form-factory/core/form-child-factory';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData, FormNodeConfig, FormFactoryConfig } from 'app/modules/form-factory/core/form-factory.models';
import { FormGroupFactory } from 'app/modules/form-factory/core/form-group-factory';
import { FormFactoryService } from 'app/modules/form-factory/services/form-factory.service';
import { FormFactory } from "app/modules/form-factory/services/FormFactory";
import { InformationPipesService } from 'app/modules/information/new-services/information-pipes.service';
import { ClassAndTypeSelectModel, classOrTypeRequiredValidator } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { propertiesRequiredValidator, PropertyOption, PropertySelectModel } from 'app/modules/queries/components/property-select/property-select.component';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { QueryPathSegment } from '../../../../../../../../src/common/interfaces';

export interface QueryPathFormArrayData {
  type: 'root'
}

export interface QueryPathFormGroupData {

}

export interface QueryPathFormControlData {
  classesSegment?: {
    options$: Observable<number[]>
  }
  propertiesSegment?: {
    options$: Observable<PropertyOption[]>
  }
}
export interface QueryPathFormChildData {
}

export type QueryPathFormNodeConfig = FormNodeConfig<QueryPathFormGroupData, QueryPathFormArrayData, QueryPathFormControlData, QueryPathFormChildData>;
export type QueryPathFormGroupFactory = FormGroupFactory;
export type QueryPathFormArrayFactory = FormArrayFactory<QueryPathFormControlData, QueryPathFormArrayData>;
export type QueryPathFormControlFactory = FormControlFactory<QueryPathFormControlData>;
export type QueryPathFormChildFactory = FormChildFactory<QueryPathFormChildData>;


/**
 * Config of a root
 * root contains a list of lines
 */
export const rootConfig = (): QueryPathFormNodeConfig[] => ([{
  array: {
    data: {
      type: 'root',
    },
    placeholder: '',
    mapValue: x => x
  }
}]);

/**
 * Config of a classesSegment
 * classesSegment is a container for the classesSegmentControls
 */
export const classesSegmentConfig = (
  options$: Observable<number[]>,
  disabled$: BehaviorSubject<boolean>,
  initValue?: ClassAndTypeSelectModel
): {
  c: QueryPathFormNodeConfig,
  val$: Observable<ClassAndTypeSelectModel>
} => {
  const val$ = new Subject<ClassAndTypeSelectModel>()
  return {
    val$,
    c: {
      id: U.uuid(),
      control: {
        data: {
          classesSegment: {
            options$
          }
        },
        placeholder: 'Classes',
        initValue,
        disabled$,
        required: true,
        validators: [classOrTypeRequiredValidator()],
        mapValue: (data: ClassAndTypeSelectModel): QueryPathSegment => {
          val$.next(data);
          return { data, type: 'classes' }
        }
      }
    }
  }
};

/**
 * Config of a propertiesSegment
 * propertiesSegment is a container for the propertiesSegmentControls
 */
export const propertiesSegmentConfig = (
  options$: Observable<PropertyOption[]>,
  disabled$: BehaviorSubject<boolean>,
  initValue?: PropertySelectModel
): {
  c: QueryPathFormNodeConfig,
  val$: Observable<PropertySelectModel>
} => {
  const val$ = new Subject<PropertySelectModel>()
  return {
    val$,
    c: {
      id: U.uuid(),
      control: {
        data: {
          propertiesSegment: {
            options$
          }
        },
        placeholder: 'Properties',
        initValue,
        disabled$,
        required: true,
        validators: [propertiesRequiredValidator()],
        mapValue: (data: PropertySelectModel): QueryPathSegment => {
          val$.next(data);
          return { data, type: 'properties' }
        }
      }
    }
  }
};

export interface QueryPathInjectData {
  rootClasses$?: Observable<number[]>
  initVal$?: Observable<QueryPathSegment[]>
}

@Component({
  selector: 'gv-query-path-form',
  templateUrl: './query-path-form.component.html',
  styleUrls: ['./query-path-form.component.scss']
})
export class QueryPathFormComponent implements OnInit, OnDestroy, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  @Input() rootClasses$: Observable<number[]>
  @Input() initVal$: Observable<QueryPathSegment[]>

  constructor(
    private ff: FormFactoryService,
    private i: InformationPipesService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: QueryPathInjectData & FormFactoryCompontentInjectData<Observable<QueryPathSegment[]>>
  ) {
    /**
     * this gets injected by as child form factory
     */
    if (injectedData) {
      if (injectedData.initVal$) {
        this.initVal$ = injectedData.initVal$
      }
      if (injectedData.rootClasses$) {
        this.rootClasses$ = injectedData.rootClasses$
      }
    }
  }

  ngOnInit() {
    if (!this.rootClasses$) throw new Error('You must provide input rootClasses$')
    if (!this.initVal$) throw new Error('You must provide input initVal$')

    const ffConfig: FormFactoryConfig<QueryPathFormGroupData, QueryPathFormArrayData, QueryPathFormControlData, QueryPathFormChildData> = {
      rootFormGroup$: of({
        data: {}
      }),
      getChildNodeConfigs: (n: QueryPathFormNodeConfig) => this.getChildNodeConfigs(n)
    }
    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
    })
  }


  getChildNodeConfigs(n: QueryPathFormNodeConfig): Observable<QueryPathFormNodeConfig[]> {
    if (n.group) {
      const childConfigs: QueryPathFormNodeConfig[] = rootConfig()
      return of(childConfigs)
    } else if (n.array && n.array.data.type === 'root') {
      return this.initVal$.pipe(map(initValue => {

        const children: QueryPathFormNodeConfig[] = []
        let cOptions$ = this.rootClasses$;
        let pOptions$;
        initValue.forEach((segment, i) => {

          const disabled = i == 0 || i < initValue.length - 1;
          if (segment.type === 'classes') {
            const classesFn = classesSegmentConfig(cOptions$, new BehaviorSubject(disabled), {
              classes: segment.data.classes,
              types: segment.data.types
            })
            children.push(classesFn.c)
            pOptions$ = classesFn.val$.pipe(
              switchMap((v: ClassAndTypeSelectModel) => this.i.pipePropertyOptionsFromClassesAndTypes(v))
            )
          } else if (segment.type === 'properties') {
            const propsFn = propertiesSegmentConfig(pOptions$, new BehaviorSubject(disabled), {
              ingoingProperties: segment.data.ingoingProperties,
              outgoingProperties: segment.data.outgoingProperties
            })
            children.push(propsFn.c)
            cOptions$ = propsFn.val$.pipe(
              switchMap((v: PropertySelectModel) => this.i.pipePkClassesFromPropertySelectModel(v))
            )
          }
        })
        return children;
      }))
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

