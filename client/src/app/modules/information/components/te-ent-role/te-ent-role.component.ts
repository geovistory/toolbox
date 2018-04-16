import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService, EntityEditorService, InfRoleApi, InfAppellation, InfLanguage, InfRole } from 'app/core';
import { EprService } from '../../shared/epr.service';
import { RoleComponent } from '../role/role.component';
import { IRoleState } from '../role/role.model';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { RoleActions } from '../role/role.actions';
import { roleReducer } from '../role/role.reducers';

@WithSubStore({
  localReducer: roleReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-te-ent-role',
  templateUrl: './te-ent-role.component.html',
  styleUrls: ['./te-ent-role.component.scss']
})
export class TeEntRoleComponent extends RoleComponent {

  showAppellationUI: boolean;
  showLanguageUI: boolean;
  showEntityPreviewUI: boolean;
  language: InfLanguage;
  appellation: InfAppellation;
  pkEntity: number;

  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi,
    ngRedux: NgRedux<IRoleState>,
    actions: RoleActions
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi, ngRedux, actions)
  }

  init() {
    this.role$.subscribe(role => {
      this.showAppellationUI = this.showLanguageUI = this.showEntityPreviewUI = false;
      if (role) {
        if (role.appellation && role.appellation.fk_class) {
          this.showAppellationUI = true;
          this.appellation = new InfAppellation(role.appellation)
        }
        else if (role.language && role.language.fk_class) {
          this.showLanguageUI = true;
          this.language = new InfLanguage(role.language)
        }
        else {
          this.showEntityPreviewUI = true;
          this.pkEntity = role.fk_entity;
        }
      }
    })
  }
  //   /** 
  //   * Properties
  //   */

  //   // the role being edited
  //   roleInEdit: InfRole;

  //   /**
  //    * Inputs
  //    */

  @Input() fkTeEnt: number;

  //   constructor(
  //     activeProjectService: ActiveProjectService,
  //     eprService: EprService,
  //     ref: ChangeDetectorRef,
  //     entityEditor: EntityEditorService,
  //     roleApi: InfRoleApi
  //   ) {
  //     super(activeProjectService, eprService, ref, entityEditor, roleApi)
  //   }


  //   /**
  //   * Methods specific to create state
  //   */

  //   peItReadyToCreate(entity) {

  //     if (entity instanceof InfAppellation) {
  //       this.role.appellation = entity
  //     }

  //     if (entity instanceof InfLanguage) {
  //       this.role.language = entity
  //     }

  //     if (typeof entity === 'number') {
  //       this.role.fk_entity = entity
  //     }

  //     this.isReadyToCreate = true;

  //     this.readyToCreate.emit(this.role);

  //   }


  //   peItNotReadyToCreate() {

  //     this.isReadyToCreate = false;

  //     this.notReadyToCreate.emit()

  //   }


  //   /**
  //   * Methods specific to edit state
  //   */

  //   startEditing() {
  //     this.roleInEdit = new InfRole(this.role);
  //     this.roleInEdit.appellation = new InfAppellation(this.role.appellation)
  //     this.roleInEdit.language = new InfLanguage(this.role.language)
  //     this.roleState = 'edit';
  //   }

  //   stopEditing() {
  //     this.roleInEdit = undefined;
  //     this.roleState = 'editable';
  //   }

  //   changeRoleInEdit(entity) {
  //     if (entity instanceof InfAppellation) {
  //       this.roleInEdit.appellation = entity
  //     }

  //     if (entity instanceof InfLanguage) {
  //       this.roleInEdit.language = entity
  //     }

  //     if (typeof entity === 'number') {
  //       this.roleInEdit.fk_entity = entity
  //     }

  //     this.isReadyToCreate = true;

  //   }

  //   /**
  // * updateRole - called when user updates a role
  // *
  // */
  //   updateRole() {

  //     // create new role with children
  //     this.roleApi.findOrCreateInfRole(
  //       this.activeProjectService.project.pk_project,
  //       this.roleInEdit
  //     ).subscribe(roles => {

  //       const createdRole = roles[0];

  //       // // if the new role is really a different role than the previous one
  //       // if (this.role.pk_entity != createdRole.pk_entity) {

  //       this.role.entity_version_project_rels[0].is_in_project = false;

  //       // remove the old role from the project
  //       this.roleApi.changeRoleProjectRelation(
  //         this.activeProjectService.project.pk_project, false, this.role
  //       ).subscribe(result => {
  //         const removedRole: InfRole = result[0]

  //         // emit the new role added to the project
  //         this.roleCreated.emit(createdRole);

  //         // emit that this role is removed from project
  //         this.roleRemoved.emit(removedRole);

  //       })
  //     }

  //       // }
  //     )
  //   }

}
