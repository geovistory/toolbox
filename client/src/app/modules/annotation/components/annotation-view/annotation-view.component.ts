import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnnotationState } from '../../annotation.models';

/**
 * Simple component that displays the Annotation
 * - input: AnnotationState
 * - output: showEntity(pkEntity)
 * - output: edit()
 * - output: remove()
 * 
 * Show the ChunkViewComponent
 * Show the MentionedEntitiesViewComponent
 * 
 */
@Component({
  selector: 'gv-annotation-view',
  templateUrl: './annotation-view.component.html',
  styleUrls: ['./annotation-view.component.scss']
})
export class AnnotationViewComponent implements OnInit {

  @Input() annotation: AnnotationState;

  @Output() edit: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
