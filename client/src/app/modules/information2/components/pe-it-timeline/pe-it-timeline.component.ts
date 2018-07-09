/**
 * This Component listenes for changes in the store and retrieves data
 * for display in the timeline. The component is a bridge between
 * the information module and the timeline module.
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { TimeLineData } from '../../../timeline/models/timeline';
import { StateToDataService } from '../../shared/state-to-data.service';
import { U } from 'app/core';
import { RoleSetList, RoleSet, RoleDetail, ExistenceTimeDetail } from '../../information.models';

@Component({
  selector: 'gv-pe-it-timeline',
  templateUrl: './pe-it-timeline.component.html',
  styleUrls: ['./pe-it-timeline.component.scss']
})
export class PeItTimelineComponent implements OnInit {

  @Input() path: string[];

  timeLineData: TimeLineData;

  constructor(
    private ngRedux: NgRedux<RoleSetList>
  ) {
  }

  ngOnInit() {


    // subscribe to RoleSets
    this.ngRedux.select<RoleSetList>([...this.path, '_children']).subscribe(roleSets => {
      this.timeLineData = {
        rows: []
      }

      U.obj2Arr(roleSets).forEach((set: RoleSet) => {
        // get all TeEntStates
        const setLabel = set.label.default;

        U.obj2Arr(set._role_list).forEach((roleS: RoleDetail) => {

          if (roleS._teEnt._children._existenceTime)
            // create a TimeLineRow for each TeEntState
            this.timeLineData.rows.push({
              existenceTime: StateToDataService.existenceTimeStateToExistenceTime(roleS._teEnt._children._existenceTime as ExistenceTimeDetail),
              label: setLabel + (roleS._teEnt.label ? ': ' + roleS._teEnt.label : '')
            })

        })
      })
    })
  }

}
