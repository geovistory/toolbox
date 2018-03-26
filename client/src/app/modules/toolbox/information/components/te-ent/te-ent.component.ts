import { Component, OnInit, OnChanges, Input, ViewChildren, QueryList, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { RoleSetListComponent } from '../role-set-list/role-set-list.component';
import { InfTemporalEntity, DfhProperty, InfRole, DfhClass, ActiveProjectService, EntityEditorService, InfEntityProjectRel } from 'app/core';
import { AppellationStdBool } from '../role/role.component';
import { DirectedRolesPerProperty, RoleService } from '../../shared/role.service';
import { TeEntRoleSetComponent } from '../te-ent-role-set/te-ent-role-set.component';
import { PropertyService } from '../../shared/property.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';



@Component({
  selector: 'gv-te-ent',
  templateUrl: './te-ent.component.html',
  styleUrls: ['./te-ent.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
        overflow: 'visible'
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
export class TeEntComponent extends RoleSetListComponent implements OnInit {

  /**
  * Inputs
  */

  // The Temporal Entity
  @Input() teEnt: InfTemporalEntity;

  @Input() parentProperty: DfhProperty;

  @Input() parentRole: InfRole;

  @Input() isOutgoing: boolean;

  // The state of this component
  @Input() teEntState: string;

  @Input() fkClass: number;

  // If true, the UI for communiy statistics is visible
  @Input() communityStatsVisible: boolean;

  // If true, CRM info is visible in UI
  @Input() ontoInfoVisible: boolean;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfTemporalEntity> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfTemporalEntity> = new EventEmitter;

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;

  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  /**
  * Properties
  */

  outgoingProperties: DfhProperty[]

  ingoingProperties: DfhProperty[]

  // directed roles per property,
  // e.g.: [{fkProperty: 'P52', isOutgoing: true, roles: []},…]
  directedRolesPerProperty: DirectedRolesPerProperty[];

  isReadyToCreate: boolean;

  // if 'collapsed': only header section is visible
  // if 'expanded': all visible
  cardBodyState: string = 'collapsed';

  displayLabel: string;

  // For add-pe-it-state: Temporal Entity to be Added
  teEntToAdd: InfTemporalEntity;


  //Class of this peIt
  dfhClass: DfhClass;

  // Array of children TeEntRoleSetComponent
  @ViewChildren(TeEntRoleSetComponent) RoleSetComponents: QueryList<TeEntRoleSetComponent>

  constructor(
    roleService: RoleService,
    propertyService: PropertyService,
    ref: ChangeDetectorRef,
    private activeProjectService: ActiveProjectService,
    private classService: ClassService,
    public entityEditor: EntityEditorService
  ) {
    super(roleService, propertyService, entityEditor, ref)
  }

  ngOnInit() {

    if (this.teEntState === 'create') {

      this.teEnt = new InfTemporalEntity();

      this.teEnt.fk_class = this.fkClass;

    }

    if (this.teEntState === 'add-pe-it') {

      // make a copy
      this.teEntToAdd = new InfTemporalEntity(this.teEnt);

      // add an epr
      this.teEntToAdd.entity_version_project_rels = [
        new InfEntityProjectRel({
          fk_project: this.activeProjectService.project.pk_project,
          is_in_project: true,
          fk_entity_version_concat: this.teEnt.pk_entity_version_concat
        })
      ]

    }

    // make a copy
    this.teEntToAdd = new InfTemporalEntity(this.teEnt);

    // add an epr
    this.teEntToAdd.entity_version_project_rels = [
      new InfEntityProjectRel({
        fk_project: this.activeProjectService.project.pk_project,
        fk_entity_version_concat: this.teEnt.pk_entity_version_concat
      })
    ]

    this.initDfhClass(this.teEnt.fk_class)

    if (this.addingInformation) {
      this.selectPropState = 'selectProp'
    }
    else {
      this.selectPropState = 'init';
    }

    let apiCalls = [];

    apiCalls[0] = this.classService.getIngoingProperties(this.teEnt.fk_class)

    apiCalls[1] = this.classService.getOutgoingProperties(this.teEnt.fk_class)

    Observable.combineLatest(apiCalls).subscribe(result => {

      this.ingoingProperties = result[0];
      this.outgoingProperties = result[1];

      if (this.teEntState !== 'create') {
        this.setDirectionAwareProperties();
        this.setDirectedRolesPerProperty(this.teEnt.te_roles);
      }

    })

  }

  initDfhClass(fkClass) {
    this.classService.getByPk(fkClass).subscribe((dfhClass) => {
      this.dfhClass = dfhClass;
    })
  }


  propertyReadyToCreate(roles: InfRole[]) {


    let rolesToCreate: InfRole[] = [];

    let allValid = true;

    this.RoleSetComponents.forEach(RoleSetComponent => {

      if (!RoleSetComponent.isReadyToCreate && !RoleSetComponent.isCircular) allValid = false;

      rolesToCreate = rolesToCreate.concat(RoleSetComponent.rolesToCreate);

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

  onPropertyReadyToAdd(rolesToAdd: InfRole[]) {

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
