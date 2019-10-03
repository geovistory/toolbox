import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AcMapComponent, CesiumService, MapLayerProviderOptions, ViewerConfiguration } from 'angular-cesium';
import { ActiveProjectService, LoopBackConfig, U } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MapQueryLayerSettings } from '../map-query-layer-settings/map-query-layer-settings.component';
import { MapVisualSettings } from '../map-settings/map-settings.component';
import { TimeLineDataSetSettings, TimelineVisualSettings } from '../timeline-visual/timeline-visual.component';


export interface QueryLayer {
  settings: MapQueryLayerSettings
  data: any[]
}

@Component({
  selector: 'gv-map-visual',
  templateUrl: './map-visual.component.html',
  styleUrls: ['./map-visual.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    ViewerConfiguration,
    CesiumService
  ]
})
export class MapVisualComponent implements OnInit, OnDestroy, AfterViewInit {
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(AcMapComponent, { static: true }) acMap: AcMapComponent;

  // initialize a private variable _settings, it's a BehaviorSubject
  _settings$ = new BehaviorSubject<MapVisualSettings>(null);
  @Input() settings$: Observable<MapVisualSettings>;


  // initialize a variable _data, it's a BehaviorSubject
  _data$ = new BehaviorSubject<{ [key: string]: any[] }>({});
  @Input() data$: Observable<{ [key: string]: any[] }>;

  urlTemplateProvider = MapLayerProviderOptions.UrlTemplateImagery;
  /** Configuration for Carto Basemap */
  // cartoUrl = LoopBackConfig.getPath() + '/cartodb-basemaps-proxy?s={s}&z={z}&x={x}&y={y}';
  cartoUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}@2x.png'
  queryLayers$: Observable<QueryLayer[]>;
  timeLineVisualSettings$: Observable<TimelineVisualSettings>;



  constructor(
    private p: ActiveProjectService,
    viewerConf: ViewerConfiguration
  ) {

    viewerConf.viewerOptions = {
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      baseLayerPicker: false,
      sceneMode: Cesium.SceneMode.SCENE2D
      // skyAtmosphere: false,
      // shadows: true
    }

  }

  trackByfn(_, item: QueryLayer) {
    return _
  }

  ngOnInit() {


    this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => this._data$.next(d))
    this.settings$.pipe(takeUntil(this.destroy$)).subscribe(d => this._settings$.next(d))

    this._settings$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(d => {
      console.log(d)
    })

    this._data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(d => {
      console.log(d)
    })

    this.queryLayers$ = combineLatest(this._data$, this._settings$).pipe(
      filter(([d, s]) => !!d && !!s),
      map(([d, s]) => {
        return s.queryLayers.map(l => {

          if (!d || !d[(l.queryPk + '_' + l.queryVersion)]) {
            this.p.loadQueryVersion(l.queryPk, l.queryVersion)
            return;
          }

          const ql: QueryLayer = {
            settings: l,
            data: d[(l.queryPk + '_' + l.queryVersion)]
          }

          return ql;
        })
      })
    )

    this.timeLineVisualSettings$ = this._settings$.pipe(
      filter(s => !!s),
      map(mapVisualSettings => {
        const timelineVisualSettings: TimelineVisualSettings = {
          dataSets: mapVisualSettings.queryLayers.map(ql => {
            const dataSetSettings: TimeLineDataSetSettings = {
              temporalCol: ql.temporalCol,
              queryPk: ql.queryPk,
              queryVersion: ql.queryVersion,
              color: ql.color
            }
            return dataSetSettings;
          })
        }

        return timelineVisualSettings;
      })
    )

  }

  ngAfterViewInit() {
    // improve contrast
    // https://stackoverflow.com/questions/56636467/is-it-normal-this-dark-image-in-cesium
    const cesiumService = this.acMap.getCesiumService();
    const scene = cesiumService.getScene()
    scene.highDynamicRange = false
  }

  onTimeCursorChange(n: number) {
    const julianDate = U.CesiumJulianDateFromJulianSecond(n);
    this.acMap.getCesiumViewer().clockViewModel.currentTime = julianDate;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
