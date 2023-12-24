import { Component, OnInit, Input } from '@angular/core';
import { Point } from '../../models/point';

@Component({
    selector: '[pointVisual]',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss'],
    standalone: true
})
export class PointComponent implements OnInit {

  @Input('pointVisual') point: Point

  constructor() { }

  ngOnInit() {
  }

}
