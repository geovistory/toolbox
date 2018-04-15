import { Component, OnInit, OnChanges, Input, ViewChildren, QueryList, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
import { RoleSetListComponent } from '../role-set-list/role-set-list.component';
import { InfTemporalEntity, DfhProperty, InfRole, DfhClass, ActiveProjectService, EntityEditorService, InfEntityProjectRel, Project } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { TeEntRoleSetComponent } from '../te-ent-role-set/te-ent-role-set.component';
import { PropertyService } from '../../shared/property.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { ExistenceTime } from '../existence-time';
import { TeEntService } from '../../shared/te-ent.service';
import { IRoleSetState } from '../role-set/role-set.model';
import { AppellationStdBool } from '../role/role.component';
import { WithSubStore, ObservableStore, NgRedux, select } from '@angular-redux/store';
import { teEntReducer } from './te-ent.reducer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ITeEntState } from './te-ent.model';
import { IRoleSetListState } from '../role-set-list/role-set-list.model';
import { RoleSetListActions } from '../role-set-list/role-set-list-actions';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { TeEntActions } from './te-ent.actions';


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
  ]
})
export class TeEntComponent extends RoleSetListComponent implements OnInit {


  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'childTeEnt']
  basePath: string[];
  localStore: ObservableStore<ITeEntState>;

  @select() teEnt$: Observable<InfTemporalEntity>;
  @select() teEntToEdit$: Observable<InfTemporalEntity>;
  @select() teEntToAdd$: Observable<InfTemporalEntity>;
  @select() teEntToCreate$: Observable<InfTemporalEntity>;

  @select() label$: Observable<string>;
  @select() toggle$: Observable<CollapsedExpanded>;

  @select() roleSetList$: Observable<IRoleSetListState>;



  /**
  * Inputs
  */

  // The Temporal Entity
  @Input() teEnt: InfTemporalEntity;

  @Input() parentProperty: DfhProperty;

  @Input() parentRole: InfRole;

  @Input() isOutgoing: boolean;

  // The state of this component
  @Input() teEntState: string;

  @Input() fkClass: number;

  // If true, the UI for communiy statistics is visible
  @Input() communityStatsVisible: boolean;

  // If true, CRM info is visible in UI
  @Input() ontoInfoVisible: boolean;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfTemporalEntity> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfTemporalEntity> = new EventEmitter;

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;

  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  /**
  * Properties
  */

  outgoingProperties: DfhProperty[]

  ingoingProperties: DfhProperty[]

  // directed roles per property,
  // e.g.: [{fkProperty: 'P52', isOutgoing: true, roles: []},…]
  roleSets: IRoleSetState[];

  isReadyToCreate: boolean;

  // if 'collapsed': only header section is visible
  // if 'expanded': all visible
  cardBodyState: string = 'collapsed';

  displayLabel: string;

  // For add-pe-it-state: Temporal Entity to be Added
  teEntToAdd: InfTemporalEntity;


  //Class of this peIt
  dfhClass: DfhClass;

  // Array of children TeEntRoleSetComponent
  @ViewChildren(TeEntRoleSetComponent) RoleSetComponents: QueryList<TeEntRoleSetComponent>

  constructor(
    roleService: RoleService,
    propertyService: PropertyService,
    private activeProjectService: ActiveProjectService,
    classService: ClassService,
    entityEditor: EntityEditorService,
    private ngRedux: NgRedux<ITeEntState>,
    public actions: TeEntActions
  ) {
    super(classService, roleService, propertyService, entityEditor)
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
    this.state$.subscribe(state => {
      this.initState(state)
    })
  }

  initState(state) {
    if (state === 'add-pe-it')
      this.initTeEntToAdd()

    if (state === 'create')
      this.initTeEntToCreate()

    if (state === 'edit')
      this.initTeEntToRemove()
  }

  initTeEntToAdd() {
    Observable.zip(this.teEnt$, this.ngRedux.select<Project>('activeProject'))
      .subscribe(result => {
        const teEnt = result["0"], project = result["1"];

        let teEntToAdd = new InfTemporalEntity(teEnt);

        // add an epr with is in project true
        teEntToAdd.entity_version_project_rels = [
          new InfEntityProjectRel({
            fk_project: project.pk_project,
            is_in_project: true,
            fk_entity_version_concat: teEnt.pk_entity_version_concat
          })
        ]

        this.localStore.dispatch(this.actions.teEntToAddUpdated(teEntToAdd));

        this.initFkClassAndRoles(teEnt.fk_class, teEnt.te_roles);
      })
  }

  initTeEntToCreate() {
    this.fkClass$.subscribe(fkClass => {
      let teEntToCreate = new InfTemporalEntity();
      teEntToCreate.fk_class = fkClass;

      this.localStore.dispatch(this.actions.teEntToCreateUpdated(teEntToCreate));

      this.initFkClassAndRoles(teEntToCreate.fk_class, teEntToCreate.te_roles);

    })
  }

  initTeEntToRemove() {
    Observable.zip(this.teEnt$, this.ngRedux.select<Project>('activeProject'))
      .subscribe(result => {
        const teEnt = result["0"], project = result["1"];

        let teEntToAdd = new InfTemporalEntity(teEnt);

        // add an epr with is in project undefined, so that it can be used to remove
        teEntToAdd.entity_version_project_rels = [
          new InfEntityProjectRel({
            fk_project: project.pk_project,
            fk_entity_version_concat: teEnt.pk_entity_version_concat
          })
        ]

        this.localStore.dispatch(this.actions.teEntToAddUpdated(teEntToAdd));

        this.initFkClassAndRoles(teEnt.fk_class, teEnt.te_roles);
      })
  }





  propertyReadyToCreate(roles: InfRole[]) {


    let rolesToCreate: InfRole[] = [];

    let allValid = true;

    this.RoleSetComponents.forEach(RoleSetComponent => {

      if (!RoleSetComponent.isReadyToCreate && !RoleSetComponent.isCircular) allValid = false;

      rolesToCreate = rolesToCreate.concat(RoleSetComponent.rolesToCreate);

    })

    if (allValid) {

      this.teEnt.te_roles = rolesToCreate;

      this.isReadyToCreate = true;

      this.readyToCreate.emit(this.teEnt);

    }

  }

  propertyNotReadyToCreate() {

    this.isReadyToCreate = false;

    this.notReadyToCreate.emit()

  }

  onPropertyReadyToAdd(rolesToAdd: InfRole[]) {

    let newRoles = [];

    // For each role coming in from property component
    rolesToAdd.forEach(roleToAdd => {

      let exists = false;

      for (let i = 0; i < this.teEntToAdd.te_roles.length; i++) {

        // Check if the role is allready in the teEntToAdd
        if (this.teEntToAdd.te_roles[i].pk_entity === roleToAdd.pk_entity) {

          // if yes replace it with the new one
          this.teEntToAdd.te_roles[i] = roleToAdd;
          exists = true;
        }
      }

      // else add it to a temporary array
      if (!exists) {
        newRoles.push(roleToAdd);
      }

    })
    // add all the new roles to teEntToAdd
    this.teEntToAdd.te_roles.concat(newRoles);

    this.readyToAdd.emit(this.teEntToAdd);

  }

  onPropertyNotReadyToAdd() {
    this.notReadyToAdd.emit();
  }

  toggleCardBody() {
    if (this.cardBodyState === 'collapsed')
      this.cardBodyState = 'expanded'
    else
      this.cardBodyState = 'collapsed'
  }

  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {
    const label = new AppellationLabel(appeStd.appellation.appellation_label);
    this.displayLabel = label.getString();
    this.appeChange.emit(appeStd)
  }



}
