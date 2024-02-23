
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BoundingSphere, Cartesian3, Math as CesiumMath, CzmlDataSource, HeadingPitchRange, JulianDate, Viewer } from 'cesium';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { CzmlPacket } from '../../../../lib/types/map.models';
import { CesiumService } from '../../../../services/cesium.service';

export interface MapLayers {
  layers: MapLayer[]
}
export interface MapLayer {
  czml: CzmlPacket[]
}

@Component({
  selector: 'gv-map-czml-layers',
  templateUrl: './map-czml-layers.component.html',
  styleUrls: ['./map-czml-layers.component.scss'],
  providers: [CesiumService],
  standalone: true
})
export class MapCzmlLayersComponent implements AfterViewInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  viewer: Viewer;

  @Input() data$: Observable<MapLayers>
  @Input() julianSecondOfCursor$: Observable<number>

  @ViewChild('cesiumContainer') cesiumContainer: ElementRef
  @ViewChild('baseLayerPickerContainer') baseLayerPickerContainer: ElementRef
  @ViewChild('sceneModePickerContainer') sceneModePickerContainer: ElementRef
  @ViewChild('navigationHelpButtonContainer') navigationHelpButtonContainer: ElementRef

  @Output() objectClicked = new EventEmitter()

  dataSources: CzmlDataSource[];

  constructor(private cs: CesiumService) { }

  ngAfterViewInit() {

    this.cs.createCesiumViewer(this.cesiumContainer.nativeElement)
    this.cs.addBaseLayerCartoDbBase()
    this.cs.addBaseLayerOSM()
    this.cs.addBaseLayerPicker(this.baseLayerPickerContainer.nativeElement, 0)
    this.cs.addSceneModePicker(this.sceneModePickerContainer.nativeElement)
    this.cs.addNavigationHelpButton(this.navigationHelpButtonContainer.nativeElement)
    this.cs.addMouseoverHighlight()
    this.cs.addMouseclickEvent((clickedObject) => {
      this.objectClicked.emit(clickedObject);
    })


    const dataSources$ = this.data$.pipe(
      tap(() => {
        this.cs.viewer.dataSources.removeAll(true);
      }),
      switchMap(data => {
        const d$ = data.layers.map(layer => {
          const dataSource = CzmlDataSource.load(layer.czml)
          this.cs.viewer.dataSources.add(dataSource);
          return from(dataSource)
        })
        return combineLatest(d$)
      }),
      tap(() => {
        this.cs.viewer.scene.requestRender()
      }),
    )

    // subscribe for the first time and zoom to entities
    let isFirst = true;
    dataSources$.pipe(takeUntil(this.destroy$))
      .subscribe(dataSources => {
        this.dataSources = dataSources;
        if (isFirst) {
          isFirst = false;
          this.zoomToEntities();
        }
      })

    if (this.julianSecondOfCursor$) {
      this.julianSecondOfCursor$.pipe(takeUntil(this.destroy$)).subscribe(jSec => {
        const jDay = Math.round(jSec / 86400);
        const secsOfDay = jSec % 86400;
        const j = new JulianDate(jDay, secsOfDay)
        this.cs.viewer.clock.currentTime = j;
      })
    }

  }



  private zoomToEntities() {
    const zoomOptions: HeadingPitchRange = {
      heading: 0,
      pitch: -CesiumMath.PI_OVER_TWO,
      range: 0
    };
    // let entities: Entity[] = []
    let positions: Cartesian3[] = [];
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
}


