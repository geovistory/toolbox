/// <reference path="@types/cesium/index.d.ts" />
declare var Cesium;

import { Component, ElementRef, Input, OnDestroy, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CzmlDataSource } from 'app/core';
import { combineLatest, from, Observable, Subject } from 'rxjs';
import { takeUntil, first, map, tap, mapTo, switchMap } from 'rxjs/operators';
import { JulianDate, BoundingSphere } from 'cesium';
import { CesiumService } from '../../services/cesium.service';
import { CzmlPacket } from '../../../../../../../server/src/lb3/common/interfaces';
export interface MapLayers {
  layers: MapLayer[]
}
export interface MapLayer {
  czml: CzmlPacket[]
}

@Component({
  selector: 'gv-map-czml-layers',
  templateUrl: './map-czml-layers.component.html',
  styleUrls: ['./map-czml-layers.component.scss'],
  providers: [CesiumService]
})
export class MapCzmlLayersComponent implements AfterViewInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  viewer: Cesium.Viewer;

  @Input() data$: Observable<MapLayers>
  @Input() julianSecondOfCursor$: Observable<number>

  @ViewChild('cesiumContainer', { static: false }) cesiumContainer: ElementRef
  @ViewChild('baseLayerPickerContainer', { static: false }) baseLayerPickerContainer: ElementRef
  @ViewChild('sceneModePickerContainer', { static: false }) sceneModePickerContainer: ElementRef
  @ViewChild('navigationHelpButtonContainer', { static: false }) navigationHelpButtonContainer: ElementRef

  @Output() objectClicked = new EventEmitter()

  dataSources: Cesium.CzmlDataSource[];

  constructor(private cs: CesiumService) { }

  ngAfterViewInit() {

    this.cs.createCesiumViewer(this.cesiumContainer.nativeElement)
    this.cs.addBaseLayerCartoDbBase()
    this.cs.addBaseLayerOSM()
    this.cs.addBaseLayerPicker(this.baseLayerPickerContainer.nativeElement, 0)
    this.cs.addSceneModePicker(this.sceneModePickerContainer.nativeElement)
    this.cs.addNavigationHelpButton(this.navigationHelpButtonContainer.nativeElement)
    // this.cs.addMouseoverHighlight()
    this.cs.addMouseclickEvent((clickedObject) => {
      this.objectClicked.emit(clickedObject);
    })


    const dataSources$ = this.data$.pipe(
      tap(() => {
        this.cs.viewer.dataSources.removeAll(true);
      }),
      switchMap(data => {
        const d$ = data.layers.map(layer => {
          const dataSource = CzmlDataSource.load(layer.czml)
          this.cs.viewer.dataSources.add(dataSource);
          return from(dataSource)
        })
        return combineLatest(d$)
      }),
      tap(() => {
        this.cs.viewer.scene.requestRender()
      }),
    )

    // subscribe for the first time and zoom to entities
    let isFirst = true;
    dataSources$.pipe(takeUntil(this.destroy$))
      .subscribe(dataSources => {
        this.dataSources = dataSources;
        if (isFirst) {
          isFirst = false;
          this.zoomToEntities();
        }
      })

    if (this.julianSecondOfCursor$) {
      this.julianSecondOfCursor$.pipe(takeUntil(this.destroy$)).subscribe(jSec => {
        const jDay = Math.round(jSec / 86400);
        const secsOfDay = jSec % 86400;
        const j = new JulianDate(jDay, secsOfDay)
        this.cs.viewer.clock.currentTime = j;
      })
    }

  }



  private zoomToEntities() {
    const zoomOptions: Cesium.HeadingPitchRange = {
      heading: 0,
      pitch: -Cesium.Math.PI_OVER_TWO,
      range: 0
    };
    // let entities: Cesium.Entity[] = []
    let positions: Cesium.Cartesian3[] = [];
    const randomDate = new JulianDate(2700000, 0);
    this.dataSources.map(dataSource => {
      // entities = [...entities, ...dataSource.entities.values]
      positions = [...positions, ...dataSource.entities.values.map(v => {
        return v.position.getValue(randomDate);
      })];
    });
    const boundingSphere = BoundingSphere.fromPoints(positions);
    boundingSphere.radius = boundingSphere.radius * 2;
    this.cs.viewer.camera.flyToBoundingSphere(boundingSphere, {
      duration: 0,
      offset: zoomOptions
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


