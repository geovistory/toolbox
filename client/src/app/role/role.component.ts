import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EprService } from '../shared/services/epr.service';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';
import { PropertyComponent } from '../property/property.component';
import { KeyboardService } from '../shared/services/keyboard.service';

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

  /**
  * Inputs
  */

  @Input() role:InformationRole;

  @Input() parentComponent:PropertyComponent;

  @Input() roleState:string;

  @Input() pkTargetClass:string;

  /**
  * Properties
  */

  // this component
  thisComponent = this;

  // Flag to disable the standard toggle button while loading 
  loadingStdChange:boolean=false;

  constructor(
    private eprService:EprService,
    private ref:ChangeDetectorRef,
    public keyboard:KeyboardService
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
  * returns a string indicating, what kind of component will be included by the roles
  */
  get pointTo():string{
    return this.parentComponent.pointTo;
  }


  /**
  * requestStandard - tells the parent Property that it wants to become standard
  */
  requestStandard():void {
    this.parentComponent.changeStandardRole(this)
  }

}
