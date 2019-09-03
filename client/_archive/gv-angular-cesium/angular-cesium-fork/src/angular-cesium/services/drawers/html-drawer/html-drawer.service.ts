import { Injectable } from '@angular/core';
import { CesiumService } from '../../cesium/cesium.service';
import { PrimitivesDrawerService } from '../primitives-drawer/primitives-drawer.service';

@Injectable()
export class HtmlDrawerService extends PrimitivesDrawerService {
    constructor(private _cesiumService: CesiumService) {
        super(Cesium.HtmlCollection, _cesiumService);
    }

    add(cesiumProps: any): any  {
        cesiumProps.scene = this._cesiumService.getScene();
        return super.add(cesiumProps);
    }
}
