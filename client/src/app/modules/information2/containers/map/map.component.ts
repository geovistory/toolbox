import { Component, ViewEncapsulation, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ViewerConfiguration, MapsManagerService } from 'angular-cesium';
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

  constructor(
    viewerConf: ViewerConfiguration,
    private mapsManagerService: MapsManagerService,
    private ngRedux: NgRedux<IAppState>,
  ) {

    const baseUrl = LoopBackConfig.getPath();

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
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        subdomains: 'abc',
        url: (baseUrl + '/cartodb-basemaps-proxy?s={s}&z={z}&x={x}&y={y}')
      }),
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
