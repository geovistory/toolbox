import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DfhConfig } from '@kleiolab/lib-config';
import { InfAppellation } from '@kleiolab/lib-sdk-lb3/models';
import { InfLanguage, InfPlace, InfResourceWithRelations, InfStatementWithRelations } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory.models';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormFactoryConfig';
import { FormNodeConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { CtrlAppellationComponent } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';

type FgAppellationTeEnNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgAppellationTeEnInjectData extends FormFactoryCompontentInjectData<Observable<InfResourceWithRelations>> {
  appearance: MatFormFieldAppearance
}
@Component({
  selector: 'gv-fg-appellation-te-en',
  templateUrl: './fg-appellation-te-en.component.html',
  styleUrls: ['./fg-appellation-te-en.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '180px',
        overflow: 'hidden',
      })),
      state('closed', style({
        height: '90px',
        overflow: 'hidden',
      })),
      transition('open => closed', [
        animate('0.4s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
      transition('* => closed', [
        animate('0s')
      ]),
      transition('* => open', [
        animate('0s')
      ]),
      transition('open <=> closed', [
        animate('0.2s')
      ]),
      transition('* => open', [
        animate('0.4s',
          style({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('0.4s')
      ]),
    ]),
  ]
})
export class FgAppellationTeEnComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  @Input() initVal$: Observable<InfResourceWithRelations>
  @Input() appearance: MatFormFieldAppearance
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;

  ctrls: {
    text: FormControl,
    lang: FormControl,
    type: FormControl,
  }
  placeholders: {
    text: string,
    lang: string,
    type: string,
  }

  showOptions$ = new BehaviorSubject(false)

  @ViewChild(CtrlAppellationComponent) ctrlAppe: CtrlAppellationComponent
  @ViewChild(CtrlLanguageComponent) ctrlLang: CtrlLanguageComponent
  @ViewChild(CtrlTypeComponent) ctrlType: CtrlTypeComponent

  pkTypedClass = DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE;
  pkTypeClass = DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE_TYPE;

  constructor(
    private p: ActiveProjectService,
    private ff: FormFactoryService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: FgAppellationTeEnInjectData
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
      getChildNodeConfigs: (n: FgAppellationTeEnNodeConfig) => this.getChildNodeConfigs(n)
    }

    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      this.ctrls = {
        text: v?.formGroupFactory?.child?.children?.[0]?.controlFactory.control,
        lang: v?.formGroupFactory?.child?.children?.[1]?.controlFactory.control,
        type: v?.formGroupFactory?.child?.children?.[2]?.controlFactory.control,
      }
      this.placeholders = {
        text: v?.formGroupFactory?.child?.children?.[0]?.controlFactory.config.placeholder,
        lang: v?.formGroupFactory?.child?.children?.[1]?.controlFactory.config.placeholder,
        type: v?.formGroupFactory?.child?.children?.[2]?.controlFactory.config.placeholder,
      }
      // console.log(v)
    })


  }

  getChildNodeConfigs(n: FgAppellationTeEnNodeConfig): Observable<FgAppellationTeEnNodeConfig[]> {
    if (n.group) {
      return this.initVal$.pipe(
        map(initVal => {
          const childConfigs: FgAppellationTeEnNodeConfig[] = [{
            array: {
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (statements: (InfStatementWithRelations | null)[]) => {
                const teEn: InfResourceWithRelations = {
                  pk_entity: undefined,
                  fk_class: initVal ? initVal.fk_class : null,
                  outgoing_statements: statements.filter(s => !!s)
                }
                return teEn
              }
            }
          }]
          return childConfigs
        }))
    } else if (n.array && n.array.data.type === 'root') {

      return combineLatest([this.initVal$, this.p.defaultLanguage$]).pipe(
        map(([initVal, defaultLanguage]) => {
          const o = initVal?.outgoing_statements
          const textStmt = o?.find(s => s.fk_property === DfhConfig.PROPERTY_PK_P13_REFERS_TO_NAME)
          const langStmt = o?.find(s => s.fk_property === DfhConfig.PROPERY_PK_P12_USED_IN_LANGUAGE)
          const typeStmt = o?.find(s => s.fk_property === DfhConfig.PROPERTY_PK_P14_HAS_APPELLATION_FOR_LANGUAGE_TYPE)

          const textCtrl: FgAppellationTeEnNodeConfig = {
            control: {
              initValue: textStmt?.object_appellation ?? null,
              required: true,
              data: {
                type: 'text'
              },
              mapValue: (x: InfAppellation) => {
                const s: InfStatementWithRelations = {
                  fk_property: DfhConfig.PROPERTY_PK_P13_REFERS_TO_NAME,
                  object_appellation: x
                }
                return s
              },
              placeholder: 'name'
            }
          }
          const langCtrl: FgAppellationTeEnNodeConfig = {
            control: {
              initValue: langStmt?.object_language ?? defaultLanguage ?? null,
              required: true,
              data: {
                type: 'language'
              },
              mapValue: (x: InfLanguage) => {
                const s: InfStatementWithRelations = {
                  fk_property: DfhConfig.PROPERY_PK_P12_USED_IN_LANGUAGE,
                  object_language: x
                }
                return s
              }, placeholder: 'used in language'
            }
          }

          const typeCtrl: FgAppellationTeEnNodeConfig = {
            control: {
              initValue: typeStmt?.fk_object_info ?? null,
              required: false,
              data: {
                type: 'has_type'
              },
              mapValue: (x: number): InfStatementWithRelations | null => {
                if (!x) return null
                const s: InfStatementWithRelations = {
                  fk_property: DfhConfig.PROPERTY_PK_P14_HAS_APPELLATION_FOR_LANGUAGE_TYPE,
                  fk_object_info: x
                }
                return s
              }, placeholder: 'has type'
            }
          }


          return [textCtrl, langCtrl, typeCtrl]

        })
      )
    }
  }
  focusOnCtrlText() {
    if (this.ctrlAppe) {
      this.ctrlAppe.onContainerClick()
    }
    // this.matInputs.changes.pipe(first((x: QueryList<MatInput>) => x.length > 0)).subscribe((items) => {
    //   items.first.focus()
    // })
  }
  focusOnCtrlLang() {
    if (this.ctrlLang) {
      this.ctrlLang.onContainerClick()
    }
    // this.matInputs.changes.pipe(first((x: QueryList<MatInput>) => x.length > 1)).subscribe((items) => {
    //   items.last.focus()
    // })
  }
  focusOnCtrlType() {
    if (this.ctrlType) {
      this.ctrlType.onContainerClick()
    }
    // this.matInputs.changes.pipe(first((x: QueryList<MatInput>) => x.length > 1)).subscribe((items) => {
    //   items.last.focus()
    // })
  }

  toggle() {
    this.showOptions$.next(!this.showOptions$.value)
  }

  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}