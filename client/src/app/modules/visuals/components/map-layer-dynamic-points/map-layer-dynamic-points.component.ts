import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { AcMapComponent, AcNotification, ActionType } from 'angular-cesium';
import { CzmlPacket } from 'app/shared/classes/czml-types';
import { Subject, Observable } from 'rxjs';
import { U } from 'app/core';
import { QueryPoint } from '../map-query-layer/map-query-layer.component';
import { takeUntil } from 'rxjs/operators';
import { CzmlPacketGenerator } from 'app/shared/classes/czml-packet-generator';

export interface MapLayerDynamicPointsData {
  points: QueryPoint[];
  minVal: number;
  maxVal: number;
}

@Component({
  selector: 'gv-map-layer-dynamic-points',
  templateUrl: './map-layer-dynamic-points.component.html',
  styleUrls: ['./map-layer-dynamic-points.component.scss']
})
export class MapLayerDynamicPointsComponent implements OnInit, AfterViewInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() acMap: AcMapComponent;
  @Input() data$: Observable<CzmlPacket[]>
  @ViewChild('czmlDesc', { static: true }) acCzml; // type is AcCzmlDescComponent

  czmlPackets$ = new Subject<AcNotification>()

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.czmlPackets$.next(U.acNotificationFromPacket({
      id: 'document',
      version: '1.0'
    }, ActionType.ADD_UPDATE))


    this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.acCzml.removeAll()
      if (data && data.length) {
        data.forEach(p => {
          this.addPacked(p);
        });
      }
    })

  }


  addPacked(p: CzmlPacket) {
    this.czmlPackets$.next(U.acNotificationFromPacket(p, ActionType.ADD_UPDATE))
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
