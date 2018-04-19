import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService, EntityEditorService, InfRoleApi, InfAppellation, InfLanguage, InfRole } from 'app/core';
import { EprService } from '../../shared/epr.service';
import { RoleComponent } from '../role/role.component';
import { IRoleState } from '../role/role.model';
import { NgRedux, WithSubStore, select } from '@angular-redux/store';
import { RoleActions } from '../role/role.actions';
import { roleReducer } from '../role/role.reducers';
import { Observable } from 'rxjs/Observable';
import { CollapsedExpanded } from '../../information.models';
import { StateCreatorService } from '../../shared/state-creator.service';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { ReplaySubject, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
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
  showEntityUI: boolean;
  language: InfLanguage;
  appellation: InfAppellation;
  pkEntity: number;

  @select() peItState$: Observable<IPeItState>;


  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi,
    protected ngRedux: NgRedux<IRoleState>,
    actions: RoleActions,
    protected stateCreator: StateCreatorService
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi, ngRedux, actions, stateCreator)
  }

  init() {

    const toggle$ = this.ngRedux.select<CollapsedExpanded>([...this.parentPath, 'toggle']);
    Observable.combineLatest(this.role$, toggle$, this.peItState$)
      .subscribe(result => {
        const role = result[0];
        const toggle = result[1];
        const peItStateInitialized = (result[2]);

        this.showAppellationUI = this.showLanguageUI = this.showEntityUI = false;

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
            this.pkEntity = role.fk_entity;

            // initialize peIt preview on first expanding of role set
            if (toggle === 'expanded' && !peItStateInitialized && role.fk_entity) {
              this.initPeItState(role.fk_entity).subscribe(() => {
                this.showEntityUI = true;
              })
            }
            if (toggle === 'expanded' && peItStateInitialized) {
              this.showEntityUI = true;
            }
          }
        }
      })
  }



  /**
   * Initializes the peIt preview
   */
  initPeItState(pkEntity): Subject<boolean> {
    const subject = new ReplaySubject<boolean>()
    this.stateCreator.initializePeItState(pkEntity, this.activeProject.pk_project, 'view').subscribe(peItState => {
      this.localStore.dispatch(this.actions.leafPeItStateAdded(peItState))
      subject.next(true)
    });
    return subject;
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


  /**
  * Methods specific to create state
  */

  /**
   * called, when a leaf pe-it or object was selected in order to findOrcreate a new role. 
   */
  pkEntitySelected(pkEntity: number) {

    // init the peItState that is visible as a preview before confirming to add the role
    this.initPeItState(pkEntity);

    // update the infRole data  
    let role = new InfRole(this.roleState.role);
    role.fk_entity = pkEntity;
    this.localStore.dispatch(this.actions.leafPkEntitySelected(role))

  }

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
