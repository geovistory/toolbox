import { NgRedux, ObservableStore, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { IAppState, RootEpics } from '@kleiolab/lib-redux';
import { SubstoreComponent } from 'projects/app-toolbox/src/app/core/basic/basic.module';
import { TimeLineData, TimeLineRow, TimeLineSettings } from 'projects/app-toolbox/src/app/modules/timeline/models/timeline';
import { Observable, Subject } from 'rxjs';
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

  // previousAccentuationMap = new Map<string[], TeEntAccentuation>();

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