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
import { RoleComponent, AppellationStdBool } from '../role/role.component';
import { ClassService } from '../shared/services/class.service';
import { Property } from '../shared/services/property.service';
import { KeyboardService } from '../shared/services/keyboard.service';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { PropertyComponent } from '../property/property.component';
import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';
import { ActiveProjectService } from '../shared/services/active-project.service';

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

  @Output() readyToAdd: EventEmitter<TemporalEntity> = new EventEmitter;

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;

  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

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

  displayLabel: string;

  // For add-pe-it-state: Temporal Entity to be Added
  teEntToAdd: TemporalEntity;

  // Array of children RoleComponents
  @ViewChildren(PropertyComponent) propertyComponents: QueryList<PropertyComponent>

  constructor(
    private activeProjectService: ActiveProjectService,
    private roleService: RoleService,
    private classService: ClassService,
    public keyboard: KeyboardService
  ) { }

  ngOnInit() {

    if (this.teEntState === 'create') {

      this.teEnt = new TemporalEntity();

      this.teEnt.fk_class = this.fkClass;

    }

    if (this.teEntState === 'add-pe-it') {

      // make a copy
      this.teEntToAdd = new TemporalEntity(this.teEnt);

      // add an epr
      this.teEntToAdd.entity_version_project_rels = [
        new EntityVersionProjectRel({
          fk_project: this.activeProjectService.project.pk_project,
          is_in_project: true,
          fk_entity_version_concat: this.teEnt.pk_entity_version_concat
        })
      ]

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

  onPropertyReadyToAdd(rolesToAdd: InformationRole[]) {

    let newRoles = [];

    // For each role coming in from property component
    rolesToAdd.forEach(roleToAdd => {

      let exists = false;

      for (let i = 0; i < this.teEntToAdd.te_roles.length; i++) {

        // Check if the role is allready in the teEntToAdd
        if (this.teEntToAdd.te_roles[i].pk_entity === roleToAdd.pk_entity) {

          // if yes replace it with the new one
          this.teEntToAdd.te_roles[i] = roleToAdd;
          exists = true;
        }
      }

      // else add it to a temporary array
      if (!exists) {
        newRoles.push(roleToAdd);
      }

    })
    // add all the new roles to teEntToAdd
    this.teEntToAdd.te_roles.concat(newRoles);

    this.readyToAdd.emit(this.teEntToAdd);

  }

  onPropertyNotReadyToAdd() {
    this.notReadyToAdd.emit();
  }

  toggleCardBody() {
    if (this.cardBodyState === 'collapsed')
      this.cardBodyState = 'expanded'
    else
      this.cardBodyState = 'collapsed'
  }

  /**
   * Methods for event bubbeling
   */

  emitAppeChange(appeStd: AppellationStdBool) {
    const label = new AppellationLabel(appeStd.appellation.appellation_label);
    this.displayLabel = label.getString();
    this.appeChange.emit(appeStd)
  }

}
