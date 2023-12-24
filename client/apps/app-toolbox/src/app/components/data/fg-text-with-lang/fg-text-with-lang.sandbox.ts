import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfLanguage, InfResourceWithRelations, LanguagesService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { P_63_HAS_LANGUAGE_ID } from '../../../ontome-ids';
import { InitStateModule } from '../../../shared/components/init-state/init-state.module';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/gvDB/InfAppellationMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { InfStatementMock } from 'projects/__test__/data/auto-gen/gvDB/InfStatementMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { Observable, of } from 'rxjs';
import { BaseModule } from '../../../modules/base/base.module';
import { FgTextWithLangComponent } from './fg-text-with-lang.component';
class LanguagesServiceMock {
  findLanguagesControllerSearchInLanguages(searchString?: string): Observable<InfLanguage[]> {

    const langs = [InfLanguageMock.GERMAN, InfLanguageMock.FRENCH, InfLanguageMock.ITALIAN]
    if (!searchString) return of(langs)
    else {
      const filtered = langs.filter(lang => lang.notes.toUpperCase().includes(searchString.toUpperCase()))
      return of(filtered)
    }
  }

}
// export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
//   pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
//   datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

//   streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
//     // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
//     const preview = warEntityPreviews.find((x) => x?.pk_entity === pkEntity)
//     return new BehaviorSubject(preview).pipe(delay(300))
//   }
// }

// const warEntityPreviews = [
//   WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
//   WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
// ]

// export const appeTeEnSandboxMock: GvPositiveSchemaObject = {
//   war: {
//     entity_preview: warEntityPreviews
//   },
//   inf: {
//     resource: [
//       InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME,
//       InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME,
//     ],
//     language: [
//       InfLanguageMock.GERMAN,
//       InfLanguageMock.ITALIAN,
//     ]
//   },
//   pro: {
//     info_proj_rel: [
//       {
//         fk_project: ProProjectMock.PROJECT_1.pk_entity,
//         fk_entity: InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME.pk_entity,
//         fk_last_modifier: 0,
//         is_in_project: true
//       },
//       {
//         fk_project: ProProjectMock.PROJECT_1.pk_entity,
//         fk_entity: InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME.pk_entity,
//         fk_last_modifier: 0,
//         is_in_project: true
//       }
//     ]
//   }
// }


const existing: InfResourceWithRelations = {
  ...InfResourceMock.DEFINITION_1,
  outgoing_statements: [
    {
      ...InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_1,
      object_appellation: InfAppellationMock.VALUE_VERSION_1
    },
    {
      fk_property: P_63_HAS_LANGUAGE_ID,
      object_language: InfLanguageMock.ITALIAN
    }
  ]
}

export default sandboxOf(FgTextWithLangComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ],
  providers: [
    { provide: LanguagesService, useClass: LanguagesServiceMock },
  ]
})
  .add('FgTextWithLangComponent | New ', {
    context: {
      initState: IAppStateMock.stateProject1,
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-text-with-lang #c [appearance]="'outline'" [pkClass]="899" [stringFieldPlaceholder]="'Definition'"></gv-fg-text-with-lang>
      </div>
      <div>
          <button (click)="c.focusOnCtrlText()" >focus on Text</button>
          <button (click)="c.focusOnCtrlLang()" >focus on Lang</button>

          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
  .add('FgTextWithLangComponent | Existing ', {
    context: {
      initState: IAppStateMock.stateProject1,
      initVal$: of(existing)
    },
    template: `
  <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
  <div class="d-flex justify-content-center mt-5">
     <div style="width:300px;height:400px" class="d-flex mr-4">
        <gv-fg-text-with-lang #c [initVal$]="initVal$" [appearance]="'outline'" [pkClass]="899" [stringFieldPlaceholder]="'Definition'"></gv-fg-text-with-lang>
    </div>
    <div>
        <button (click)="c.focusOnCtrlText()" >focus on Text</button>
        <button (click)="c.focusOnCtrlLang()" >focus on Lang</button>

        <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
        <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
        <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
        <p>Form.value </p>
        <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
    </div>
  </div>
  `
  })
