import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { InfRole } from '../shared/sdk/models/InfRole';
import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { PropertyService, DirectionAwareProperty } from '../shared/services/property.service';
import { RoleService, RolesPerProperty, DirectedRolesPerProperty } from '../shared/services/role.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { AppellationStdBool } from '../role/role.component';
import { DfhProperty } from '../shared/sdk/models/DfhProperty';

export class PropSectionListComponent implements OnInit {

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
  @Input() propSectionListState: string;

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
  directedRolesPerProperty: DirectedRolesPerProperty[] = [];

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
    private ref: ChangeDetectorRef

  ) { }


  /**
  * get addButtonVisible
  *
  * @return {bookean}  true if add button should be visible
  */
  get addButtonVisible() {

    if (this.propSectionListState === 'selectProp') return false;
    if (this.propSectionListState === 'add') return false;
    if (this.propSectionListState === 'create') return false;
    if (this.propSectionListState === 'add-pe-it') return false;


    return true;

  }

  /**
  * Methods
  */

  ngOnInit() {

    this.propState = this.propSectionListState;

    // this.propertyToAdd = null;

  }

  setDirectionAwareProperties() {

    this.outgoingDirectionAwareProperties = this.propertyService
      .toDirectionAwareProperties(true, this.outgoingProperties)

    this.ingoingDirectionAwareProperties = this.propertyService
      .toDirectionAwareProperties(false, this.ingoingProperties)

    if (this.propSectionListState === 'create') {

      //TODO find smarter choice of the default property to add on create
      this.propertyToAdd = this.ingoingDirectionAwareProperties.filter(odap => {
        return odap.property.dfh_pk_property === 1 //'R63'
      })[0]

      this.ref.detectChanges();

    }
  }

  setDirectedRolesPerProperty(roles) {
    if (roles) {

      this.directedRolesPerProperty = this.roleService.toDirectedRolesPerProperty(
        roles,
        this.ingoingProperties,
        this.outgoingProperties
      );
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


  /**
  * called, when user selected a the kind of property to add
  */
  startSelectRoles() {
    if (this.propertyToAdd)
      this.selectPropState = 'init';

    // add a property sections

    const newPropertySection: DirectedRolesPerProperty = {
      isOutgoing: this.propertyToAdd.isOutgoing,
      fkProperty: this.propertyToAdd.property.dfh_pk_property,
      roles: []
    }

    this.directedRolesPerProperty.push(newPropertySection);

    this.propertyToAdd = null;

  }



  /**
  * Method to find out if a property section is already added
  */
  propSectionAdded(directionAwareProp: DirectionAwareProperty): boolean {
    return (this.directedRolesPerProperty.find(drpp => {
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
  onRemovePropertySectionReq(propSection: DirectedRolesPerProperty) {
    var index = this.directedRolesPerProperty.indexOf(propSection, 0);
    if (index > -1) {
      this.directedRolesPerProperty.splice(index, 1);
    }
  }

  /**
  * called when a child propertComponent has added new roles
  */
  onRolesAdded(roles) {

    this.selectPropState = 'init';

    this.stopAddingInformation.emit()


    this.roles = this.roles.concat(roles);

    this.setDirectedRolesPerProperty(this.roles);

  }



  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.cardState = this.cardState === 'expanded' ? 'collapsed' : 'expanded';
  }


}
