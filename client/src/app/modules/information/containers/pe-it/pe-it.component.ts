import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { dispatch, select, select$, WithSubStore, NgRedux, ObservableStore } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { InfPersistentItem, DfhProperty, DfhClass, InfPersistentItemApi, ActiveProjectService, EntityEditorService, InfEntityProjectRel, InfRole, Project, InfTemporalEntity } from 'app/core';
import { PeItService } from '../../shared/pe-it.service';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { PropertyPipe } from '../../shared/property.pipe';

import { EditorStates } from '../../information.models';
import { PeItActions } from './pe-it.actions';
import { IPeItState } from './pe-it.model';
import { AppellationStdBool } from '../../components/role/role.component';
import { RoleSetListState, IRoleSetListState, IRoleSets } from '../../components/role-set-list/role-set-list.model';
import { RoleSetListComponent } from '../../components/role-set-list/role-set-list.component';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { RoleSetActions } from '../../components/role-set/role-set.actions';
import { RoleSetListActions } from '../../components/role-set-list/role-set-list-actions';
import { peItReducer } from './pe-it.reducer';
import { BehaviorSubject } from 'rxjs';
import { RoleSetState, IRoleSetState } from '../../components/role-set/role-set.model';
import { IRoleState } from '../../components/role/role.model';
import { RoleSetListService } from '../../shared/role-set-list.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TeEntService } from '../../shared/te-ent.service';
import { StateToDataService } from '../../shared/state-to-data.service';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: peItReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it',
  templateUrl: './pe-it.component.html',
  styleUrls: ['./pe-it.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItComponent),
      multi: true
    }
  ]
})
export class PeItComponent extends RoleSetListComponent implements OnInit, ControlValueAccessor {

  @Input() parentPath: string[];
  getBasePath = () => [...this.parentPath, 'peItState']
  basePath: string[];
  localStore: ObservableStore<IPeItState>;

  /**
   * Local Store Observables
   */
  // Primary key of the peIt
  @select() pkEntity$: Observable<number>;
  @select() ontoInfoVisible$: Observable<boolean>
  @select() communityStatsVisible$: Observable<boolean>


  pkEntity: number;

  /**
   * Class properties that filled by a store observable
   */
  label: string;
  peItState: IPeItState;

  /**
   * Dispatches
   */

  // @dispatch() peItToAddUpdated = (peIt) => {
  //   return this.actions.peItToAddUpdated(peIt)
  // };

  // @dispatch() peItToCreateUpdated = (peIt) => {
  //   return this.actions.peItToCreateUpdated(peIt)
  // };

  constructor(
    private peItApi: InfPersistentItemApi,
    private peItService: PeItService,
    private propertyPipe: PropertyPipe,
    private activePeItService: ActivePeItService,
    private slimLoadingBarService: SlimLoadingBarService,
    public entityEditor: EntityEditorService,
    private changeDetector: ChangeDetectorRef,
    protected ngRedux: NgRedux<IPeItState>,
    public actions: PeItActions,
    classService: ClassService,
    roleService: RoleService,
    propertyService: PropertyService,
    roleSetListService: RoleSetListService,
    protected fb: FormBuilder,
    private teEntService: TeEntService
  ) {
    super(classService, roleService, propertyService, entityEditor, roleSetListService);

    // create the formGroup used to create a peIt
    this.formGroup = this.fb.group({})

    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {

      // build a peIt with all pi_roles given by the form's controls 
      let peIt = new InfPersistentItem(this.peItState.peIt);
      peIt.pi_roles = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          peIt.pi_roles = [...peIt.pi_roles, ...this.formGroup.get(key).value]
        }
      })

      // try to retrieve a appellation label
      const displayAppeUse: InfTemporalEntity = this.peItService.getDisplayAppeLabelOfPeIt(peIt)
      this.labelInEdit = this.teEntService.getDisplayAppeLabelOfTeEnt(displayAppeUse);

      if (this.formGroup.valid) {
        // send the peIt the parent form
        this.onChange(peIt)
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
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), peItReducer);
    this.basePath = this.getBasePath();
  }

  // gets called by base class onInit
  init() {
    // this.initState();
    this.initPeItSubscriptions()
    this.initPeItChildren()
  }

  // hook for child classes
  initPeItChildren() { }


  initPeItSubscriptions() {
    this.subs.push(this.localStore.select<IPeItState>('').subscribe(d => this.peItState = d))

    /**
     * gets the Temporal Entity of type AppellationUseForLanguage that is for display for this peIt in this project
     */
    this.subs.push(this.localStore.select<IRoleSets>('roleSets').subscribe((peItRoleSets) => {
      this.label = StateToDataService.getDisplayAppeLabelOfPeItRoleSets(peItRoleSets);
      const oldLabel = (this.peItState && this.peItState.label) ? this.peItState.label : undefined;

      // update store
      if (oldLabel !== this.label)
        this.localStore.dispatch(this.actions.roleSetsListDisplayLabelUpdated(this.label))
    }))


  }



  queryRichObjectOfRepo(): BehaviorSubject<InfPersistentItem> {

    const onDone: BehaviorSubject<InfPersistentItem> = new BehaviorSubject(null)

    this.startLoading();
    this.subs.push(this.pkEntity$.subscribe(pkEntity => {

      this.peItApi.nestedObjectOfRepo(pkEntity).subscribe(
        (peIts: InfPersistentItem[]) => {

          const peIt = peIts[0];

          onDone.next(peIt);

          this.completeLoading();

        })
    }));

    return onDone;

  }


  // Query the peIt
  queryRichObjectOfProject(): BehaviorSubject<InfPersistentItem> {
    const onDone: BehaviorSubject<InfPersistentItem> = new BehaviorSubject(null)

    this.startLoading();

    this.subs.push(Observable.zip(this.ngRedux.select<Project>('activeProject'), this.pkEntity$)
      .subscribe(result => {
        const project = result[0], pkEntity = result[1];
        if (project && pkEntity)

          this.peItApi.nestedObjectOfProject(project.pk_project, pkEntity).subscribe(
            (peIts: InfPersistentItem[]) => {
              const peIt = peIts[0];

              onDone.next(peIt);

              this.completeLoading();
            });

      }))


    return onDone;

  }



  /**
  * Show ui with community statistics like
  * - is in project count
  * - is standard in project count
  */
  showCommunityStats() {
    this.localStore.dispatch(this.actions.communityStatsVisibilityToggled(true))
  }

  /**
  * Hide ui with community statistics like
  * - is in project count
  * - is standard in project count
  */
  hideCommunityStats() {
    this.localStore.dispatch(this.actions.communityStatsVisibilityToggled(false))
  }


  /**
  * Show CRM Info in UI
  */
  showOntoInfo() {
    this.localStore.dispatch(this.actions.ontoInfoVisibilityToggled(true))
  }

  /**
  * Hide CRM Info in UI
  */
  hideOntoInfo() {
    this.localStore.dispatch(this.actions.ontoInfoVisibilityToggled(false))
  }


  /**
  * called, when user selected a the kind of property to add
  */
  addRoleSet(propertyToAdd: RoleSetState) {


    // add a role set
    const newRoleSetState: RoleSetState = {
      ...propertyToAdd,
      state: this.peItState.state === 'editable' ? 'create-pe-it-role' : this.peItState.state,
      toggle: 'expanded',
      roles: []
    }

    this.localStore.dispatch(this.actions.addRoleSet(newRoleSetState))

  }


  /**
  * Outputs
  */

  // @Output() readyToCreate: EventEmitter<InfPersistentItem> = new EventEmitter;

  // @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  // @Output() created: EventEmitter<InfPersistentItem> = new EventEmitter;

  // @Output() readyToAdd: EventEmitter<InfPersistentItem> = new EventEmitter;

  // @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;


  /**
  * Methods for creating a peIt
  */

  // emitReadyToCreate(roles: InfRole[]) {
  //   this.peItToCreate.pi_roles = roles; //TODO this is not good because it overwrites roles coming form another property!
  //   this.isReadyToCreate = true
  //   this.readyToCreate.emit(this.peItToCreate)
  // }


  // emitNotReadyToCreate() {
  //   this.isReadyToCreate = false
  //   this.notReadyToCreate.emit()
  // }



  /**
  * Methods for adding a peIt
  */

  // onRolesReadyToAdd(rolesToAdd: InfRole[]) {


  //   let newRoles = [];

  //   // For each role coming in from property component
  //   rolesToAdd.forEach(roleToAdd => {

  //     let exists = false;

  //     for (let i = 0; i < this.peItToAdd.pi_roles.length; i++) {

  //       // Check if the role is already in the peItToAdd
  //       if (this.peItToAdd.pi_roles[i].pk_entity === roleToAdd.pk_entity) {

  //         // if yes replace it with the new one
  //         this.peItToAdd.pi_roles[i] = roleToAdd;
  //         exists = true;
  //       }
  //     }

  //     // else add it to a temporary array
  //     if (!exists) {
  //       newRoles.push(roleToAdd);
  //     }

  //   })
  //   // add all the new roles to peItToAdd
  //   this.peItToAdd.pi_roles.concat(newRoles);

  //   this.readyToAdd.emit(this.peItToAdd);
  // }

  /**
  * called when roles of property (section) are not ready to be added
  */
  // onRolesNotReadyToAdd(roles: InfRole[]) {
  //   this.notReadyToAdd.emit();
  // }

  /**
  * Methods for event bubbeling
  */

  // whenAppeChange(appeStd: AppellationStdBool) {
  //   if (appeStd.isDisplayRoleInProject) {
  //     const label = new AppellationLabel(appeStd.appellation.appellation_label);
  //     this.stdAppeString = label.getString();
  //     this.changeDetector.detectChanges()
  //   }
  //   if (appeStd.isMostPopular) {
  //     const label = new AppellationLabel(appeStd.appellation.appellation_label);
  //     this.mostPopularAppeString = label.getString();
  //     this.changeDetector.detectChanges()
  //   }
  // }




  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(peIt: InfPersistentItem): void {

    let formCtrlDefs: { [controlName: string]: any } = {};
    let formCrtlsToRemove: string[] = [];

    // add controls for each child roleSet
    Object.keys(this.peItState.roleSets).forEach((key) => {
      if (this.peItState.roleSets[key]) {

        this.formGroup.addControl(key, new FormControl(
          this.peItState.roleSets[key].roles,
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
  onChange = (peIt: InfPersistentItem | null) => {
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


  /**
  * Loading Bar Logic
  */
  // Flag if some async process is running
  loading: boolean;

  startLoading() {
    this.loading = true;
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.loading = false;
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }



}
