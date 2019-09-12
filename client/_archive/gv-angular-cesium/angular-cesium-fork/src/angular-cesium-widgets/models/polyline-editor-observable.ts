import { EditPoint } from './edit-point';
import { EditorObservable } from './editor-observable';
import { PolylineEditUpdate } from './polyline-edit-update';
import { PointProps, PolylineProps } from './polyline-edit-options';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';

export class PolylineEditorObservable extends EditorObservable<PolylineEditUpdate> {
  setManually: (points: {position: Cartesian3, pointProp?: PointProps}[] | Cartesian3[], polylineProps?: PolylineProps) => void;
	getCurrentPoints: () => EditPoint[];
}
