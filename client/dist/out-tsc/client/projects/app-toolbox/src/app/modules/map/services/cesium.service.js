import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BaseLayerPicker, OpenStreetMapImageryProvider, NavigationHelpButton, ProviderViewModel, SceneModePicker, SceneMode, UrlTemplateImageryProvider, CustomDataSource, Entity, PointGraphics, Color, ScreenSpaceEventType } from 'cesium';
import { clone } from 'ramda';
let CesiumService = class CesiumService {
    // Interaction Elements
    // mouseoverEntities: EntityCollection = new Cesium.EntityCollection();
    constructor() {
        // Base Layers
        this.imageryViewModels = [];
    }
    createCesiumViewer(container) {
        this.viewer = new Cesium.Viewer(container, {
            // disable widgets
            animation: false,
            timeline: false,
            geocoder: false,
            homeButton: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            sceneModePicker: false,
            sceneMode: SceneMode.SCENE2D,
            // disable buttons
            infoBox: false,
            fullscreenButton: false,
            // other settings
            imageryProvider: false,
            requestRenderMode: true,
            mapProjection: new Cesium.WebMercatorProjection()
        });
        this.viewer.resolutionScale = 2;
        return this;
    }
    addDefaultBaseLayers() {
        this.addBaseLayerOSM();
        return this;
    }
    addBaseLayerPicker(container, activeLayerIndex = 0) {
        this.verifyCesiumViewer();
        this.baseLayerPicker = new BaseLayerPicker(container, {
            globe: this.viewer.scene.globe,
            imageryProviderViewModels: this.imageryViewModels,
            selectedImageryProviderViewModel: this.imageryViewModels[activeLayerIndex]
        });
        return this;
    }
    addNavigationHelpButton(container) {
        this.navigationHelpButton = new NavigationHelpButton({
            container,
            instructionsInitiallyVisible: false
        });
        return this;
    }
    addSceneModePicker(container, duration) {
        this.verifyCesiumViewer();
        this.sceneModePicker = new SceneModePicker(container, this.viewer.scene, duration);
        return this;
    }
    addBaseLayerOSM() {
        this.imageryViewModels.push(new ProviderViewModel({
            name: 'Open\u00adStreet\u00adMap',
            iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip: `OpenStreetMap (OSM) is a collaborative project to create a free editable
       map of the world. http://www.openstreetmap.org`,
            creationFunction: function () {
                return new OpenStreetMapImageryProvider({
                    url: 'https://a.tile.openstreetmap.org/'
                });
            }
        }));
    }
    addBaseLayerCartoDbBase() {
        this.imageryViewModels.push(new ProviderViewModel({
            name: `Carto without labels`,
            iconUrl: 'assets/images/positron_no_labels.png',
            tooltip: `Carto Basemap 'Positron without labels' is perfect background for data visualization, so that overlaying data
       looks amazing. https://carto.com/help/building-maps/basemap-list/`,
            creationFunction: function () {
                return new UrlTemplateImageryProvider({
                    subdomains: 'abc',
                    credit: new Cesium.Credit('Background: © <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, © <a href="https://www.carto.com/" target="_blank">Carto</a> '),
                    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}@2x.png'
                });
            }
        }));
    }
    addMouseoverHighlight() {
        this.verifyCesiumViewer();
        // const cache: EntityCollection = new Cesium.EntityCollection()
        const highlights = new CustomDataSource('highlights');
        const pickedMap = new Map();
        const pickedIdMap = new Map();
        //  highlight entity --> hidden entity
        const highlightedToHiddenMap = new Map();
        const highlightedIds = new Map();
        //  hidden entity --> highlight entity
        const hiddenToHighlightMap = new Map();
        const hiddenIds = new Map();
        this.viewer.dataSources.add(highlights);
        // Move the primitive that the mouse is over to the top.
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        handler.setInputAction((movement) => {
            let renderNeeded = false;
            // get an array of all primitives at the mouse position
            const pickedObjects = this.viewer.scene.drillPick(movement.endPosition);
            if (Cesium.defined(pickedObjects)) {
                // console.log('pickedObjects:', pickedObjects.map(x => x.id.id))
                // console.log('highlightedMap:', Array.from(highlightedToHiddenMap.values()).map(x => x.id))
                pickedMap.clear();
                pickedIdMap.clear();
                for (let i = 0; i < pickedObjects.length; ++i) {
                    const entity = pickedObjects[i].id;
                    if (entity) {
                        pickedMap.set(entity, pickedObjects[i].primitive);
                        pickedIdMap.set(entity.id, true);
                    }
                    // console.log('picked:', entity.id)
                }
                // remove highlighted and restore hidden
                highlightedToHiddenMap.forEach((hidden, highlighted) => {
                    // if not picked (anymore)
                    if (!pickedIdMap.has(hidden.id) && !pickedIdMap.has(highlighted.id)) {
                        this.viewer.entities.removeById(highlighted.id);
                        highlightedToHiddenMap.delete(highlighted);
                        highlightedIds.delete(highlighted.id);
                        // show hidden
                        hidden.show = true;
                        // remove hidden from Map
                        hiddenToHighlightMap.delete(hidden);
                        hiddenIds.delete(hidden.id);
                        renderNeeded = true;
                    }
                });
                pickedMap.forEach((primitive, pickedEntity) => {
                    // check if the picked entity is not yet higlighted
                    if (!hiddenIds.has(pickedEntity.id) && !highlightedIds.has(pickedEntity.id)) {
                        // hide the pickedEntity (=unhighlighted)
                        pickedEntity.show = false;
                        hiddenToHighlightMap.set(pickedEntity, true);
                        hiddenIds.set(pickedEntity.id, true);
                        // create highlighted Entity
                        const point = new PointGraphics({
                            pixelSize: primitive.pixelSize,
                            color: Color.LIGHTSTEELBLUE,
                            outlineColor: primitive.outlineColor,
                            outlineWidth: primitive.outlineWidth
                        });
                        const highlighted = new Entity({
                            position: clone(primitive.position),
                            point,
                        });
                        highlighted.properties = clone(pickedEntity.properties || {});
                        // add id of new highlighted entity to ids
                        highlightedToHiddenMap.set(highlighted, pickedEntity);
                        highlightedIds.set(highlighted.id, true);
                        // console.log('add hilight id:', highlighted.id)
                        // add highlighted entity
                        this.viewer.entities.add(highlighted);
                        renderNeeded = true;
                    }
                });
            }
            if (renderNeeded) {
                // console.log('renderNeeded:', renderNeeded)
                this.viewer.scene.requestRender();
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
    addMouseclickEvent(cb) {
        this.verifyCesiumViewer();
        // Move the primitive that the mouse is over to the top.
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        handler.setInputAction((click) => {
            const pickedObject = this.viewer.scene.pick(click.position);
            cb(pickedObject);
        }, ScreenSpaceEventType.LEFT_CLICK);
    }
    verifyCesiumViewer() {
        if (!this.viewer)
            throw Error('You must first create a cesium viewer');
    }
};
CesiumService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CesiumService);
export { CesiumService };
//# sourceMappingURL=cesium.service.js.map