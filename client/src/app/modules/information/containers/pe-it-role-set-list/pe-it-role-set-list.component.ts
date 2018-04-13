import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { InfRole, EntityEditorService, DfhProperty, InfPersistentItem } from 'app/core';
import { PropertyService, DirectionAwareProperty } from '../../shared/property.service';
import { RoleService } from '../../shared/role.service';
import { ObservableStore, select, WithSubStore, NgRedux } from '@angular-redux/store';
import { IPiRoleSetListState, SelectPropStateType } from './pe-it-role-set-list.model';
import { Observable } from 'rxjs/Observable';
import { EntityEditorState } from '../../shared/entity-editor-state.class';
import { EditorStates } from '../../information.models';
import { RoleSetListComponent } from '../../components/role-set-list/role-set-list.component';
import { piRoleSetListReducer } from './pe-it-role-set-list-reducer';
import { PiRoleSetListAction, PiRoleSetListActions } from './pe-it-role-set-list-actions';
import { IRoleSetState, RoleSetState } from '../../components/role-set/role-set.model';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AppellationStdBool } from '../../components/role/role.component';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: piRoleSetListReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-role-set-list',
  templateUrl: './pe-it-role-set-list.component.html',
  styleUrls: ['./pe-it-role-set-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
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
  ]
})
export class PeItRoleSetListComponent extends RoleSetListComponent implements OnInit, OnChanges {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'piRoleSetListState']
  basePath: string[];
  localStore: ObservableStore<IPiRoleSetListState>;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, roleSet: IRoleSetState) {
    return roleSet.fkProperty;
  }

  @select() state$: Observable<EditorStates>;
  @select() selectPropState$: Observable<SelectPropStateType>;


  @select() pkEntity$: Observable<number>
  @select() roles$: Observable<InfRole[]>
  @select() outgoingProperties$: Observable<DfhProperty[]>
  @select() ingoingProperties$: Observable<DfhProperty[]>
  @select() parentPeIt$: Observable<InfPersistentItem>

  @select() propertyToAdd$: Observable<DirectionAwareProperty>; // Poperty that is currently chosen in order to add a role of this kind
  @select() ontoInfoVisible$: Observable<boolean>
  @select() communityStatsVisible$: Observable<boolean>

  @select() roleSets$: Observable<RoleSetState[]>

  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfRole[]> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfRole[]> = new EventEmitter;

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;



  constructor(
    roleService: RoleService,
    propertyService: PropertyService,
    entityEditor: EntityEditorService,
    ref: ChangeDetectorRef,
    private ngRedux: NgRedux<IPiRoleSetListState>,
    private actions: PiRoleSetListActions
  ) {
    super(roleService, propertyService, entityEditor, ref)
  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), piRoleSetListReducer);
    this.basePath = this.getBasePath();

    Observable.combineLatest(
      this.ingoingProperties$,
      this.outgoingProperties$,
      this.roles$,
      this.pkEntity$,
      this.state$
    )
      .subscribe(result => {
        const ingoingProperties = result[0], outgoingProperties = result[1], roles = result[2],
          pkEntity = result[3], state = result[4];

        // initialize all the properties this class has (they appear in the select/dropdown to add new RoleSet)
        if (ingoingProperties && outgoingProperties) {
          this.setDirectionAwareProperties(result[0], result[1]);
        }

        // initialize roleSets of the roles this entity has (like e.g. the names-section or the birth-section)
        if (ingoingProperties && outgoingProperties && roles && pkEntity && state) {
          this.initChildren(roles, ingoingProperties, outgoingProperties, pkEntity, state)
        }
      })


  }

  ngOnDestroy() {

  }

  ngOnChanges() {
  }


  initChildren(roles: InfRole[], ingoingProperties: DfhProperty[], outgoingProperties: DfhProperty[], pkEntity, state) {

    const options: IRoleSetState = {
      // parentEntityPk: pkEntity,
      state: state
    }

    const piRoleSetStates = this.roleService.toRoleSetStates(roles, ingoingProperties, outgoingProperties, options)

    this.localStore.dispatch(this.actions.piRoleSetListInitialized(piRoleSetStates))
  }


  /** ************
   * User Interactions 
   ****************/

  startSelectProperty() {
    this.localStore.dispatch(this.actions.startSelectProperty())
  }

  stopSelectProperty() {
    this.localStore.dispatch(this.actions.stopSelectProperty())
  }

  /**
  * called, when user selected a the kind of property to add
  */
  startSelectRoles() {

    // add a role set
    
    const newRoleSetState: RoleSetState = {
      isOutgoing: this.propertyToAdd.isOutgoing,
      property: this.propertyToAdd.property,
      fkProperty: this.propertyToAdd.property.dfh_pk_property,
      roles: []
    }

    this.roleSets$.subscribe(roleSets => {

      roleSets[newRoleSetState.fkProperty] = newRoleSetState;

      this.localStore.dispatch(this.actions.startSelectRoles(roleSets))
    })

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




  // TODO: Reduxify

  /**
  * called when roles ready to create
  */
  emitReadyToCreate(roles: InfRole[]) {

    this.readyToCreate.emit(roles);

  }

  /**
  * called when role isnt ready to create
  */
  emitNotReadyToCreate(roles: InfRole[]) {

    this.notReadyToCreate.emit();

  }


  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {
    this.appeChange.emit(appeStd)
  }

  /**
  * called when roles of property (section) are ready to be added
  */
  onRolesReadyToAdd(roles: InfRole[]) {
    this.readyToAdd.emit(roles);
  }

  /**
  * called when roles of property (section) are not ready to be added
  */
  onRolesNotReadyToAdd(roles: InfRole[]) {
    this.notReadyToAdd.emit();
  }


}
