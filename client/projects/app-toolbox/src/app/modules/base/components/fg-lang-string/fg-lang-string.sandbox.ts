import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { C_784_SHORT_TITLE_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_97_GEOVISTORY_DIGI_2022_02_05 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-97-geovistory-digi-2022-02-05';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { FgLangStringComponent } from './fg-lang-string.component';

// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_97_GEOVISTORY_DIGI_2022_02_05 // add digitals profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
]

export default sandboxOf(FgLangStringComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('FgLangString | New ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      initVal$: new BehaviorSubject<InfLangString>({
        pk_entity: undefined,
        fk_language: undefined,
        quill_doc: undefined,
        string: undefined,
        fk_class: C_784_SHORT_TITLE_ID
      }),
      parentPath: ''
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-lang-string #c [appearance]="'outline'" [initVal$]="initVal$"></gv-fg-lang-string>
      </div>
      <div>
          <button (click)="c.focusOnCtrlText()" >focus on text</button>
          <button (click)="c.focusOnCtrlLanguage()" >focus on lang</button>

          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
