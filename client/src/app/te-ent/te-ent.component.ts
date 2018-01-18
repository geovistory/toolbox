import { Component, OnInit, Input } from '@angular/core';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { RoleService } from '../shared/services/role.service';

@Component({
  selector: 'gv-te-ent',
  templateUrl: './te-ent.component.html',
  styleUrls: ['./te-ent.component.scss']
})
export class TeEntComponent implements OnInit {


  /**
   * Inputs
   */

  // The Temporal Entity
  @Input() teEnt:TemporalEntity;

  // The parent component (RoleComponent)
  @Input() parentComponent;


  /**
   * Properties
   */

   // this component
   thisComponent = this;

  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
  }

  /**
  * kindOfRoles - get array with all kind of roles
  * and all roles of that kind in an array. 
  *
  * @return {void}
  */
  get kindsOfRoles(){
    return this.roleService.getKindsOfRoles(this.teEnt.te_roles)
  }

}
