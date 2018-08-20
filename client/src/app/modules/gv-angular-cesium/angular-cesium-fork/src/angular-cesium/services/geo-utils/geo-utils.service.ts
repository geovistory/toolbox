import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import { Cartesian3 } from '../../models/cartesian3';
import { Vec3 } from '../../models/vec3';

@Injectable()
export class GeoUtilsService {

  static pointByLocationDistanceAndAzimuth(currentLocation: any, meterDistance: number, radianAzimuth: number, isInputCartesian = false) {
    const distance = meterDistance / Cesium.Ellipsoid.WGS84.maximumRadius;
    const curLat = isInputCartesian ? Cesium.Cartographic.fromCartesian(currentLocation).latitude : currentLocation.latitude;
    const curLon = isInputCartesian ? Cesium.Cartographic.fromCartesian(currentLocation).longitude : currentLocation.longitude;

    const destinationLat = Math.asin(
      Math.sin(curLat) * Math.cos(distance) +
      Math.cos(curLat) * Math.sin(distance) * Math.cos(radianAzimuth)
    );

    let destinationLon = curLon + Math.atan2(Math.sin(radianAzimuth) * Math.sin(distance) * Math.cos(curLat),
      Math.cos(distance) - Math.sin(curLat) * Math.sin(destinationLat)
    );

    destinationLon = (destinationLon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

    return Cesium.Cartesian3.fromRadians(destinationLon, destinationLat);
  }

  static distance(pos0: Cartesian3, pos1: Cartesian3): number {
    return Cesium.Cartesian3.distance(pos0, pos1);
  }

  static getPositionsDelta(position0: Cartesian3, position1: Cartesian3): Vec3 {
    return {
      x: position1.x - position0.x,
      y: position1.y - position0.y,
      z: position1.z - position0.z,
    }
  }

  static addDeltaToPosition(position: Cartesian3, delta: Vec3, keepReference = false): Cartesian3 {
    if (keepReference) {
      position.x += delta.x;
      position.y += delta.y;
      position.z += delta.z;
      const cartographic = Cesium.Cartographic.fromCartesian(position);
      cartographic.height = 0;
      const cartesian = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
      position.x = cartesian.x;
      position.y = cartesian.y;
      position.z = cartesian.z;
      return position
    }

    else {
      const cartesian = new Cesium.Cartesian3(
        position.x + delta.x,
        position.y + delta.y,
        position.z + delta.z
      );
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      cartographic.height = 0;
      return Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    }
  }

  static middleCartesian3Point(position0: Cartesian3, position1: Cartesian3) {
    return new Cesium.Cartesian3(
      position1.x - position0.x / 2,
      position1.y - position0.y / 2,
      position1.z - position0.z / 2
    )
  }

  constructor(private cesiumService: CesiumService) {
  }

  screenPositionToCartesian3(screenPos: { x: number, y: number }) {
    const camera = this.cesiumService.getViewer().camera;
    return camera.pickEllipsoid(screenPos);
  }
}
