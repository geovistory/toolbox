import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import * as d3 from 'd3';
import { apply, equals, keys, values } from 'ramda';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
export const pointDisplayOptions = [
    {
        label: 'Proportional (static over time)', svgIcon: 'google-circles',
        value: { proportionalStaticSize: {} }
    },
    {
        label: 'Proportional (time-dynamic)', svgIcon: 'google-circles-group',
        value: { proportionalDynamicSize: {} }
    },
    {
        label: 'Fixed size for all points', svgIcon: 'gamepad-circle-outline',
        value: { fixedSize: {} }
    },
];
let MapAndTimeContComponent = class MapAndTimeContComponent {
    constructor(pagEntDialog) {
        this.pagEntDialog = pagEntDialog;
        this.showInfoBtn = true;
        this.showInfoBox = false;
        this.fullscreen = false;
        this.showFullscreenBtn = true;
        this.showFullscreenExitBtn = false;
        this.julianSecondOfCursor$ = new ReplaySubject();
        this.selectedGeoEntityPk$ = new ReplaySubject();
        this.pkEntityCzmlsMap = new Map();
        this.pkEntityLineMap = new Map();
        this.pkEntityEntityPreviewMap = new Map();
        this.linePkEntityMap = new Map();
        this.selectedPackets$ = new BehaviorSubject([]);
        this.selectedLine$ = new BehaviorSubject(undefined);
        this.infoBox = {};
        this.pointDisplayOptions = pointDisplayOptions;
        this.defaultTimelineHeight = 300;
        this.timelineHeight = this.defaultTimelineHeight;
        this.i = 0;
        /**
         * Function iterates over given temporal values and produces
         * the time-tagged czml values
         */
        this.convertTempValsToCzml = (temporalVals, scaleRadius, colorActive = [255, 255, 255, 128], colorPassive = [255, 255, 255, 128], outlineWidthActive = 3, outlineWidthPassive = 0, outlineColorActive = [255, 0, 0, 128], outlineColorPassive = [180, 180, 180, 128]) => {
            const temporalColor = [];
            const temporalOutlineColor = [];
            const temporalOutlineWidth = [];
            const temporalPixelSize = [];
            for (let i = 0; i < temporalVals.length; i++) {
                const t = temporalVals[i];
                temporalColor.push(t.iso_x);
                temporalColor.push(...(t.y === 0 ? colorPassive : colorActive));
                temporalOutlineColor.push(t.iso_x);
                temporalOutlineColor.push(...(t.y === 0 ? outlineColorPassive : outlineColorActive));
                temporalOutlineWidth.push(t.iso_x);
                temporalOutlineWidth.push((t.y === 0 ? outlineWidthPassive : outlineWidthActive));
                temporalPixelSize.push(t.iso_x);
                temporalPixelSize.push(t.y === 0 ? 0 : scaleRadius(t.y));
            }
            return {
                temporalColor,
                temporalOutlineColor,
                temporalOutlineWidth,
                temporalPixelSize,
            };
        };
        this.createDynamicPoint = (outlineColorRgba, temporalVals, scaleRadius) => {
            const convertedTempVals = this.convertTempValsToCzml(temporalVals, scaleRadius, undefined, undefined, 3, 0, outlineColorRgba, undefined);
            return {
                color: {
                    rgba: [255, 255, 255, 128],
                    forwardExtrapolationType: 'HOLD',
                    backwardExtrapolationType: 'HOLD'
                },
                outlineColor: {
                    backwardExtrapolationType: 'HOLD',
                    forwardExtrapolationType: 'HOLD',
                    rgba: convertedTempVals.temporalOutlineColor
                },
                outlineWidth: {
                    backwardExtrapolationType: 'HOLD',
                    forwardExtrapolationType: 'HOLD',
                    number: convertedTempVals.temporalOutlineWidth
                },
                pixelSize: {
                    backwardExtrapolationType: 'HOLD',
                    forwardExtrapolationType: 'HOLD',
                    number: convertedTempVals.temporalPixelSize
                }
            };
        };
        this.createFixedPoint = (outlineColorRgba) => {
            return {
                color: { rgba: [255, 255, 255, 128] },
                outlineColor: { rgba: outlineColorRgba },
                outlineWidth: 3,
                pixelSize: 10
            };
        };
        this.createStaticPoint = (value, scaleRadius, outlineColorActive = [255, 0, 0, 128], outlineColorPassive = [180, 180, 180, 128]) => {
            return {
                color: { rgba: [255, 255, 255, 128] },
                outlineColor: { rgba: value === 0 ? outlineColorPassive : outlineColorActive },
                outlineWidth: 3,
                pixelSize: scaleRadius(value)
            };
        };
        this.createCzmlPacket = (id, point, spatialVal, properties) => {
            return {
                id,
                point,
                properties,
                // label: {
                //   horizontalOrigin: { horizontalOrigin: 'LEFT' },
                //   fillColor: {
                //     rgba: [20, 20, 20, 255]
                //   },
                //   outlineColor: {
                //     rgba: [255, 255, 255, 230]
                //   },
                //   outlineWidth: 2,
                //   pixelOffset: {
                //     cartesian2: [12, -16]
                //   },
                //   scaleByDistance: {
                //     nearFarScalar: [150, 1, 15000000, 0.5]
                //   },
                //   text: 'A'
                // },
                position: {
                    cartographicDegrees: [spatialVal.longitude, spatialVal.latitude, 0]
                },
            };
        };
        // startLogTime()
    }
    ngOnInit() {
        if (!this.data$)
            throw new Error('You must provide a data$ input');
        if (!this.pointDisplayMode$)
            this.pointDisplayMode$ = new BehaviorSubject(pointDisplayOptions[0].value);
        this.pointDisplayOption$ = this.pointDisplayMode$.pipe(map(mode => this.pointDisplayOptions.find(o => equals(keys(o.value), keys(mode)))));
        const geoPlaces$ = this.data$.pipe(map((data) => {
            const geoPlaces = data && data.geoPlaces ? data.geoPlaces : [];
            return geoPlaces;
        }));
        this.entitiesOfSelectedGeoPlace$ = combineLatest(geoPlaces$, this.selectedLine$).pipe(map(([geoPlaces, selectedLine]) => {
            if (!selectedLine || typeof selectedLine.lineIndex !== 'number' || !geoPlaces || !geoPlaces.length || !geoPlaces[selectedLine.lineIndex])
                return [];
            else
                return geoPlaces[selectedLine.lineIndex].pk_entities;
        }));
        this.processedData$ = combineLatest(geoPlaces$, this.pointDisplayMode$).pipe(map(([geoPlaces, pointDisplayMode]) => this.mapAndTimeContQueryResToOutput(geoPlaces, pointDisplayMode)), shareReplay({ refCount: true, bufferSize: 1 }));
        let previousSelectedLine;
        this.chartLines$ = this.processedData$.pipe(map((processedData) => {
            // logTime('chartLines$ - start')
            return processedData.layers.map((layer, layerIndex) => {
                // logTime(`chartLines$ ${layerIndex} - start`)
                return this.selectedLine$.pipe(map(selectedLine => {
                    // logTime(`chartLines$ selectedLine$ ${layerIndex} - start`)
                    if (previousSelectedLine && previousSelectedLine.layerIndex == layerIndex) {
                        layer.time.activeLine = undefined;
                    }
                    if (selectedLine && selectedLine.layerIndex == layerIndex) {
                        layer.time.activeLine = selectedLine.lineIndex;
                        previousSelectedLine = selectedLine;
                    }
                    // logTime(`chartLines$ selectedLine$ ${layerIndex} - end`)
                    return layer.time;
                }));
            });
        }));
        let previousSelectedPackets = [];
        this.mapData$ = combineLatest(this.processedData$, this.selectedPackets$).pipe(map(([processedData, selectedPackets]) => {
            // logTime('mapData$ - start')
            // Manage the styling of the unselectedPackets
            previousSelectedPackets.forEach(czmlPath => {
                const packetToUnselect = processedData.layers[czmlPath.layerIndex].map.czml[czmlPath.czmlIndex];
                this.styleAsUnselected(packetToUnselect);
            });
            // Manage the styling of selected packets
            selectedPackets.forEach(czmlPath => {
                const packetToSelect = processedData.layers[czmlPath.layerIndex].map.czml[czmlPath.czmlIndex];
                this.styleAsSelected(packetToSelect);
            });
            previousSelectedPackets = selectedPackets;
            // logTime('mapData$ - end')
            return processedData.layers.map(l => l.map);
        }), map(layers => ({ layers })));
    }
    /**
     * Changes the appearance of the geometry in the given czmlPacket
     * to look selected
     */
    styleAsSelected(packet) {
        packet.point.color.rgba = [0, 0, 255, 255];
    }
    /**
     * Changes the appearance of the geometry in the given czmlPacket
     * to look selected
     */
    styleAsUnselected(packet) {
        packet.point.color.rgba = [255, 255, 255, 128];
    }
    /**
     * Converts a MapAndTimeContQueryRes to a MapAndTimeContData
     * TODO
     */
    mapAndTimeContQueryResToOutput(queryRes, pointDisplayMode) {
        // logTime('conversion - start')
        console.log('mapAndTimeContQueryResToOutput', ++this.i);
        this.pkEntityCzmlsMap.clear();
        if (!queryRes || !queryRes.length)
            return { layers: [] };
        const czml = [{
                'id': 'document',
                'name': 'CZML Point - Time Dynamic',
                'version': '1.0'
            }];
        const chartLines = [];
        const data_lookups = [];
        let id = 1;
        const minVal = 0;
        let maxVal = 0;
        queryRes.forEach(item => {
            let max = 0;
            if (pointDisplayMode.proportionalDynamicSize) {
                max = apply(Math.max, values(item.temporal_data.data_lookup).map(x => x.length));
            }
            else if (pointDisplayMode.proportionalStaticSize) {
                max = item.pk_entities.length;
            }
            if (max > maxVal)
                maxVal = max;
        });
        const minRadius = 10;
        const maxRadius = 50;
        // logTime('conversion - minMaxOk')
        const scalePoint = d3.scaleLinear()
            .domain([minVal, maxVal])
            .range([minRadius, maxRadius]);
        const outlineColorActive = [255, 0, 0, 128];
        const outlineColorPassive = [180, 180, 180, 128];
        queryRes.forEach((item, lineIndex) => {
            const temporalVals = item.temporal_data.timeCzmlValues;
            // logTime(`conversion - item ${lineIndex} start, having ${temporalVals.length} temporalVals`)
            const point = pointDisplayMode.fixedSize ?
                // else create fixed point
                this.createFixedPoint(outlineColorActive) :
                pointDisplayMode.proportionalStaticSize ?
                    // else create static point
                    this.createStaticPoint(item.pk_entities.length, scalePoint, outlineColorActive, outlineColorPassive) :
                    pointDisplayMode.proportionalDynamicSize ?
                        // if temporal filter enabled create dynamic point
                        this.createDynamicPoint(outlineColorActive, temporalVals, scalePoint) :
                        // default
                        this.createFixedPoint(outlineColorActive);
            // logTime(`conversion - item ${lineIndex} pointCreated`)
            item.geo_positions.forEach((position) => {
                const czmlPacket = this.createCzmlPacket('_' + id++, point, position, { geoEntityPk: item.geo_entity_pk });
                czml.push(czmlPacket);
                // make an index of pkEntity -> Czmls
                const existingCzmls = this.pkEntityCzmlsMap.get(item.geo_entity_pk) || [];
                this.pkEntityCzmlsMap.set(item.geo_entity_pk, [...existingCzmls, {
                        layerIndex: 0,
                        czmlIndex: (czml.length - 1),
                        czmlPacket
                    }]);
            });
            // logTime(`conversion - item ${lineIndex} geo_positions added`)
            const chartLine = {
                label: item.geo_entity_preview.entity_label,
                linePoints: item.temporal_data.timeLinePoints,
                pkEntities: item.pk_entities
            };
            chartLines.push(chartLine);
            const linePath = {
                layerIndex: 0,
                lineIndex: chartLines.length - 1
            };
            // make an index of pkEntity -> LineIndex
            this.pkEntityLineMap.set(item.geo_entity_pk, linePath);
            // make an index of LineIndex --> pkEntity
            this.linePkEntityMap.set(this.linePathToString(linePath), item.geo_entity_pk);
            data_lookups.push(item.temporal_data.data_lookup);
            // logTime(`conversion - item ${lineIndex} end`)
            this.pkEntityEntityPreviewMap.set(item.geo_entity_pk, item.geo_entity_preview);
        });
        // logTime('mapAndTimeContQueryResToOutput - created all points and lines')
        const map = { czml };
        const time = {
            activeLine: undefined,
            chartLines
        };
        const out = {
            layers: [
                {
                    map,
                    time,
                    data_lookups
                }
            ]
        };
        return out;
    }
    linePathToString(linePath) {
        return linePath.layerIndex + '_' + linePath.lineIndex;
    }
    selectGeoEntity(pkEntity) {
        this.selectGeometriesOfEntity(pkEntity);
        this.selectLineOfEntity(pkEntity);
        this.infoBox.geoEntity = this.pkEntityEntityPreviewMap.get(pkEntity);
        if (pkEntity) {
            this.showInfoBox = true;
            this.showInfoBtn = false;
        }
        else {
            this.showInfoBox = false;
            this.showInfoBtn = true;
        }
    }
    selectGeometriesOfEntity(pkEntity) {
        this.selectedPackets$.next(this.pkEntityCzmlsMap.get(pkEntity) || []);
    }
    selectLineOfEntity(pkEntity) {
        this.selectedLine$.next(this.pkEntityLineMap.get(pkEntity));
    }
    /**
     * Called when user clicked a geometry on map
     * @param $event the object returned by https://cesium.com/docs/cesiumjs-ref-doc/Scene.html?classFilter=Scene#pick
     */
    onMapObjectClicked($event) {
        let pkEntity;
        if ($event &&
            $event.id &&
            $event.id.properties &&
            $event.id.properties._geoEntityPk &&
            $event.id.properties._geoEntityPk._value) {
            pkEntity = $event.id.properties._geoEntityPk._value;
        }
        this.selectGeoEntity(pkEntity);
    }
    /**
     * Called when user activates a line on timeline
     * @param layerIndex index of the layer
     * @param chartLineDef chart line definition, containing index of activated line
     */
    onChartLineDefChange(layerIndex, chartLineDef) {
        const linePath = {
            layerIndex,
            lineIndex: chartLineDef.config.data.activeLine
        };
        const pkEntity = this.linePkEntityMap.get(this.linePathToString(linePath));
        this.selectGeoEntity(pkEntity);
    }
    /**
     * Called when user changes cursor or the activated line or linepoint changed
     */
    onCursorChange(cursorInfo) {
        this.julianSecondOfCursor$.next(cursorInfo.julianSecond);
        this.infoBox.cursorInfo = cursorInfo;
    }
    onShowPointDetailsClick() {
        this.openEntitiesDialogForDate();
    }
    onShowLineDetailsClick() {
        this.openEntitiesDialogForDate();
    }
    openEntitiesDialogForDate() {
        this.processedData$
            .pipe(first())
            .subscribe((processedData) => {
            const dataLookup = processedData.layers[this.selectedLine$.value.layerIndex]
                .data_lookups[this.selectedLine$.value.lineIndex];
            const pkEntities = this.infoBox.cursorInfo.linePoint ? dataLookup[this.infoBox.cursorInfo.linePoint.data_ref] : [];
            this.pagEntDialog.open(true, pkEntities, `${pkEntities.length} Entities available at ${this.infoBox.cursorInfo.cursorDateLabel}`);
        });
    }
    openAllEntitiesDialog() {
        this.entitiesOfSelectedGeoPlace$.pipe(first()).subscribe(pkEntities => {
            this.pagEntDialog.open(true, pkEntities, `${pkEntities.length} Entities`);
        });
    }
};
tslib_1.__decorate([
    Input()
], MapAndTimeContComponent.prototype, "data$", void 0);
tslib_1.__decorate([
    Input()
], MapAndTimeContComponent.prototype, "pointDisplayMode$", void 0);
tslib_1.__decorate([
    Input()
], MapAndTimeContComponent.prototype, "showInfoBtn", void 0);
tslib_1.__decorate([
    Input()
], MapAndTimeContComponent.prototype, "showInfoBox", void 0);
tslib_1.__decorate([
    HostBinding('class.fullscreen'),
    Input()
], MapAndTimeContComponent.prototype, "fullscreen", void 0);
tslib_1.__decorate([
    Input()
], MapAndTimeContComponent.prototype, "showFullscreenBtn", void 0);
tslib_1.__decorate([
    Input()
], MapAndTimeContComponent.prototype, "showFullscreenExitBtn", void 0);
MapAndTimeContComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-map-and-time-cont',
        templateUrl: './map-and-time-cont.component.html',
        styleUrls: ['./map-and-time-cont.component.scss']
    })
], MapAndTimeContComponent);
export { MapAndTimeContComponent };
//# sourceMappingURL=map-and-time-cont.component.js.map