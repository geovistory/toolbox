import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import { D3Service } from '../../shared/d3.service';
import { YAxisDefinition } from '../../models/y-axis-definition';

@Component({
    selector: '[yAxisVisual]',
    templateUrl: './y-axis.component.html',
    styleUrls: ['./y-axis.component.scss'],
    standalone: true
})
export class YAxisComponent implements OnChanges {

  @Input('yAxisVisual') yAxis: YAxisDefinition

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnChanges() {
    this.initYAxis();
  }

  initYAxis() {
    this.d3Service.applyYAxis(this._element.nativeElement, this.yAxis);
  }

}
