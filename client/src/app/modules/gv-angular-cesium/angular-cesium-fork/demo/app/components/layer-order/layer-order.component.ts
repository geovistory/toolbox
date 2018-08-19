import { Component, OnInit } from '@angular/core';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { TracksDataProvider } from '../../../utils/services/dataProvider/tracksDataProvider.service';
import { ActionType } from '../../../../src/angular-cesium/models/action-type.enum';
import { WebSocketSupplier } from '../../../utils/services/webSocketSupplier/webSocketSupplier';
import { AcEntity } from '../../../../src/angular-cesium/models/ac-entity';
import { Observable } from 'rxjs/Observable';
import { PickOptions } from '../../../../src/angular-cesium/services/map-events-mananger/consts/pickOptions.enum';
import { CesiumEvent } from '../../../../src/angular-cesium/services/map-events-mananger/consts/cesium-event.enum';
import { MapEventsManagerService } from '../../../../src/angular-cesium/services/map-events-mananger/map-events-manager';

@Component({
  selector: 'layer-order-example',
  template: `
      <ac-layer acFor="let track of simTracks1$" [context]="this" [zIndex]="firstZIndex">
          <ac-ellipse-desc props="{
														position: track.position,
														semiMajorAxis:450000.0,
														semiMinorAxis:280000.0,
														granularity:0.014,
														material: Cesium.Color.GREEN
					}"></ac-ellipse-desc>
      </ac-layer>
      
      <ac-layer acFor="let track of simTracks2$" [context]="this" [zIndex]="secondZIndex">
          <ac-ellipse-desc props="{
														position: track.position,
														semiMajorAxis:500000.0,
														semiMinorAxis:200000.0,
														granularity:0.014,
														material: Cesium.Color.RED
					}"></ac-ellipse-desc>
      </ac-layer>
      
      <ac-layer acFor="let polygon of polygons$" [context]="this" [zIndex]="thirdZIndex">
          <ac-polygon-desc props="{
														hierarchy: polygon.hierarchy,
                            material: polygon.material
					}"></ac-polygon-desc>
      </ac-layer>
      
      <button mat-raised-button style="position: fixed; top: 200px;left: 200px" (click)="changeZIndex()">
          change order
      </button>
  `,
  providers: [TracksDataProvider]
})
export class LayerOrderComponent implements OnInit {

  Cesium = Cesium;
  simTracks1$: Observable<AcNotification> = Observable.of({
    id: '1',
    actionType: ActionType.ADD_UPDATE,
    entity: new AcEntity({
      position: Cesium.Cartesian3.fromDegrees(-90, 40),
    })
  });
  simTracks2$: Observable<AcNotification> = Observable.of({
    id: '2',
    actionType: ActionType.ADD_UPDATE,
    entity: new AcEntity({
      position: Cesium.Cartesian3.fromDegrees(-90, 40),
    })
  });

  polygons$: Observable<AcNotification> = Observable.of({
    id : '30',
    entity : new AcEntity({
      hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([-90, 40, 0,
        -100.0, 25.0, 0,
        -100.0, 30.0, 0,
        -108.0, 30.0, 0]),
      perPositionHeight : false,
      material : Cesium.Color.ORANGE,
      outline : true,
      outlineColor : Cesium.Color.BLACK,
    }),
    actionType : ActionType.ADD_UPDATE
  });

  show = true;
  firstZIndex = 0;
  secondZIndex = 1;
  thirdZIndex = 2;

  constructor(webSocketSupllier: WebSocketSupplier, private eventManager: MapEventsManagerService) {
  }

  ngOnInit() {
    this.eventManager.register({
      event: CesiumEvent.LEFT_CLICK,
      pick: PickOptions.PICK_FIRST
    })
      .map((result) => result.cesiumEntities)
      .filter(result => result !== null && result !== undefined)
      .subscribe((result) => {
        console.log(result[0]);
        alert(result[0].ellipse.material.color._value);
      });
  }

  changeZIndex() {
    this.firstZIndex  = (this.firstZIndex + 1) % 3;
    this.secondZIndex  = (this.secondZIndex + 1) % 3;
    this.thirdZIndex  = (this.thirdZIndex + 1) % 3;
  }
}
