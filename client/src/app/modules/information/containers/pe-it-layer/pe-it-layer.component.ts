import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveProjectService, ClassConfig, fieldList_2_propFields, IAppState, InfTemporalEntity, mapConcat, propFields_2_roleDetails, roleDetails_2_geoPeItPks, TimeSpan, U } from 'app/core';
import { ExistenceTimeDetail, FieldList, TeEntDetail } from 'app/core/state/models';
import { combineLatest, Observable, OperatorFunction, Subject } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AcLayerComponent, AcMapComponent, AcNotification, ActionType, CesiumEvent, PickOptions } from '../../../gv-angular-cesium/angular-cesium-fork';
import { DfhConfig } from '../../shared/dfh-config';



@Component({
  selector: 'gv-pe-it-layer',
  templateUrl: './pe-it-layer.component.html',
  styleUrls: ['./pe-it-layer.component.scss']
})
export class PeItLayerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() path: string[];

  @Input() acMap: AcMapComponent;

  @Output() readyToShow: EventEmitter<void> = new EventEmitter();

  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  _fields$: Observable<FieldList>;
  pkEntity$: Observable<number>;


  // @select() leafPeItLoading$: Observable<boolean>;


  czmlPackets$: Observable<AcNotification>;
  show = true;
  updater$ = new Subject<AcNotification>();

  reduxMiddlewares = [];

  // packet ids that are added. used to identify packets to remove upon state change
  packetIds: string[] = [];

  destroy$ = new Subject<boolean>();

  zoomed = false;

  // array of pk_entity of leaf peIts of class Built Work or Geographical Place
  leafGeoPeItsPks$: Observable<number[]>;

  // array of pk_entity of presences of leaf peIts
  leafPresencesPks$: Observable<number[]>;


  constructor(
    public ngRedux: NgRedux<IAppState>,
    private projectService: ActiveProjectService
  ) {
    // init stream of czml packets
    this.initCzmlStream();
  }

  getBasePath = () => this.path;

  ngOnInit() {
    this._fields$ = this.ngRedux.select<FieldList>([...this.getBasePath(), '_fields'])
    this.pkEntity$ = this.ngRedux.select<number>([...this.getBasePath(), 'pkEntity'])
  }

  ngAfterViewInit(): void {

    // fly to browser geolocation
    this.flyToBrowserGeolocation();

    this.initLayer();

    this.initEvents()

  }

  private initCzmlStream() {
    this.czmlPackets$ = Observable.from([
      U.acNotificationFromPacket({
        id: 'document',
        version: '1.0'
      }, ActionType.ADD_UPDATE)
    ]).merge(this.updater$);
  }

  private initLayer() {
    const camera = this.acMap.getCameraService().getCamera();
    camera.setView({ destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0) });
    const scene = this.acMap.getCesiumSerivce().getScene();

    const initLayer$ = new Subject();
    const killAcSubs$ = initLayer$.merge(this.destroy$);

    // observable of acNotifications
    const teEn$ = this._fields$.pipe(
      fieldList_2_propFields(),
      propFields_2_roleDetails(),
      tap(() => {
        // remove all entities of the layer
        this.layer.removeAll();
        initLayer$.next();
      }),
      mergeMap(rDs => rDs.map(rD => rD._teEnt))
    )

    const inizializedTeEns = new Set();
    const acSubs = []
    teEn$.takeUntil(this.destroy$).subscribe(teEn => {
      let acNotifications$ = Observable.of([]);

      if (DfhConfig.CLASS_PK_PRESENCE == teEn.fkClass) {
        acNotifications$ = Observable.of(teEn).pipe(
          this.presence_2_acNotifications()
        )
      } else {

        acNotifications$ = Observable.of(teEn).pipe(
          this.teEntDetail_2_acNotifications()
        )
      }

      const acSub = acNotifications$.takeUntil(killAcSubs$).subscribe(nots => {

        nots.forEach(not => this.updater$.next(not))


        if (!inizializedTeEns.has(teEn.pkEntity)) {
          this.zoomed = this.zoomToEntities();
        }
        inizializedTeEns.add(teEn.pkEntity)

        // Explicitly render a new frame
        scene.requestRender();
      })
      acSubs.push(acSub);
    })
  }


  presence_2_acNotifications(): OperatorFunction<TeEntDetail, AcNotification[]> {

    return (presenceTeEnDetail$: Observable<TeEntDetail>): Observable<AcNotification[]> => {


      const teEnPk$ = presenceTeEnDetail$.pipe(
        map(teEnDetail => teEnDetail.pkEntity),
      )

      const teEnTimeSpan$ = presenceTeEnDetail$.pipe(
        map(teEnDetail => U.timeSpanFromExTimeDetail(teEnDetail._fields['_field_48'] as ExistenceTimeDetail)),
      )

      // get Presences TeEnGraph (for the geo coordinates and to create TimeSpan)
      const geoPresences$ = presenceTeEnDetail$.pipe(
        mergeMap(teEnDetail => this.projectService.loadTeEnGraphs([teEnDetail.pkEntity])), // TeEns: Presences
      )

      return combineLatest(
        teEnPk$,
        teEnTimeSpan$,
        geoPresences$
      ).map(([teEnPk, teEnTimeSpan, geoPresences]) => {


        if (teEnPk && geoPresences) {
          const label = 'Georeference'
          return this.createCzml(
            teEnPk,
            teEnTimeSpan,
            geoPresences,
            label
          ).map(packet => U.acNotificationFromPacket(packet, ActionType.ADD_UPDATE));
        }
      })

    }
  }


  teEntDetail_2_acNotifications(): OperatorFunction<TeEntDetail, AcNotification[]> {

    return (teEnDetail$: Observable<TeEntDetail>): Observable<AcNotification[]> => {


      const teEnPk$ = teEnDetail$.pipe(
        map(teEnDetail => teEnDetail.pkEntity),
      )

      const teEnTimeSpan$ = teEnDetail$.pipe(
        map(teEnDetail => U.timeSpanFromExTimeDetail(teEnDetail._fields['_field_48'] as ExistenceTimeDetail)),
      )

      const teEnlabel$ = teEnDetail$.pipe(
        map(teEnDetail => U.labelFromFieldList(teEnDetail._fields, { fieldsMax: 3, rolesMax: 1, path: [] })),
      )

      const teEnClassConfig$ = teEnDetail$.pipe(
        mergeMap(teEn => this.ngRedux.select<ClassConfig>(['activeProject', 'crm', 'classes', teEn.fkClass.toString()])),
      )


      // get Geo PeItGraph (for finding presences) and Geo PeIt Preview (for name of feature on map)
      const geoPeItPreview$ = teEnDetail$.pipe(
        map(teEn => {
          return teEn._fields
        }),
        fieldList_2_propFields(),
        propFields_2_roleDetails(),
        roleDetails_2_geoPeItPks(),
        filter(pks => pks.length > 0),
        mergeMap(pks => this.projectService.streamEntityPreview(pks[0]))
      )


      // get Presences TeEnGraph (for the geo coordinates and to create TimeSpan)

      const geoPresences$ = teEnDetail$.pipe(
        map(teEn => teEn._fields),
        fieldList_2_propFields(),
        propFields_2_roleDetails(),
        roleDetails_2_geoPeItPks(),
        filter(pks => !!pks[0]),
        mergeMap(pks => this.projectService.loadPeItGraphs(pks)),
        mapConcat(peIt => peIt.pi_roles),
        mergeMap(piRoles => this.projectService.filterRolesByPropertyFilter(piRoles, (prop) => prop.dfh_fk_property_of_origin == 147)), // Roles P166 was a presence of
        mergeMap(piRoles => this.projectService.loadTeEnGraphs(piRoles.map(r => r.fk_temporal_entity))), // TeEns: Presences
      )

      return combineLatest(
        teEnPk$,
        teEnTimeSpan$,
        teEnlabel$,
        geoPeItPreview$,
        geoPresences$,
        teEnClassConfig$
      ).map(([teEnPk, teEnTimeSpan, teEnlabel, geoPeItPreview, geoPresences, teEnClassConfig]) => {


        if (teEnPk && teEnlabel && geoPeItPreview && geoPresences && teEnClassConfig) {
          const label = [geoPeItPreview.entity_label, teEnClassConfig.label].join(' – ');
          return this.createCzml(
            teEnPk,
            teEnTimeSpan,
            geoPresences,
            label
          ).map(packet => U.acNotificationFromPacket(packet, ActionType.ADD_UPDATE));
        }
      })

    }
  }


  createCzml(teEnPk: number, teEnTimeSpan: TimeSpan, geoPresences: InfTemporalEntity[], label: string): Object[] {
    const czmlPackets = [];
    geoPresences.forEach(presence => {
      /************** Validate presence **************/

      // validate presence
      if (presence.fk_class != DfhConfig.CLASS_PK_PRESENCE) return null;

      // return false if no DateUnitChildren
      if (!presence.te_roles || !presence.te_roles.length) return null;

      // get role to place
      const placeRole = presence.te_roles.find(r => r.fk_property == DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE)

      // return false if no Place in Role
      if (!placeRole.place || !placeRole.place.pk_entity) return null;

      /************** Style Values **************/

      // timeSpanActivated === false
      const colorInactive = [255, 255, 255, 100];

      // timeSpanActivated === true
      const colorActive = [32, 201, 251, 200];

      // accentuation === 'selected'
      const outlineColorSelected = [0, 255, 255, 255];
      const outlineWidthSelected = 3;

      // accentuation === 'highlighted'
      const outlineColorHighlighted = [255, 206, 0, 255];
      const outlineWidthHighlighted = 3;

      // accentuation === 'none'
      const outlineColorDefault = [26, 130, 95, 255]
      const outlineWidthDefault = 1;


      let czmlPacket: any = {}

      // colors used for dynamic color change
      let colorRgba: any[] = colorInactive;

      // get the TimeSpan of initial TeEnt not the Presence
      const timeSpan = teEnTimeSpan;

      // TODO: compare the TimeSpan from initial teEnt with TimeSpan of the presence and figure out which presence
      // is best for displaying the teEnt on the map
      // const TimeSpan = U.ExTimeFromExTimeDetail(presence._fields['_field_48'] as ExistenceTimeDetail);

      // TimeSpan of initial TeEnt not Presence!
      if (timeSpan) {

        const minMax = timeSpan.getMinMaxTimePrimitive();

        const min = new Cesium.JulianDate(minMax.min.julianDay, 0, Cesium.TimeStandard.TAI);
        const max = new Cesium.JulianDate(minMax.max.getDateTime()
          .getEndOf(minMax.max.duration).getJulianDay(), 86399, Cesium.TimeStandard.TAI);

        const minStr = Cesium.JulianDate.toIso8601(min);
        const maxStr = Cesium.JulianDate.toIso8601(max);

        const before = Cesium.JulianDate.addSeconds(min, -1, min);
        const beforeStr = Cesium.JulianDate.toIso8601(before);

        const after = Cesium.JulianDate.addSeconds(max, 1, max);
        const afterStr = Cesium.JulianDate.toIso8601(after);

        colorRgba = [
          beforeStr, ...colorInactive,
          minStr, ...colorActive,
          maxStr, ...colorActive,
          afterStr, ...colorInactive,
        ];

      }

      const place = placeRole.place;

      czmlPacket = {
        ...czmlPacket,
        id: placeRole.pk_entity + '-' + teEnPk,
        position: {
          cartographicDegrees: [place.long, place.lat, 0]
        },
        point: {
          color: {
            rgba: colorRgba,
            forwardExtrapolationType: 'HOLD',
            backwardExtrapolationType: 'HOLD'
          },
          outlineColor: {
            rgba: [255, 0, 0, 200]
          },
          outlineWidth: 3,
          pixelSize: 15
        },
        label: {
          id: 'label of: ' + placeRole.pk_entity,
          text: label,
          font: '16pt "source sans pro"',
          horizontalOrigin: 'LEFT',
          fillColor: {
            rgba: [20, 20, 20, 255]
          },
          outlineColor: {
            rgba: [255, 255, 255, 230]
          },
          outlineWidth: 2,
          pixelOffset: {
            cartesian2: [12.0, -16.0]
          },
          scaleByDistance: {
            nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
          },
          translucencyByDistance: {
            nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
          },
          // this makes sense if the point also scales
          // pixelOffsetScaleByDistance: {
          //     nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
          // },
          style: 'FILL_AND_OUTLINE',
        },
        properties: {
          pKTemporalEntity: teEnPk
        }
      }

      // switch (teEntDetail.accentuation) {
      //     case 'selected':
      //         czmlPacket.point.outlineColor.rgba = outlineColorSelected;
      //         czmlPacket.point.outlineWidth = outlineWidthSelected;
      //         break;

      //     case 'highlighted':
      //         czmlPacket.point.outlineColor.rgba = outlineColorHighlighted;
      //         czmlPacket.point.outlineWidth = outlineWidthHighlighted;
      //         break;

      //     default:
      //         czmlPacket.point.outlineColor.rgba = outlineColorDefault;
      //         czmlPacket.point.outlineWidth = outlineWidthDefault;
      //         break;
      // }

      czmlPackets.push(czmlPacket)

    })

    return czmlPackets;
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
    this.acMap.getCesiumViewer().zoomTo(dataSource, new Cesium.HeadingPitchRange(0.0, -Cesium.Math.PI_OVER_TWO, distance));

    // parent map is loading until this one emits
    this.readyToShow.emit()

    return true;

  }

  flyToBrowserGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!this.zoomed) {
        this.acMap.getCesiumViewer().camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 4500000),
          duration: 0
        });

        // parent map is loading until this one emits
        this.readyToShow.emit()
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
