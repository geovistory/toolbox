import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AcLayerComponent, AcNotification, ActionType, MapsManagerService, CesiumEvent, PickOptions } from 'angular-cesium';
import { IAppState, U } from 'app/core';
import { Observable, Subject } from 'rxjs';

import { PeItDetail } from '../../information.models';
import { map, filter } from '../../../../../../node_modules/rxjs/operators';
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { TeEntActions } from '../../data-unit/te-ent/te-ent.actions';

@Component({
  selector: 'gv-pe-it-presence-layer',
  templateUrl: './pe-it-presence-layer.component.html',
  styleUrls: ['./pe-it-presence-layer.component.scss']
})
export class PeItPresenceLayerComponent implements OnInit, OnDestroy {

  @Input() path: string[];

  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  czmlPackets$: Observable<AcNotification>;
  show = true;
  updater = new Subject<AcNotification>();

  reduxMiddlewares = [];

  // packet ids that are added. used to identify packets to remove upon state change
  packetIds: string[] = [];

  constructor(
    public ngRedux: NgRedux<IAppState>,
    private mapsManagerService: MapsManagerService,
    private teEntActions: TeEntActions
  ) { }

  ngOnInit(): void {

    const scene = this.mapsManagerService.getMap().getCesiumSerivce().getScene();


    // init stream of czml packets
    this.czmlPackets$ = Observable.from(
      [
        U.acNotificationFromPacket({
          id: 'document',
          version: '1.0'
        }, ActionType.ADD_UPDATE)
      ]
    ).merge(this.updater)

    let zoomed = false;

    // update czml-packets upon change of state
    this.ngRedux.select<PeItDetail>(this.path).subscribe(peItDetail => {

      // remove all entities of the layer
      this.layer.removeAll();

      if (peItDetail) {
        // redraw all entities of the peItDetail

        const presences = U.presencesFromPeIt(peItDetail, this.path)
        const processedPrecences = U.czmlPacketsFromPresences(presences);

        const teEnts = U.teEntsWithoutPresencesFromPeIt(peItDetail, this.path)
        const processedTeEnts = U.czmlPacketsFromTeEnts(teEnts)

        processedPrecences.czmlPackets.forEach(czmlPacket => {
          const acNotification = U.acNotificationFromPacket(czmlPacket, ActionType.ADD_UPDATE);
          this.updater.next(acNotification);
        });

        processedTeEnts.czmlPackets.forEach(czmlPacket => {
          const acNotification = U.acNotificationFromPacket(czmlPacket, ActionType.ADD_UPDATE);
          this.updater.next(acNotification);
        });

        if (!zoomed) {
            zoomed = this.flyToEntities();
        }

        // Explicitly render a new frame
        scene.requestRender();

      }

    })

    this.initEvents()

  }

  // update or add a czml packet to the layer
  update(packet) {
    if (packet) this.updater.next(U.acNotificationFromPacket(packet, ActionType.ADD_UPDATE))
  }

  /**
   * Zoom to the extend of the entities of this layer
   * @return true if datasource was available and zoom worked, else false 
   */
  flyToEntities(): boolean {

    const dataSource = this.layer.getDrawerDataSourcesByName('czml')[0];
    if (!dataSource) return false;

    const viewer = this.mapsManagerService.getMap().getCesiumViewer();
    viewer.flyTo(dataSource, {
      offset: {
        heading: 0.0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        range: 0.0
      }
    });
    return true;
  }

  // remove a czml packet from the layer
  remove(entityId: string) {
    this.layer.remove(entityId)
  }

  ngOnDestroy() {
    // this.reduxMiddlewares.forEach(mw => removeMiddleware(mw))
  }

  initEvents() {

    const mapEventsManagerService = this.mapsManagerService.getMap().getMapEventsManager();

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
      this.mapsManagerService.getMap().getCesiumViewer().selectedEntity = cesiumEntity;
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
