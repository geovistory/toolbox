import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'app/modules/quill';
import { ControlMessagesModule } from 'app/shared';

import { KeysModule } from '../../shared/pipes/keys.module';
import { AnnotationViewComponent } from './components/annotation-view/annotation-view.component';
import { ChunkViewComponent } from './components/chunk-view/chunk-view.component';
import { MentionedEntitiesViewComponent } from './components/mentioned-entities-view/mentioned-entities-view.component';
import { MentionedEntityViewComponent } from './components/mentioned-entity-view/mentioned-entity-view.component';
import { AnnotationCtrlComponent } from './containers/annotation-ctrl/annotation-ctrl.component';
import { AnnotationPanelComponent } from './containers/annotation-panel/annotation-panel.component';
import { MentionedEntitiesCtrlComponent } from './containers/mentioned-entities-ctrl/mentioned-entities-ctrl.component';
import { Information2Module } from '../information2/information2.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    QuillModule,
    KeysModule,
    Information2Module
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
