import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { YAxisDefinition } from '../../models/y-axis-definition';
import { D3Service } from '../../services/d3.service';

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
