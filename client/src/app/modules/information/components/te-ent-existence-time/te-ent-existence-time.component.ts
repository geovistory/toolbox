import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { InfRole, InfTemporalEntity, TimePrimitive, EntityEditorService, InfTimePrimitive } from 'app/core';
import { TeEntService } from '../../shared/te-ent.service';
import { ExistenceTime } from '../existence-time';
import { RoleSetComponent } from '../role-set/role-set.component';
import { Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';
import { IExistenceTimeState } from './te-ent-existence-time.model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { existenceTimeReducer } from './te-ent-existence-time.reducer';
import { ExistenceTimeActions } from './te-ent-existence-time.actions';
import { StateCreatorService } from '../../shared/state-creator.service';
import { RoleSetState } from '../role-set/role-set.model';
import { roleSetKey } from '../role-set-list/role-set-list-actions';

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
  localStore: ObservableStore<IExistenceTimeState>;
  formGroup: FormGroup;
  existenceTimeState: IExistenceTimeState;
  existenceTime: ExistenceTime;
  subs: Subscription[] = [];

  constructor(
    public entityEditor: EntityEditorService,
    private teEntService: TeEntService,
    private ngRedux: NgRedux<IExistenceTimeState>,
    private actions: ExistenceTimeActions,
    private stateCreator: StateCreatorService    
  ) { }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit() {
    this.basePath = this.getBasePath();

    this.parentTeEntStatePath = this.parentPath;

    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer)

    this.subs.push(this.ngRedux.select<IExistenceTimeState>(this.basePath).subscribe(d => {
      this.existenceTimeState = d;
    }))

  }



  addRoleSet(key: number) {
    // find the ingoing roleSet to add
    const roleSetTemplate = new RoleSetState({
      ...this.existenceTimeState.ingoingRoleSets.find(rs => rs.property.dfh_pk_property == key),
      state: 'create-te-ent-role',
      toggle: 'expanded'
    })

    const role = new InfRole();
    role.time_primitive = new InfTimePrimitive();
    role.fk_property = roleSetTemplate.property.dfh_pk_property

    this.stateCreator.initializeRoleSetState([role], roleSetTemplate).subscribe(roleSetState => {

      this.localStore.dispatch(this.actions.addRoleSet({ [roleSetKey(roleSetState)]: roleSetState }))
    })

    // update the form
    // TODO
  }











  // setExistenceTime(teEnt: InfTemporalEntity) {
  //   this.subs.push(this.teEntService.buildExistenceTime(teEnt).subscribe((existenceTime: ExistenceTime) => {
  //     this.existenceTime = existenceTime;
  //   }));
  // }

  // /**
  //  * Called when a user submits a new existence time
  //  * @param existenceTime the new existence time
  //  */
  // onSubmitExistenceTime(existenceTime: ExistenceTime) {

  //   this.state = 'edit';

  //   this.subs.push(this.teEntService.upsertExistenceTime(existenceTime, this.teEnt).subscribe(teEnt => {

  //     this.setExistenceTime(teEnt);

  //     this.existenceTimeUpdated.emit(teEnt);

  //     this.state = 'editable';

  //   }))
  // }

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
