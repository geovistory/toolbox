import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { InfAppellation, InfLangString, InfLangStringWithRelations, InfLanguage, QuillDoc } from '@kleiolab/lib-sdk-lb4';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { FormFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-factory.models';
import { FormFactoryService } from 'projects/app-toolbox/src/app/modules/form-factory/services/form-factory.service';
import { FormFactoryConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormFactoryConfig';
import { FormNodeConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormNodeConfig';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { getFirstElementFormQueryList } from '../../base.helpers';
import { CtrlAppellationComponent, CtrlAppellationModel } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';

type FgLangStringNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgLangStringInjectData extends FormFactoryCompontentInjectData<Observable<InfLangString>> {
  appearance: MatFormFieldAppearance
}
@Component({
  selector: 'gv-fg-lang-string',
  templateUrl: './fg-lang-string.component.html',
  styleUrls: ['./fg-lang-string.component.scss']
})
export class FgLangStringComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  @Input() initVal$: Observable<InfLangStringWithRelations>
  @Input() appearance: MatFormFieldAppearance
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  @ViewChildren(CtrlAppellationComponent) ctrlAppellation: QueryList<CtrlAppellationComponent>
  @ViewChildren(CtrlLanguageComponent) ctrlLanguage: QueryList<CtrlLanguageComponent>


  constructor(
    private ff: FormFactoryService,
    private state: StateFacade,
    private c: ConfigurationPipesService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: FgLangStringInjectData
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
      this.initVal$ = new BehaviorSubject<InfLangString>({
        pk_entity: undefined,
        fk_language: undefined,
        quill_doc: undefined,
        string: undefined,
        fk_class: undefined
      })
    }
    // Ensure the language is set
    this.initVal$ = combineLatest(this.initVal$, this.state.data.getProjectLanguage(this.state.pkProject)).pipe(
      switchMap(([initVal, defaultLang]) => {
        // if a fk_language is provied, get the language object
        if (initVal && initVal.fk_language) {
          return this.state.data.inf.language.getLanguage.byPkEntity$(initVal.fk_language).pipe(
            map(language => {
              return {
                ...initVal,
                language
              }
            })
          )
        }
        // else use the project default lang
        return new BehaviorSubject({
          ...initVal,
          language: defaultLang
        })
      })
    )


    if (!this.appearance) this.appearance = 'fill'

    const ffConfig: FormFactoryConfig<any, any, any, any> = {
      rootFormGroup$: of({
        data: {}
      }),
      getChildNodeConfigs: (n: FgLangStringNodeConfig) => this.getChildNodeConfigs(n)
    }

    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      // console.log(v)
    })
  }

  getChildNodeConfigs(n: FgLangStringNodeConfig): Observable<FgLangStringNodeConfig[]> {
    if (n.group) {
      return this.initVal$.pipe(
        map(initVal => {
          const childConfigs: FgLangStringNodeConfig[] = [{
            array: {
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (x: [QuillDoc, InfLanguage]) => {
                const value: InfLangStringWithRelations = {
                  fk_class: initVal.fk_class,
                  fk_language: x[1] ? x[1].pk_entity : undefined,
                  language: x[1],
                  quill_doc: x[0],
                  string: undefined,
                  pk_entity: undefined,
                }
                return value
              }
            }
          }]
          return childConfigs
        }))
    } else if (n.array && n.array.data.type === 'root') {

      return this.initVal$.pipe(
        switchMap(initVal => initVal.fk_class ?
          this.c.pipeClassLabel(initVal.fk_class)
            .pipe(
              map(classLabel => ({ ...initVal, classLabel }))
            ) :
          of({ ...initVal, classLabel: 'Text' })
        ),
        map((initVal) => {
          const textInitVal: InfAppellation = {
            quill_doc: initVal.quill_doc,
            pk_entity: undefined,
            fk_class: undefined,
            string: undefined,
          }
          const textCtrl: FgLangStringNodeConfig = {
            control: {
              initValue: textInitVal,
              required: true,
              data: {
                type: 'text'
              },
              mapValue: (x: CtrlAppellationModel) => (x ? x.quill_doc : undefined),
              placeholder: initVal.classLabel
            }
          }

          const langCtrl: FgLangStringNodeConfig = {
            control: {
              initValue: initVal.language,
              required: true,
              data: {
                type: 'language'
              },
              mapValue: x => x,
              placeholder: 'Language'
            }
          }

          return [textCtrl, langCtrl]

        })
      )
    }
  }

  async focusOnCtrlText() {
    const ctrl = await getFirstElementFormQueryList(this.ctrlAppellation)
    ctrl.onContainerClick()
  }
  async focusOnCtrlLanguage() {
    const ctrl = await getFirstElementFormQueryList(this.ctrlLanguage)
    ctrl.onContainerClick()
  }




  ngAfterViewInit() {
    this.afterViewInit$.next(true)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
