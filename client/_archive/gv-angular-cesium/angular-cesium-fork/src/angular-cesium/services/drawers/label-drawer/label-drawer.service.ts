import { Injectable } from '@angular/core';
import { CesiumService } from '../../cesium/cesium.service';
import { EntitiesDrawerService } from '../entities-drawer/entities-drawer.service';
import { GraphicsType } from '../entities-drawer/enums/graphics-type.enum';

/**
 *  This drawer is responsible for drawing labels.
 */
@Injectable()
export class LabelDrawerService extends EntitiesDrawerService {
	constructor(cesiumService: CesiumService) {
		super(cesiumService, GraphicsType.label);
	}
}
