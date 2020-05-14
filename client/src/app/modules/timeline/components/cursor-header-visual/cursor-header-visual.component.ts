import { Component, OnInit, Input, ElementRef, DoCheck } from '@angular/core';
import { Cursor } from '../../models/cursor';
import { D3Service } from '../../shared/d3.service';

@Component({
  selector: '[cursorHeaderVisual]',
  templateUrl: './cursor-header-visual.component.html',
  styleUrls: ['./cursor-header-visual.component.scss']
})
export class CursorHeaderVisualComponent implements DoCheck {

  // tslint:disable-next-line:no-input-rename
  @Input('cursorHeaderVisual') cursor: Cursor;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngDoCheck() {
    this.d3Service.placeCursorOnXAxis(this._element.nativeElement, this.cursor.scaleX, this.cursor.julianSecond);
  }

}
