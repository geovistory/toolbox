import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: '[xAxisVisual]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  standalone: true
})
export class XAxisComponent implements OnChanges {

  @Input('xAxisVisual') xAxis: XAxisDefinition

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnChanges() {
    this.initXAxis();
  }

  initXAxis() {
    this.d3Service.applyXAxis(this._element.nativeElement, this.xAxis);
  }

}
