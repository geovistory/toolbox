import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { InfAppellationWithRelations, InfLanguage, InfResourceWithRelations, InfStatementWithRelations } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory.models';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormFactoryConfig';
import { FormNodeConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig';
import { C_339_STRING_ID, P_1864_HAS_VALUE_VERSION_ID, P_63_HAS_LANGUAGE_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { AppellationFormCtrlType } from 'projects/__test__/data/auto-gen/enums/AppellationFormCtrlType';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { openClose } from '../../../information/shared/animations';
import { getFirstElementFormQueryList } from '../../base.helpers';
import { CtrlAppellationComponent } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';

type FgTextWithLangConfig = FormNodeConfig<any, any, any, any>
export interface FgTextWithLangInjectData extends FormFactoryCompontentInjectData<Observable<InfResourceWithRelations>> {
  appearance: MatFormFieldAppearance
  pkClass: number
  stringFieldPlaceholder: string // label of the field where user enters text
}
@Component({
  selector: 'gv-fg-text-with-lang',
  templateUrl: './fg-text-with-lang.component.html',
  styleUrls: ['./fg-text-with-lang.component.scss'],
  animations: [openClose]
})
export class FgTextWithLangComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  @Input() initVal$: Observable<InfResourceWithRelations> = new BehaviorSubject(undefined)
  @Input() appearance: MatFormFieldAppearance
  @Input() pkClass: number // pkClass of the text class or subclass
  @Input() stringFieldPlaceholder: string // label of the field where user enters text
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;

  ctrls: {
    text: UntypedFormControl,
    lang: UntypedFormControl,
  }
  placeholders: {
    text: string,
    lang: string,
  }

  showOptions$ = new BehaviorSubject(false)

  appeCtrlType = AppellationFormCtrlType.textEditor

  @ViewChildren(CtrlAppellationComponent) ctrlAppe: QueryList<CtrlAppellationComponent>
  @ViewChildren(CtrlLanguageComponent) ctrlLang: QueryList<CtrlLanguageComponent>

  constructor(
    private p: ActiveProjectService,
    private ff: FormFactoryService,
    private c: ConfigurationPipesService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: FgTextWithLangInjectData
  ) {
    /**
     * this gets injected by as child form factory
     */
    if (injectedData) {
      if (injectedData.initVal$) {
        this.initVal$ = injectedData.initVal$
      }
      this.stringFieldPlaceholder = injectedData.stringFieldPlaceholder
      this.appearance = injectedData.appearance

    }
  }

  ngOnInit() {


    if (!this.appearance) this.appearance = 'fill'

    const ffConfig: FormFactoryConfig<any, any, any, any> = {
      rootFormGroup$: of({
        data: {}
      }),
      getChildNodeConfigs: (n: FgTextWithLangConfig) => this.getChildNodeConfigs(n)
    }

    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      this.ctrls = {
        text: v?.formGroupFactory?.child?.children?.[0]?.controlFactory.control,
        lang: v?.formGroupFactory?.child?.children?.[1]?.controlFactory.control,
      }
      this.placeholders = {
        text: v?.formGroupFactory?.child?.children?.[0]?.controlFactory.config.placeholder,
        lang: v?.formGroupFactory?.child?.children?.[1]?.controlFactory.config.placeholder,
      }
      // console.log(v)
    })


  }

  getChildNodeConfigs(n: FgTextWithLangConfig): Observable<FgTextWithLangConfig[]> {
    if (n.group) {
      return this.initVal$.pipe(
        map(initVal => {
          const childConfigs: FgTextWithLangConfig[] = [{
            array: {
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (statements: (InfStatementWithRelations | null)[]) => {
                const teEn: InfResourceWithRelations = {
                  pk_entity: undefined,
                  fk_class: initVal ? initVal.fk_class : this.pkClass,
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
          const textStmt = o?.find(s => s.fk_property === P_1864_HAS_VALUE_VERSION_ID)
          const langStmt = o?.find(s => s.fk_property === P_63_HAS_LANGUAGE_ID)

          const textCtrl: FgTextWithLangConfig = {
            control: {
              initValue: textStmt?.object_appellation ?? null,
              required: true,
              data: {
                type: 'text'
              },
              mapValue: (x: InfAppellationWithRelations) => {
                const s: InfStatementWithRelations = {
                  fk_property: P_1864_HAS_VALUE_VERSION_ID,
                  object_appellation: {
                    ...x,
                    fk_class: C_339_STRING_ID,
                  }
                }
                return s
              },
              placeholder: this.stringFieldPlaceholder
            }
          }
          const langCtrl: FgTextWithLangConfig = {
            control: {
              initValue: langStmt?.object_language ?? defaultLanguage ?? null,
              required: true,
              data: {
                type: 'language'
              },
              mapValue: (x: InfLanguage) => {
                const s: InfStatementWithRelations = {
                  fk_property: P_63_HAS_LANGUAGE_ID,
                  object_language: x
                }
                return s
              }, placeholder: 'Language of ' + this.stringFieldPlaceholder
            }
          }


          return [textCtrl, langCtrl]

        })
      )
    }
  }
  async focusOnCtrlText() {
    const ctrl = await getFirstElementFormQueryList(this.ctrlAppe)
    ctrl.onContainerClick()
  }
  async focusOnCtrlLang() {
    const ctrl = await getFirstElementFormQueryList(this.ctrlLang)
    ctrl.onContainerClick()
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
