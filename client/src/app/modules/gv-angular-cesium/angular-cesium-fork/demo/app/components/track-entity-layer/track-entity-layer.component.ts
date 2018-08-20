import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  AcEntity,
  AcNotification,
  ActionType,
  CameraService,
  CesiumEvent,
  MapEventsManagerService,
  PickOptions, SceneMode
} from '../../../../src/angular-cesium';
import { AcLayerComponent } from '../../../../src/angular-cesium';
import { TracksDataProvider } from '../../../utils/services/dataProvider/tracksDataProvider.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material';

const initialLocation = {
  id: '1',
  actionType: ActionType.ADD_UPDATE,
  entity: AcEntity.create({
    width: 10,
    color: Cesium.Color.BLUE,
    position: Cesium.Cartesian3.fromDegrees(32, 40),
  }),
};

@Component({
  selector: 'track-entity-layer',
  templateUrl: 'track-entity-layer.component.html',
  styleUrls: [],
  providers: [TracksDataProvider]
})
export class TrackEntityLayerComponent implements OnInit, AfterViewInit {
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;


  points$: BehaviorSubject<AcNotification> = new BehaviorSubject(initialLocation);
  Cesium = Cesium;
  show = true;

  constructor(private mapEventsManager: MapEventsManagerService,
              private cameraService: CameraService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.cameraService.setSceneMode(SceneMode.SCENE2D);

    setInterval(() => {
      const oldPoint: any = this.points$.getValue().entity;
      const oldPos = Cesium.Cartographic.fromCartesian(oldPoint.position);

      const position = Cesium.Cartesian3.fromRadians(oldPos.longitude + 0.0001, oldPos.latitude);
      this.points$.next({
        id: '1',
        actionType: ActionType.ADD_UPDATE,
        entity: AcEntity.create({
          width: 10,
          color: Cesium.Color.BLUE,
          position,
        }),
      })
    }, 500);


    this.mapEventsManager.register({
      event: CesiumEvent.LEFT_CLICK,
      pick: PickOptions.PICK_ONE
    }).subscribe(result => {
      if (result.cesiumEntities && result.cesiumEntities.length) {
        this.cameraService.trackEntity(result.cesiumEntities[0], { flyTo: true, altitude: 10000 });
      }
    });


  }

  stopTracking() {
    this.cameraService.untrackEntity();

  }

  zoomOut() {
    this.cameraService.untrackEntity();
    this.cameraService.getCamera().zoomOut(50000);
  }

  zoomIn() {
    this.cameraService.untrackEntity();
    this.cameraService.getCamera().zoomIn(10000);
  }

  removeAll() {
    this.layer.removeAll();
  }

  setShow($event: boolean) {
    this.show = $event
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.snackBar.open('Start tracking by clicking on the circle', 'Ok', { duration: 3000 }), 0);
  }

}
