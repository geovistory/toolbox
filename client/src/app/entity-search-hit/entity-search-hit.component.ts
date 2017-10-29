import { Component, OnInit, Input } from '@angular/core';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';

@Component({
  selector: 'gv-entity-search-hit',
  templateUrl: './entity-search-hit.component.html',
  styleUrls: ['./entity-search-hit.component.scss']
})
export class EntitySearchHitComponent implements OnInit {

  @Input() persistentItem:PersistentItem;

  constructor() { }

  ngOnInit() {
  }

}
