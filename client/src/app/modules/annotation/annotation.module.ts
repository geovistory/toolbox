import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationPanelComponent } from './containers/annotation-panel/annotation-panel.component';
import { AnnotationViewComponent } from './components/annotation-view/annotation-view.component';
import { AnnotationCtrlComponent } from './containers/annotation-ctrl/annotation-ctrl.component';
import { ChunkViewComponent } from './components/chunk-view/chunk-view.component';
import { MentionedEntitiesViewComponent } from './components/mentioned-entities-view/mentioned-entities-view.component';
import { MentionedEntityViewComponent } from './components/mentioned-entity-view/mentioned-entity-view.component';
import { MentionedEntitiesCtrlComponent } from './containers/mentioned-entities-ctrl/mentioned-entities-ctrl.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from 'app/shared/pipes/keys.pipe';
import { ControlMessagesModule } from 'app/shared';
import { KeysModule } from '../../shared/pipes/keys.module';
import { QuillModule } from 'app/modules/quill';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    QuillModule,
    KeysModule
  ],
  declarations: [
    AnnotationPanelComponent, 
    AnnotationCtrlComponent, 
    MentionedEntitiesCtrlComponent,
    AnnotationViewComponent, 
    ChunkViewComponent,
    MentionedEntitiesViewComponent,
    MentionedEntityViewComponent,        
  ],
  providers: [  
  ],
  exports: [
    AnnotationPanelComponent,
  ]
})
export class AnnotationModule { }
