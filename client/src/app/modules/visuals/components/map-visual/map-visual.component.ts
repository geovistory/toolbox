import { Component, OnInit, HostBinding, ViewEncapsulation, Input, OnDestroy, ViewChild } from '@angular/core';
import { MapLayerProviderOptions, AcMapComponent } from 'app/modules/gv-angular-cesium/angular-cesium-fork';
import { LoopBackConfig, ActiveProjectService } from 'app/core';
import { MapSettings } from '../map-settings/map-settings.component';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { MapQueryLayerSettings } from '../map-query-layer-settings/map-query-layer-settings.component';

export interface QueryLayer {
  settings: MapQueryLayerSettings
  data: any[]
}

@Component({
  selector: 'gv-map-visual',
  templateUrl: './map-visual.component.html',
  styleUrls: ['./map-visual.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MapVisualComponent implements OnInit, OnDestroy {
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(AcMapComponent) acMap: AcMapComponent;

  // initialize a private variable _settings, it's a BehaviorSubject
  settings$ = new BehaviorSubject<MapSettings>(null);

  // change settings to use getter and setter
  @Input()
  set settings(value) {
    // set the latest value for _settings BehaviorSubject
    this.settings$.next(value);
  };

  get settings() {
    // get the latest value from _settings BehaviorSubject
    return this.settings$.getValue();
  }

  // initialize a  variable _data, it's a BehaviorSubject
  data$ = new BehaviorSubject<{ [key: string]: any[] }>({});

  // change data to use getter and setter
  @Input()
  set data(value) {
    // set the latest value for _data BehaviorSubject
    this.data$.next(value);
  };

  get data() {
    // get the latest value from _data BehaviorSubject
    return this.data$.getValue();
  }


  urlTemplateProvider = MapLayerProviderOptions.UrlTemplateImagery;
  /** Configuration for Carto Basemap */
  cartoUrl = LoopBackConfig.getPath() + '/cartodb-basemaps-proxy?s={s}&z={z}&x={x}&y={y}';

  queryLayers$: Observable<QueryLayer[]>;

  constructor(private p: ActiveProjectService) { }

  trackByfn(_, item: QueryLayer) {
    return _
  }
  ngOnInit() {

    this.settings$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(d => {
      console.log(d)
    })

    this.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(d => {
      console.log(d)
    })

    this.queryLayers$ = combineLatest(this.data$, this.settings$).pipe(
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
  }

  updateLayers() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
