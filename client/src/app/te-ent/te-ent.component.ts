import { Component, OnInit, Input } from '@angular/core';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { RoleService , KindOfRoles } from '../shared/services/role.service';
import { RoleComponent } from '../role/role.component';
import { ClassService } from '../shared/services/class.service';
import { Property } from '../shared/services/property.service';
import { KeyboardService } from '../shared/services/keyboard.service';

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
  @Input() parentComponent:RoleComponent;

  // The state of this component
  @Input() teEntState:string;


  /**
  * Properties
  */

  outgoingProperties:Property[]

  ingoingProperties:Property[]

  // this component
  thisComponent = this;

  constructor(
    private roleService: RoleService,
    private classService:ClassService,
    public keyboard:KeyboardService
  ) { }

  ngOnInit() {

    if(this.teEntState === 'create'){

      this.teEnt = new TemporalEntity();

      if(this.parentComponent.parentComponent.isOutgoing === true)
      this.teEnt.fk_class = this.parentComponent.parentComponent.property.fk_range_class;

      if(this.parentComponent.parentComponent.isOutgoing === false)
      this.teEnt.fk_class = this.parentComponent.parentComponent.property.fk_domain_class;
    }


    this.outgoingProperties = this.classService.getOutgoingProperties(this.teEnt.fk_class);

    this.ingoingProperties = this.classService.getIngoingProperties(this.teEnt.fk_class);

  }

  /**
  * kindOfRoles - get array with all kind of roles
  * and all roles of that kind in an array. 
  *
  * @return {KindOfRoles[]}
  */
  get kindsOfRoles():KindOfRoles[]{
    return this.roleService.getRolesPerProperty(this.teEnt.te_roles);
  }


  //
  // /**
  // * get outgoingProperties - get array of Properties where this teEnt-Class
  // * is domain
  // *
  // * @return {Property[]}  array of outgoing properties
  // */
  // get outgoingProperties():Property[]{
  //   return this.classService.getOutgoingProperties(this.teEnt.fk_class);
  // }
  //
  //
  //   /**
  //   * get ingoingProperties - get array of Properties where this teEnt-Class
  //   * is range
  //   *
  //   * @return {Property[]}  array of ingoing properties
  //   */
  //   get ingoingProperties():Property[]{
  //     return this.classService.getIngoingProperties(this.teEnt.fk_class);
  //   }



}
