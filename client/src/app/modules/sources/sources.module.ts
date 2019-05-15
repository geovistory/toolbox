import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PassiveLinkModule } from 'app/shared';
import { KeysModule } from '../../shared/pipes/keys.module';
import { Information2Module } from '../information/information.module';
import { QuillModule } from '../quill';
import { SourceCreateFormComponent } from './components/source-create-form/source-create-form.component';
import { SourceSearchHitComponent } from './components/source-search-hit/source-search-hit.component';
import { SourceListAPIActions } from './containers/source-list/api/source-list.actions';
import { SourceListAPIEpics } from './containers/source-list/api/source-list.epics';
import { SourceListComponent } from './containers/source-list/source-list.component';
import { SourcesRoutingModule } from './sources-routing.module';
import { SourceDetailComponent } from './containers/source-detail/source-detail.component';
import { SourceDetailAPIEpics } from './containers/source-detail/api/source-detail.epics';
import { SourceDetailAPIActions } from './containers/source-detail/api/source-detail.actions';
import { SectionDetailComponent } from './containers/section-detail/section-detail.component';
import { SectionDetailAPIEpics } from './containers/section-detail/api/section-detail.epics';
import { SectionDetailAPIActions } from './containers/section-detail/api/section-detail.actions';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SourcesRoutingModule,
    KeysModule,
    ListDrawerHeaderModule,
    QuillModule,
    PassiveLinkModule,
    Information2Module,
    EntityPreviewModule,
    NgbModule
  ],
  providers: [
    SourceListAPIActions,
    SourceListAPIEpics,
    SourceListAPIActions,
    SourceDetailAPIEpics,
    SourceDetailAPIActions,
    SectionDetailAPIEpics,
    SectionDetailAPIActions,
  ],
  exports: [
    SourceListComponent,
    SourceDetailComponent,
    SectionDetailComponent
  ],
  declarations: [
    SourceSearchHitComponent,
    SourceCreateFormComponent,
    SourceListComponent,
    SourceDetailComponent,
    SectionDetailComponent
  ]
})
export class SourcesModule { }
