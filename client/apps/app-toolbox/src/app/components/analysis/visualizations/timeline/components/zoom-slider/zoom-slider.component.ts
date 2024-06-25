import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Zoomer } from '../../models/zoomer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'gv-zoom-slider',
    templateUrl: './zoom-slider.component.html',
    styleUrls: ['./zoom-slider.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatSliderModule, MatTooltipModule]
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
