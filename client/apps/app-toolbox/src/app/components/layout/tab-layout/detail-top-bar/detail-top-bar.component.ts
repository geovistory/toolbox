import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'gv-detail-top-bar',
  templateUrl: './detail-top-bar.component.html',
  styleUrls: ['./detail-top-bar.component.scss'],
  standalone: true,
  imports: [FlexModule, NgStyle, ExtendedModule, NgIf, MatButtonModule, MatIconModule]
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

  ngOnInit() {
    this.height = this.height ? this.height : '2.5rem';
  }
}
