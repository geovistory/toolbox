import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AcNotification } from '../../../../../src/angular-cesium/models/ac-notification';
import { AcEntity } from '../../../../../src/angular-cesium/models/ac-entity';
import { ActionType } from '../../../../../src/angular-cesium/models/action-type.enum';

@Component({
	selector : 'polygon-performance-test',
	template : `
      <ac-layer acFor="let polygon of polygons$" [context]="this" [show]="true">
          <ac-polygon-desc props="{
        hierarchy: polygon.hierarchy,
        material: polygon.material,
        height: polygon.height,
        outline: true,
    		}">
          </ac-polygon-desc>
	`,
})
export class PolygonPerformanceTestComponent implements OnInit {
	
	COUNT = 10000;
	POLYGON_POINTS_NUM = 500;
	polygons$: Observable<AcNotification>;
	show = true;
	
	constructor() {
	}
	
	ngOnInit() {
		this.polygons$ = Observable.range(1, this.COUNT).map(index => {
			const entity = new AcEntity({
				hierarchy : this.createPosition(index),
				material : Cesium.Color.fromRandom(),
				height : 0,
				
			});
			return {
				entity,
				id : index.toString(),
				actionType : ActionType.ADD_UPDATE,
			} as AcNotification
		});
	}
	
	createPosition(index: number) {
		const degArray = [];
		
		const initialLat = (index  / 1000) * 10;
		let lat = 40 - initialLat;
		let lon = -100 + index * 2;
		for (let i = 0; i < this.POLYGON_POINTS_NUM; i++) {
			const quarter = Math.floor(i / (this.POLYGON_POINTS_NUM / 4));
			const latSign = quarter === 2 || quarter === 3 ? 1 : -1;
			const lonSign = quarter === 0 || quarter === 3 ? 1 : -1;
			
			
			lat = lat + (latSign * 0.01);
			lon = lon + (lonSign * 0.01);
			degArray.push(lon, lat);
		}
		
		return Cesium.Cartesian3.fromDegreesArray(degArray);
	}
}
