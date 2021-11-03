import { sandboxOf } from 'angular-playground';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/gvDB/InfAppellationMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { EntityAddExistingHitComponent } from './entity-add-existing-hit.component';


/*****************************************************************************
 * MOCK data
 *********************************************************
 ********************/
// mock entity previews (used below in ActiveProjectPipesServiceMock)
const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER
]


export default sandboxOf(EntityAddExistingHitComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    InitStateModule,
  ]
})
  .add('EntityAddExistingHit2Component ', {
    context: {
      hit1: {
        pk_entity: 2001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: 21,
        class_label: DfhApiClassMock.EN_21_PERSON.dfh_class_label,
        entity_label: InfAppellationMock.JACK_THE_FOO.string,
        entity_type: 'peIt',
        type_label: 'Person',
        // fk_type?: number;
        // time_span?: WarEntityPreviewTimeSpan;
        // first_second?: string;
        // last_second?: string;
        // tmsp_last_modification?: string;
        // full_text_headline: '\'Alberti\', \'Alberto di Gaspare Alberti (da Venezia, secretario del Senato)\', \'domino\', Has localisation: \'Alberto di Gaspare\'',
        full_text_headline: 'CENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTERCENTER',
        // class_label_headline?: string,
        // entity_label_headline?: string,
        // type_label_headline?: string,
        projects: [1, 2, 3, 4],
        // related_statements?: Array<InfStatement>;
        btnDisabled: false,
        // btnTooltip?: string
        optionsButtons: 'moreInfos'
      },
      hit2: {
        pk_entity: 2001,
        // fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: 21,
        class_label: DfhApiClassMock.EN_21_PERSON.dfh_class_label,
        entity_label: InfAppellationMock.JACK_THE_FOO.string,
        entity_type: 'peIt',
        type_label: 'Person',
        // fk_type?: number;
        // time_span?: WarEntityPreviewTimeSpan;
        // first_second?: string;
        // last_second?: string;
        // tmsp_last_modification?: string;
        full_text_headline: '\'Alberti\', \'Alberto di Gaspare Alberti (da Venezia, secretario del Senato)\', \'domino\', Has localisation: \'Alberto di Gaspare\'',
        // class_label_headline?: string,
        // entity_label_headline?: string,
        // type_label_headline?: string,
        projects: [1, 2, 3, 4],
        // related_statements?: Array<InfStatement>;
        btnDisabled: false,
        // btnTooltip?: string
      },
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

    <div class="mat-typography mt-2 mb-5">
      <div style="width:480px; margin:auto">
        <h2>Witdh: 480px</h2>
        <div>
          <mat-divider></mat-divider>
          <gv-entity-add-existing-hit
            [pkEntity]="8765434"
            [title]="'Hans Muster'"
            [description]="'Lorem Ipsum is simply dummy text of the printing and typesetting'"
            [isInProject]="true"
            [numberOfProject]="23"
            [selected]="false"
            [confirmBtnText]="'Select'"
            [confirmBtnDisabled]="false"
            [confirmBtnTooltip]="''"
            style="width:100%">
          </gv-entity-add-existing-hit>
          <mat-divider></mat-divider>
          <gv-entity-add-existing-hit
            [pkEntity]="8765434"
            [title]="'Hans Muster'"
            [description]="'Lorem Ipsum is simply dummy text of the printing and typesetting'"
            [isInProject]="false"
            [numberOfProject]="1"
            [selected]="true"
            [confirmBtnText]="'Select'"
            [confirmBtnDisabled]="true"
            [confirmBtnTooltip]="'Foo'"
            style="width:100%">
          </gv-entity-add-existing-hit>
          <mat-divider></mat-divider>
        </div>
      </div>

      <div style="width:300px; margin:auto; margin-top:20px;">
        <h2>Witdh: 300px</h2>
        <div>
          <mat-divider></mat-divider>
          <gv-entity-add-existing-hit
            [pkEntity]="8765434"
            [title]="'Hans Muster with a very very long name and so it is difficult to read'"
            [description]="'Lorem Ipsum is simply dummy text of the printing and typesetting that is very long and does not fit into the view'"
            [isInProject]="false"
            [numberOfProject]="12391"
            [selected]="true"
            [confirmBtnText]="'Select'"
            [confirmBtnDisabled]="false"
            [confirmBtnTooltip]="'Foo'"
            style="width:100%">
          </gv-entity-add-existing-hit>
          <mat-divider></mat-divider>
          <gv-entity-add-existing-hit
            [pkEntity]="8765434"
            [title]="'Hans Muster with a very very long name and so it is difficult to read'"
            [description]="'Lorem Ipsum is simply dummy text of the printing and typesetting that is very long and does not fit into the view'"
            [isInProject]="false"
            [numberOfProject]="12391"
            [selected]="false"
            [confirmBtnText]="'Select'"
            [confirmBtnDisabled]="true"
            [confirmBtnTooltip]="'Foo'"
            style="width:100%">
          </gv-entity-add-existing-hit>
          <mat-divider></mat-divider>
        </div>
      </div>
    </div>
    `
  })
