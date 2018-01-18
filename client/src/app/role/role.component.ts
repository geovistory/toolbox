import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EprService } from '../shared/services/epr.service';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';
import { RolesOfAKindComponent } from '../roles-of-a-kind/roles-of-a-kind.component';

export enum RolePointToEnum {
  PeIt = "PeIt",
  TeEnt = "TeEnt"
};

@Component({
  selector: 'gv-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  @Input() pointTo:RolePointToEnum;
  @Input() role:InformationRole;
  @Input() parentComponent:RolesOfAKindComponent;


  /**
  * Properties
  */

  // this component
  thisComponent = this;

  // Flag to disable the standard toggle button while loading 
  loadingStdChange:boolean=false;

test;

  constructor(
    private eprService:EprService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }


  /**
  * get the entity project relation between this role and active project
  */
  get epr():EntityVersionProjectRel{
    return this.eprService.getEprOfEntity(this.role);
  }

  /**
  * set the entity project relation between this role and active project
  */
  set epr(epr:EntityVersionProjectRel){
    this.eprService.updateEprOfEntity(this.role, epr);
    // this.ref.detectChanges();
  }

  /**
  * returns true if the UI to see and edit standard in project status should
  * be visible.
  *
  * @return {boolean}  true = UI for standard in project is visible
  */
  get standardInProjectVisible ():boolean{
    return true;
  }


  /**
  * returns true if this is the standard role for this kind and this project
  *
  * @return {boolen}  description
  */
  get isStandardInProject():boolean{
    return this.epr.is_standard_in_project;
  }


  /**
   * requestStandard - tells the parent RolesOfAKind that it wants to become standard
   */
  requestStandard():void {
    this.parentComponent.changeStandardRole(this)
  }

}
