import { Component, OnInit, HostBinding, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gv-detail-top-bar',
  templateUrl: './detail-top-bar.component.html',
  styleUrls: ['./detail-top-bar.component.scss']
})
export class DetailTopBarComponent implements OnInit {

  @Input() closeRightAreaBtn: boolean;
  @Input() openRightAreaBtn: boolean;

  @Input() closeLeftAreaBtn: boolean;
  @Input() openLeftAreaBtn: boolean;

  @Input() height: string;

  @Output() openRight = new EventEmitter<void>()
  @Output() closeRight = new EventEmitter<void>()

  @Output() openLeft = new EventEmitter<void>()
  @Output() closeLeft = new EventEmitter<void>()

  @HostBinding('class.gv-flex-shrink-0') noshrink = true;

  constructor() { }
  ngOnInit() {
    this.height = this.height ? this.height : '2.5rem';
  }
}
