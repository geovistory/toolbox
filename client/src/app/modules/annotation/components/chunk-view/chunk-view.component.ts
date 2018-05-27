import { Component, OnInit, Input } from '@angular/core';
import { Chunk } from '../../annotation.models';

/**
 * a simple component to display a Chunk
 * - Input: Chunk
 */
@Component({
  selector: 'gv-chunk-view',
  templateUrl: './chunk-view.component.html',
  styleUrls: ['./chunk-view.component.scss']
})
export class ChunkViewComponent implements OnInit {

  @Input() chunk: Chunk;

  constructor() { }

  ngOnInit() {
  }

}
