import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material';
import { ActiveProjectService, InfAppellation, InfLanguage, InfTextProperty } from 'app/core';
import { CONTAINER_DATA } from 'app/modules/form-factory/core/form-child-factory';
import { FormFactoryComponent, FormFactoryCompontentInjectData } from 'app/modules/form-factory/core/form-factory.models';
import { FormFactory, FormFactoryConfig, FormFactoryService, FormNodeConfig } from 'app/modules/form-factory/services/form-factory.service';
import { QuillDoc } from 'app/modules/quill';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';

type FgTextPropertyNodeConfig = FormNodeConfig<any, any, any, any>
export interface FgTextPropertyInjectData extends FormFactoryCompontentInjectData<Observable<InfTextProperty>> {
  appearance: MatFormFieldAppearance
}
@Component({
  selector: 'gv-fg-text-property',
  templateUrl: './fg-text-property.component.html',
  styleUrls: ['./fg-text-property.component.scss']
})
export class FgTextPropertyComponent implements OnInit, OnDestroy, FormFactoryComponent {
  destroy$ = new Subject<boolean>();

  @Input() initVal$: Observable<InfTextProperty>
  @Input() appearance: MatFormFieldAppearance
  formFactory$ = new Subject<FormFactory>();
  formFactory: FormFactory;


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
    if (!this.initVal$) {
      this.initVal$ = new BehaviorSubject<InfTextProperty>({
        pk_entity: undefined,
        class_field: undefined,
        fk_class_field: undefined,
        fk_concerned_entity: undefined,
        fk_language: undefined,
        quill_doc: undefined,
        string: undefined
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
              data: {
                type: 'root',
              },
              placeholder: '',
              mapValue: (x: [QuillDoc, InfLanguage]) => {
                const place: InfTextProperty = {
                  pk_entity: undefined,
                  fk_class_field: initVal.fk_class_field,
                  quill_doc: x[0],
                  language: x[1],
                  fk_language: x[1].pk_entity,
                  fk_concerned_entity: initVal.fk_concerned_entity,
                  string: undefined
                }
                return place
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
          const textCtrl: FgTextPropertyNodeConfig = {
            control: {
              initValue: textInitVal,
              required: true,
              data: {
                type: 'text'
              },
              mapValue: x => x,
              placeholder: 'Text'
            }
          }

          const langCtrl: FgTextPropertyNodeConfig = {
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
