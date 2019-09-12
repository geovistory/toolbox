import { Component, OnInit, ViewChild } from '@angular/core';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { Observable } from 'rxjs';
import { AcLayerComponent } from '../../../../src/angular-cesium/components/ac-layer/ac-layer.component';
import { TracksDataProvider } from '../../../utils/services/dataProvider/tracksDataProvider.service';

@Component({
  selector: 'dynamic-ellipse-layer',
  templateUrl: 'dynamic-ellipse-layer.component.html',
  styleUrls: ['dynamic-ellipse-layer.component.css'],
  providers: [TracksDataProvider]
})
export class DynamicEllipseLayerComponent implements OnInit {
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  ellipses$: Observable<AcNotification>;
  Cesium = Cesium;
  show = true;

  constructor(private tracksDataProvider: TracksDataProvider) {
  }

  ngOnInit() {
    this.ellipses$ = this.tracksDataProvider.get();
  }

  removeAll() {
    this.layer.removeAll();
  }

  setShow($event: boolean) {
    this.show = $event;
  }
}
