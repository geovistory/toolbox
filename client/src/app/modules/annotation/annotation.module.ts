import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationPanelComponent } from './containers/annotation-panel/annotation-panel.component';
import { AnnotationViewComponent } from './components/annotation-view/annotation-view.component';
import { AnnotationCtrlComponent } from './containers/annotation-ctrl/annotation-ctrl.component';
import { ChunkViewComponent } from './components/chunk-view/chunk-view.component';
import { MentionedEntitiesViewComponent } from './components/mentioned-entities-view/mentioned-entities-view.component';
import { MentionedEntityViewComponent } from './components/mentioned-entity-view/mentioned-entity-view.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnnotationPanelComponent, AnnotationViewComponent, AnnotationCtrlComponent],
  exports: [
    AnnotationPanelComponent
  ]
})
export class AnnotationModule { }
