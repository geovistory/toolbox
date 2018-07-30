import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { addMiddleware, removeMiddleware } from 'redux-dynamic-middlewares'
import { PeItPresenceLayerAPIEpics } from './api/pe-it-presence-layer.epics';
import { NgRedux } from '@angular-redux/store';
import { IAppState, U } from 'app/core';
import { AcLayerComponent, AcNotification, AcEntity, ActionType } from 'angular-cesium';
import { Observable, Subject, } from 'rxjs';
import { path } from 'ramda'

@Component({
  selector: 'gv-pe-it-presence-layer',
  templateUrl: './pe-it-presence-layer.component.html',
  styleUrls: ['./pe-it-presence-layer.component.scss']
})
export class PeItPresenceLayerComponent implements OnInit, OnDestroy {

  @Input() path: string[];

  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  czmlPackets$: Observable<AcNotification>;
  show = true;
  updater = new Subject<AcNotification>();

  reduxMiddlewares = [];

  constructor(
    private epics: PeItPresenceLayerAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit(): void {
    this.reduxMiddlewares = this.epics.createEpics(this)
    this.reduxMiddlewares.forEach(mw => addMiddleware(mw))

    const peItDetail = path(this.path, this.ngRedux.getState())

    const acNotications = U.presencesFromPeIt(peItDetail)
      .map(presence => U.czmlPacketFromPresence(presence))
      .map(czmlPacket => U.acNotificationFromPacket(czmlPacket, ActionType.ADD_UPDATE));

    // init stream of czml packets
    this.czmlPackets$ = Observable.from(
      [
        U.acNotificationFromPacket({
          "id": "document",
          "version": "1.0"
        }, ActionType.ADD_UPDATE),
        // U.acNotificationFromPacket({
        //   "id": "point",
        //   "availability": "2012-08-04T16:00:00Z/2012-08-04T16:10:00Z",
        //   "position": {
        //     "epoch": "2012-08-04T16:00:00Z",
        //     "cartographicDegrees": [
        //       0, -70, 20, 150000,
        //       100, -80, 44, 150000,
        //       200, -90, 18, 150000,
        //       300, -98, 52, 150000
        //     ]
        //   },
        //   "point": {
        //     "color": {
        //       "rgba": [255, 255, 255, 128]
        //     },
        //     "outlineColor": {
        //       "rgba": [255, 0, 0, 128]
        //     },
        //     "outlineWidth": 3,
        //     "pixelSize": 15
        //   }
        // }, ActionType.ADD_UPDATE),
        ...acNotications
      ]
    ).merge(this.updater)

  }

  // update or add a czml packet to the layer
  update(packet) {
    if (packet) this.updater.next(U.acNotificationFromPacket(packet, ActionType.ADD_UPDATE))
  }


  // remove a czml packet from the layer
  remove(entityId: string) {
    this.layer.remove(entityId)
  }

  ngOnDestroy() {
    this.reduxMiddlewares.forEach(mw => removeMiddleware(mw))
  }




}
