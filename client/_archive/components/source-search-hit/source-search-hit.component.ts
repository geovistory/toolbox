import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISourceSearchHitState } from '../..';


/**
 * A simple component that shows a source search hit
 * - Input: SourceSerchHitState
 */
@Component({
  selector: 'gv-source-search-hit',
  templateUrl: './source-search-hit.component.html',
  styleUrls: ['./source-search-hit.component.scss']
})
export class SourceSearchHitComponent implements OnInit {

  @Input() sourceSearchHit: ISourceSearchHitState;

  @Output() open = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
