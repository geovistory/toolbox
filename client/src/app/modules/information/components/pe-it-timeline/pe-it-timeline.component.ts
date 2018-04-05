/**
 * This Component takes a persistent item and prepares the data for
 * its display in the timeline. The component is a bridge between
 * the information module and the timeline module.
 */

import { Component, OnInit, Input } from '@angular/core';
import { InfPersistentItem, InfTemporalEntity } from '../../../../core';
import { TeEntService } from '../../shared/te-ent.service';

@Component({
  selector: 'gv-pe-it-timeline',
  templateUrl: './pe-it-timeline.component.html',
  styleUrls: ['./pe-it-timeline.component.scss']
})
export class PeItTimelineComponent implements OnInit {

  @Input() peIt: InfPersistentItem;

  // true after successfully creating Timeline Data 
  timeLinePeIts;

  constructor(
    private teEntService: TeEntService
  ) { 
    this.timeLinePeIts = [];
  }

  ngOnInit() {
    this.createTimelineData()
  }


  /** 
   * filters out all roles of temporal entities, that are not
   * related to the existence time of the temporal entity.
   * Keeps only p81, p82, … .
   */
  createTimelineData() {

    let newPeIt = {}

    //clone the peIt
    Object.assign(newPeIt, this.peIt);

    const makeNewRole = async (teEnt, newRole) => {

      await new Promise((resolve)=>{
        this.teEntService.buildExistenceTime(teEnt).subscribe(existenceTime => {
          newRole.temporal_entity.existenceTime = existenceTime;
          newRole.temporal_entity.label = 'Test'
          resolve();
        })
      })

      return newRole;
    }

    // iterate over all roles of the peIt
    const waitForRoles = this.peIt.pi_roles.map(async (pi_role) => {

      let newRole = {
        temporal_entity: {
          existenceTime: {},
          label: ''
        }
      };
 
      // clone the role object
      Object.assign(newRole, pi_role);

      // get the temporal entity of the role
      const teEnt = pi_role.temporal_entity instanceof InfTemporalEntity ?
        pi_role.temporal_entity : new InfTemporalEntity(pi_role.temporal_entity);

      // create the existence time object and append it to the new Eole
      return makeNewRole(teEnt, newRole);

    })

    Promise.all(waitForRoles).then((newRoles) => {
      newPeIt['pi_roles'] = newRoles;
      this.timeLinePeIts = [newPeIt];
    })



  }


}
