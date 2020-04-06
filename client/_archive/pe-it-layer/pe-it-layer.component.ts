
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AcLayerComponent, AcMapComponent, AcNotification, ActionType, CesiumEvent, PickOptions } from 'angular-cesium';
import { U } from 'app/core';
import { from as observableFrom, Observable, Subject } from 'rxjs';
import { filter, map, merge, takeUntil } from 'rxjs/operators';
import { tag } from '../../../../../../node_modules/rxjs-spy/operators';
import { MapLayerPipesService } from 'app/modules/base/services/map-layer-pipes.service';
import { InformationBasicPipesService } from 'app/modules/base/services/information-basic-pipes.service';




@Component({
  selector: 'gv-pe-it-layer',
  templateUrl: './pe-it-layer.component.html',
  styleUrls: ['./pe-it-layer.component.scss']
})
export class PeItLayerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() pkEntity: number;

  @Input() acMap: AcMapComponent;

  @Output() readyToShow: EventEmitter<void> = new EventEmitter();

  @ViewChild(AcLayerComponent, { static: true }) layer: AcLayerComponent;



  czmlPackets$: Observable<AcNotification>;
  show = true;
  updater$ = new Subject<AcNotification>();

  reduxMiddlewares = [];

  // packet ids that are added. used to identify packets to remove upon state change
  packetIds: string[] = [];

  destroy$ = new Subject<boolean>();

  zoomed$ = new Subject<boolean>();

  // array of pk_entity of leaf peIts of class Built Work or Geographical Place
  leafGeoPeItsPks$: Observable<number[]>;

  // array of pk_entity of presences of leaf peIts
  leafPresencesPks$: Observable<number[]>;


  constructor(
    // public ngRedux: NgRedux<IAppState>,
    private b: InformationBasicPipesService,
    private m: MapLayerPipesService
  ) {
    // init stream of czml packets
    this.initCzmlStream();
  }

  // getBasePath = () => this.path;

  ngOnInit() {
    // this._fields$ = this.ngRedux.select<FieldList>([...this.getBasePath(), '_fields'])

  }

  ngAfterViewInit(): void {

    this.initLayer();

    this.initEvents()

  }

  private initCzmlStream() {
    this.czmlPackets$ = observableFrom([
      U.acNotificationFromPacket({
        id: 'document',
        version: '1.0'
      }, ActionType.ADD_UPDATE)
    ]).pipe(merge(this.updater$));
  }

  private initLayer() {
    const camera = this.acMap.getCameraService().getCamera();
    camera.setView({ destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0) });
    const scene = this.acMap.getCesiumService().getScene();

    const initLayer$ = new Subject();


    this.b.pipeRelatedTemporalEntities(this.pkEntity).pipe(
      takeUntil(this.destroy$),
      tag('c/pe-it-layer/czmls')
    ).subscribe()

    this.b.pipeRelatedTemporalEntities(this.pkEntity).pipe(
      takeUntil(this.destroy$),
      tag('c/pe-it-layer/czmls')
    ).subscribe()


    // this.b.pipeRelatedTemporalEntities(25957).pipe(
    //   takeUntil(this.destroy$),
    //   tag('c/pe-it-layer/czmls')
    // ).subscribe()

    // this.b.pipeRelatedTemporalEntities(25957).pipe(
    //   takeUntil(this.destroy$),
    //   tag('c/pe-it-layer/czmls')
    // ).subscribe()

    // this.b.pipeRelatedTemporalEntities(25957).pipe(
    //   takeUntil(this.destroy$),
    //   tag('c/pe-it-layer/czmls')
    // ).subscribe()


    this.pipeCzml(this.pkEntity).pipe(
      takeUntil(this.destroy$),
    ).subscribe((czmlPacket) => {
      this.layer.removeAll();
      czmlPacket.forEach(czmlPacket => this.update(czmlPacket))
      this.zoomToEntities()
    })


  }


  pipeCzml(pkEntity) {
    return this.m.pipeItem(pkEntity);
  }

  // update or add a czml packet to the layer
  update(packet) {
    if (packet) this.updater$.next(U.acNotificationFromPacket(packet, ActionType.ADD_UPDATE))
  }

  /**
   * Zoom to the extend of the entities of this layer
   * @return true if datasource was available and zoom worked, else false
   */
  zoomToEntities(): boolean {

    const dataSource = this.getDataSource();
    if (!dataSource || !dataSource.entities || (dataSource.entities.values.length < 1)) return false;

    // if only one entity, set some distance from ground, else 0.0
    const distance = dataSource.entities.values.length === 1 ? 200000 : 0.0;
    const options = new Cesium.HeadingPitchRange(0.0, -Cesium.Math.PI_OVER_TWO, undefined)
    this.acMap.getCesiumViewer().zoomTo(dataSource, options);

    // parent map is loading until this one emits
    this.zoomed$.next(true)

    return true;

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
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
      // const cesiumEntity = cesiumEntities[0];
      // const teEntPath = JSON.parse(cesiumEntity.properties.path.getValue());
      // this.toggleSelection(cesiumEntity, teEntPath);
    });

    // const pathToHighlighted;

    // on Click
    moveEvent$.pipe(
      map(result => result.cesiumEntities),
    ).subscribe(cesiumEntities => {
      // if (cesiumEntities && cesiumEntities.length > 0) {

      //     // mouse entered some entity
      //     // pathToHighlighted = JSON.parse(cesiumEntities[0].properties.path.getValue());
      //     // this.mouseEnter(pathToHighlighted);

      // } else if (pathToHighlighted) {

      //     // mouseout of some entity
      //     // this.mouseLeave(pathToHighlighted);
      //     // pathToHighlighted = undefined;
      // }
    });


  }

  // toggleSelection(cesiumEntity, teEntPath: string[]) {
  //     const teEntStore = this.ngRedux.configureSubStore(teEntPath, teEntReducer);

  //     if (teEntStore.getState().accentuation !== 'selected') {
  //         teEntStore.dispatch(this.teEntActions.setAccentuation('selected'))
  //         this.acMap.getCesiumViewer().selectedEntity = cesiumEntity;
  //     } else {
  //         teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
  //     }
  // }

  // mouseEnter(teEntPath: string[]) {
  //     const teEntStore = this.ngRedux.configureSubStore(teEntPath, teEntReducer);
  //     if (teEntStore.getState().accentuation !== 'selected') {
  //         teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
  //     }
  // }

  // mouseLeave(teEntPath: string[]) {
  //     const teEntStore = this.ngRedux.configureSubStore(teEntPath, teEntReducer);
  //     if (teEntStore.getState().accentuation === 'highlighted') {
  //         teEntStore.dispatch(this.teEntActions.setAccentuation('none'))
  //     }
  // }

}
