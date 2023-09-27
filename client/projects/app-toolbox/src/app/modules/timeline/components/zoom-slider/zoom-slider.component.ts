import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Zoomer } from '../../models/zoomer';

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
  onSlide(e: number) {
    this.zoomer.zoomToLevel(e)
    this.onChange()
  }

  onChange() {
    setTimeout(() => {
      this.change.emit(this.zoomer)
    }, 0);
  }
  createThumbLabel(currentLevel: number) {
    return currentLevel + 1 + "";
  }

}
