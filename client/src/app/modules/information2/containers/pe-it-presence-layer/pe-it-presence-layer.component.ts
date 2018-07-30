import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AcLayerComponent, AcNotification, ActionType, MapsManagerService } from 'angular-cesium';
import { IAppState, U } from 'app/core';
import { path } from 'ramda';
import { Observable, Subject } from 'rxjs';

import { PeItDetail } from '../../information.models';

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

  // packet ids that are added. used to identify packets to remove upon state change
  packetIds: string[] = [];

  constructor(
    public ngRedux: NgRedux<IAppState>,
    private mapsManagerService: MapsManagerService
  ) { }

  ngOnInit(): void {

    const scene = this.mapsManagerService.getMap().getCesiumSerivce().getScene();

    // init stream of czml packets
    this.czmlPackets$ = Observable.from(
      [
        U.acNotificationFromPacket({
          "id": "document",
          "version": "1.0"
        }, ActionType.ADD_UPDATE)
      ]
    ).merge(this.updater)

    // update czml-packets upon change of state 
    this.ngRedux.select<PeItDetail>(this.path).subscribe(peItDetail => {

      // remove all entities of the layer
      this.layer.removeAll();

      // redraw all entities of the peItDetail
      const presences = U.presencesFromPeIt(peItDetail)
      const processedPrecences = U.czmlPacketsFromPresences(presences);

      processedPrecences.czmlPackets.forEach(czmlPacket => {
        const acNotification = U.acNotificationFromPacket(czmlPacket, ActionType.ADD_UPDATE);
        this.updater.next(acNotification);
      });

      // Explicitly render a new frame
      scene.requestRender();

    })


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
    // this.reduxMiddlewares.forEach(mw => removeMiddleware(mw))
  }




}
