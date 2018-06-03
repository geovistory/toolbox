import { Component, OnInit, Input } from '@angular/core';
import { MentionedEntity } from '../../annotation.models';

/**
 * A (simple) component with a button that leads to the mentioned entity
 * - no store/api interaction
 * - Input: MentionedEntity
 * 
 */
@Component({
  selector: 'gv-mentioned-entity-view',
  templateUrl: './mentioned-entity-view.component.html',
  styleUrls: ['./mentioned-entity-view.component.scss']
})
export class MentionedEntityViewComponent implements OnInit {

    @Input() mentionedEntity: MentionedEntity;

  constructor() { }

  ngOnInit() {
  }

}