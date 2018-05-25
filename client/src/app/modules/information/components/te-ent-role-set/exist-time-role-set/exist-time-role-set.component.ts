import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { TeEntRoleSetComponent } from '../te-ent-role-set.component';
import { InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService, InfTemporalEntityApi } from 'app/core';
import { RoleService } from '../../../shared/role.service';
import { PropertyService } from '../../../shared/property.service';
import { UtilitiesService } from '../../../shared/utilities.service';
import { IRoleSetState } from '../../role-set/role-set.model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { RoleSetActions } from '../../role-set/role-set.actions';
import { RoleSetService } from '../../../shared/role-set.service';
import { IRoleState } from '../../role/role.model';
import { RoleActions } from '../../role/role.actions';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { ClassService } from '../../../shared/class.service';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideInOut } from '../../../shared/animations';
import { IExistenceTimeState } from '../../te-ent-existence-time/te-ent-existence-time.model';
import { existenceTimeReducer } from '../../te-ent-existence-time/te-ent-existence-time.reducer';
import { ExistenceTimeActions } from '../../te-ent-existence-time/te-ent-existence-time.actions';

@Component({
  selector: 'gv-exist-time-role-set',
  templateUrl: './exist-time-role-set.component.html',
  styleUrls: ['./exist-time-role-set.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExistTimeRoleSetComponent),
      multi: true
    }
  ]
})
export class ExistTimeRoleSetComponent extends TeEntRoleSetComponent {

  @Input() formControlName: string;
  @Output() onRemoveRoleSet: EventEmitter<void> = new EventEmitter();

  existenceTimeStore: ObservableStore<IExistenceTimeState>;

  constructor(
    eprApi: InfEntityProjectRelApi,
    roleApi: InfRoleApi,
    activeProject: ActiveProjectService,
    roleService: RoleService,
    propertyService: PropertyService,
    util: UtilitiesService,
    public entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    ngRedux: NgRedux<IRoleSetState>,
    actions: RoleSetActions,
    roleSetService: RoleSetService,
    roleStore: NgRedux<IRoleState>,
    roleActions: RoleActions,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    fb: FormBuilder,
    protected teEntApi: InfTemporalEntityApi,
    private existenceTimeActions: ExistenceTimeActions
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb, teEntApi)
  }

  initTeEntRoleSetChild() {
    this.formControlName;
    this.existenceTimeStore = this.ngRedux.configureSubStore<IExistenceTimeState>(this.parentPath, existenceTimeReducer);
  }

  /**
   * called when the user starts to edit an existing RoleState
   * @param key key of the Role State in store
   */
  startEditing(key) {
    const roleset = this.roleSetState.roleStatesInProject[key];

    this.subs.push(this.stateCreator.initializeRoleState(roleset.role, 'create-te-ent-role', roleset.isOutgoing).subscribe(roleState => {
      // starts the editing of this RoleState
      this.localStore.dispatch(this.actions.startEditingRole(key, roleState))

      // starts the editing of the parent form for editing existence time
      this.existenceTimeStore.dispatch(this.existenceTimeActions.startEditing())
    }))
  }

  /**
   * called when the user stops to edit an existing RoleState
   * @param key key of the Role State in store
   */
  stopEditing(key) {

    // resets the form, which will emit the initial form value by this.onChange()
    this.resetForm()

    const roleset = this.roleSetState.roleStatesInProject[key];
    this.subs.push(this.stateCreator.initializeRoleState(roleset.role, 'exist-time', roleset.isOutgoing).subscribe(roleState => {
      this.localStore.dispatch(this.actions.stopEditingRole(key, roleState))
    }))
  }

  /**
    * called when the user removes an existing roleStateinProject
    * Removes not only the roleState but the whole roleSet   
    */
  removeFromForm() {
    this.onRemoveRoleSet.emit()
  }
}
