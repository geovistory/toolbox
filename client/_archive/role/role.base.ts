import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DfhProperty, InfRole, ProProject, U } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ReplaySubject, Subscription, Observable } from 'rxjs';

import {
  AppeDetail,
  CollapsedExpanded,
  LangDetail,
  PeItDetail,
  RoleDetail,
  PropertyField,
  TeEntDetail,
  TimePrimitveDetail,
} from 'app/core/state/models';
import { roleReducer } from './role.reducers';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleReducer
})
export abstract class RoleBase implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() parentPath: string[];
  @Input() intermediatePathSegment: string;
  @Input() index: string;
  localStore: ObservableStore<RoleDetail>;

  @Output() touched: EventEmitter<void> = new EventEmitter();


  basePath: string[]

  @select() role$: Observable<InfRole>;
  @select() isOutgoing$: Observable<boolean>;
  @select() toggle$: Observable<CollapsedExpanded>;
  @select() isStandardRoleToAdd$: Observable<boolean>;
  @select() isDisplayRoleForDomain$: Observable<boolean>;
  @select() isDisplayRoleForRange$: Observable<boolean>;
  @select() roleToAdd$: Observable<InfRole>;
  @select() changingDisplayRole$: Observable<boolean>;
  @select() targetClassPk$: Observable<number>;
  @select() isReadyToCreate$: Observable<boolean>;
  @select() isCircular$: Observable<boolean>;

  @select() _teEnt$: Observable<TeEntDetail>;
  @select() _appe$: Observable<AppeDetail>;
  @select() _lang$: Observable<LangDetail>;
  @select() _timePrimitive$: Observable<TimePrimitveDetail>;
  @select() _leaf_peIt$: Observable<PeItDetail>;
  @select() _leaf_teEnt$: Observable<TeEntDetail>;

  roleState$: Observable<RoleDetail>;

  isDisplayRoleInProject$: ReplaySubject<boolean> = new ReplaySubject();

  property$: Observable<DfhProperty>;
  activeProject$: Observable<ProProject>;
  activeProject: ProProject;

  roleState: RoleDetail;
  parentPropertyFieldState: PropertyField;

  // names of child states and of the RoleState object with the key of the value within the child state
  childStatesConfig: { [key: string]: { nameInState: string, nameInApi: string } } = {
    '_teEnt': {
      nameInState: 'teEnt',
      nameInApi: 'temporal_entity'
    },
    '_appe': {
      nameInState: 'appellation',
      nameInApi: 'appellation'
    },
    '_lang': {
      nameInState: 'language',
      nameInApi: 'language'
    },
    '_timePrimitive': {
      nameInState: 'timePrimitive',
      nameInApi: 'time_primitive'
    },
    '_leaf_peIt': {
      nameInState: 'peIt',
      nameInApi: 'fk_entity'
    },
    '_place': {
      nameInState: 'place',
      nameInApi: 'place'
    }
  };

  childStateConfig: { nameInState: string, nameInApi: string };

  formGroup: FormGroup;
  formControlName: string;
  formControl: FormControl;

  subs: Subscription[] = []

  /**
  * Outputs
  */

  @Output() onRequestStandard: EventEmitter<{ roleState: RoleDetail, key: string }> = new EventEmitter();

  @Output() roleCreated: EventEmitter<RoleDetail> = new EventEmitter();

  getBasePath = () => {
    const segment = this.intermediatePathSegment ? this.intermediatePathSegment : '_role_list';

    return this.index ?
      [... this.parentPath, segment, this.index] :
      null
  };

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    // create the formGroup used by the form to edit the role
    this.formGroup = this.fb.group({});
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }
  ngOnInit() {

    this.initSubscriptions();

    this.init();
  }

  abstract init(): void;


  initChildren() { }


  initSubscriptions() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.basePath, roleReducer);


    U.obj2KeyValueArr(this.childStatesConfig).forEach(item => {
      const state = this.localStore.getState();
      if (state[item.key]) {
        this.childStateConfig = item.value;
      }
    });

    this.property$ = this.ngRedux.select<DfhProperty>([...this.parentPath, 'property']);
    this.roleState$ = this.localStore.select<RoleDetail>('');
    this.activeProject$ = this.ngRedux.select<ProProject>('activeProject');

    this.subs.push(this.ngRedux.select<PropertyField>([...this.parentPath]).subscribe(d => this.parentPropertyFieldState = d));
    this.subs.push(this.activeProject$.subscribe(d => this.activeProject = d));
    this.subs.push(this.roleState$.subscribe(d => {
      this.roleState = d
    }))

    // Observe if this role is a display role for the project
    // since this depends on the isOutgoing and the corresponding
    // - isDisplayRoleForDomain or isDisplayRoleForRange -
    // this value can be calculated allways on the fly
    this.subs.push(this.isOutgoing$.subscribe(isOutgoing => {
      if (isOutgoing === true) {
        this.subs.push(this.isDisplayRoleForDomain$.subscribe(bool => {
          this.isDisplayRoleInProject$.next(bool);
        }))
      } else if (isOutgoing === false) {
        this.subs.push(this.isDisplayRoleForRange$.subscribe(bool => {
          this.isDisplayRoleInProject$.next(bool);
        }))
      }
    }))

  }


  initFormCtrl(role) {
    // add a control for the child of the role
    Object.keys(this.childStatesConfig).forEach((key) => {
      if (this.roleState && this.roleState[key]) {


        const childStateConfig = this.childStatesConfig[key]
        this.formControlName = childStateConfig.nameInApi;

        // use the role as the control's value
        const formControlValue = this.roleState.role;
        this.formControl = new FormControl(
          formControlValue,
          [
            Validators.required
          ]
        )

        this.formGroup.addControl(this.formControlName, this.formControl)

      }
    })
  }

  subscribeFormChanges() {
    // subscribe to form control changes
    this.subs.push(this.formGroup.valueChanges.subscribe((ctrls) => {

      const role: InfRole = ctrls[this.formControlName];

      // assing the fk_class to the child entity / value
      if (role && this.roleState.targetClassPk) {
        if (this.childStateConfig.nameInApi !== 'fk_entity') {
          role[this.childStateConfig.nameInApi] = {
            ...role[this.childStateConfig.nameInApi],
            fk_class: this.roleState.targetClassPk
          };
        }
      }

      // send the changes to the parent form
      if (this.formGroup.valid) {
        this.onChange(role);
      } else {
        this.onChange(null)
      }
    }))
  }


  /**
  * requestStandard - tells the parent Property that it wants to become standard
  */
  requestStandard(): void {
    this.onRequestStandard.emit({ roleState: this.roleState, key: this.index });
  }



  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {

    // the model is taken from the state on init
    this.initFormCtrl(role)

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeFormChanges();
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (role: InfRole | null) => {
    console.error('called before registerOnChange')
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