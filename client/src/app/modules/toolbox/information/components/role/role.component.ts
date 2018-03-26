import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { InfAppellation, InfRole, DfhProperty, ActiveProjectService, EntityEditorService, InfRoleApi, InfEntityProjectRel, InfLanguage, InfTemporalEntity } from 'app/core';
import { EprService } from '../../shared/epr.service';

export enum RolePointToEnum {
  PeIt = "PeIt",
  TeEnt = "TeEnt"
};

export interface AppellationStdBool {
  appellation: InfAppellation;
  isStandardInProject: boolean;
  isMostPopular?: boolean;
  role?: InfRole;
}

export class RoleComponent implements OnInit {

  /**
  * Inputs
  */

  @Input() role: InfRole;

  @Input() isOutgoing: boolean;

  @Input() pointTo: string;

  @Input() roleState: string;

  @Input() pkTargetClass: string;

  @Input() fkProperty: number;

  @Input() parentProperty: DfhProperty;

  // If true, the UI for communiy statistics is visible
  @Input() communityStatsVisible: boolean;

  // If true, CRM info is visible in UI
  @Input() ontoInfoVisible: boolean;

  // true for latest modified role with highest is_standard_in_project_count
  @Input() isStandardRoleToAdd: boolean;

  /**
  * Outputs
  */

  @Output() onRequestStandard: EventEmitter<RoleComponent> = new EventEmitter();

  @Output() readyToCreate: EventEmitter<InfRole> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfRole> = new EventEmitter();

  @Output() roleCreated: EventEmitter<InfRole> = new EventEmitter();

  @Output() roleCreationCanceled: EventEmitter<void> = new EventEmitter();

  @Output() roleRemoved: EventEmitter<InfRole> = new EventEmitter();


  /**
  * Properties
  */

  // Used in add-pe-it state
  roleToAdd: InfRole;

  // Flag to disable the standard toggle button while loading 
  loadingStdChange: boolean = false;

  // true if the role is ready to create (only for create state)
  isReadyToCreate: boolean;

  // If the role points to a teEnt with a child appellation
  appellation: InfAppellation;

  private _isStandardInProject: boolean;


  constructor(
    private activeProjectService: ActiveProjectService,
    private eprService: EprService,
    private ref: ChangeDetectorRef,
    public entityEditor: EntityEditorService,
    private roleApi: InfRoleApi
  ) { }

  ngOnInit() {
    if ((this.roleState === 'create' || this.roleState === 'create-te-ent' || this.roleState === 'create-pe-it' ) && this.role === undefined) {
      this.role = new InfRole();
      this.role.fk_property = this.fkProperty;
    }


    // make a copy
    this.roleToAdd = new InfRole(this.role);

    let eprToAdd = new InfEntityProjectRel({
      fk_project: this.activeProjectService.project.pk_project,
      fk_entity_version_concat: this.role.pk_entity_version_concat
    })

    if (
      (this.roleState === 'add-pe-it' || this.roleState === 'create-pe-it')
      && this.isStandardRoleToAdd
    ) {
      eprToAdd.is_standard_in_project = true;
    }

    // add an epr
    this.roleToAdd.entity_version_project_rels = [eprToAdd]

    if (this.epr)
      this.isStandardInProject = this.epr.is_standard_in_project;
  }


  /**
  * get the entity project relation between this role and active project
  */
  get epr(): InfEntityProjectRel {
    return this.eprService.getEprOfEntity(this.role);
  }


  /**
  * set the entity project relation between this role and active project
  */
  set epr(epr: InfEntityProjectRel) {
    this.eprService.updateEprOfEntity(this.role, epr);
    this.isStandardInProject = this.epr.is_standard_in_project;
    // this.ref.detectChanges();
  }


  /**
  * returns true if the UI to see and edit standard in project status should
  * be visible.
  *
  * @return {boolean}  true = UI for standard in project is visible
  */
  get standardInProjectVisible(): boolean {
    return true;
  }


  /**
  * returns true if this is the standard role for this kind and this project
  *
  * @return {boolen}  description
  */
  get isStandardInProject(): boolean {
    return this._isStandardInProject;
  }

  set isStandardInProject(bool: boolean) {
    this._isStandardInProject = bool;

    if (this.appellation) {
      this.appeChange.emit({
        appellation: this.appellation,
        isStandardInProject: bool
      })
    }

    // Add other emits here if other things need to be emitted on std change
  }


  /**
  * requestStandard - tells the parent Property that it wants to become standard
  */
  requestStandard(): void {
    this.onRequestStandard.emit(this);
  }



  /**
  * createRole - called when user confirms to create a role (with all children)
  *
  */
  createRole() {


    this.roleApi.findOrCreateInfRole(
      this.activeProjectService.project.pk_project,
      this.role
    ).subscribe(newRole => {

      this.roleCreated.emit(newRole[0]);

    })

  }


  /**
  * cancelCreateRole - called when user cancels to create a role
  *
  */
  cancelCreateRole() {

    this.roleCreationCanceled.emit();

  }


  teEntReadyToCreate(teEnt: InfTemporalEntity) {

    this.role.temporal_entity = teEnt;

    this.isReadyToCreate = true;

    this.readyToCreate.emit(this.role);

  }


  teEntNotReadyToCreate() {

    this.isReadyToCreate = false;

    this.notReadyToCreate.emit()

  }



  /**
  * removeFromProject - called when user removes a role (nested) from project
  */
  removeFromProject() {
    if (this.isStandardInProject) {
      alert("You can't remove the standard item. Make another item standard and try again.")
    } else {

      this.roleApi.changeRoleProjectRelation(
        this.activeProjectService.project.pk_project, false, this.roleToAdd
      ).subscribe(result => {
        const removedRole: InfRole = result[0]
        this.roleRemoved.emit(removedRole);
      })
    }
  }


  /**
  * Methods specific to add-pe-it state
  */


  /**
  * Called when the user selects the role to add to project
  */
  select() {

    // change value in epr
    this.roleToAdd.entity_version_project_rels[0].is_in_project = true;

    // emit it
    this.readyToAdd.emit(this.roleToAdd);

  }

  /**
  * Called when the user deselects the role to not add it to project
  */
  deselect() {

    // change value in epr
    this.roleToAdd.entity_version_project_rels[0].is_in_project = false;

    // emit it
    this.readyToAdd.emit(this.roleToAdd);

  }

  onAppeReadyToAdd(appellation: InfAppellation) {

    // add appe to role
    this.roleToAdd.appellation = appellation;

    // emit it
    this.readyToAdd.emit(this.roleToAdd);

  }


  onLangReadyToAdd(language: InfLanguage) {

    // add appe to role
    this.roleToAdd.language = language;

    // emit it
    this.readyToAdd.emit(this.roleToAdd);

  }

  onTeEntReadyToAdd(teEntToAdd: InfTemporalEntity) {
    // add appe to role
    this.roleToAdd.temporal_entity = teEntToAdd;

    // emit it
    this.readyToAdd.emit(this.roleToAdd);
  }


  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {
    appeStd.isStandardInProject = this.isStandardInProject;
    appeStd.role = this.role;
    this.appellation = appeStd.appellation;
    this.appeChange.emit(appeStd)
  }

}
