import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ViewerConfiguration } from 'angular-cesium';

@Component({
  selector: 'gv-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {

  @Input() path: string[];

  constructor(viewerConf: ViewerConfiguration) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: true,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: true,
      animation: true,
      shouldAnimate: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: true,
      requestRenderMode : true
    };

  }

}
