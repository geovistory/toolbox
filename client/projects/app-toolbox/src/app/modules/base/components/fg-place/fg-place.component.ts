import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DfhConfig } from '@kleiolab/lib-config';
import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory.models';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormFactoryConfig';
import { FormNodeConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

type FgPlaceNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgPlaceInjectData extends FormFactoryCompontentInjectData<Observable<InfPlace>> {
  appearance: MatFormFieldAppearance
}
@Component({
  selector: 'gv-fg-place',
  templateUrl: './fg-place.component.html',
  styleUrls: ['./fg-place.component.scss']
})
export class FgPlaceComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  @Input() initVal$: Observable<InfPlace>
  @Input() appearance: MatFormFieldAppearance
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;

  @ViewChildren(MatInput) matInputs: QueryList<MatInput>


  constructor(
    private ff: FormFactoryService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: FgPlaceInjectData
  ) {
    /**
     * this gets injected by as child form factory
     */
    if (injectedData) {
      if (injectedData.initVal$) {
        this.initVal$ = injectedData.initVal$
        this.appearance = injectedData.appearance
      }
    }
  }

  ngOnInit() {
    if (!this.initVal$) {
      this.initVal$ = new BehaviorSubject<InfPlace>({
        pk_entity: undefined,
        fk_class: DfhConfig.CLASS_PK_PLACE,
        lat: undefined,
        long: undefined
      })
    }

    if (!this.appearance) this.appearance = 'fill'

    const ffConfig: FormFactoryConfig<any, any, any, any> = {
      rootFormGroup$: of({
        data: {}
      }),
      getChildNodeConfigs: (n: FgPlaceNodeConfig) => this.getChildNodeConfigs(n)
    }

    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      // console.log(v)
    })
  }

  getChildNodeConfigs(n: FgPlaceNodeConfig): Observable<FgPlaceNodeConfig[]> {
    if (n.group) {
      return this.initVal$.pipe(
        map(initVal => {
          const childConfigs: FgPlaceNodeConfig[] = [{
            array: {
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (x: number[]) => {
                const place: InfPlace = {
                  pk_entity: undefined,
                  fk_class: initVal ? initVal.fk_class : null,
                  lat: x[0],
                  long: x[1]
                }
                return place
              }
            }
          }]
          return childConfigs
        }))
    } else if (n.array && n.array.data.type === 'root') {

      return this.initVal$.pipe(
        map(initVal => {
          const latCtrl: FgPlaceNodeConfig = {
            control: {
              initValue: initVal ? initVal.lat : null,
              required: true,
              data: {},
              mapValue: x => x,
              placeholder: 'Latitude'
            }
          }
          const longCtrl: FgPlaceNodeConfig = {
            control: {
              initValue: initVal ? initVal.long : null,
              required: true,
              data: {},
              mapValue: x => x,
              placeholder: 'Longitude'
            }
          }

          return [latCtrl, longCtrl]

        })
      )
    }
  }
  focusOnCtrlLat() {
    if (this.matInputs.length > 0) {
      this.matInputs.first.focus()
    }
    this.matInputs.changes.pipe(first((x: QueryList<MatInput>) => x.length > 0)).subscribe((items) => {
      items.first.focus()
    })
  }
  focusOnCtrlLong() {
    if (this.matInputs.length > 1) {
      this.matInputs.last.focus()
    }
    this.matInputs.changes.pipe(first((x: QueryList<MatInput>) => x.length > 1)).subscribe((items) => {
      items.last.focus()
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
