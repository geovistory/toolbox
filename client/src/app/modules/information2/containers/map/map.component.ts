import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { IAppState, LoopBackConfig, U } from 'app/core';
import { Subject } from 'rxjs';
import { PeItLayerComponent } from '../pe-it-layer/pe-it-layer.component';
import {
  MapsManagerService, ViewerConfiguration, AcMapComponent, MapLayerProviderOptions,
} from '../../../gv-angular-cesium/angular-cesium-fork';

@Component({
  selector: 'gv-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input() path: string[];

  @ViewChild(PeItLayerComponent) peItLayer: PeItLayerComponent;
  @ViewChild(AcMapComponent) acMap: AcMapComponent;

  // DataSouce used to fly to the extent of all entities
  peItDataSource;


  destroy$ = new Subject<boolean>();

  urlTemplateProvider = MapLayerProviderOptions.UrlTemplateImagery;

  /** Configuration for Carto Basemap */
  cartoUrl = LoopBackConfig.getPath() + '/cartodb-basemaps-proxy?s={s}&z={z}&x={x}&y={y}';

  /** Configuration for Aster Basemap */
  asterUrl = LoopBackConfig.getPath() + '/aster-proxy?z={z}&x={x}&y={y}';

  constructor(
    viewerConf: ViewerConfiguration,
    private ngRedux: NgRedux<IAppState>,
  ) {

    viewerConf.viewerOptions = {
      sceneMode: Cesium.SceneMode.SCENE3D,
      selectionIndicator: true,
      infoBox: true,
      timeline: true,
      fullscreenButton: false,
      animation: true,
      shouldAnimate: false,
      homeButton: false,
      geocoder: true,
      navigationHelpButton: true,
      navigationInstructionsInitiallyVisible: false,
      requestRenderMode: true,
      baseLayerPicker: false
    };

  }

  ngAfterViewInit() {
    // register cursor position changes
    const viewer = this.acMap.getCesiumViewer();
    this.ngRedux.select<number>([...this.path, 'timeLineSettings', 'cursorPosition'])
      .takeUntil(this.destroy$)
      .subscribe(pos => {
        if (pos) {
          const julianDate = U.CesiumJulianDateFromJulianSecond(pos);
          viewer.clockViewModel.currentTime = julianDate;
        }
      })

  }

  // fly to entities
  flyToPeItLayerEntities() {

    this.acMap.getCameraService().flyTo(this.peItLayer.getDataSource(), {
      offset: new Cesium.HeadingPitchRange(0.0, -Cesium.Math.PI_OVER_TWO, 20000.0)
    })

  }


  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
