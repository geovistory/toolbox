import { Component, DoCheck, ElementRef, Input } from '@angular/core';
import { Cursor } from '../../models/cursor';
import { D3Service } from '../../shared/d3.service';

@Component({
  selector: '[cursorLineVisual]',
  templateUrl: './cursor-line-visual.component.html',
  styleUrls: ['./cursor-line-visual.component.scss']
})
export class CursorLineVisualComponent implements DoCheck {

  // tslint:disable-next-line:no-input-rename
  @Input('cursorLineVisual') cursor: Cursor;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngDoCheck() {
    this.d3Service.placeCursorOnXAxis(this._element.nativeElement, this.cursor.scaleX, this.cursor.julianSecond);
  }

}
