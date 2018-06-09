import { NgReduxFormModule } from '@angular-redux/form';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimelineModule } from 'app/modules/timeline/timeline.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from 'app/shared';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { EntityAddModalModule } from './add-modal/entity-add-modal.module';
import { EntitySearchHitModule } from './components/entity-search-hit/entity-search-hit.module';
import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { EntityEditorComponent } from './containers/entity-editor/entity.editor.component';
import { InformationRoutingModule } from './information-routing.module';
import { ClassService } from './shared/class.service';
import { EprService } from './shared/epr.service';
import { PeItService } from './shared/pe-it.service';
import { PropertyService } from './shared/property.service';
import { RoleSetService } from './shared/role-set.service';
import { RoleService } from './shared/role.service';
import { TeEntService } from './shared/te-ent.service';
import { AppellationCtrlComponent } from './value/appellation-ctrl/appellation-ctrl.component';
import { AppellationLabelEditorComponent } from './value/appellation-ctrl/appellation-label-editor/appellation-label-editor.component';
import { AppellationLabelTokenComponent } from './value/appellation-ctrl/appellation-label-token/appellation-label-token.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,

    NgReduxFormModule,
    SlimLoadingBarModule,
    NgbModule,
    // ElasticInputModule,

    // SDKBrowserModule,
    InformationRoutingModule,

    //App wide reusable components
    LanguageSearchTypeaheadModule,
    ControlMessagesModule,
    PassiveLinkModule,
    TimelineModule,
    KeysModule,
    

    // Module wide reusable components
    EntitySearchHitModule

  ],
  declarations: [
    ProjectEntitiesComponent,
    EntityEditorComponent,
    AppellationCtrlComponent,
    AppellationLabelEditorComponent,
    AppellationLabelTokenComponent
  ],
  providers: [
    PeItService,
    TeEntService,
    ClassService,
    PropertyService,
    RoleService,
    EprService,
    RoleSetService,
  ],
  exports: [
    AppellationCtrlComponent,

  ]
})
export class Information2Module { }
