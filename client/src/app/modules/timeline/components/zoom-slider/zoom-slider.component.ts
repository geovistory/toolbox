import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Zoomer } from '../../models/zoomer';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'gv-zoom-slider',
  templateUrl: './zoom-slider.component.html',
  styleUrls: ['./zoom-slider.component.scss']
})
export class ZoomSliderComponent implements OnInit {

  @Input() zoomer: Zoomer;

  @Output() change = new EventEmitter<Zoomer>()
  constructor() { }

  ngOnInit() {
  }
  onSlide(e: MatSliderChange) {
    this.zoomer.zoomToLevel(e.value)
    this.onChange()
  }

  onChange() {
    setTimeout(() => {
      this.change.emit(this.zoomer)
    }, 0);
  }
  createThumbLabel(currentLevel: number) {
    return currentLevel + 1;
  }

}
