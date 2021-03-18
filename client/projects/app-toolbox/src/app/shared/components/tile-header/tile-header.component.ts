import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gv-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss']
})
export class TileHeaderComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
