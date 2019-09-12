import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { AcLayerComponent } from '../../../../src/angular-cesium/components/ac-layer/ac-layer.component';
import { AcEntity } from '../../../../src/angular-cesium/models/ac-entity';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { ActionType } from '../../../../src/angular-cesium/models/action-type.enum';
import { ViewerConfiguration } from '../../../../src/angular-cesium/services/viewer-configuration/viewer-configuration.service';
import { MapsManagerService } from '../../../../src/angular-cesium';

@Component({
  selector: 'label-layer',
  templateUrl: 'label-layer.component.html',
})
export class LabelLayerComponent implements OnInit {
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  labelPackets$: Observable<AcNotification>;
  show = true;
  updater = new Subscriber<AcNotification>();

  constructor(private mapsManagerService: MapsManagerService) { }

  ngOnInit() {

    const document = {
      'id': 'document',
      'version': '1.0'
    };

    const packet1 = {
      'id': 'point_1',
      'availability': '2012-08-04T16:00:00Z/2012-08-04T16:05:00Z',
      'position': {
        'epoch': '2012-08-04T16:00:00Z',
        'cartographicDegrees': [
          0, -70, 20, 150000,
          100, -80, 44, 150000,
          200, -90, 18, 150000,
          300, -98, 52, 150000
        ]
      },
      'point': {
        'color': {
          'rgba': [255, 255, 255, 200]
        },
        'outlineColor': {
          'rgba': [255, 0, 0, 200]
        },
        'outlineWidth': 3,
        'pixelSize': 15
      }
    }

    const packet2 = {
      'id': 'fillColor-reference',
      'name': 'Referencing Position',
      'description': '<p>For more examples of reference properties, see CZML Polygon - Interpolating References.</p>',
      'label': {
        'fillColor': {
          'rgba': [255, 255, 255, 255]
        },
        'font': '13pt Lucida Console',
        'horizontalOrigin': 'LEFT',
        'outlineColor': {
          'rgba': [150, 0, 150, 255]
        },
        'outlineWidth': 3,
        'pixelOffset': {
          'cartesian2': [20, 0]
        },
        'style': 'FILL_AND_OUTLINE',
        'text': 'referencing position'
      },
      'position': {
        'reference': 'point_1#position'
      }
    }



    this.labelPackets$ = new Observable(observer => {
      this.updater = observer;

      // Attention, first packet needs to be a document
      // Example: https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=CZML%20Point%20-%20Time%20Dynamic.html&label=CZML
      this.updater.next({
        id: document.id,
        entity: new AcEntity(document),
        actionType: ActionType.ADD_UPDATE
      })

      // add point 1 
      this.updater.next({
        id: packet1.id,
        entity: new AcEntity(packet1),
        actionType: ActionType.ADD_UPDATE
      })

      // add point 2
      this.updater.next({
        id: packet2.id,
        entity: new AcEntity(packet2),
        actionType: ActionType.ADD_UPDATE
      })

    })

  }

}
