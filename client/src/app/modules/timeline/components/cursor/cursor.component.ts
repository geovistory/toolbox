import { Component, DoCheck, Input, ElementRef } from '@angular/core';
import { Cursor } from '../../models/cursor';
import { D3Service } from '../../shared/d3.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[cursorVisual]',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorVisualComponent implements DoCheck {

  // tslint:disable-next-line:no-input-rename
  @Input('cursorVisual') cursor: Cursor;

  isDragged = false;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngDoCheck() {
    this.d3Service.placeCursorOnXAxis(this._element.nativeElement, this.cursor.timeline, this.cursor.julianSecond);
  }


  onDragStart() {
    this.isDragged = true;
  }

  onDrag() {
  }

  onDragEnd() {
    this.isDragged = false;
  }


}
