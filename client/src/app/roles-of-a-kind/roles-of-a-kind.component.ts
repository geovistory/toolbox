import { Component, OnInit, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { InformationRole } from '../shared/sdk/models/InformationRole';
import { RolePointToEnum , RoleComponent } from '../role/role.component';
import { RoleService } from '../shared/services/role.service';
import { EntityVersionProjectRelApi } from '../shared/sdk/services/custom/EntityVersionProjectRel';




@Component({
  selector: 'gv-roles-of-a-kind',
  templateUrl: './roles-of-a-kind.component.html',
  styleUrls: ['./roles-of-a-kind.component.scss']
})
export class RolesOfAKindComponent implements OnInit, AfterViewInit {

  /**
  * Inputs
  */

  // fk_property that all roles of this kind should have
  @Input() fkProperty:number;

  // roles of one kind (with the same fk_property)
  @Input() roles:InformationRole[];

  // Whether this role shoud include a PeIt or TeEnt component.
  @Input() pointTo:RolePointToEnum;

  // The component that includes this component in its HTML template
  @Input() parentComponent;

  /**
  * Outputs
  */

  /**
  * Properties
  */

  // Array of children RoleComponents
  @ViewChildren(RoleComponent) roleComponents: QueryList<RoleComponent>

  // the roleComponent that is currently the standard alternative
  standardRoleC:RoleComponent;

  // max. mumber of possible alternatives -1=infinite
  maxAlternatives:number;

  // If ui allows to choose standard alternative for property
  hasStandard:boolean;

  // thisComponent
  thisComponent = this;

  constructor(
    private eprApi: EntityVersionProjectRelApi,
    private roleService: RoleService
  ) { }


  /**
  * Methods
  */

  ngOnInit() {
    this.maxAlternatives = this.roleService.getMaxAlternatives(this.fkProperty);
  }

  ngAfterViewInit(){
    this.roleComponents.forEach(roleComponent => {
      if(roleComponent.role.entity_version_project_rels[0].is_standard_in_project){
        this.standardRoleC = roleComponent;
      }
    });
  }

  get roleLabelSingular(){
    return this.roleService.getLabelSingular(this.fkProperty)
  }

  get roleLabelPlural(){
    return this.roleService.getLabelPlural(this.fkProperty)
  }

  get roleLabel(){
    if(this.maxAlternatives === 1){
      return this.roleLabelSingular;
    }
    return this.roleLabelPlural;
  }

  get addButtonVisible():boolean{
    if(this.pointTo === 'TeEnt') return true;
    // if(this.state === 'add') return false;
    //
    // if (this.addingName) return false;

    return false;
  }


  /**
  * get isCircular - returns true if this roles point back to the same peIt
  * as at the root of the nested components 
  *
  * It's useful to prevent circular nesting of the components:
  * PeItEntity > … > Role > TeEnt > … > Role [> PeItEntity <- Stop circle here]
  *
  * @return {boolean}  true=circular, false=not circular
  */
  get isCircular (){

    // Return true, if all of this.roles are identical with the parent role
    // of the parent teEnt.

    if(this.parentComponent){
      if(this.parentComponent.parentComponent){
        let count = 0;
        this.roles.forEach(role=>{
          if(role.pk_entity == this.parentComponent.parentComponent.role.pk_entity){
            count++;
          }
        })
        if(this.roles.length===count){
          return true;
        }
      }
    }

    return false;
  }


  /**
  * changeStandardRole - Make another child role the standard role for
  * the active project.
  *
  * @param  {RoleComponent} roleC     RoleComponent of the role that wants to be standard
  * @return {void}
  */
  changeStandardRole(roleC:RoleComponent){

    let observables = [];

    // set loadingStdChange flag of the given component
    roleC.loadingStdChange = true;

    // Create observable of api call to make the given role new standard

    observables.push(this.eprApi.patchAttributes(
      roleC.epr.pk_entity_version_project_rel,
      {
        is_standard_in_project: true
      }
    ))

    // If there is a old standard Role to disable

    if(this.standardRoleC){

      // set loadingStdChange flag of the standardRoleComponent

      this.standardRoleC.loadingStdChange = true;

      // Create observable of api call to disable the old standard

      observables.push(this.eprApi.patchAttributes(
        this.standardRoleC.epr.pk_entity_version_project_rel,
        {
          is_standard_in_project: false
        }
      ))
    }

    Observable.combineLatest(observables)
    .subscribe(
      (value) => {

        // update the data in client memory
        roleC.epr = value[0];
        if(value[1]) this.standardRoleC.epr = value[1];

        // unset loadingStdChange flag of both components
        roleC.loadingStdChange = false;
        this.standardRoleC.loadingStdChange = false;

        // update this.standardRoleC
        this.standardRoleC = roleC;
      })

    }


  }
