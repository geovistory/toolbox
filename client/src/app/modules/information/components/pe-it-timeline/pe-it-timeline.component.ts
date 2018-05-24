/**
 * This Component listenes for changes in the store and retrieves data
 * for display in the timeline. The component is a bridge between
 * the information module and the timeline module.
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IRoleSets } from '../role-set-list/role-set-list.model';
import { IRoleSetState } from '../role-set/role-set.model';
import { IRoleState } from '../role/role.model';
import { TimeLineData } from '../../../timeline/models/timeline';
import { StateToDataService } from '../../shared/state-to-data.service';
import { U } from 'app/core';

@Component({
  selector: 'gv-pe-it-timeline',
  templateUrl: './pe-it-timeline.component.html',
  styleUrls: ['./pe-it-timeline.component.scss']
})
export class PeItTimelineComponent implements OnInit {

  @Input() path: string[];

  timeLineData: TimeLineData;

  constructor(
    private ngRedux: NgRedux<IRoleSets>
  ) {
  }

  ngOnInit() {


    // subscribe to RoleSets
    this.ngRedux.select<IRoleSets>([...this.path, 'roleSets']).subscribe(roleSets => {
      this.timeLineData = {
        rows: []
      }

      U.obj2Arr(roleSets).forEach((set: IRoleSetState) => {
        // get all TeEntStates
        const setLabel = set.label.default;

        U.obj2Arr(set.roleStatesInProject).forEach((roleS: IRoleState) => {

          // create a TimeLineRow for each TeEntState
          this.timeLineData.rows.push({
            existenceTime: StateToDataService.existenceTimeStateToExistenceTime(roleS.childTeEnt.existenceTimeState),
            label: setLabel + (roleS.childTeEnt.label ? ': ' + roleS.childTeEnt.label : '')
          })

        })
      })



    })


  }


  /** 
   */
  createTimelineData(peIt) {


  }


}
