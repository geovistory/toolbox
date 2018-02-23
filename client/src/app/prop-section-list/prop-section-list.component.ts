import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
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
import { KeyboardService } from '../shared/services/keyboard.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { AppellationStdBool } from '../role/role.component';
import { DfhProperty } from '../shared/sdk/models/DfhProperty';

@Component({
  selector: 'gv-prop-section-list',
  templateUrl: './prop-section-list.component.html',
  styleUrls: ['./prop-section-list.component.scss'],
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
export class PropSectionListComponent implements OnInit, OnChanges {

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
  @Input() addingInformation: boolean;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfRole[]> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfRole[]> = new EventEmitter;


  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  // emit to say that adding informaion is finished
  @Output() stopAddingInformation: EventEmitter<void> = new EventEmitter();


  /**
  * Properties
  */

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
  directedRolesPerProperty: DirectedRolesPerProperty[];

  // Array of possible ingoing Properties of the class of the parent peIt
  ingoingDirectionAwareProperties: DirectionAwareProperty[];

  // Array of possible outgoing Properties of the class of the parent peIt
  outgoingDirectionAwareProperties: DirectionAwareProperty[];


  constructor(
    private roleService: RoleService,
    private propertyService: PropertyService,
    public keyboard: KeyboardService
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

    this.propertyToAdd = null;

  }

  ngOnChanges() {

    if (this.addingInformation) {
      this.selectPropState = 'selectProp'
    }
    else {
      this.selectPropState = 'init';
    }

    if (this.outgoingProperties && this.ingoingProperties) {

      this.outgoingDirectionAwareProperties = this.propertyService
        .toDirectionAwareProperties(true, this.outgoingProperties)

      this.ingoingDirectionAwareProperties = this.propertyService
        .toDirectionAwareProperties(false, this.ingoingProperties)

      if (this.roles) this.setDirectedRolesPerProperty();

    }

    if (this.propSectionListState === 'create') {
      this.selectPropState = 'createPeIt';

      //TODO find smarter choice of the default property to add on create
      this.propertyToAdd = this.outgoingDirectionAwareProperties.filter(odap => {
        return odap.property.dfh_pk_property === 1 //'R63'
      })[0]

    }

  }

  setDirectedRolesPerProperty() {
    this.directedRolesPerProperty = this.roleService.toDirectedRolesPerProperty(
      this.roles,
      this.ingoingProperties,
      this.outgoingProperties
    );
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
      this.selectPropState = 'selectRoles';
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
   * called when a child propertComponent has added new roles
   */
  onRolesAdded(roles) {

    this.selectPropState = 'init';

    this.stopAddingInformation.emit()


    this.roles = this.roles.concat(roles);

    this.setDirectedRolesPerProperty();

  }

  /**
   * called when roles ready to create
   */
  emitReadyToCreate(roles: InfRole[]) {

    this.readyToCreate.emit(roles);

  }

  /**
   * called when role isnt ready to create
   */
  emitNotReadyToCreate(roles: InfRole[]) {

    this.notReadyToCreate.emit();

  }

  /**
   * Methods for event bubbeling
   */

  emitAppeChange(appeStd: AppellationStdBool) {
    this.appeChange.emit(appeStd)
  }

  /**
   * called when roles of property (section) are ready to be added
   */
  onRolesReadyToAdd(roles: InfRole[]) {
    this.readyToAdd.emit(roles);
  }

  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.cardState = this.cardState === 'expanded' ? 'collapsed' : 'expanded';
  }


}
