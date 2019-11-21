import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { ScaleLinear } from 'd3';
import { Subject } from 'rxjs';

import { ChartLineData, ChartLine, ChartLinePoint } from '../../../../../../../src/common/interfaces'
import { D3Service } from '../../shared/d3.service';

export interface ActiveLineClickEvent {
  clickedLineIndex: number
  clickedLine: ChartLine
  clickedLinePoint: ChartLinePoint
}
export type ChartLineXAxisValueLabel = (domainX: number, domainY?: number, linePoint?: ChartLinePoint, activeLine?: ChartLine) => string
export interface ChartLineDefinitionConfig {
  data: ChartLineData;
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  width?: number;
  height?: number;
  showCursor?: boolean,
  cursorRangeX?: number;
  labelFn: ChartLineXAxisValueLabel
  cursorChangeFn: (rangeX: number) => void
}
export class ChartLineDefinition {

  // emits when user clicks a active (colored) line
  activeLineClicked$ = new Subject<ActiveLineClickEvent>();

  change$ = new Subject<ChartLineDefinition>();

  constructor(public config: ChartLineDefinitionConfig) { }

  activateLine(i: number, mouseX?: number) {
    this.config.data.activeLine = i;
    this.config.data.mouseX = mouseX;
    this.change$.next(this)
  }

  deactivateLine() {
    this.config.data.activeLine = null;
    this.change$.next(this)
  }
  onActiveLineClick(i: number, clickedLinePoint: ChartLinePoint) {
    this.config.data.activeLine = i;
    this.activeLineClicked$.next({
      clickedLine: this.config.data.chartLines[i],
      clickedLineIndex: i,
      clickedLinePoint,
    })
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[chartLineVisual]',
  templateUrl: './chart-line-visual.component.html',
  styleUrls: ['./chart-line-visual.component.scss']
})
export class ChartLineVisualComponent implements OnInit, OnChanges {

  // tslint:disable-next-line: no-input-rename
  @Input('chartLineVisual') chartLine: ChartLineDefinition;

  constructor(private d3Service: D3Service, private _element: ElementRef) {
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.d3Service.placeChartLineVisual(this._element.nativeElement, this.chartLine);
  }

}
