import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { GvPositiveSchemaObject, InfLanguage, InfResourceWithRelations, LanguagesService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/gvDB/InfAppellationMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { InfStatementMock } from 'projects/__test__/data/auto-gen/gvDB/InfStatementMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BaseModule } from '../../base.module';
import { FgAppellationTeEnComponent } from './fg-appellation-te-en.component';
class LanguagesServiceMock {
  findLanguagesControllerSearchInLanguages(searchString?: string): Observable<InfLanguage[]> {

    const langs = [InfLanguageMock.GERMAN, InfLanguageMock.FRENCH]
    if (!searchString) return of(langs)
    else {
      const filtered = langs.filter(lang => lang.notes.toUpperCase().includes(searchString.toUpperCase()))
      return of(filtered)
    }
  }

}
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
  datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = warEntityPreviews.find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(300))
  }
}

const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
]

export const appeTeEnSandboxMock: GvPositiveSchemaObject = {
  war: {
    entity_preview: warEntityPreviews
  },
  inf: {
    resource: [
      InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME,
      InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME,
    ],
    language: [
      InfLanguageMock.GERMAN
    ]
  },
  pro: {
    info_proj_rel: [
      {
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME.pk_entity,
        fk_last_modifier: 0,
        is_in_project: true
      },
      {
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME.pk_entity,
        fk_last_modifier: 0,
        is_in_project: true
      }
    ]
  }
}


const existing: InfResourceWithRelations = {
  ...InfResourceMock.NAMING_1,
  outgoing_statements: [
    {
      ...InfStatementMock.NAME_1_TO_APPE,
      object_appellation: InfAppellationMock.JACK_THE_FOO
    },
    {
      ...InfStatementMock.NAME_1_TO_TYPE,
    }
  ]
}

export default sandboxOf(FgAppellationTeEnComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ],
  providers: [
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: LanguagesService, useClass: LanguagesServiceMock },
  ]
})
  .add('FgAppellationTeEnComponent | New ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [appeTeEnSandboxMock],
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-appellation-te-en #c [appearance]="'outline'" [pkClass]="365"></gv-fg-appellation-te-en>
      </div>
      <div>
          <button (click)="c.focusOnCtrlText()" >focus on Text</button>
          <button (click)="c.focusOnCtrlLang()" >focus on Lang</button>
          <button (click)="c.focusOnCtrlType()" >focus on Type</button>

          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
  .add('FgAppellationTeEnComponent | Existing ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [appeTeEnSandboxMock],
      initVal$: of(existing)
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-appellation-te-en #c [appearance]="'outline'" [initVal$]="initVal$"></gv-fg-appellation-te-en>
      </div>
      <div>
          <button (click)="c.focusOnCtrlText()" >focus on Text</button>
          <button (click)="c.focusOnCtrlLang()" >focus on Lang</button>
          <button (click)="c.focusOnCtrlType()" >focus on Type</button>

          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
