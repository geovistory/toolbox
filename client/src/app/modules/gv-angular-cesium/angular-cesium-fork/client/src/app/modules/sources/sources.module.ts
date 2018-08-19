import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SourcesRoutingModule } from './sources-routing.module';

import { SourceSearchHitComponent } from './components/source-search-hit/source-search-hit.component';
import { SourceCreateFormComponent } from './components/source-create-form/source-create-form.component';
import { SourceListComponent } from './containers/source-list/source-list.component';
import { SourceDetailComponent } from './containers/source-detail/source-detail.component';
import { KeysModule } from '../../shared/pipes/keys.module';
import { QuillModule } from '../quill';
import { AnnotationModule } from '../annotation';
import { SourceListActions } from './containers/source-list/source-list.actions';
import { SourceDetailActions } from './containers/source-detail/source-detail.actions';
import { AnnotationPanelActions } from '../annotation/containers/annotation-panel/annotation-panel.actions';
import { AnnotationCtrlActions } from '../annotation/containers/annotation-ctrl/annotation-ctrl.actions';
import { MentionedEntityCtrlActions } from '../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SourcesRoutingModule,
    KeysModule,
    AnnotationModule,
    QuillModule,
  ],
  providers:[
    SourceListActions,
    SourceDetailActions,
    AnnotationPanelActions,
    AnnotationCtrlActions,
    MentionedEntityCtrlActions
  ],
  declarations: [
    SourceSearchHitComponent,
    SourceCreateFormComponent,
    SourceListComponent,
    SourceDetailComponent,
  ]
})
export class SourcesModule { }
