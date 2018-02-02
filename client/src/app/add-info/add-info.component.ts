import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { InformationRole } from '../shared/sdk/models/InformationRole';
import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { Property , PropertyService , DirectionAwareProperty } from '../shared/services/property.service';
import { RoleService } from '../shared/services/role.service';
import { KeyboardService } from '../shared/services/keyboard.service';

@Component({
  selector: 'gv-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss'],
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
export class AddInfoComponent implements OnInit {

  /**
  * Inputs
  */

  // The roles this component does use
  @Input() roles:InformationRole[];

  // The parent PeItEntityComponent
  @Input() parentPeItC:PeItEntityComponent;

  /**
  * Properties
  */

  // state of this component
  addInfoState:string;

  // state of child component
  propState:string;


  // Poperty that is currently chosen in order to add a role of this kind
  propertyToAdd:DirectionAwareProperty;

  // state of the card
  cardState = 'expanded';


  // Array of possible ingoing Properties of the class of the parent peIt
  ingoingDirectionAwareProperties:DirectionAwareProperty[];

  // Array of possible outgoing Properties of the class of the parent peIt
  outgoingDirectionAwareProperties:DirectionAwareProperty[];


  constructor(
    private roleService:RoleService,
    private propertyService:PropertyService,
    public keyboard:KeyboardService
  ) { }


  /**
  * get rolesNotR63 - filter roles that are not R63
  *
  * @return {InformationRole[]} array of roles that are not R63
  */
  get rolesNotR63(){
    if (this.roles){
      return this.roles.filter(role => role.fk_property !== 'R63');
    }
    return [];
  }


  /**
  * get rolesPerProperty - returns array of this kinds
  *
  * [{fkProperty: 'P52', roles: []},…]
  *
  * @return {object}  description
  */
  get rolesPerProperty(){
    return this.roleService.getRolesPerProperty(this.roles);
  }


  /**
  * get addButtonVisible
  *
  * @return {bookean}  true if add button should be visible
  */
  get addButtonVisible(){

    if(this.addInfoState === 'selectProp') return false;
    if(this.addInfoState === 'add') return false;

    return true;

  }

  /**
  * Methods
  */

  ngOnInit() {
    this.outgoingDirectionAwareProperties = this.propertyService
    .toDirectionAwareProperties(true, this.parentPeItC.outgoingProperties)

    this.ingoingDirectionAwareProperties = this.propertyService
    .toDirectionAwareProperties(false, this.parentPeItC.ingoingProperties)


  }


  /**
  * startSelectProperty - called, when user clicks on add info
  */
  startSelectProperty(){
    this.addInfoState = 'selectProp';
  }


  /**
  * stopSelectProperty - called, when user clicks on close button of property
  * selector or the info has been added successfully
  */
  stopSelectProperty(){
    this.addInfoState = 'view';
    this.propertyToAdd = undefined;
  }


  /**
  * called, when user selected a the kind of property to add
  */
  propertySelected(event){
    this.addInfoState = 'add';
    this.propState = 'add';
  }


  /**
  * called, when the child propertComponent's propState changes
  */
  onPropStateChange(state){
    this.propState = state;
  }

  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody(){
    this.cardState = this.cardState ==='expanded' ? 'collapsed':'expanded';
  }


}
