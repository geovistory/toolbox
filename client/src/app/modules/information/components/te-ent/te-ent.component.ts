import { Component, OnInit, OnChanges, Input, ViewChildren, QueryList, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
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
import { pick } from 'ramda';

import { RoleSetListComponent } from '../role-set-list/role-set-list.component';
import { InfTemporalEntity, DfhProperty, InfRole, DfhClass, ActiveProjectService, EntityEditorService, InfEntityProjectRel, Project } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { TeEntRoleSetComponent } from '../te-ent-role-set/te-ent-role-set.component';
import { PropertyService } from '../../shared/property.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { ExistenceTime } from '../existence-time';
import { TeEntService } from '../../shared/te-ent.service';
import { IRoleSetState, RoleSetState } from '../role-set/role-set.model';
import { AppellationStdBool } from '../role/role.component';
import { WithSubStore, ObservableStore, NgRedux, select } from '@angular-redux/store';
import { teEntReducer } from './te-ent.reducer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ITeEntState } from './te-ent.model';
import { IRoleSetListState, IRoleSets } from '../role-set-list/role-set-list.model';
import { RoleSetListActions, roleSetKey } from '../role-set-list/role-set-list-actions';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { TeEntActions } from './te-ent.actions';
import { IRoleState } from '../role/role.model';
import { RoleSetListService } from '../../shared/role-set-list.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@AutoUnsubscribe()
@WithSubStore({
  localReducer: teEntReducer,
  basePathMethodName: 'getBasePath'
})
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntComponent),
      multi: true
    }
  ]
})
export class TeEntComponent extends RoleSetListComponent implements OnInit, ControlValueAccessor {


  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'childTeEnt']
  basePath: string[];
  localStore: ObservableStore<ITeEntState>;

  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];

  /**
   * Local Store Observables
   */
  @select() teEnt$: Observable<InfTemporalEntity>;
  @select() teEntToEdit$: Observable<InfTemporalEntity>;
  @select() teEntToAdd$: Observable<InfTemporalEntity>;
  @select() teEntToCreate$: Observable<InfTemporalEntity>;
  @select() toggle$: Observable<CollapsedExpanded>;
  @select() roleSetList$: Observable<IRoleSetListState>;

  /**
   * Other Store Observables
   */
  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>


  /**
   * Class properties that filled by a store observable
   */
  parentRoleState: IRoleState;
  teEnState: ITeEntState;

  // Array of children TeEntRoleSetComponent
  @ViewChildren(TeEntRoleSetComponent) RoleSetComponents: QueryList<TeEntRoleSetComponent>

  constructor(
    private fb: FormBuilder,
    roleService: RoleService,
    propertyService: PropertyService,
    private activeProjectService: ActiveProjectService,
    classService: ClassService,
    public entityEditor: EntityEditorService,
    private ngRedux: NgRedux<ITeEntState>,
    public actions: TeEntActions,
    protected roleSetListService: RoleSetListService,
    private teEntService: TeEntService
  ) {
    super(classService, roleService, propertyService, entityEditor, roleSetListService)

    // create the formGroup used to create a teEnt
    this.formGroup = this.fb.group({})

    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {

      // build the role
      let role = new InfRole(pick(['fk_entity', 'fk_property'], this.parentRoleState.role));



      // build a teEnt with all pi_roles given by the form's controls 
      role.temporal_entity = new InfTemporalEntity(this.teEnState.teEnt);
      role.temporal_entity.te_roles = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          role.temporal_entity.te_roles = [...role.temporal_entity.te_roles, ...this.formGroup.get(key).value]
        }
      })

      // try to retrieve a appellation label
      this.labelInEdit = this.teEntService.getDisplayAppeLabelOfTeEnt(role.temporal_entity);

      if (this.formGroup.valid) {
        // send the teEnt the parent form
        this.onChange(role)
      }
      else {
        this.onChange(null)
      }
    }))
  }

  /**
  * Methods
  */
  // gets called by base class onInit
  initStore() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), teEntReducer);
    this.basePath = this.getBasePath();
  }

  // gets called by base class onInit
  init() {

    this.initPaths()

    this.initObservablesOutsideLocalStore();

    this.initTeEntSubscriptions();

    this.initForm();

  }

  @Output() teEntUpdated: EventEmitter<InfTemporalEntity> = new EventEmitter;

  /**
   * Initializes the form controls
   */
  initForm() {
    let formCtrlDefs: { [controlName: string]: any } = {};
    let formCrtlsToRemove: string[] = [];

    // add controls for each child roleSet
    if (this.teEnState.roleSets)
      Object.keys(this.teEnState.roleSets).forEach((key) => {
        if (this.teEnState.roleSets[key]) {

          this.formGroup.addControl(key, new FormControl(
            this.teEnState.roleSets[key].roles,
            [
              Validators.required
            ]
          ))
        }
        else {
          formCrtlsToRemove.push(key);
        }
      })

    // remove control of removed chiild state
    formCrtlsToRemove.forEach(key => {
      this.formGroup.removeControl(key);
    })
  }

  /**
* init paths to different slices of the store
*/
  initPaths() {
    // transforms e.g. ['information', 'entityEditor', 'peItState', 'roleSets', '1', 'roleStatesInProject', '79060']
    // to ['information', 'entityEditor', 'peItState']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 4));
  }

  /**
 * init observables to other slices of the store than the local store
 * (to select observables from local store, use @select decorator)
 */
  initObservablesOutsideLocalStore() {
    this.ontoInfoVisible$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'ontoInfoVisible']);
  }

  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initTeEntSubscriptions() {

    this.ngRedux.select<IRoleState>(this.parentPath).subscribe(d => this.parentRoleState = d)
    this.subs.push(this.localStore.select<ITeEntState>('').subscribe(d => {
      this.teEnState = d
      console.log(JSON.stringify(d))
    }))


    /**
    * gets the Appellation is for given teEnt roleSets that is for display in this project
    * @param teEntRoleSets {key: obj<IRoleSetState>}
    */
    this.subs.push(this.localStore.select<IRoleSets>(['roleSets']).subscribe((teEntRoleSets) => {
      this.label = this.roleSetListService.getDisplayAppeLabelOfTeEntRoleSets(teEntRoleSets);
    }))

  }


  /**
* called, when user selected a the kind of property to add
*/
  addRoleSet(propertyToAdd: RoleSetState) {

    // add a role set
    const newRoleSetState: RoleSetState = {
      ...propertyToAdd,
      state: this.teEnState.state === 'editable' ? 'create-te-ent-role' : this.teEnState.state,
      toggle: 'expanded',
      roles: []
    }

    // add a form conrtol
    this.formGroup.addControl(
      roleSetKey(newRoleSetState), new FormControl(
        newRoleSetState.roles,
        [
          Validators.required
        ]
      )
    )

    this.localStore.dispatch(this.actions.addRoleSet(newRoleSetState))

  }


  // initTeEntToAdd() {
  //   Observable.zip(this.teEnt$, this.ngRedux.select<Project>('activeProject'))
  //     .subscribe(result => {
  //       const teEnt = result["0"], project = result["1"];

  //       let teEntToAdd = new InfTemporalEntity(teEnt);

  //       // add an epr with is in project true
  //       teEntToAdd.entity_version_project_rels = [
  //         new InfEntityProjectRel({
  //           fk_project: project.pk_project,
  //           is_in_project: true,
  //           fk_entity_version_concat: teEnt.pk_entity_version_concat
  //         })
  //       ]

  //       this.localStore.dispatch(this.actions.teEntToAddUpdated(teEntToAdd));

  //       // this.initFkClassAndRoles(teEnt.fk_class, teEnt.te_roles);
  //     })
  // }

  // initTeEntToCreate() {
  //   this.fkClass$.subscribe(fkClass => {
  //     let teEntToCreate = new InfTemporalEntity();
  //     teEntToCreate.fk_class = fkClass;

  //     this.localStore.dispatch(this.actions.teEntToCreateUpdated(teEntToCreate));

  //     // this.initFkClassAndRoles(teEntToCreate.fk_class, teEntToCreate.te_roles);

  //   })
  // }

  // initTeEntToRemove() {
  //   Observable.zip(this.teEnt$, this.ngRedux.select<Project>('activeProject'))
  //     .subscribe(result => {
  //       const teEnt = result["0"], project = result["1"];

  //       let teEntToAdd = new InfTemporalEntity(teEnt);

  //       // add an epr with is in project undefined, so that it can be used to remove
  //       teEntToAdd.entity_version_project_rels = [
  //         new InfEntityProjectRel({
  //           fk_project: project.pk_project,
  //           fk_entity_version_concat: teEnt.pk_entity_version_concat
  //         })
  //       ]

  //       this.localStore.dispatch(this.actions.teEntToAddUpdated(teEntToAdd));

  //       // this.initFkClassAndRoles(teEnt.fk_class, teEnt.te_roles);
  //     })
  // }





  propertyReadyToCreate(roles: InfRole[]) {


    // let rolesToCreate: InfRole[] = [];

    // let allValid = true;

    // this.RoleSetComponents.forEach(RoleSetComponent => {

    //   if (!RoleSetComponent.isReadyToCreate && !RoleSetComponent.isCircular) allValid = false;

    //   rolesToCreate = rolesToCreate.concat(RoleSetComponent.rolesToCreate);

    // })

    // if (allValid) {

    //   this.teEnt.te_roles = rolesToCreate;

    //   this.isReadyToCreate = true;

    //   this.readyToCreate.emit(this.teEnt);

    // }

  }

  propertyNotReadyToCreate() {

    // this.isReadyToCreate = false;

    // this.notReadyToCreate.emit()

  }

  onPropertyReadyToAdd(rolesToAdd: InfRole[]) {

    // let newRoles = [];

    // // For each role coming in from property component
    // rolesToAdd.forEach(roleToAdd => {

    //   let exists = false;

    //   for (let i = 0; i < this.teEntToAdd.te_roles.length; i++) {

    //     // Check if the role is allready in the teEntToAdd
    //     if (this.teEntToAdd.te_roles[i].pk_entity === roleToAdd.pk_entity) {

    //       // if yes replace it with the new one
    //       this.teEntToAdd.te_roles[i] = roleToAdd;
    //       exists = true;
    //     }
    //   }

    //   // else add it to a temporary array
    //   if (!exists) {
    //     newRoles.push(roleToAdd);
    //   }

    // })
    // // add all the new roles to teEntToAdd
    // this.teEntToAdd.te_roles.concat(newRoles);

    // this.readyToAdd.emit(this.teEntToAdd);

  }

  onPropertyNotReadyToAdd() {
    // this.notReadyToAdd.emit();
  }

  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }

  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {
    // const label = new AppellationLabel(appeStd.appellation.appellation_label);
    // this.displayLabel = label.getString();
    // this.appeChange.emit(appeStd)
  }






  /**
  * Inputs
  */

  // // The Temporal Entity
  // @Input() teEnt: InfTemporalEntity;

  // @Input() parentProperty: DfhProperty;

  // @Input() parentRole: InfRole;

  // @Input() isOutgoing: boolean;

  // // The state of this component
  // @Input() teEntState: string;

  // @Input() fkClass: number;

  // // If true, the UI for communiy statistics is visible
  // @Input() communityStatsVisible: boolean;

  // // If true, CRM info is visible in UI
  // @Input() ontoInfoVisible: boolean;


  /**
  * Outputs
  */

  // @Output() readyToCreate: EventEmitter<InfTemporalEntity> = new EventEmitter;

  // @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  // @Output() readyToAdd: EventEmitter<InfTemporalEntity> = new EventEmitter;

  // @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;

  // // emit appellation and a flag to say if this is the standard appellation
  // @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  // /**
  // * Properties
  // */

  // outgoingProperties: DfhProperty[]

  // ingoingProperties: DfhProperty[]

  // // directed roles per property,
  // // e.g.: [{fkProperty: 'P52', isOutgoing: true, roles: []},…]
  // roleSets: IRoleSetState[];

  // isReadyToCreate: boolean;

  // // if 'collapsed': only header section is visible
  // // if 'expanded': all visible
  // cardBodyState: string = 'collapsed';

  // displayLabel: string;

  // // For add-pe-it-state: Temporal Entity to be Added
  // teEntToAdd: InfTemporalEntity;


  // //Class of this peIt
  // dfhClass: DfhClass;



  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {

    // take model from state in ngOnInit()

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
  onChange = (role: InfRole | null) => {
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

  @Output() touched: EventEmitter<void> = new EventEmitter();


}
