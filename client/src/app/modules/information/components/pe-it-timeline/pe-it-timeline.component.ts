/**
 * This Component listenes for changes in the store and retrieves data
 * for display in the timeline. The component is a bridge between
 * the information module and the timeline module.
 */

import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { U } from 'app/core';
import { ExistenceTimeDetail, FieldList, TeEntAccentuation, PropertyField } from 'app/core/state/models';
import { equals } from 'ramda';
import { Subject } from 'rxjs';
import { TimeLineData, TimeLineRow } from '../../../timeline/models/timeline';
import { TeEntActions } from '../../entity/te-ent/te-ent.actions';
import { teEntReducer } from '../../entity/te-ent/te-ent.reducer';
import { StateToDataService } from '../../shared/state-to-data.service';

@Component({
  selector: 'gv-pe-it-timeline',
  templateUrl: './pe-it-timeline.component.html',
  styleUrls: ['./pe-it-timeline.component.scss']
})
export class PeItTimelineComponent implements OnInit, OnDestroy {


  @Input() path: string[];

  @Output() close = new EventEmitter<void>();

  timeLineData: TimeLineData;

  previousAccentuationMap = new Map<string[], TeEntAccentuation>();

  destroy$ = new Subject<boolean>()

  constructor(
    private ngRedux: NgRedux<FieldList>,
    private teEntActions: TeEntActions
  ) {
  }

  ngOnInit() {

    // subscribe to PropertyFields and create TimeLineData
    this.ngRedux.select<FieldList>([...this.path, '_fields'])
      .takeUntil(this.destroy$)
      .subscribe(fields => {
        const timeLineData = {
          rows: []
        }

        U.obj2KeyValueArr(fields).forEach(propertyFieldMap => {
          if (propertyFieldMap.value.type === 'PropertyField') {
            const field = propertyFieldMap.value as PropertyField;
            const setLabel = field.label.default;
            const propertyFieldPath = [...this.path, '_fields', propertyFieldMap.key]

            U.obj2KeyValueArr(field._role_list).forEach(roleDetailMap => {
              const roleDetail = roleDetailMap.value;
              const roleDetailPath = [...propertyFieldPath, '_role_list', roleDetailMap.key];

              if (roleDetail._teEnt && roleDetail._teEnt._fields && roleDetail._teEnt._fields._field_48) {
                const teD = roleDetail._teEnt;
                const teEntPath = [...roleDetailPath, '_teEnt'];

                // const label = U.labelFromFieldList(teD._fields).toString();

                // create a TimeLineRow for each TeEntState
                timeLineData.rows.push({
                  existenceTime: StateToDataService
                    .existenceTimeStateToExistenceTime(teD._fields._field_48 as ExistenceTimeDetail),
                  label: setLabel,
                  accentuation: teD.accentuation,
                  storeConnector: { path: teEntPath }
                })
              }
            })
          }
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
