import { Component, OnInit, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { RoleService, RolesPerProperty, DirectedRolesPerProperty } from '../shared/services/role.service';
import { RoleComponent } from '../role/role.component';
import { ClassService } from '../shared/services/class.service';
import { Property } from '../shared/services/property.service';
import { KeyboardService } from '../shared/services/keyboard.service';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'gv-te-ent',
  templateUrl: './te-ent.component.html',
  styleUrls: ['./te-ent.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*'
      })),
      state('collapsed', style({
        height: '0px'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out')),
      transition('collapsed => expanded', animate('400ms ease-in-out'))
    ])
  ]
})
export class TeEntComponent implements OnInit {

  /**
  * Inputs
  */

  // The Temporal Entity
  @Input() teEnt: TemporalEntity;

  @Input() parentProperty: Property;

  @Input() parentRole: InformationRole;

  @Input() isOutgoing: boolean;

  // The state of this component
  @Input() teEntState: string;

  @Input() fkClass: string;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<TemporalEntity> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;


  /**
  * Properties
  */

  outgoingProperties: Property[]

  ingoingProperties: Property[]

  // directed roles per property,
  // e.g.: [{fkProperty: 'P52', isOutgoing: true, roles: []},…]
  directedRolesPerProperty: DirectedRolesPerProperty[];

  isReadyToCreate: boolean;

  // if 'collapsed': only header section is visible
  // if 'expanded': all visible
  cardBodyState: string = 'collapsed';


  // Array of children RoleComponents
  @ViewChildren(PropertyComponent) propertyComponents: QueryList<PropertyComponent>

  constructor(
    private roleService: RoleService,
    private classService: ClassService,
    public keyboard: KeyboardService
  ) { }

  ngOnInit() {

    if (this.teEntState === 'create') {

      this.teEnt = new TemporalEntity();

      this.teEnt.fk_class = this.fkClass;

    }

    this.outgoingProperties = this.classService.getOutgoingProperties(this.teEnt.fk_class);

    this.ingoingProperties = this.classService.getIngoingProperties(this.teEnt.fk_class);

    if (this.teEntState !== 'create') {
      this.setDirectedRolesPerProperty()
    }


  }

  setDirectedRolesPerProperty() {
    this.directedRolesPerProperty = this.roleService.toDirectedRolesPerProperty(
      this.teEnt.te_roles,
      this.ingoingProperties,
      this.outgoingProperties
    );
  }

  propertyReadyToCreate(roles: InformationRole[]) {


    let rolesToCreate: InformationRole[] = [];

    let allValid = true;

    this.propertyComponents.forEach(propertyComponent => {

      if (!propertyComponent.isReadyToCreate && !propertyComponent.isCircular) allValid = false;

      rolesToCreate = rolesToCreate.concat(propertyComponent.rolesToCreate);

    })

    if (allValid) {

      this.teEnt.te_roles = rolesToCreate;

      this.isReadyToCreate = true;

      this.readyToCreate.emit(this.teEnt);

    }

  }

  propertyNotReadyToCreate() {

    this.isReadyToCreate = false;

    this.notReadyToCreate.emit()

  }

  toggleCardBody() {
    if (this.cardBodyState === 'collapsed')
      this.cardBodyState = 'expanded'
    else
      this.cardBodyState = 'collapsed'
  }

}
