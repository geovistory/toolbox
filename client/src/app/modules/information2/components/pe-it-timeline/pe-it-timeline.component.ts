/**
 * This Component listenes for changes in the store and retrieves data
 * for display in the timeline. The component is a bridge between
 * the information module and the timeline module.
 */

import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { U } from 'app/core';
import { equals } from 'ramda';
import { Subject } from 'rxjs';
import { TimeLineData, TimeLineRow, TimeLineSettings } from '../../../timeline/models/timeline';
import { TeEntActions } from '../../data-unit/te-ent/te-ent.actions';
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { ExistenceTimeDetail, RoleSetList, TeEntAccentuation } from '../../information.models';
import { StateToDataService } from '../../shared/state-to-data.service';

@Component({
  selector: 'gv-pe-it-timeline',
  templateUrl: './pe-it-timeline.component.html',
  styleUrls: ['./pe-it-timeline.component.scss']
})
export class PeItTimelineComponent implements OnInit, OnDestroy {


  @Input() path: string[];

  timeLineData: TimeLineData;

  previousAccentuationMap = new Map<string[], TeEntAccentuation>();

  destroy$ = new Subject<boolean>()

  constructor(
    private ngRedux: NgRedux<RoleSetList>,
    private teEntActions: TeEntActions
  ) {
  }

  ngOnInit() {

    // subscribe to RoleSets and create TimeLineData
    this.ngRedux.select<RoleSetList>([...this.path, '_children'])
      .takeUntil(this.destroy$)
      .subscribe(roleSets => {
        const timeLineData = {
          rows: []
        }

        U.obj2KeyValueArr(roleSets).forEach(roleSetMap => {
          const set = roleSetMap.value;
          const setLabel = set.label.default;
          const roleSetPath = [...this.path, '_children', roleSetMap.key]

          U.obj2KeyValueArr(set._role_list).forEach(roleDetailMap => {
            const roleDetail = roleDetailMap.value;
            const roleDetailPath = [...roleSetPath, '_role_list', roleDetailMap.key];

            if (roleDetail._teEnt && roleDetail._teEnt._children && roleDetail._teEnt._children._existenceTime) {
              const teD = roleDetail._teEnt;
              const teEntPath = [...roleDetailPath, '_teEnt'];

              // const label = U.labelFromDataUnitChildList(teD._children).toString();

              // create a TimeLineRow for each TeEntState
              timeLineData.rows.push({
                existenceTime: StateToDataService
                  .existenceTimeStateToExistenceTime(teD._children._existenceTime as ExistenceTimeDetail),
                label: setLabel,
                accentuation: teD.accentuation,
                storeConnector: { path: teEntPath }
              })
            }
          })
        })

        if (!equals(this.timeLineData, timeLineData)) {
          this.timeLineData = timeLineData
        }
      })
  }

  rowMouseEnter(row: TimeLineRow) {
    if (row.accentuation !== 'selected') {
      const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
      teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
    }
  }

  rowMouseLeave(row: TimeLineRow) {
    if (row.accentuation === 'highlighted') {
      const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
      teEntStore.dispatch(this.teEntActions.setAccentuation('none'))
    }
  }

  rowClick(row: TimeLineRow) {
    const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
    if (row.accentuation !== 'selected') {
      teEntStore.dispatch(this.teEntActions.setAccentuation('selected'))
    } else {
      teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
