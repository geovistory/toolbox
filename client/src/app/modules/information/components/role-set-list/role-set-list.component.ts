import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { InfRole, InfPersistentItem, DfhProperty, EntityEditorService } from 'app/core';
import { DirectionAwareProperty, PropertyService } from '../../shared/property.service';
import { RoleService } from '../../shared/role.service';
import { EditorStates } from '../../information.models';
import { IRoleSetState } from '../role-set/role-set.model';
import { AppellationStdBool } from '../role/role.component';

export class RoleSetListComponent  {

  /**
  * Inputs
  */

  // The roles this component does use
  @Input() roles: InfRole[];

  // The primary key of the parent PeIt Entity
  @Input() pkEntity: number;

  // The parent PeIt Entity
  @Input() parentPeIt: InfPersistentItem;

  // array of properies of which the class of this peIt is range.
  @Input() outgoingProperties: DfhProperty[];

  // array of properies of which the class of this peIt is domain.
  @Input() ingoingProperties: DfhProperty[];

  // state of this component
  state:EditorStates;

  // state of adding new information section
  @Input() set addingInformation(val: boolean) {
    this._addingInformation = val;
    if (!val) this.stopAddingInformation.emit()
  };


  /**
  * Outputs
  */


  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  // emit to say that adding informaion is finished
  @Output() stopAddingInformation: EventEmitter<void> = new EventEmitter();

  // emit to say that the roles have been updated
  @Output() rolesUpdated: EventEmitter<InfRole[]> = new EventEmitter();


  /**
  * Properties
  */

  // adding information
  _addingInformation: boolean;

  get addingInformation(): boolean {
    return this._addingInformation;
  };

  // state of child components for adding or creating properties
  selectPropState: string;

  // state of child component for editing properties
  propState: string;

  // Poperty that is currently chosen in order to add a role of this kind
  propertyToAdd: DirectionAwareProperty;

  // state of the card
  cardState = 'expanded';

  // directed roles per property,
  // e.g.: [{fkProperty: 'P52', isOutgoing: true, roles: []},…]
  roleSets: IRoleSetState[] = [];

  // Array of possible ingoing Properties of the class of the parent peIt
  ingoingDirectionAwareProperties: DirectionAwareProperty[];

  // Array of possible outgoing Properties of the class of the parent peIt
  outgoingDirectionAwareProperties: DirectionAwareProperty[];

  // If true, the UI for communiy statistics is visible
  communityStatsVisible: boolean;

  // If true, the CRM Info (with links) is visible
  ontoInfoVisible: boolean;

  constructor(
    protected roleService: RoleService,
    private propertyService: PropertyService,
    public entityEditor: EntityEditorService,
    protected ref: ChangeDetectorRef

  ) { }


  /**
  * get addButtonVisible
  *
  * @return {bookean}  true if add button should be visible
  */
  get addButtonVisible() {
    
    if (this.state ==  'selectProp') return false;
    if (this.state === 'add') return false;
    if (this.state === 'create') return false;
    if (this.state === 'add-pe-it') return false;


    return true;

  }

  /**
  * Methods
  */

  setDirectionAwareProperties(ingoingProperties, outgoingProperties) {

    this.outgoingDirectionAwareProperties = this.propertyService
      .toDirectionAwareProperties(true, outgoingProperties)

    this.ingoingDirectionAwareProperties = this.propertyService
      .toDirectionAwareProperties(false, ingoingProperties)

    if (this.state === 'create') {

      //TODO find smarter choice of the default property to add on create
      this.propertyToAdd = this.ingoingDirectionAwareProperties.filter(odap => {
        return odap.property.dfh_pk_property === 1 //'R63'
      })[0]

      this.ref.detectChanges();

    }
  }

  setRoleSets(roles) {
    if (roles) {

      // this.roleSets = this.roleService.toRoleSets(
      //   roles,
      //   this.ingoingProperties,
      //   this.outgoingProperties
      // );
    }
  }


  /**
  * Show ui with community statistics like
  * - is in project count
  * - is standard in project count
  */
  showCommunityStats() {
    this.communityStatsVisible = true;
  }

  /**
  * Hide ui with community statistics like
  * - is in project count
  * - is standard in project count
  */
  hideCommunityStats() {
    this.communityStatsVisible = false;
  }



  /**
  * Show CRM Info in UI
  */
  showOntoInfo() {
    this.ontoInfoVisible = true;
  }

  /**
  * Hide CRM Info in UI
  */
  hideOntoInfo() {
    this.ontoInfoVisible = false;
  }


  /**
  * startSelectProperty - called, when user clicks on add info
  */
  startSelectProperty() {
    this.selectPropState = 'selectProp';
    this.propertyToAdd = null;

  }


  /**
  * stopSelectProperty - called, when user clicks on close button of property
  * selector or the info has been added successfully
  */
  stopSelectProperty() {

    this.selectPropState = 'init';

    this.stopAddingInformation.emit()

    this.propertyToAdd = null;
  }


  // /**
  // * called, when user selected a the kind of property to add
  // */
  // startSelectRoles() {
  //   if (this.propertyToAdd)
  //     this.selectPropState = 'init';

  //   // add a property sections

  //   const newPropertySection: RoleSets = {
  //     isOutgoing: this.propertyToAdd.isOutgoing,
  //     fkProperty: this.propertyToAdd.property.dfh_pk_property,
  //     roles: []
  //   }

  //   this.roleSets.push(newPropertySection);

  //   this.propertyToAdd = null;

  // }



  /**
  * Method to find out if a property section is already added
  */
  propSectionAdded(directionAwareProp: DirectionAwareProperty): boolean {
    return (this.roleSets.find(drpp => {
      return (
        drpp.isOutgoing == directionAwareProp.isOutgoing &&
        drpp.fkProperty == directionAwareProp.property.dfh_pk_property
      )
    })) ? true : false;
  }

  /**
  * called, when the child propertComponent's selectPropState changes
  */
  onPropStateChange(state) {
    this.selectPropState = state;

    if (state == 'selectProp') {
      this.propertyToAdd = null;
    }
  }


  /**
  * Called when the user closes an empty property section
  */
  onRemovePropertySectionReq(propSection: IRoleSetState) {
    var index = this.roleSets.indexOf(propSection, 0);
    if (index > -1) {
      this.roleSets.splice(index, 1);
    }
  }

  /**
  * called when a child propertComponent has added new roles
  */
  onRolesAdded(roles) {

    this.selectPropState = 'init';

    this.stopAddingInformation.emit()


    this.roles = this.roles.concat(roles);

    this.setRoleSets(this.roles);

  }

  /**
  * called when a role (and its children) are updated
  */
  onRolesUpdated(updatedRoles: InfRole[]) {
    for (let i = 0; i < this.roles.length; i++) {
      const r = this.roles[i];
      for (let j = 0; j < updatedRoles.length; j++) {
        const ur = updatedRoles[j];
        if (r.pk_entity == ur.pk_entity) {
          this.roles[i] = ur;
        }
      }
    }

    this.rolesUpdated.emit(this.roles);
  }




  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.cardState = this.cardState === 'expanded' ? 'collapsed' : 'expanded';
  }


}
