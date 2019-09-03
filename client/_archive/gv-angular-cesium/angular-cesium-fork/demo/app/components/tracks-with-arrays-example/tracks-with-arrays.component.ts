import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { AcLayerComponent } from '../../../../src/angular-cesium/components/ac-layer/ac-layer.component';
import { MapEventsManagerService } from '../../../../src/angular-cesium/services/map-events-mananger/map-events-manager';
import { CesiumEvent } from '../../../../src/angular-cesium/services/map-events-mananger/consts/cesium-event.enum';
import { PickOptions } from '../../../../src/angular-cesium/services/map-events-mananger/consts/pickOptions.enum';
import { AppSettingsService } from '../../services/app-settings-service/app-settings-service';
import { SimTracksDataProvider } from '../../../utils/services/dataProvider/sim-tracks-data-provider';

@Component({
  selector: 'tracks-with-arrays',
  templateUrl: './tracks-with-arrays.component.html',
  providers: [SimTracksDataProvider],
})
export class TracksWithArraysComponent implements OnInit, OnChanges {
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  @Input()
  show: boolean;

  private tracks$: ConnectableObservable<AcNotification>;
  private Cesium = Cesium;
  private lastPickTrack: any;

  constructor(private mapEventsManager: MapEventsManagerService,
              simDataProvider: SimTracksDataProvider,
              private appSettingsService: AppSettingsService) {
    this.tracks$ = simDataProvider.get().publish();
    this.tracks$.connect();
  }

  ngOnInit() {
    const mouseOverObservable = this.mapEventsManager.register({
      event: CesiumEvent.MOUSE_MOVE,
      pick: PickOptions.PICK_FIRST,
      priority: 2,
    });

    // Change color on hover
    mouseOverObservable.subscribe((event) => {
      const track = event.entities !== null ? event.entities[0] : null;
      if (this.lastPickTrack && (!track || track.id !== this.lastPickTrack.id)) {
        this.lastPickTrack.picked = false;
        this.layer.update(this.lastPickTrack, this.lastPickTrack.id);
      }
      if (track && (!this.lastPickTrack || track.id !== this.lastPickTrack.id)) {
        track.picked = true;
        this.layer.update(track, track.id);
      }
      this.lastPickTrack = track;
    });
  }

  getSingleTrackObservable(trackId: string) {
    return this.tracks$
      .filter((notification) => notification.id === trackId).map((notification) => notification.entity);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      this.show = changes['show'].currentValue;

    }
  }

  getTrackColor(track: any): any {
    if (track.dialogOpen) {
      return Cesium.Color.GREENYELLOW;
    }
    if (track.picked) {
      return Cesium.Color.YELLOW;
    }
    return track.isTarget ? Cesium.Color.BLACK : Cesium.Color.fromCssColorString('#673ab7');
  }

  getTextColor(): any {
    return Cesium.Color.BLACK;
  }

  getPolylineColor() {
    return new Cesium.Color(0.3, 1.0, 0.3, 1.0);
  }

  trackArrayIdGetter(entity: any): string {
    return entity.id;
  }

  showVelocityVectors(): boolean {
    return this.appSettingsService.showVelocityVectors;
  }

  showEllipses(): boolean {
    return this.appSettingsService.showEllipses;
  }

  removeAll() {
    this.layer.removeAll();
  }

  setShow($event: boolean) {
    this.show = $event;
  }
}

