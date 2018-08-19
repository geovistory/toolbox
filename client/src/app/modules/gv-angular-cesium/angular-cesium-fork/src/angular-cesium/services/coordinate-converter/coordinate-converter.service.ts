import { Injectable, Optional } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import * as geodesy from 'geodesy';
import {hemisphere, LatLon, LatLonEllipsoidal, Utm} from 'geodesy';
import { Cartesian3 } from '../../models/cartesian3';

const LatLonVectors = geodesy['LatLonVectors']; // doesnt exists on typings

window['geodesy'] = geodesy;

/**
 *  Given different types of coordinates, we provide you a service converting those types to the most common other types.
 *  We are using the geodesy implementation of UTM conversion. see: https://github.com/chrisveness/geodesy.
 *
 * @example
 * import { Component, OnInit } from '@angular/core';
 * import { CoordinateConverter } from 'angular2-cesium';
 *
 * @Component({
 * 		selector:'my-component',
 * 		template:'<div>{{showCartographic}}</div>',
 * 		providers:[CoordinateConverter]
 * })
 * export class MyComponent implements OnInit {
 * 		showCartographic;
 *
 * 		constructor(private coordinateConverter:CoordinateConverter){
 * 		}
 *
 * 		ngOnInit(){
 * 			this.showCartographic = this.coordinateConverter.degreesToCartographic(5, 5, 5);
 *  }
 * }
 *
 */
@Injectable()
export class CoordinateConverter {
	constructor(@Optional() private cesiumService?: CesiumService) {
	}
	
	screenToCartesian3(screenPos: { x: number, y: number }, addMapCanvansBoundsToPos?: boolean) {
		if (!this.cesiumService) {
			throw new Error('ANGULAR2-CESIUM - Cesium service should be provided in order to do screen position calculations');
		}
		else {
			const screenPosition = {...screenPos};
			if (addMapCanvansBoundsToPos) {
				const mapBounds = this.cesiumService.getViewer().canvas.getBoundingClientRect();
				screenPosition.x += mapBounds.left;
				screenPosition.y += mapBounds.top;
			}
			
			const camera = this.cesiumService.getViewer().camera;
			return camera.pickEllipsoid(screenPosition);
		}
	}
	
	screenToCartographic(screenPos: { x: number, y: number }, ellipsoid?: any) {
		return this.cartesian3ToCartographic(this.screenToCartesian3(screenPos), ellipsoid);
	}
	
	cartesian3ToCartographic(cartesian: Cartesian3, ellipsoid?: any) {
		return Cesium.Cartographic.fromCartesian(cartesian, ellipsoid);
	}
	
	degreesToCartographic(longitude: number, latitude: number, height?: number) {
		return Cesium.Cartographic.fromDegrees(longitude, latitude, height);
	}
	
	radiansToCartographic(longitude: number, latitude: number, height?: number) {
		return Cesium.Cartographic.fromRadians(longitude, latitude, height);
	}
	
	degreesToUTM(longitude: number, latitude: number) {
		return new LatLonEllipsoidal(latitude, longitude).toUtm();
	}
	
	UTMToDegrees(zone: number, hemisphereType: hemisphere, easting: number, northing: number) {
		return this.geodesyToCesiumObject(new Utm(zone, hemisphereType, easting, northing).toLatLonE());
	}
	
	private geodesyToCesiumObject(geodesyRadians: LatLon) {
		return {
			longitude : geodesyRadians.lon,
			latitude : geodesyRadians.lat,
			height : geodesyRadians['height'] ? geodesyRadians['height'] : 0
		};
	}

    /**
     * middle point between two points
     * @param first  {latitude,longitude} in radians
     * @param second {latitude,longitude} in radians
     */
	midPointToCartesian3(first: { latitude: number, longitude: number }, second: { latitude: number, longitude: number }) {
		const toDeg = (rad: number) => Cesium.Math.toDegrees(rad);
		const firstPoint = new LatLonVectors(toDeg(first.latitude), toDeg(first.longitude));
		const secondPoint = new LatLonVectors(toDeg(second.latitude), toDeg(second.longitude));
		const middlePoint: any = firstPoint.midpointTo(secondPoint);
		
		return Cesium.Cartesian3.fromDegrees(middlePoint.lon, middlePoint.lat);
	}

  middlePointByScreen(position0: Cartesian3, position1: Cartesian3): Cartesian3 {
		const scene = this.cesiumService.getScene();
    const screenPosition1 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position0);
    const screenPosition2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position1);
    const middleScreenPoint =
      new Cesium.Cartesian2((screenPosition2.x + screenPosition1.x) / 2.0, (screenPosition2.y + screenPosition1.y) / 2.0);
    return scene.pickPosition(middleScreenPoint);
  }

    /**
     * initial bearing between two points
     *
     * * @return bearing in degrees
     * @param first - {latitude,longitude} in radians
     * @param second - {latitude,longitude} in radians
     */
	bearingTo(first: { latitude: number, longitude: number }, second: { latitude: number, longitude: number }) {
		const toDeg = (rad: number) => Cesium.Math.toDegrees(rad);
		const firstPoint = new LatLonVectors(toDeg(first.latitude), toDeg(first.longitude));
		const secondPoint = new LatLonVectors(toDeg(second.latitude), toDeg(second.longitude));
		const bearing = firstPoint.bearingTo(secondPoint);
		
		return bearing;
	}

    /**
     * initial bearing between two points
     *
     * @return bearing in degrees
     * @param firstCartesian3
     * @param secondCartesian3
     */
	bearingToCartesian(firstCartesian3: Cartesian3, secondCartesian3: Cartesian3) {
		const firstCart = Cesium.Cartographic.fromCartesian(firstCartesian3);
		const secondCart = Cesium.Cartographic.fromCartesian(secondCartesian3);
		
		return this.bearingTo(firstCart, secondCart);
	}
}
