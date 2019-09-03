
import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { IAppState, LoopBackConfig, U } from 'app/core';
import { BasicService } from 'app/core/basic/basic.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, startWith, takeUntil } from 'rxjs/operators';
import { AcMapComponent, MapLayerProviderOptions, ViewerConfiguration } from 'angular-cesium';
import { PeItLayerComponent } from '../pe-it-layer/pe-it-layer.component';

@Component({
  selector: 'gv-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() pkEntity: number;
  @Input() timeFilter$: Observable<number>;

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

  dontZoomToBrowserLocation$: Observable<boolean>;
  zoomedToBrowserLocation$ = new Subject<boolean>();

  constructor(
    viewerConf: ViewerConfiguration,
    private ngRedux: NgRedux<IAppState>,
    private basic: BasicService
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
  ngOnInit() {

  }


  ngAfterViewInit() {

    // set this flag to true, as soon as peItLayer zoomed or this component zoomed to browser location
    this.dontZoomToBrowserLocation$ = combineLatest(
      this.peItLayer.zoomed$.pipe(startWith(false)),
      this.zoomedToBrowserLocation$.pipe(startWith(false)),
      this.destroy$.pipe(startWith(false))
    ).pipe(
      first(d => d.includes(true)),
      map(() => {
        return true
      })
    )


    const viewer = this.acMap.getCesiumViewer();

    // Set initial view
    this.basic.geoPosition$.pipe(takeUntil(this.dontZoomToBrowserLocation$)).subscribe((position) => {
      if (position) {
        // fly to browser geolocation
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 2000000.0)
        });
        this.zoomedToBrowserLocation$.next(true)
      }
      else {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(7, 47, 8000000.0)
        });
      }
    })


    // set resolution Scale (for clean rendering on retina displays)
    viewer.resolutionScale = window.devicePixelRatio;

    // remove the default imagery layer in order to reduce unnessecary traffic
    const imgLayers = viewer.scene.imageryLayers;
    imgLayers.remove(imgLayers.get(0), true)

    // register cursor position changes
    if (this.timeFilter$) {
      this.timeFilter$.pipe(takeUntil(this.destroy$))
        .subscribe(pos => {
          if (pos) {
            const julianDate = U.CesiumJulianDateFromJulianSecond(pos);
            viewer.clockViewModel.currentTime = julianDate;
          }
        })
    }

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
