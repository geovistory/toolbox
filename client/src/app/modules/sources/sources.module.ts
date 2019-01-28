import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PassiveLinkModule } from 'app/shared';
import { KeysModule } from '../../shared/pipes/keys.module';
import { AnnotationCtrlActions } from '../annotation/containers/annotation-ctrl/annotation-ctrl.actions';
import { AnnotationPanelActions } from '../annotation/containers/annotation-panel/annotation-panel.actions';
import { MentionedEntityCtrlActions } from '../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
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




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SourcesRoutingModule,
    KeysModule,
    // AnnotationModule,
    QuillModule,
    PassiveLinkModule,
    Information2Module,
    NgbModule
  ],
  providers: [
    SourceListAPIActions,
    AnnotationPanelActions,
    AnnotationCtrlActions,
    MentionedEntityCtrlActions,
    SourceListAPIEpics,
    SourceListAPIActions,
    SourceDetailAPIEpics,
    SourceDetailAPIActions,
  ],
  exports: [
    SourceListComponent,
    SourceDetailComponent
  ],
  declarations: [
    SourceSearchHitComponent,
    SourceCreateFormComponent,
    SourceListComponent,
    SourceDetailComponent
  ]
})
export class SourcesModule { }
