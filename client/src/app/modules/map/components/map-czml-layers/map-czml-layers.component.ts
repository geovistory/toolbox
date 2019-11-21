/// <reference path="../../../../../../node_modules/@types/cesium/index.d.ts" />
declare var Cesium;

import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { CzmlDataSource } from 'app/core';
import { combineLatest, from, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapLayers } from './map-czml-layers.sandbox';
import { JulianDate } from 'cesium';


@Component({
  selector: 'gv-map-czml-layers',
  templateUrl: './map-czml-layers.component.html',
  styleUrls: ['./map-czml-layers.component.scss']
})
export class MapCzmlLayersComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  viewer: Cesium.Viewer;

  @Input() data$: Observable<MapLayers>
  @Input() julianSecondOfCursor$: Observable<number>


  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.viewer = new Cesium.Viewer(this.el.nativeElement);
    this.viewer.scene.debugShowFramesPerSecond = true;
    this.viewer.scene.requestRenderMode = true;
    this.viewer.resolutionScale = 2;

    this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.viewer.dataSources.removeAll(true);

      const dataSources$ = data.layers.map(layer => {
        const dataSource = CzmlDataSource.load(layer.czml)
        this.viewer.dataSources.add(dataSource);
        return from(dataSource)
      })

      const zoomOptions: Cesium.HeadingPitchRange = {
        heading: 0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        range: 0
      }

      combineLatest(dataSources$).subscribe(dataSources => {
        let entities: Cesium.Entity[] = []
        dataSources.map(dataSource => {
          entities = [...entities, ...dataSource.entities.values]
        })
        this.viewer.zoomTo(entities, zoomOptions)
      })


    })

    this.julianSecondOfCursor$.pipe(takeUntil(this.destroy$)).subscribe(jSec => {
      const jDay = Math.round(jSec / 86400);
      const secsOfDay = jSec % 86400;
      const j = new JulianDate(jDay, secsOfDay)
      this.viewer.clock.currentTime = j;
    })

  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


