import { EditPoint } from './edit-point';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';
import { BasicEditUpdate } from './basic-edit-update';
import { PolylineEditOptions } from './polyline-edit-options';

export interface PolylineEditUpdate extends BasicEditUpdate<PolylineEditUpdate> {
	positions?: Cartesian3[];
	updatedPosition?: Cartesian3;
	draggedPosition?: Cartesian3;
	points?: EditPoint[];
	updatedPoint?: EditPoint;
	polylineOptions?: PolylineEditOptions
}
