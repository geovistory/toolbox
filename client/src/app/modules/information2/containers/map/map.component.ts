import { Component, ViewEncapsulation, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ViewerConfiguration, MapsManagerService, MapLayerProviderOptions } from 'angular-cesium';
import { NgRedux } from '@angular-redux/store';
import { IAppState, U, LoopBackConfig } from 'app/core';
import { Subject } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'gv-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input() path: string[];

  destroy$ = new Subject<boolean>();

  urlTemplateProvider = MapLayerProviderOptions.UrlTemplateImagery;

  /** Configuration for Carto Basemap */
  cartoUrl = LoopBackConfig.getPath() + '/cartodb-basemaps-proxy?s={s}&z={z}&x={x}&y={y}';

  /** Configuration for Aster Basemap */
  asterUrl = LoopBackConfig.getPath() + '/aster-proxy?z={z}&x={x}&y={y}';

  constructor(
    viewerConf: ViewerConfiguration,
    private mapsManagerService: MapsManagerService,
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
    const viewer = this.mapsManagerService.getMap().getCesiumViewer();

    this.ngRedux.select<number>([...this.path, 'timeLineSettings', 'cursorPosition'])
      .takeUntil(this.destroy$)
      .subscribe(pos => {
        if (pos) {
          const julianDate = U.CesiumJulianDateFromJulianSecond(pos);
          viewer.clockViewModel.currentTime = julianDate;
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
