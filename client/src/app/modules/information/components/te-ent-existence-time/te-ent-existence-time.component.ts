import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { InfRole, InfTemporalEntity, TimePrimitive, EntityEditorService, InfTimePrimitive, InfTemporalEntityApi, Project } from 'app/core';
import { TeEntService } from '../../shared/te-ent.service';
import { ExistenceTime } from '../existence-time';
import { RoleSetComponent } from '../role-set/role-set.component';
import { Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { IExistenceTimeState } from './te-ent-existence-time.model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { existenceTimeReducer } from './te-ent-existence-time.reducer';
import { ExistenceTimeActions } from './te-ent-existence-time.actions';
import { StateCreatorService } from '../../shared/state-creator.service';
import { RoleSetState, IRoleSetState } from '../role-set/role-set.model';
import { roleSetKey } from '../role-set-list/role-set-list-actions';
import { ConfigService } from '../../shared/config.service';
import { ITeEntState } from '../te-ent/te-ent.model';

@Component({
  selector: 'gv-te-ent-existence-time',
  templateUrl: './te-ent-existence-time.component.html',
  styleUrls: ['./te-ent-existence-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntExistenceTimeComponent),
      multi: true
    }
  ]
})
export class TeEntExistenceTimeComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'existenceTimeState']
  basePath: string[];

  /**
   * Inputs
   */

  @Input() teEnt: InfTemporalEntity;
  @Input() state: 'view' | 'editable' | 'edit';

  /**
   * Output
   */
  @Output() existenceTimeUpdated: EventEmitter<InfTemporalEntity> = new EventEmitter();
  @Output() touched: EventEmitter<void> = new EventEmitter();

  /**
   * Properties
   */
  parentTeEntStatePath: string[];
  parentTeEntState: ITeEntState; // needed for creating a value to send to api
  localStore: ObservableStore<IExistenceTimeState>;
  existenceTimeState: IExistenceTimeState;
  existenceTime: ExistenceTime;
  subs: Subscription[] = [];
  formGroup: FormGroup;
  projectPk: number;

  constructor(
    public entityEditor: EntityEditorService,
    private teEntService: TeEntService,
    private ngRedux: NgRedux<IExistenceTimeState>,
    private actions: ExistenceTimeActions,
    private stateCreator: StateCreatorService,
    private configService: ConfigService,
    private teEntApi: InfTemporalEntityApi,
    private fb: FormBuilder
  ) {
    this.initForm();
    this.initFormSubscription();
  }

  initForm() {
    this.formGroup = this.fb.group({});
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit() {
    this.basePath = this.getBasePath();

    this.parentTeEntStatePath = this.parentPath;

    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer)

    this.subs.push(this.ngRedux.select<IExistenceTimeState>(this.basePath).subscribe(d => {
      if (d) {

        this.existenceTimeState = d;

        this.initFormCtrls()

      }
    }))

    this.subs.push(this.ngRedux.select<ITeEntState>(this.parentTeEntStatePath).subscribe(d => {
      if (d) {
        this.parentTeEntState = d;
      }
    }))

    this.subs.push(this.ngRedux.select<Project>(['activeProject']).subscribe(d => {
      if (d) this.projectPk = d.pk_project;
    }))

  }

  /**
   * Takes the given role sets and adds a form control for each of them
   */
  initFormCtrls() {

    const rs = this.existenceTimeState.roleSets;

    // iterate over roleSets of the existence time state
    if (rs)
      Object.keys(rs).forEach(key => {
        if (rs[key]) {
          // add a formControl for each roleSet, giving the roles as value
          this.formGroup.addControl(key, new FormControl(rs[key].roles, [Validators.required]))
        }
      })

  }

  initFormSubscription() {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

      }
    }))
  }


  /**
  * called, when user selected a the kind of property leading to TimePrimitive to add
  */
  addRoleSet(key: number) {
    // find the ingoing roleSet to add
    const roleSetTemplate = new RoleSetState({
      ...this.existenceTimeState.ingoingRoleSets.find(rs => rs.property.dfh_pk_property == key),
      state: 'create-pe-it-role',
      toggle: 'expanded'
    })

    const role = new InfRole();
    role.time_primitive = new InfTimePrimitive();
    role.time_primitive.fk_class = this.configService.CLASS_PK_TIME_PRIMITIVE;
    role.fk_property = roleSetTemplate.property.dfh_pk_property

    // update the state
    this.stateCreator.initializeRoleSetState([role], roleSetTemplate).subscribe(roleSetState => {
      this.localStore.dispatch(this.actions.addRoleSet({ [roleSetKey(roleSetState)]: roleSetState }))
    })

    // add a form control
    this.formGroup.addControl(
      roleSetKey(roleSetTemplate), new FormControl(
        [role],
        [
          Validators.required
        ]
      )
    )

  }



  /**
  * called, when user removes a property leading to TimePrimitive
  */
  removeRoleSet(key: string) {

    // remove the form control
    this.formGroup.removeControl(key)

    // update the state
    this.localStore.dispatch(this.actions.removeRoleSet(key))

  }










  // setExistenceTime(teEnt: InfTemporalEntity) {
  //   this.subs.push(this.teEntService.buildExistenceTime(teEnt).subscribe((existenceTime: ExistenceTime) => {
  //     this.existenceTime = existenceTime;
  //   }));
  // }

  /**
   * Called when a user submits a new existence time
   */
  onSubmitExistenceTime() {

    if (this.formGroup.valid) {

      // concat all roles from the form in one array
      let roles: InfRole[] = []
      Object.keys(this.formGroup.value).forEach(key => {
        roles = [...roles, ...this.formGroup.value[key]]
      })

      // TODO add the former roles with a epr to set is_in_project=false

      const teEnt = new InfTemporalEntity({
        ...this.parentTeEntState.teEnt,
        te_roles: roles
      } as InfTemporalEntity)

      console.log(teEnt)
      this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(this.projectPk, teEnt).subscribe(teEnts => {
        const teEnt = teEnts[0];        

        //TODO get the new roles from the resulting teEnt

        // create new roleSetStates for those roles

        // replace the roleSets in the local store
      }))
    }

    // this.state = 'edit';

    // this.subs.push(this.teEntService.upsertExistenceTime(existenceTime, this.teEnt).subscribe(teEnt => {

    //   this.setExistenceTime(teEnt);

    //   this.existenceTimeUpdated.emit(teEnt);

    //   this.state = 'editable';

    // }))
  }

  /****************************************
 *  ControlValueAccessor implementation *
 ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(any): void {


  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (any: any | null) => {
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

}
