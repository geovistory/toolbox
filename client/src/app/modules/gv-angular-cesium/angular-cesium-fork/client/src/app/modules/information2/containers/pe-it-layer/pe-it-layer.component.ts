import { NgRedux, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IAppState, U } from 'app/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from '../../../../../../node_modules/rxjs/operators';
import {
    AcLayerComponent,
    AcNotification,
    ActionType,
    CesiumEvent,
    MapsManagerService,
    PickOptions,
    AcMapComponent
} from '../../../gv-angular-cesium/angular-cesium-fork';
import { peItReducer } from '../../data-unit/pe-it/pe-it.reducer';
import { TeEntActions } from '../../data-unit/te-ent/te-ent.actions';
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { PeItDetail } from '../../information.models';


@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: peItReducer
})
@Component({
    selector: 'gv-pe-it-layer',
    templateUrl: './pe-it-layer.component.html',
    styleUrls: ['./pe-it-layer.component.scss']
})
export class PeItLayerComponent implements OnInit, OnDestroy {

    @Input() path: string[];

    @Input() acMap: AcMapComponent;

    @ViewChild(AcLayerComponent) layer: AcLayerComponent;

    @select() leafPeItLoading$: Observable<boolean>;

    czmlPackets$: Observable<AcNotification>;
    show = true;
    updater = new Subject<AcNotification>();

    reduxMiddlewares = [];

    // packet ids that are added. used to identify packets to remove upon state change
    packetIds: string[] = [];

    destroy$ = new Subject<boolean>();

    zoomed = false;

    constructor(
        public ngRedux: NgRedux<IAppState>,
        private teEntActions: TeEntActions,
    ) { }

    getBasePath = () => this.path;

    ngOnInit(): void {

        // init stream of czml packets
        this.initCzmlStream();

        // wait for loading of leaf-peIts
        const sub = this.leafPeItLoading$.subscribe(loading => {
            // as soon as loading is falsy (beacause loading is complete or there was no leaf peIts to load)
            if (!loading) {
                // unsubscribe
                sub.unsubscribe();

                this.flyToBrowserGeolocation();

                // initialize the layer
                this.initLayer();
            }

        })


        this.initEvents()

    }


    private initLayer() {
        const camera = this.acMap.getCameraService().getCamera();
        camera.setView({ destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0) });
        const scene = this.acMap.getCesiumSerivce().getScene();


        // update czml-packets upon change of state
        this.ngRedux.select<PeItDetail>(this.path).takeUntil(this.destroy$).subscribe(peItDetail => {
            // remove all entities of the layer
            this.layer.removeAll();

            if (peItDetail) {

                // redraw all entities of the peItDetail
                const presences = U.presencesFromPeIt(peItDetail, this.path);
                const processedPrecences = U.czmlPacketsFromPresences(presences);
                const teEnts = U.teEntsWithoutPresencesFromPeIt(peItDetail, this.path);
                const processedTeEnts = U.czmlPacketsFromTeEnts(teEnts);

                processedPrecences.czmlPackets.forEach(czmlPacket => {
                    const acNotification = U.acNotificationFromPacket(czmlPacket, ActionType.ADD_UPDATE);
                    this.updater.next(acNotification);
                });

                processedTeEnts.czmlPackets.forEach(czmlPacket => {
                    const acNotification = U.acNotificationFromPacket(czmlPacket, ActionType.ADD_UPDATE);
                    this.updater.next(acNotification);
                });

                if (!this.zoomed) {
                    this.zoomed = this.zoomToEntities();
                }

                // Explicitly render a new frame
                // scene.requestRender();
            }
        });
    }

    private initCzmlStream() {
        this.czmlPackets$ = Observable.from([
            U.acNotificationFromPacket({
                id: 'document',
                version: '1.0'
            }, ActionType.ADD_UPDATE)
        ]).merge(this.updater);
    }

    // update or add a czml packet to the layer
    update(packet) {
        if (packet) this.updater.next(U.acNotificationFromPacket(packet, ActionType.ADD_UPDATE))
    }

    /**
     * Zoom to the extend of the entities of this layer
     * @return true if datasource was available and zoom worked, else false
     */
    zoomToEntities(): boolean {

        const dataSource = this.getDataSource();
        if (!dataSource || !dataSource.entities || (dataSource.entities.values.length < 1)) return false;

        this.acMap.getCesiumViewer().zoomTo(dataSource, new Cesium.HeadingPitchRange(0.0, -Cesium.Math.PI_OVER_TWO, 20000.0));

        return true;
    }

    flyToBrowserGeolocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            if (!this.zoomed) {
                this.acMap.getCesiumViewer().camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 100000),
                    duration: 0
                });
            }
        });
    }

    /**
     * get the Cesium.DataSource of this PeItLayer
     */
    getDataSource() {
        return this.layer.getDrawerDataSourcesByName('czml')[0];
    }

    // remove a czml packet from the layer
    remove(entityId: string) {
        this.layer.remove(entityId)
    }

    ngOnDestroy() {
        this.destroy$.next()
        // this.reduxMiddlewares.forEach(mw => removeMiddleware(mw))
    }

    initEvents() {

        const mapEventsManagerService = this.acMap.getMapEventsManager();

        const clickEvent$ = mapEventsManagerService.register({
            event: CesiumEvent.LEFT_CLICK,
            pick: PickOptions.PICK_ONE
        });

        const moveEvent$ = mapEventsManagerService.register({
            event: CesiumEvent.MOUSE_MOVE,
            pick: PickOptions.PICK_ONE
        });

        // on Click
        clickEvent$.pipe(
            map(result => result.cesiumEntities),
            filter(cesiumEntities => cesiumEntities && cesiumEntities.length > 0)
        ).subscribe(cesiumEntities => {
            const cesiumEntity = cesiumEntities[0];
            const teEntPath = JSON.parse(cesiumEntity.properties.path.getValue());
            this.toggleSelection(cesiumEntity, teEntPath);
        });

        let pathToHighlighted;

        // on Click
        moveEvent$.pipe(
            map(result => result.cesiumEntities),
        ).subscribe(cesiumEntities => {
            if (cesiumEntities && cesiumEntities.length > 0) {

                // mouse entered some entity
                pathToHighlighted = JSON.parse(cesiumEntities[0].properties.path.getValue());
                this.mouseEnter(pathToHighlighted);

            } else if (pathToHighlighted) {

                // mouseout of some entity
                this.mouseLeave(pathToHighlighted);
                pathToHighlighted = undefined;
            }
        });


    }

    toggleSelection(cesiumEntity, teEntPath: string[]) {
        const teEntStore = this.ngRedux.configureSubStore(teEntPath, teEntReducer);

        if (teEntStore.getState().accentuation !== 'selected') {
            teEntStore.dispatch(this.teEntActions.setAccentuation('selected'))
            this.acMap.getCesiumViewer().selectedEntity = cesiumEntity;
        } else {
            teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
        }
    }

    mouseEnter(teEntPath: string[]) {
        const teEntStore = this.ngRedux.configureSubStore(teEntPath, teEntReducer);
        if (teEntStore.getState().accentuation !== 'selected') {
            teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
        }
    }

    mouseLeave(teEntPath: string[]) {
        const teEntStore = this.ngRedux.configureSubStore(teEntPath, teEntReducer);
        if (teEntStore.getState().accentuation === 'highlighted') {
            teEntStore.dispatch(this.teEntActions.setAccentuation('none'))
        }
    }

}
