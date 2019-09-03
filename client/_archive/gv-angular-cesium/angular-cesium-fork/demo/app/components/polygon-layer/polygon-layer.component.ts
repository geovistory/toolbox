import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { AcLayerComponent } from '../../../../src/angular-cesium/components/ac-layer/ac-layer.component';
import { ActionType } from '../../../../src/angular-cesium/models/action-type.enum';
import { AcEntity } from '../../../../src/angular-cesium/models/ac-entity';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'polygon-layer',
  templateUrl: 'polygon-layer.component.html',
})
export class PolygonLayerComponent implements OnInit {
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  polygons$: Observable<AcNotification>;
  show = true;
  updater = new Subject<AcNotification>();

  constructor() {
  }

  ngOnInit() {
    const entX: any = new AcEntity({
      hierarchy : Cesium.Cartesian3.fromDegreesArray([
        -115.0, 37.0,
        -115.0, 32.0,
        -107.0, 33.0,
        -102.0, 31.0,
        -102.0, 35.0]),
      outline : true,
      outlineColor: Cesium.Color.BLUE,
      fill: true,
      perPositionHeight: true,
      material : Cesium.Color.TRANSPARENT,
    });

    const entY: any = new AcEntity({
      hierarchy : Cesium.Cartesian3.fromDegreesArray([
        -108.0, 42.0,
        -100.0, 42.0,
        -104.0, 40.0,
      ]),
      outline : true,
      outlineColor: Cesium.Color.BLUE,
      fill: true,
      perPositionHeight: true,
      material : Cesium.Color.TRANSPARENT,

    });
    this.polygons$ = Observable.from([
      {
        id : '0',
        entity : new AcEntity({
         hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([-108.0, 25.0, 100000,
          -100.0, 25.0, 100000,
          -100.0, 30.0, 100000,
          -108.0, 30.0, 300000]),
         extrudedHeight : 0,
         perPositionHeight : true,
         material : Cesium.Color.ORANGE.withAlpha(0.5),
         outline : true,
         outlineColor : Cesium.Color.BLACK
        }),
        actionType : ActionType.ADD_UPDATE
      },
      {
        id : '1',
        entity : new AcEntity({
         hierarchy : {
          positions : Cesium.Cartesian3.fromDegreesArray([-99.0, 30.0,
           -85.0, 30.0,
           -85.0, 40.0,
           -99.0, 40.0]),
          holes : [{
           positions : Cesium.Cartesian3.fromDegreesArray([
            -97.0, 31.0,
            -97.0, 39.0,
            -87.0, 39.0,
            -87.0, 31.0
           ]),
           holes : [{
            positions : Cesium.Cartesian3.fromDegreesArray([
             -95.0, 33.0,
             -89.0, 33.0,
             -89.0, 37.0,
             -95.0, 37.0
            ]),
            holes : [{
             positions : Cesium.Cartesian3.fromDegreesArray([
              -93.0, 34.0,
              -91.0, 34.0,
              -91.0, 36.0,
              -93.0, 36.0
             ])
            }]
           }]
          }]
         },
         material : Cesium.Color.BLUE.withAlpha(0.5),
         height : 0,
         outline : true
        }
        ),
        actionType : ActionType.ADD_UPDATE
      }
    ]).merge(this.updater);

    setTimeout(() => {
      entX.show = true;
      this.updater.next({
        id : 'x',
        actionType : ActionType.ADD_UPDATE,
        entity : entX
      })
    }, 3000);

    setTimeout(() => {
      entY.show = true;
      this.updater.next({
        id : 'y',
        actionType : ActionType.ADD_UPDATE,
        entity : entY
      })
    }, 3000);

    setTimeout(() => {
      entX.show = false;
      this.updater.next({
        id : 'x',
        actionType : ActionType.ADD_UPDATE,
        entity : entX
      })
    }, 4000);


    setTimeout(() => {
      entX.show = true;
      entX.outlineColor = Cesium.Color.RED;
      entX.material = Cesium.Color.BLUE;
      this.updater.next({
        id : 'x',
        actionType : ActionType.ADD_UPDATE,
        entity : entX
      })
    }, 4500);

    setTimeout(() => {
      entY.outlineColor = Cesium.Color.RED;
      entY.material = Cesium.Color.YELLOW;
      this.updater.next({
        id : 'y',
        actionType : ActionType.ADD_UPDATE,
        entity : entY
      })
    }, 5000);
  }
}
