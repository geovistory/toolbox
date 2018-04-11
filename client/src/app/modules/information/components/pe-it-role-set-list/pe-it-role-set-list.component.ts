import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { AppellationStdBool } from '../role/role.component';
import { RoleSetListComponent } from '../role-set-list/role-set-list.component';
import { InfRole, EntityEditorService } from 'app/core';
import { PropertyService } from '../../shared/property.service';
import { RoleService } from '../../shared/role.service';

@Component({
  selector: 'gv-pe-it-role-set-list',
  templateUrl: './pe-it-role-set-list.component.html',
  styleUrls: ['./pe-it-role-set-list.component.scss'],
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
export class PeItRoleSetListComponent extends RoleSetListComponent implements OnInit, OnChanges {

  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfRole[]> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfRole[]> = new EventEmitter;

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;



  constructor(
    roleService: RoleService,
    propertyService: PropertyService,
    entityEditor: EntityEditorService,
    ref: ChangeDetectorRef
  ) {
    super(roleService, propertyService, entityEditor, ref)
  }


  ngOnChanges() {

    if (this.addingInformation) {
      this.selectPropState = 'selectProp'
    }
    else {
      this.selectPropState = 'init';
    }

    if (this.outgoingProperties && this.ingoingProperties) {

      this.setDirectionAwareProperties();
      this.setRoleSets(this.roles);

    }
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
  * called when roles of property (section) are not ready to be added
  */
  onRolesNotReadyToAdd(roles: InfRole[]) {
    this.notReadyToAdd.emit();
  }


}
