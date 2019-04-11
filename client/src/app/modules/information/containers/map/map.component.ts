import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, Input, OnDestroy, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { IAppState, LoopBackConfig, U } from 'app/core';
import { Subject } from 'rxjs';
import { AcMapComponent, MapLayerProviderOptions, ViewerConfiguration } from '../../../gv-angular-cesium/angular-cesium-fork';
import { PeItLayerComponent } from '../pe-it-layer/pe-it-layer.component';

@Component({
  selector: 'gv-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input() path: string[];

  @Output() close = new EventEmitter<void>();

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

  // while true, loading spinner is visible
  isLoading = true;

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
      baseLayerPicker: false,
      resolutionScale: 2
    };

  }



  ngAfterViewInit() {
    const viewer = this.acMap.getCesiumViewer();

    // set resolution Scale (for clean rendering on retina displays)
    viewer.resolutionScale = window.devicePixelRatio;

    // remove the default imagery layer in order to reduce unnessecary traffic
    const imgLayers = viewer.scene.imageryLayers;
    imgLayers.remove(imgLayers.get(0), true)

    // register cursor position changes
    this.ngRedux.select<number>([...this.path, 'peItTimeline', 'timeLineSettings', 'cursorPosition'])
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
    const dataSource = this.peItLayer.getDataSource()
    // if only one entity, set some distance from ground, else 0.0
    const distance = dataSource.entities.values.length === 1 ? 200000 : 0.0;

    this.acMap.getCameraService().flyTo(dataSource, {
      offset: new Cesium.HeadingPitchRange(0.0, -Cesium.Math.PI_OVER_TWO, 0.0)
    })

  }


  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
