import { Component, OnInit, Input } from '@angular/core';
import { MentionedEntity } from '../../annotation.models';

/** 
 * A (simple) component
 * - no store/api interaction
 * - Input: MentionedEntity[]
 * 
 * For each entity in entities add a MentionedEntityViewComponent passing in the mE and show a button with (click)="remove()""
 */
@Component({
  selector: 'gv-mentioned-entities-view',
  templateUrl: './mentioned-entities-view.component.html',
  styleUrls: ['./mentioned-entities-view.component.scss']
})
export class MentionedEntitiesViewComponent implements OnInit {

  @Input() mentionedEntities: { [key: string]: MentionedEntity };


  constructor() { }

  ngOnInit() {
  }

}

