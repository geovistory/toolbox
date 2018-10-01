import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoleBase } from '../../role.base';
import { NgRedux, WithSubStore, select } from '@angular-redux/store';
import { FormBuilder } from '@angular/forms';
import { RoleDetail, CollapsedExpanded, PeItDetail } from 'app/core/state/models';
import { roleReducer } from '../../role.reducers';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { InfRole } from 'app/core';
import { RoleActions } from '../../role.actions';
import { StateCreatorService } from '../../../shared/state-creator.service';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: roleReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-te-ent-role-editable',
  templateUrl: './te-ent-role-editable.component.html',
  styleUrls: ['./te-ent-role-editable.component.scss']
})
export class TeEntRoleEditableComponent extends RoleBase {

  pkEntity: number;

  leafPeItStateInitialized: boolean;
  leafPeItLoading$: ReplaySubject<boolean>;
  formValPath: string[];

  @select() peItState$: Observable<PeItDetail>;


  @Output() stopEditing: EventEmitter<void> = new EventEmitter();
  @Output() startUpdating: EventEmitter<InfRole> = new EventEmitter();

  toggle: CollapsedExpanded;

  cancelEdit() {
    this.stopEditing.emit()
  }
  okEdit() {
    this.startUpdating.emit(this.formGroup.get(this.formControlName).value)
  }


  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder,
    protected actions: RoleActions,
    protected stateCreator: StateCreatorService
  ) {
    super(ngRedux, fb)
    this.leafPeItLoading$ = new ReplaySubject<boolean>();

  }

  init() {

    /** prepare the formGroup */
    this.formValPath = [...this.basePath, 'formGroup'];


    const toggle$ = this.ngRedux.select<CollapsedExpanded>([...this.parentPath, 'toggle']);

    this.subs.push(toggle$.subscribe(t => this.toggle = t))

  }




  /**
  * called, when a leaf pe-it or object was selected in order to findOrcreate a new role. 
  */
  pkEntitySelected(pkEntity: number) {

    // init the peItState that is visible as a preview before confirming to add the role
    // this.initPeItState(pkEntity);

    // update the infRole data  
    let role = new InfRole(this.roleState.role);
    role.fk_entity = pkEntity;
    this.localStore.dispatch(this.actions.leafPkEntitySelected(role))

  }



}
