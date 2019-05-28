import { Component, OnInit, HostBinding, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gv-detail-top-bar',
  templateUrl: './detail-top-bar.component.html',
  styleUrls: ['./detail-top-bar.component.scss']
})
export class DetailTopBarComponent {

  @Input() closeRightAreaBtn: boolean;
  @Input() openRightAreaBtn: boolean;

  @Output() openRight = new EventEmitter<void>()
  @Output() closeRight = new EventEmitter<void>()

  @HostBinding('class.gv-flex-shrink-0') noshrink = true;

  constructor() { }

}
