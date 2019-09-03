import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { EditModes } from '../../models/edit-mode.enum';
import { AcNotification } from '../../../angular-cesium/models/ac-notification';
import { EditActions } from '../../models/edit-actions.enum';
import { AcLayerComponent } from '../../../angular-cesium/components/ac-layer/ac-layer.component';
import { CoordinateConverter } from '../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { MapEventsManagerService } from '../../../angular-cesium/services/map-events-mananger/map-events-manager';
import { Subject } from 'rxjs';
import { CameraService } from '../../../angular-cesium/services/camera/camera.service';
import { EditPoint } from '../../models/edit-point';
import { PolylinesEditorService } from '../../services/entity-editors/polyline-editor/polylines-editor.service';
import { PolylinesManagerService } from '../../services/entity-editors/polyline-editor/polylines-manager.service';
import { PolylineEditUpdate } from '../../models/polyline-edit-update';
import { EditablePolyline } from '../../models/editable-polyline';
import { LabelProps } from '../../models/label-props';

@Component({
  selector: 'polylines-editor',
  templateUrl: './polylines-editor.component.html',
  providers: [CoordinateConverter, PolylinesManagerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolylinesEditorComponent implements OnDestroy {

  private editLabelsRenderFn: (update: PolylineEditUpdate, labels: LabelProps[]) => LabelProps[];
  public Cesium = Cesium;
  public editPoints$ = new Subject<AcNotification>();
  public editPolylines$ = new Subject<AcNotification>();
  public polylineLabels$ = new Subject<AcNotification>();

  @ViewChild('editPointsLayer') private editPointsLayer: AcLayerComponent;
  @ViewChild('editPolylinesLayer') private editPolylinesLayer: AcLayerComponent;
  @ViewChild('polylineLabelsLayer') private polylineLabelsLayer: AcLayerComponent;

  constructor(private polylinesEditor: PolylinesEditorService,
              private coordinateConverter: CoordinateConverter,
              private mapEventsManager: MapEventsManagerService,
              private cameraService: CameraService,
              private polylinesManager: PolylinesManagerService) {
    this.polylinesEditor.init(this.mapEventsManager, this.coordinateConverter, this.cameraService, polylinesManager);
    this.startListeningToEditorUpdates();
  }

  private startListeningToEditorUpdates() {
    this.polylinesEditor.onUpdate().subscribe((update: PolylineEditUpdate) => {
      if (update.editMode === EditModes.CREATE || update.editMode === EditModes.CREATE_OR_EDIT) {
        this.handleCreateUpdates(update);
      }
      else if (update.editMode === EditModes.EDIT) {
        this.handleEditUpdates(update);
      }
    });
  }

  getLabelId(element: any, index: number): string {
    return index.toString();
  }

  renderEditLabels(polyline: EditablePolyline, update: PolylineEditUpdate, labels?: LabelProps[]) {
    update.positions = polyline.getRealPositions();
    update.points = polyline.getRealPoints();

    if (labels) {
      polyline.labels = labels;
      this.polylineLabelsLayer.update(polyline, polyline.getId());
      return;
    }

    if (!this.editLabelsRenderFn) {
      return;
    }

    polyline.labels = this.editLabelsRenderFn(update, polyline.labels);
    this.polylineLabelsLayer.update(polyline, polyline.getId());

  }

  removeEditLabels(polyline: EditablePolyline) {
    polyline.labels = [];
    this.polylineLabelsLayer.remove(polyline.getId());
  }

  handleCreateUpdates(update: PolylineEditUpdate) {
    switch (update.editAction) {
      case EditActions.INIT: {
        this.polylinesManager.createEditablePolyline(
          update.id,
          this.editPointsLayer,
          this.editPolylinesLayer,
          this.coordinateConverter,
          update.polylineOptions);
        break;
      }
      case EditActions.MOUSE_MOVE: {
        const polyline = this.polylinesManager.get(update.id);
        if (update.updatedPosition) {
          polyline.moveTempMovingPoint(update.updatedPosition);
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.ADD_POINT: {
        const polyline = this.polylinesManager.get(update.id);
        if (update.updatedPosition) {
          polyline.addPoint(update.updatedPosition);
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.ADD_LAST_POINT: {
        const polyline = this.polylinesManager.get(update.id);
        if (update.updatedPosition) {
          polyline.addLastPoint(update.updatedPosition);
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.DISPOSE: {
        const polyline = this.polylinesManager.get(update.id);
        polyline.dispose();
        this.removeEditLabels(polyline);
        this.editLabelsRenderFn = undefined;
        break;
      }
      case EditActions.SET_EDIT_LABELS_RENDER_CALLBACK: {
        const polyline = this.polylinesManager.get(update.id);
        this.editLabelsRenderFn = update.labelsRenderFn;
        this.renderEditLabels(polyline, update);
        break;
      }
      case EditActions.UPDATE_EDIT_LABELS: {
        const polyline = this.polylinesManager.get(update.id);
        this.renderEditLabels(polyline, update, update.updateLabels);
        break;
      }
      case EditActions.SET_MANUALLY: {
        const polyline = this.polylinesManager.get(update.id);
        this.renderEditLabels(polyline, update, update.updateLabels);
        break;
      }
      default: {
        return;
      }
    }
  }

  handleEditUpdates(update: PolylineEditUpdate) {
    switch (update.editAction) {
      case EditActions.INIT: {
        this.polylinesManager.createEditablePolyline(
          update.id,
          this.editPointsLayer,
          this.editPolylinesLayer,
          this.coordinateConverter,
          update.polylineOptions,
          update.positions
        );
        break;
      }
      case EditActions.DRAG_POINT: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline && polyline.enableEdit) {
          polyline.movePoint(update.updatedPosition, update.updatedPoint);
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.DRAG_POINT_FINISH: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline && polyline.enableEdit && update.updatedPoint.isVirtualEditPoint()) {
          polyline.changeVirtualPointToRealPoint(update.updatedPoint);
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.REMOVE_POINT: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline && polyline.enableEdit) {
          polyline.removePoint(update.updatedPoint);
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.DISABLE: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline) {
          polyline.enableEdit = false;
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.ENABLE: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline) {
          polyline.enableEdit = true;
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      case EditActions.DRAG_SHAPE: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline && polyline.enableEdit) {
          polyline.moveShape(update.draggedPosition, update.updatedPosition)
          this.renderEditLabels(polyline, update);
        }
        break;
      }

      case EditActions.DRAG_SHAPE_FINISH: {
        const polyline = this.polylinesManager.get(update.id);
        if (polyline && polyline.enableEdit) {
          polyline.endMoveShape();
          this.renderEditLabels(polyline, update);
        }
        break;
      }
      default: {
        return;
      }
    }
  }

  ngOnDestroy(): void {
    this.polylinesManager.clear();
  }

  getPointSize(point: EditPoint) {
    return point.isVirtualEditPoint() ? point.props.virtualPointPixelSize : point.props.pixelSize;
  }

  getPointShow(point: EditPoint) {
    return point.show && (point.isVirtualEditPoint() ? point.props.showVirtual : point.props.show);
  }
}
