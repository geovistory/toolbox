import { Component, Inject, Input, OnDestroy, OnInit, Optional, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material';
import { ActiveProjectService, InfLanguage, InfTextProperty, ValidationService } from 'app/core';
import { CONTAINER_DATA } from 'app/modules/form-factory/core/form-child-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'app/modules/form-factory/core/form-factory.models';
import { FormFactory, FormFactoryConfig, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { QuillDoc } from 'app/modules/quill';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlAppellationModel, CtrlAppellationComponent } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlLanguageModel, CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';

type FgTextPropertyNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgTextPropertyInjectData extends FormFactoryCompontentInjectData<Observable<InfTextProperty>> {
  appearance: MatFormFieldAppearance
}
@Component({
  selector: 'gv-fg-text-property',
  templateUrl: './fg-text-property.component.html',
  styleUrls: ['./fg-text-property.component.scss']
})
export class FgTextPropertyComponent implements OnInit, OnDestroy, AfterViewInit, FormFactoryComponent {
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject(false);

  @Input() initVal$: Observable<InfTextProperty>
  @Input() appearance: MatFormFieldAppearance
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;

  @ViewChildren(CtrlAppellationComponent) ctrlAppellation: QueryList<CtrlAppellationComponent>
  @ViewChildren(CtrlLanguageComponent) ctrlLanguage: QueryList<CtrlLanguageComponent>

  constructor(
    private p: ActiveProjectService,
    private ff: FormFactoryService,
    @Optional() @Inject(CONTAINER_DATA) public injectedData: FgTextPropertyInjectData
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
    const initQuillDoc: QuillDoc = {
      latestId: 1,
      ops: []
    }

    if (!this.initVal$) {
      this.initVal$ = new BehaviorSubject<InfTextProperty>({
        pk_entity: undefined,
        class_field: undefined,
        fk_class_field: undefined,
        fk_concerned_entity: undefined,
        fk_language: undefined,
        quill_doc: initQuillDoc,
        string: undefined
      })
    }
    // Ensure the language is set
    this.initVal$ = combineLatest(this.p.defaultLanguage$, this.initVal$).pipe(
      filter(([defaultLang]) => !!defaultLang),
      switchMap(([defaultLang, initVal]) => {
        // if a fk_language is provied, get the language object
        if (initVal.fk_language) {
          return this.p.inf$.language$.by_pk_entity$.key(initVal.fk_language).pipe(
            filter(lang => !!lang),
            map(language => {
              return {
                quill_doc: initQuillDoc,
                ...initVal,
                language
              }
            })
          )
        }
        // else use the project default lang
        return new BehaviorSubject({
          quill_doc: initQuillDoc,
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
      getChildNodeConfigs: (n: FgTextPropertyNodeConfig) => this.getChildNodeConfigs(n)
    }
    this.ff.create(ffConfig, this.destroy$).pipe(
      first(), takeUntil(this.destroy$)
    ).subscribe((v) => {
      this.formFactory$.next(v)
      this.formFactory = v;
      console.log(v)
    })
  }
  getChildNodeConfigs(n: FgTextPropertyNodeConfig): Observable<FgTextPropertyNodeConfig[]> {
    if (n.group) {
      return this.initVal$.pipe(
        map(initVal => {
          const childConfigs: FgTextPropertyNodeConfig[] = [{
            array: {
              initValue: [initVal],
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (x: [QuillDoc, InfLanguage]) => {
                const val: InfTextProperty = {
                  pk_entity: undefined,
                  fk_class_field: initVal.fk_class_field,
                  quill_doc: x[0],
                  language: x[1],
                  fk_language: x[1] ? x[1].pk_entity : undefined,
                  fk_concerned_entity: initVal.fk_concerned_entity,
                  string: undefined
                }
                return val
              }
            }
          }]
          return childConfigs
        }))
    } else if (n.array && n.array.data.type === 'root') {

      const initVal = n.array.initValue && n.array.initValue.length > 0 ?
        n.array.initValue[0] : [{}];

      const textInitVal: CtrlAppellationModel = {
        quill_doc: initVal.quill_doc,
        pk_entity: undefined,
        fk_class: 1,
        string: undefined,
      }
      const textCtrl: FgTextPropertyNodeConfig = {
        control: {
          initValue: textInitVal,
          required: true,
          validators: [ValidationService.emptyQuillDocValidator],
          data: {
            type: 'text'
          },
          mapValue: (x: CtrlAppellationModel) => (x ? x.quill_doc : undefined),
          placeholder: 'Text'
        }
      }
      const langInitVal: CtrlLanguageModel = initVal.language
      const langCtrl: FgTextPropertyNodeConfig = {
        control: {
          initValue: langInitVal,
          required: true,
          data: {
            type: 'language'
          },
          mapValue: x => x,
          placeholder: 'Language'
        }
      }

      return of([textCtrl, langCtrl])

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
