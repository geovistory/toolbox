import { sandboxOf } from 'angular-playground';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData, DatePipe } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { ExistenceTimeComponent } from '../existence-time/existence-time.component';
import { FieldComponent } from '../existence-time/field/field.component';
import { FieldsetInnerComponent } from '../existence-time/fieldset-inner/fieldset-inner.component';
import { FieldsetOuterComponent } from '../existence-time/fieldset-outer/fieldset-outer.component';
import { FieldsetBeginComponent } from '../existence-time/fieldset-begin/fieldset-begin.component';
import { FieldsetEndComponent } from '../existence-time/fieldset-end/fieldset-end.component';
import { TeEntComponent } from './te-ent.component';
import { TeEntRoleSetComponent } from '../te-ent-role-set/te-ent-role-set.component';
import { TeEntRoleComponent } from '../te-ent-role/te-ent-role.component';
import { PeItComponent } from '../pe-it/pe-it.component';
import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { PeItAppellationComponent } from '../pe-it-appellation/pe-it-appellation.component';
import { PeItLanguageComponent } from '../pe-it-language/pe-it-language.component';
import { PeItEntityPreviewComponent } from '../pe-it-entity-preview/pe-it-entity-preview.component';
import { PeItEntityAddComponent } from '../pe-it-entity-add/pe-it-entity-add.component';
import { PeItRoleSetListComponent } from '../pe-it-role-set-list/pe-it-role-set-list.component';
import { EntityEditorSettingsComponent } from '../entity-editor-settings/entity-editor-settings.component';
import { AppellationLabelViewComponent } from '../appellation-label-view/appellation-label-view.component';
import { AppellationLabelCreateComponent } from '../appellation-label-create/appellation-label-create.component';
import { PeItRoleSetComponent } from '../pe-it-role-set/pe-it-role-set.component';
import { PeItRoleComponent } from '../pe-it-role/pe-it-role.component';
import { AppellationLabelEditorComponent } from '../appellation-label-editor/appellation-label-editor.component';
import { AppellationLabelTokenComponent } from '../appellation-label-token/appellation-label-token.component';
import { ControlMessagesComponent } from 'app/shared/components/control-messages/control-messages.component';
import { TimePrimitiveComponent } from '../time-primitive/time-primitive.component';
import { ValidationService, InfEntityProjectRelApi, ActiveProjectService, EntityEditorService } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';
import { ClassService } from '../../shared/class.service';
import { EprService } from '../../shared/epr.service';
import { PeItService } from '../../shared/pe-it.service';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { PropertyPipe } from '../../shared/property.pipe';
import { TeEntExistenceTimeComponent } from '../te-ent-existence-time/te-ent-existence-time.component';
import { LanguageSearchTypeaheadComponent } from '../../../../../shared/components/language-search-typeahead/language-search-typeahead.component';
import { TeEntService } from '../../shared/te-ent.service';
import { ConfigService } from '../../shared/config.service';



export default sandboxOf(TeEntComponent, {
  declarations: [
    ExistenceTimeComponent,
    TeEntExistenceTimeComponent,
    FieldComponent,
    TimePrimitiveComponent,
    FieldsetBeginComponent,
    FieldsetEndComponent,
    FieldsetOuterComponent,
    FieldsetInnerComponent,
    TeEntRoleSetComponent,
    PeItRoleSetComponent,
    TeEntRoleComponent,
    PeItComponent,
    PeItEntityComponent,
    PeItAppellationComponent,
    PeItLanguageComponent,
    PeItEntityPreviewComponent,
    PeItEntityAddComponent,
    PeItRoleSetListComponent,
    EntityEditorSettingsComponent,
    AppellationLabelViewComponent,
    AppellationLabelEditorComponent,
    AppellationLabelCreateComponent,
    PeItRoleComponent,
    AppellationLabelTokenComponent,
    LanguageSearchTypeaheadComponent
  ],
  imports: [
    
  ],
  providers: [
    ValidationService,
    InfEntityProjectRelApi,
    ActiveProjectService,
    RoleService,
    PropertyService,
    UtilitiesService,
    EntityEditorService,
    DatePipe,
    ClassService,
    EprService,
    PeItService,
    ActivePeItService,
    PropertyPipe,
    TeEntService,
    ConfigService
  ]
})
  .add('State: Edit – birth with exist.-time', {
    context:{
      projectReady: false,
      parentRole: {"fk_property": 6,
      "fk_entity": 70831,
      "fk_temporal_entity": 70844,
      "is_in_project_count": 1,
      "is_standard_in_project_count": 0,
      "pk_entity_version_concat": "70843_1",
      "pk_entity": 70843,
      "entity_version": 1,
      "notes": null,
      "tmsp_creation": "2018-03-22T16:58:32.093486+00:00",
      "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00",
      "sys_period": "[\"2018-03-22 16:58:32.093486+00\",)",
      "is_latest_version": true,
      "is_community_favorite": true,
      "entity_version_project_rels": [{
        "pk_entity_version_project_rel": 4231,
        "fk_project": 15,
        "fk_entity": 70843,
        "fk_entity_version": 1,
        "fk_entity_version_concat": "70843_1",
        "is_in_project": true,
        "is_standard_in_project": null,
        "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00"
      }]
    },
      teEnt: {
        "fk_class": 5,
        "notes": "TestBirth",
        "pk_entity_version_concat": "70844_1",
        "pk_entity": 70844,
        "entity_version": 1,
        "tmsp_creation": "2018-03-22T16:58:32.093486+00:00",
        "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00",
        "sys_period": "[\"2018-03-22 16:58:32.093486+00\",)",
        "is_latest_version": true,
        "is_community_favorite": true,
        "entity_version_project_rels": [{
          "pk_entity_version_project_rel": 4233,
          "fk_project": 15,
          "fk_entity": 70844,
          "fk_entity_version": 1,
          "fk_entity_version_concat": "70844_1",
          "is_in_project": true,
          "is_standard_in_project": null,
          "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00"
        }],
        "te_roles": [{
          "fk_property": 6,
          "fk_entity": 70831,
          "fk_temporal_entity": 70844,
          "is_in_project_count": 1,
          "is_standard_in_project_count": 0,
          "pk_entity_version_concat": "70843_1",
          "pk_entity": 70843,
          "entity_version": 1,
          "notes": null,
          "tmsp_creation": "2018-03-22T16:58:32.093486+00:00",
          "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00",
          "sys_period": "[\"2018-03-22 16:58:32.093486+00\",)",
          "is_latest_version": true,
          "is_community_favorite": true,
          "entity_version_project_rels": [{
            "pk_entity_version_project_rel": 4231,
            "fk_project": 15,
            "fk_entity": 70843,
            "fk_entity_version": 1,
            "fk_entity_version_concat": "70843_1",
            "is_in_project": true,
            "is_standard_in_project": null,
            "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00"
          }],
          "appellation": {},
          "language": {},
          "time_primitive": {}
        }, {
          "fk_property": 4,
          "fk_entity": null,
          "fk_temporal_entity": 70844,
          "is_in_project_count": 1,
          "is_standard_in_project_count": 0,
          "pk_entity_version_concat": "70846_1",
          "pk_entity": 70846,
          "entity_version": 1,
          "notes": null,
          "tmsp_creation": "2018-03-22T16:58:32.093486+00:00",
          "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00",
          "sys_period": "[\"2018-03-22 16:58:32.093486+00\",)",
          "is_latest_version": true,
          "is_community_favorite": true,
          "entity_version_project_rels": [{
            "pk_entity_version_project_rel": 4232,
            "fk_project": 15,
            "fk_entity": 70846,
            "fk_entity_version": 1,
            "fk_entity_version_concat": "70846_1",
            "is_in_project": true,
            "is_standard_in_project": null,
            "tmsp_last_modification": "2018-03-22T16:58:32.093486+00:00"
          }],
          "appellation": {},
          "language": {},
          "time_primitive": {}
        }, {
          "fk_property": 72,
          "fk_entity": 70851,
          "fk_temporal_entity": 70844,
          "is_in_project_count": 1,
          "is_standard_in_project_count": 0,
          "pk_entity_version_concat": "70850_1",
          "pk_entity": 70850,
          "entity_version": 1,
          "notes": "At some time within",
          "tmsp_creation": "2018-03-22T17:02:32.865136+00:00",
          "tmsp_last_modification": "2018-03-22T17:02:32.865136+00:00",
          "sys_period": "[\"2018-03-22 17:02:32.865136+00\",)",
          "is_latest_version": true,
          "is_community_favorite": true,
          "entity_version_project_rels": [{
            "pk_entity_version_project_rel": 4235,
            "fk_project": 15,
            "fk_entity": 70850,
            "fk_entity_version": 1,
            "fk_entity_version_concat": "70850_1",
            "is_in_project": true,
            "is_standard_in_project": null,
            "calendar": "julian",
            "tmsp_last_modification": "2018-03-22T17:02:32.865136+00:00"
          }],
          "appellation": {},
          "language": {},
          "time_primitive": {
            "fk_class": 335,
            "julian_day": "1971231",
            "duration": "1 day",
            "pk_entity_version_concat": "70851_1",
            "pk_entity": 70851,
            "entity_version": 1,
            "notes": null,
            "tmsp_creation": "2018-03-22T17:02:32.865136+00:00",
            "tmsp_last_modification": "2018-03-22T17:02:32.865136+00:00",
            "sys_period": "[\"2018-03-22 17:02:32.865136+00\",)",
            "is_latest_version": true,
            "is_community_favorite": true
          }
        }]
      }
    },
    template: `
    <div class="d-flex justify-content-center py-5 bg-secondary">
      <div style="width:430px">
        <gv-project-sandbox (projectReady)="projectReady=true" [pkProject]="15" ></gv-project-sandbox>
        <gv-te-ent [teEntState]="'edit'" [teEnt]="teEnt" [parentRole]="parentRole" *ngIf="projectReady"></gv-te-ent>
      </div>
    </div>
    `
  });