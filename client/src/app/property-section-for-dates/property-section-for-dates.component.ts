import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { InfRoleApi } from '../shared/sdk/services/custom/InfRole';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { RoleService } from '../shared/services/role.service';
import { PropertyService } from '../shared/services/property.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';

import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'gv-property-section-for-dates',
  templateUrl: './property-section-for-dates.component.html',
  styleUrls: ['./property-section-for-dates.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
      })),
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out', keyframes([
        style({
          height: '*',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '0px',
          display: 'hidden',
          offset: 1
        })
      ]))),
      transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
        style({
          height: '0px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '*',
          display: 'hidden',
          offset: 1
        })
      ])))
    ])
  ]
})
export class PropertySectionForDatesComponent extends PropertyComponent implements OnInit {

    model: any = {};
    loading = false;
    errorMessages: Object;
    account: Account;
    confirm:boolean = false; //if true, form is hidden and confirmation shown.


  constructor(
    eprApi: InfEntityProjectRelApi,
    roleApi: InfRoleApi,
    activeProject: ActiveProjectService,
    roleService: RoleService,
    propertyService: PropertyService,
    util: UtilitiesService,
    public entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector)
  }


  ngOnInit() {
  }

  save(){
    console.log('save')
  }
  cancel(){
    console.log('cancel')
  }

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.loading = true;
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.loading = false;
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.loading = false;
    this.slimLoadingBarService.reset();
  }

}
