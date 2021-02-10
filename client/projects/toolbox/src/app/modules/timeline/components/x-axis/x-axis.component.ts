import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import { D3Service } from '../../shared/d3.service';
import { XAxisDefinition } from '../../models/x-axis-definition';

@Component({
  selector: '[xAxisVisual]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss']
})
export class XAxisComponent implements OnChanges {

  @Input('xAxisVisual') xAxis:XAxisDefinition

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnChanges() {
    this.initXAxis();
  }

  initXAxis(){
    this.d3Service.applyXAxis(this._element.nativeElement, this.xAxis);
  }

}
