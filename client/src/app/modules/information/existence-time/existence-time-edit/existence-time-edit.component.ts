import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRel, InfRole, InfTimePrimitive, ValidationService } from 'app/core';
import { ExistenceTimeEdit, ExTimeHelpMode, ExTimeModalMode, RoleSet, RoleSetList, TeEntDetail } from 'app/core/state/models';
import { roleSetKey, roleSetKeyFromParams, createRoleSet } from 'app/core/state/services/state-creator';
import { dropLast, union } from 'ramda';
import { Observable, Subscription } from 'rxjs';
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { DfhConfig } from '../../shared/dfh-config';
import { ExistenceTimeActions } from '../existence-time.actions';
import { ExTimeEditActions } from './existence-time-edit.actions';
import { existenceTimeEditReducer } from './existence-time-edit.reducer';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeEditReducer
})
@Component({
  selector: 'gv-existence-time-edit',
  templateUrl: './existence-time-edit.component.html',
  styleUrls: ['./existence-time-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExistenceTimeEditComponent extends ExTimeEditActions implements OnInit, OnDestroy, AfterViewInit {

  @Input() basePath: string[]


  @Input() mode: 'create' | 'editable';

  @Output() stopEditing: EventEmitter<void> = new EventEmitter();

  @Output() submitted: EventEmitter<{ toAdd: InfRole[], toRemove: InfRole[], unchanged: InfRole[] }> = new EventEmitter();


  _fields: RoleSetList;
  @select() _fields$: Observable<RoleSetList>;
  @select() showOntoInfo$: Observable<boolean>;
  @select() helpMode$: Observable<ExTimeHelpMode>
  @select() mode$: Observable<ExTimeModalMode>

  localStore: ObservableStore<ExistenceTimeEdit>
  parentTeEntStore: ObservableStore<TeEntDetail>; // needed for creating a value to send to api

  formGroup: FormGroup;

  // true, once user clicked on save
  submitClicked = false;

  // From Value given on Init. Need to be removed from project, if edited
  initialFormVal;

  subs: Subscription[] = [];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: ExistenceTimeActions,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef,
    protected validationService: ValidationService
  ) {
    super();

    this.initForm();

    this.initFormSubscription();

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeEditReducer);
    this.parentTeEntStore = this.ngRedux.configureSubStore(dropLast(3, this.basePath), teEntReducer)

    this.initShortCuts(this.localStore.getState())
    this.initFormCtrls();

    this.subs.push(this.localStore.select<ExistenceTimeEdit>('').subscribe(d => {
      if (d) {
        this._fields = d._fields;
      }
    }))
  }


  initShortCuts(state: ExistenceTimeEdit) {

    // If init in one-date mode and the roleSet for "At some time within" is not yet there
    if (state.mode === 'one-date' && (state._fields === undefined || state._fields._72_outgoing === undefined)) {
      this.addRoleSet(72)
    }

    // If init in begin-end mode and the roleSet for "Begin" is not yet there
    if (state.mode === 'begin-end' && (state._fields === undefined || state._fields._150_outgoing === undefined)) {
      this.addRoleSet(150)
    }

    // If init in begin-end mode and the roleSet for "End" is not yet there
    if (state.mode === 'begin-end' && (state._fields === undefined || state._fields._151_outgoing === undefined)) {
      this.addRoleSet(151)
    }
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngAfterViewInit() {
    this.initialFormVal = this.formGroup.value;
  }


  /**
   * Inits the formGroup used in template
   */
  initForm() {
    this.formGroup = this.fb.group(
      {},
      {
        validator: (fg) => {

          const has = (ctrlName: string) => {
            if (fg.get(ctrlName)) return true;
            else return false;
          }

          // The begin of 'Earliest possible begin' must be earlier than the end of 'Latest possible end'
          if (has('_152_outgoing') && has('_153_outgoing')) {
            this.validationService.mustBeginBeforeEnd('_152_outgoing', 'Earliest possible begin', '_153_outgoing', 'Latest possible end')(fg);
          }
          // The begin of 'Begin' must be earlier than the end of 'End'
          if (has('_150_outgoing') && has('_151_outgoing')) {
            this.validationService.mustBeginBeforeEnd('_150_outgoing', 'Begin', '_151_outgoing', 'End')(fg);
          }
          // 'Begin' can't begin before 'Earliest possible begin'
          if (has('_150_outgoing') && has('_152_outgoing')) {
            this.validationService.cantBeginBeforeBegin('_150_outgoing', 'Begin', '_152_outgoing', 'Earliest possible begin')(fg);
          }
          // 'Begin' can't begin before 'At some time within'
          if (has('_150_outgoing') && has('_72_outgoing')) {
            this.validationService.cantBeginBeforeBegin('_150_outgoing', 'Begin', '_72_outgoing', 'At some time within')(fg);
          }
          // 'Latest possible end' can't end before 'End'
          if (has('_153_outgoing') && has('_151_outgoing')) {
            this.validationService.cantEndBeforeEnd('_153_outgoing', 'Latest possible end', '_151_outgoing', 'End')(fg);
          }
          // 'Latest possible end' can't end before 'End'
          if (has('_153_outgoing') && has('_151_outgoing')) {
            this.validationService.cantEndBeforeEnd('_153_outgoing', 'Latest possible end', '_151_outgoing', 'End')(fg);
          }
          // 'Latest possible end' can't end before  'Ongoing throughout'
          if (has('_153_outgoing') && has('_71_outgoing')) {
            this.validationService.cantEndBeforeEnd('_153_outgoing', 'Latest possible end', '_71_outgoing', 'Ongoing throughout')(fg);
          }
          // 'At some time within' can't end before 'End'
          if (has('_72_outgoing') && has('_151_outgoing')) {
            this.validationService.cantEndBeforeEnd('_72_outgoing', 'At some time within', '_151_outgoing', 'End')(fg);
          }
          // 'At some time within' can't end before 'Ongoing throughout'
          if (has('_72_outgoing') && has('_71_outgoing')) {
            this.validationService.cantEndBeforeEnd('_72_outgoing', 'At some time within', '_71_outgoing', 'Ongoing throughout')(fg);
          }
          // 'Ongoing throughout' can't begin before 'At some time within'
          if (has('_71_outgoing') && has('_72_outgoing')) {
            this.validationService.cantBeginBeforeBegin('_71_outgoing', 'Ongoing throughout', '_72_outgoing', 'At some time within')(fg);
          }
          // 'Ongoing throughout' can't begin before 'Earliest possible begin'
          if (has('_71_outgoing') && has('_152_outgoing')) {
            this.validationService.cantBeginBeforeBegin('_71_outgoing', 'Ongoing throughout', '_152_outgoing', 'Earliest possible begin')(fg);
          }

          // this.validationService.mustNotIntersect('endBeg', 'End of Begin', 'begEnd', 'Begin of End')(fg);
        }
      }
    );
  }

  /**
 * Takes the given role sets and adds a form control for each of them.
 * Called by this class during ngOninit.
*/
  initFormCtrls() {

    const rs = this.localStore.getState()._fields;

    // iterate over roleSets of the existence time state
    if (rs) {
      Object.keys(rs).forEach(key => {
        if (rs[key]) {

          const ctrl = new FormControl(null, [Validators.required]);

          this.formGroup.addControl(key, ctrl)

        }
      })
    }
  }


  /**
   * Subcscibes to form value changes
   */
  initFormSubscription() {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

      }
    }))
  }

  /**
   *
   * @param fkProperty fk_property of the roleSet to add
   * @param inheritFrom key of the RoleSet in RoleSetList of which the role should be inherited
   * @param replace array of keys of roleSets that should be removed, when this is added
   */
  addRoleSet(fkProperty: number, inheritFrom?: string[], replace?: string[]) {

    const state = this.ngRedux.getState();

    // find the outgoing roleSet to add
    const roleSetTemplate: RoleSet = new RoleSet(state.activeProject.crm.roleSets[roleSetKeyFromParams(fkProperty, true)]);

    const role = new InfRole();
    role.time_primitive = new InfTimePrimitive();
    role.time_primitive.fk_class = DfhConfig.CLASS_PK_TIME_PRIMITIVE;

    // if this roleSet should inherit the time primitive from another roleSet
    if (inheritFrom) {
      for (let i = 0; i < inheritFrom.length; i++) {
        const key = inheritFrom[i];
        if (this.formGroup.get(key) && this.formGroup.get(key).value) {
          const r = this.formGroup.get(key).value[0];
          role.time_primitive = r.time_primitive;
          if (role.entity_version_project_rels && role.entity_version_project_rels[0]) {
            role.entity_version_project_rels = [{
              calendar: r.entity_version_project_rels[0].calendar
            } as InfEntityProjectRel]
          }
          role.fk_property = fkProperty;
          break;
        }
      }
    }

    // if this roleSet should replace a roleSet
    if (replace) {
      replace.forEach(key => {
        if (key && this._fields && this._fields[key]) {
          this.removeRoleSet(key);
        }
      })
    }

    role.fk_property = roleSetTemplate.property.dfh_pk_property

    // update the state
    const roleSet = createRoleSet(roleSetTemplate, [role], this.ngRedux.getState().activeProject.crm, { pkUiContext: this.localStore.getState().pkUiContext })
    this.localStore.dispatch(this.roleSetAdded({ [roleSetKey(roleSet)]: roleSet }))

    // add a form control
    this.formGroup.addControl(
      roleSetKey(roleSetTemplate), new FormControl(
        [role],
        [
          Validators.required
        ]
      )
    )

    this.submitClicked = false;
  };




  /**
  * called, when user removes a property leading to TimePrimitive
  */
  removeRoleSet(key: string) {

    // update the state
    this.localStore.dispatch(this.roleSetRemoved(key))

    // remove the form control
    setTimeout(() => {
      this.formGroup.removeControl(key),
        this.ref.detectChanges()
    }, 0)

  }


  /**
   * Called when a user submits a new existence time
   */
  onSubmitExistenceTime() {

    this.submitClicked = true;

    if (this.formGroup.valid) {
      const newCtrls = this.formGroup.value;
      const initCtrls = this.initialFormVal;


      const keys = union(Object.keys(newCtrls), Object.keys(initCtrls))

      let rolesToAdd: InfRole[] = []
      let rolesToRemove: InfRole[] = []
      let unchangedRoles: InfRole[] = []



      // make all roles to add and all roles to remove
      keys.forEach(key => {
        const newRoles: InfRole[] = newCtrls[key], initRoles: InfRole[] = initCtrls[key];

        if (!initRoles === undefined) {
          // if the control was added

          // add the role of the new control to rolesToAdd
          rolesToAdd = [...rolesToAdd, ...newRoles];

        } else if (!newRoles) {
          // if the role was removed

          // add the role of the initial control to rolesToRemove
          rolesToRemove = [...rolesToRemove, ...initRoles];

        } else if (!newRoles[0].pk_entity) {
          // if the role was changed

          // add the role of the initial control to the roles to remove
          rolesToRemove = [...rolesToRemove, ...initRoles];

          // add the role of the new control to the roles to add
          rolesToAdd = [...rolesToAdd, ...newRoles];

        } else if (newRoles[0].pk_entity) {
          // if the role was unchanged

          // add the role to the unchanged roles
          unchangedRoles = [...unchangedRoles, ...newRoles]

        }

      })

      // change the epr of the roles to add
      rolesToAdd.forEach(r => {
        // no need to creat a new epr, since the roles to add come with one that contains calendar info
        if (r) r.entity_version_project_rels[0].is_in_project = true;
      });

      // change the epr of the roles to remove
      rolesToRemove.forEach(r => {
        if (r) {
          r.entity_version_project_rels = [new InfEntityProjectRel({ is_in_project: false } as InfEntityProjectRel)];
        }
      });

      // create a InfTemporalEntity to send to the api
      this.submitted.emit({ toAdd: rolesToAdd, toRemove: rolesToRemove, unchanged: unchangedRoles });
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          this.formGroup.get(key).markAsTouched()
        }
      })
    }
  }


}
