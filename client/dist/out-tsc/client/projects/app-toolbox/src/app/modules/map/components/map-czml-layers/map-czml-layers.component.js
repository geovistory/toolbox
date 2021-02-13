import * as tslib_1 from "tslib";
/// <reference path="../../../../../../../../node_modules/@types/cesium/index.d.ts" />
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CzmlDataSource } from 'projects/app-toolbox/src/app/core';
import { combineLatest, from, Subject } from 'rxjs';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { JulianDate, BoundingSphere } from 'cesium';
import { CesiumService } from '../../services/cesium.service';
let MapCzmlLayersComponent = class MapCzmlLayersComponent {
    constructor(cs) {
        this.cs = cs;
        this.destroy$ = new Subject();
        this.objectClicked = new EventEmitter();
    }
    ngAfterViewInit() {
        this.cs.createCesiumViewer(this.cesiumContainer.nativeElement);
        this.cs.addBaseLayerCartoDbBase();
        this.cs.addBaseLayerOSM();
        this.cs.addBaseLayerPicker(this.baseLayerPickerContainer.nativeElement, 0);
        this.cs.addSceneModePicker(this.sceneModePickerContainer.nativeElement);
        this.cs.addNavigationHelpButton(this.navigationHelpButtonContainer.nativeElement);
        // this.cs.addMouseoverHighlight()
        this.cs.addMouseclickEvent((clickedObject) => {
            this.objectClicked.emit(clickedObject);
        });
        const dataSources$ = this.data$.pipe(tap(() => {
            this.cs.viewer.dataSources.removeAll(true);
        }), switchMap(data => {
            const d$ = data.layers.map(layer => {
                const dataSource = CzmlDataSource.load(layer.czml);
                this.cs.viewer.dataSources.add(dataSource);
                return from(dataSource);
            });
            return combineLatest(d$);
        }), tap(() => {
            this.cs.viewer.scene.requestRender();
        }));
        // subscribe for the first time and zoom to entities
        let isFirst = true;
        dataSources$.pipe(takeUntil(this.destroy$))
            .subscribe(dataSources => {
            this.dataSources = dataSources;
            if (isFirst) {
                isFirst = false;
                this.zoomToEntities();
            }
        });
        if (this.julianSecondOfCursor$) {
            this.julianSecondOfCursor$.pipe(takeUntil(this.destroy$)).subscribe(jSec => {
                const jDay = Math.round(jSec / 86400);
                const secsOfDay = jSec % 86400;
                const j = new JulianDate(jDay, secsOfDay);
                this.cs.viewer.clock.currentTime = j;
            });
        }
    }
    zoomToEntities() {
        const zoomOptions = {
            heading: 0,
            pitch: -Cesium.Math.PI_OVER_TWO,
            range: 0
        };
        // let entities: Cesium.Entity[] = []
        let positions = [];
        const randomDate = new JulianDate(2700000, 0);
        this.dataSources.map(dataSource => {
            // entities = [...entities, ...dataSource.entities.values]
            positions = [...positions, ...dataSource.entities.values.map(v => {
                    return v.position.getValue(randomDate);
                })];
        });
        const boundingSphere = BoundingSphere.fromPoints(positions);
        boundingSphere.radius = boundingSphere.radius * 2;
        this.cs.viewer.camera.flyToBoundingSphere(boundingSphere, {
            duration: 0,
            offset: zoomOptions
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], MapCzmlLayersComponent.prototype, "data$", void 0);
tslib_1.__decorate([
    Input()
], MapCzmlLayersComponent.prototype, "julianSecondOfCursor$", void 0);
tslib_1.__decorate([
    ViewChild('cesiumContainer', { static: false })
], MapCzmlLayersComponent.prototype, "cesiumContainer", void 0);
tslib_1.__decorate([
    ViewChild('baseLayerPickerContainer', { static: false })
], MapCzmlLayersComponent.prototype, "baseLayerPickerContainer", void 0);
tslib_1.__decorate([
    ViewChild('sceneModePickerContainer', { static: false })
], MapCzmlLayersComponent.prototype, "sceneModePickerContainer", void 0);
tslib_1.__decorate([
    ViewChild('navigationHelpButtonContainer', { static: false })
], MapCzmlLayersComponent.prototype, "navigationHelpButtonContainer", void 0);
tslib_1.__decorate([
    Output()
], MapCzmlLayersComponent.prototype, "objectClicked", void 0);
MapCzmlLayersComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-map-czml-layers',
        templateUrl: './map-czml-layers.component.html',
        styleUrls: ['./map-czml-layers.component.scss'],
        providers: [CesiumService]
    })
], MapCzmlLayersComponent);
export { MapCzmlLayersComponent };
//# sourceMappingURL=map-czml-layers.component.js.map