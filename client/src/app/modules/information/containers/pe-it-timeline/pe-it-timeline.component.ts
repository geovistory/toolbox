import { NgRedux, ObservableStore, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAppState, SubstoreComponent, TeEntAccentuation } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TimeLineData, TimeLineRow, TimeLineSettings } from 'app/modules/timeline/models/timeline';
import { Observable, Subject } from 'rxjs';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { PeItTimelineAPIActions } from './api/pe-it-timeline.actions';
import { PeItTimeline } from './api/pe-it-timeline.models';

// @WithSubStore({
//   basePathMethodName: 'getBasePath',
//   localReducer: peItTimelineReducer
// })
@Component({
  selector: 'gv-pe-it-timeline',
  templateUrl: './pe-it-timeline.component.html',
  styleUrls: ['./pe-it-timeline.component.css']
})
export class PeItTimelineComponent extends PeItTimelineAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<PeItTimeline>;

  @Input() pkEntity: number;

  @Output() close = new EventEmitter<void>();

  @select() timeLineSettings$: Observable<TimeLineSettings>;

  timeLineData$: Observable<TimeLineData>;

  previousAccentuationMap = new Map<string[], TeEntAccentuation>();

  constructor(
    protected rootEpics: RootEpics,
    public ngRedux: NgRedux<IAppState>,
    // private teEntActions: TeEntActions,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,

  ) {
    super()
  }


  ngOnInit() {

    // this.timeLineData$ = this.b.pipeRelatedTemporalEntities(this.pkEntity).pipe(
    //   switchMapOr([], (teEns) => combineLatest(
    //     teEns.map(teEn => (combineLatest(
    //       this.b.pipeTimeSpan(teEn.pk_entity),
    //       this.i.pipeLabelOfEntity(teEn.pk_entity),
    //       this.i.pipeClassLabelOfEntity(teEn.pk_entity)
    //     )).pipe(
    //       map(([timeSpan, teEnLabel, classLabel]) => {
    //         const timeLineRow: TimeLineRow = {
    //           accentuation: 'none',
    //           existenceTime: timeSpan,
    //           label: classLabel + ' ' + teEnLabel
    //         }
    //         return timeLineRow
    //       })
    //     ))
    //   )),
    //   map(rows => ({ rows }))
    // )

    // subscribe to PropertyFields and create TimeLineData
    // this.ngRedux.select<FieldList>([...dropLast(1, this.basePath), '_fields'])
    //   .takeUntil(this.destroy$)
    //   .subscribe(fields => {
    //     const timeLineData = {
    //       rows: []
    //     }

    //     U.obj2KeyValueArr(fields).forEach(propertyFieldMap => {
    //       if (propertyFieldMap.value.type === 'PropertyField') {
    //         const field = propertyFieldMap.value as PropertyField;
    //         const setLabel = field.label.default;
    //         const propertyFieldPath = [...this.basePath, '_fields', propertyFieldMap.key]

    //         U.obj2KeyValueArr(field._role_list).forEach(roleDetailMap => {
    //           const roleDetail = roleDetailMap.value;
    //           const roleDetailPath = [...propertyFieldPath, '_role_list', roleDetailMap.key];

    //           if (roleDetail._teEnt && roleDetail._teEnt._fields && roleDetail._teEnt._fields._field_48) {
    //             const teD = roleDetail._teEnt;
    //             const teEntPath = [...roleDetailPath, '_teEnt'];

    //             // create a TimeLineRow for each TeEntState
    //             timeLineData.rows.push({
    //               existenceTime: StateToDataService
    //                 .existenceTimeStateToExistenceTime(teD._fields._field_48 as ExistenceTimeDetail),
    //               label: setLabel,
    //               accentuation: teD.accentuation,
    //               storeConnector: { path: teEntPath }
    //             })
    //           }
    //         })
    //       }
    //     })

    //     if (!equals(this.timeLineData, timeLineData)) {
    //       this.timeLineData = timeLineData
    //     }
    //   })
  }


  rowMouseEnter(row: TimeLineRow) {
    if (row.accentuation !== 'selected') {
      // const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
      // teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
    }
  }

  rowMouseLeave(row: TimeLineRow) {
    if (row.accentuation === 'highlighted') {
      // const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
      // teEntStore.dispatch(this.teEntActions.setAccentuation('none'))
    }
  }

  rowClick(row: TimeLineRow) {
    // const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
    // if (row.accentuation !== 'selected') {
    //   teEntStore.dispatch(this.teEntActions.setAccentuation('selected'))
    // } else {
    //   teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
    // }
  }




  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
