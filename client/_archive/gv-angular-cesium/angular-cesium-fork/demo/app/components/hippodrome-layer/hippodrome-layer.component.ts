import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { CesiumService } from '../../../../src/angular-cesium/services/cesium/cesium.service';
import { ActionType } from '../../../../src/angular-cesium/models/action-type.enum';

@Component({
	selector : 'hippodrome-layer',
	template : `
      <ac-layer acFor="let track of simTracks$" [context]="this">
          <ac-corridor-desc props="{
														positions: track.positions,
														 cornerType: Cesium.CornerType.ROUNDED,
														 material: track.color,
														 width : 200000.0
														}">
          </ac-corridor-desc>
      </ac-layer>
	`,
	providers : []
})
export class HippodromeLayerComponent implements OnInit {
	
	simTracks$: Observable<AcNotification> = Observable.of({
			id : '1',
			actionType : ActionType.ADD_UPDATE,
			entity : {
				color : Cesium.Color.RED.withAlpha(0.5),
				positions : Cesium.Cartesian3.fromDegreesArray([
					-90.0, 40.0,
					-93.0, 40.0,
				]),
			}
		},
		{
			id : '2',
			actionType : ActionType.ADD_UPDATE,
			entity : {
				color : Cesium.Color.BLUE.withAlpha(0.5),
				positions : Cesium.Cartesian3.fromDegreesArray([
					-92.0, 38.0,
					-93.0, 38.0,
				]),
			}
		});
	
	Cesium = Cesium;
	show = true;
	
	constructor(private cesiumService: CesiumService) {
	}
	
	ngOnInit() {
		const viewer = this.cesiumService.getViewer();
		viewer.camera.flyTo({destination : this.Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 1000000)});
	}
	
	
}
