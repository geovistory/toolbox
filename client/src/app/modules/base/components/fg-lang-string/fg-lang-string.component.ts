import { Component, Inject, Input, OnDestroy, OnInit, Optional, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material';
import { SysConfig } from 'app/core';
import { ActiveProjectService } from "app/core/active-project";
import { InfLangString } from "app/core/sdk";
import { InfLanguage } from "app/core/sdk";
import { InfAppellation } from "app/core/sdk";
import { CONTAINER_DATA } from 'app/modules/form-factory/core/form-child-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'app/modules/form-factory/core/form-factory.models';
import { FormFactory, FormFactoryConfig, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { QuillDoc } from 'app/modules/quill';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
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

  @Input() initVal$: Observable<InfLangString>
  @Input() appearance: MatFormFieldAppearance
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;
  @ViewChildren(CtrlAppellationComponent) ctrlAppellation: QueryList<CtrlAppellationComponent>
  @ViewChildren(CtrlLanguageComponent) ctrlLanguage: QueryList<CtrlLanguageComponent>


  constructor(
    private p: ActiveProjectService,
    private ff: FormFactoryService,
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
    this.initVal$ = combineLatest(this.initVal$, this.p.defaultLanguage$).pipe(
      switchMap(([initVal, defaultLang]) => {
        // if a fk_language is provied, get the language object
        if (initVal.fk_language) {
          return this.p.inf$.language$.by_pk_entity$.key(initVal.fk_language).pipe(
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
                const value: InfLangString = {
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
              placeholder: 'Text'
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

  focusOnCtrlText() {
    if (this.ctrlAppellation.length > 0) {
      this.ctrlAppellation.first.onContainerClick()
    }
    this.ctrlAppellation.changes.pipe(first((x: QueryList<CtrlAppellationComponent>) => x.length > 0)).subscribe((items) => {
      items.first.onContainerClick()
    })
  }
  focusOnCtrlLanguage() {
    if (this.ctrlLanguage.length > 0) {
      this.ctrlLanguage.first.onContainerClick()
    }
    this.ctrlLanguage.changes.pipe(first((x: QueryList<CtrlLanguageComponent>) => x.length > 0)).subscribe((items) => {
      items.first.onContainerClick()
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
