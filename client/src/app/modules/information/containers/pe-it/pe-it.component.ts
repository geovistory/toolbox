import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { dispatch, select, select$, WithSubStore, NgRedux, ObservableStore } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { InfPersistentItem, DfhProperty, DfhClass, InfPersistentItemApi, ActiveProjectService, EntityEditorService, InfEntityProjectRel, InfRole, Project } from 'app/core';
import { PeItService } from '../../shared/pe-it.service';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { PropertyPipe } from '../../shared/property.pipe';

import { EditorStates } from '../../information.models';
import { peItReducer } from './pe-it.reducer';
import { PeItActions } from './pe-it.actions';
import { IPeItState } from './pe-it.model';
import { AppellationStdBool } from '../../components/role/role.component';


@WithSubStore({
  localReducer:peItReducer,
  basePathMethodName:'getBasePath'
})
@Component({
  selector: 'gv-pe-it',
  templateUrl: './pe-it.component.html',
  styleUrls: ['./pe-it.component.scss']
})
export class PeItComponent implements OnInit {

  @Input() parentPath: string[];
  getBasePath = () => [...this.parentPath, 'peItState']
  localStore: ObservableStore<IPeItState>;


  // Primary key of the peIt
  @select() pkEntity$: Observable<number>;
  pkEntity: number;

  // State of this component
  @select(['state']) peItEntityState$: Observable<EditorStates>;
  peItEntityState: EditorStates;


  /**
   * Dispatches
   */

  @dispatch() peItToAddUpdated = (peIt) => {
    return this.actions.peItToAddUpdated(peIt)
  };

  @dispatch() peItToCreateUpdated = (peIt) => {
    return this.actions.peItToCreateUpdated(peIt)
  };

  @dispatch() roleSetsInitialized = () => {
    return this.actions.roleSetsInitialized()
  };


  // FkClass of peIt
  @Input() fkClass: number;

  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfPersistentItem> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() created: EventEmitter<InfPersistentItem> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfPersistentItem> = new EventEmitter;

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter;




  /**
  * Properties
  */

  // id of the active project
  pkProject: number;

  // Flag if some async process is running
  loading: boolean;

  // Persistent Item used by this component
  peIt: InfPersistentItem;

  // Persistent Item to be created
  peItToCreate: InfPersistentItem;

  // Persistent Item to be added
  peItToAdd: InfPersistentItem;

  // Standard appellation string of project of this peIt
  stdAppeString: string;

  // Most popular appellation string of this peIt
  mostPopularAppeString: string;

  // array of properies of which the class of this peIt is range.
  outgoingProperties: DfhProperty[];

  // array of properies of which the class of this peIt is domain.
  ingoingProperties: DfhProperty[];

  //
  loadingProperties: boolean

  // true, when the peIt is ready to be created
  isReadyToCreate: boolean;

  //this components
  thisComponent = this;

  //Class of this peIt
  dfhClass: DfhClass;

  constructor(
    private peItApi: InfPersistentItemApi,
    private peItService: PeItService,
    protected activeProjectService: ActiveProjectService,
    private propertyPipe: PropertyPipe,
    private activePeItService: ActivePeItService,
    private slimLoadingBarService: SlimLoadingBarService,
    protected classService: ClassService,
    public entityEditor: EntityEditorService,
    private changeDetector: ChangeDetectorRef,
    private actions: PeItActions,
    private ngRedux: NgRedux<IPeItState>
  ) {
  }


  /**
  * Methods
  */

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(),peItReducer);

    this.roleSetsInitialized()
    
    Observable.combineLatest(
      this.pkEntity$,
      this.peItEntityState$,
      this.ngRedux.select<Project>('activeProject')
    ).subscribe(result => {
      this.pkEntity = result[0]
      this.peItEntityState = result[1]
      this.pkProject = this.activeProjectService.project.pk_project; // TODO: get this from store

      this.init()
    })


  }

  init() {

    // if it is not create state

    if (["preview", "edit", "view"].indexOf(this.peItEntityState) !== -1) {

      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfProject().subscribe((peIt) => {
        this.localStore.dispatch(this.actions.peItToEditUpdated(peIt))
        this.initRoleSets(peIt.fk_class)
      })



    }


    if (this.peItEntityState == "add-pe-it") {

      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfRepo().subscribe(peIt => {

        // make a copy
        let peItToAdd = new InfPersistentItem(peIt);

        // add an epr
        peItToAdd.entity_version_project_rels = [
          new InfEntityProjectRel({
            fk_project: this.activeProjectService.project.pk_project,
            is_in_project: true,
            fk_entity_version_concat: this.peIt.pk_entity_version_concat
          })
        ]

        this.peItToAddUpdated(peIt)

        this.initRoleSets(peIt.fk_class)

      })

    }

    if (this.peItEntityState == "add") {

      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfRepo().subscribe((peIt) => {

        // make a copy
        let peItToAdd = new InfPersistentItem(peIt);

        // add an epr
        peItToAdd.entity_version_project_rels = [
          new InfEntityProjectRel({
            fk_project: this.activeProjectService.project.pk_project,
            is_in_project: false,
            fk_entity_version_concat: this.peIt.pk_entity_version_concat
          })
        ]

        this.peItToAddUpdated(peIt)

        this.initRoleSets(peIt.fk_class)
      })

    }

    else if (this.peItEntityState == "create") {


      this.initRoleSets(this.fkClass)

      let peItToCreate = new InfPersistentItem({
        fk_class: this.fkClass
      });

      this.classService.getByPk(this.fkClass).subscribe(cla => {
        peItToCreate.dfh_class = cla;
        this.peItToCreateUpdated(peItToCreate)
      })


    }

  }

  queryRichObjectOfRepo(): EventEmitter<InfPersistentItem> {

    const onDone: EventEmitter<InfPersistentItem> = new EventEmitter()

    this.startLoading();

    this.peItApi.nestedObjectOfRepo(this.pkEntity).subscribe(
      (peIts: InfPersistentItem[]) => {

        const peIt = peIts[0];

        onDone.emit(peIt);

        this.completeLoading();

      });

    return onDone;

  }



  queryRichObjectOfProject(): EventEmitter<InfPersistentItem> {
    const onDone: EventEmitter<InfPersistentItem> = new EventEmitter()

    this.startLoading();

    const pkProject = this.activeProjectService.project.pk_project;

    this.peItApi.nestedObjectOfProject(pkProject, this.pkEntity).subscribe(
      (peIts: InfPersistentItem[]) => {
        const peIt = peIts[0];


        onDone.emit(peIt);

        this.completeLoading();
      });

    return onDone;

  }


  initRoleSets(fkClass) {

    Observable.combineLatest(
      this.classService.getIngoingProperties(fkClass),
      this.classService.getOutgoingProperties(fkClass)
    ).subscribe(result => {

      const ingoingProperties = result[0];
      const outgoingProperties = result[1];

      // TODO init role sets!!
    })

  }



  /**
  * Methods for creating a peIt
  */

  emitReadyToCreate(roles: InfRole[]) {
    this.peItToCreate.pi_roles = roles; //TODO this is not good because it overwrites roles coming form another property!
    this.isReadyToCreate = true
    this.readyToCreate.emit(this.peItToCreate)
  }


  emitNotReadyToCreate() {
    this.isReadyToCreate = false
    this.notReadyToCreate.emit()
  }



  /**
  * Methods for adding a peIt
  */

  onRolesReadyToAdd(rolesToAdd: InfRole[]) {


    let newRoles = [];

    // For each role coming in from property component
    rolesToAdd.forEach(roleToAdd => {

      let exists = false;

      for (let i = 0; i < this.peItToAdd.pi_roles.length; i++) {

        // Check if the role is already in the peItToAdd
        if (this.peItToAdd.pi_roles[i].pk_entity === roleToAdd.pk_entity) {

          // if yes replace it with the new one
          this.peItToAdd.pi_roles[i] = roleToAdd;
          exists = true;
        }
      }

      // else add it to a temporary array
      if (!exists) {
        newRoles.push(roleToAdd);
      }

    })
    // add all the new roles to peItToAdd
    this.peItToAdd.pi_roles.concat(newRoles);

    this.readyToAdd.emit(this.peItToAdd);
  }

  /**
  * called when roles of property (section) are not ready to be added
  */
  onRolesNotReadyToAdd(roles: InfRole[]) {
    this.notReadyToAdd.emit();
  }

  /**
  * Methods for event bubbeling
  */

  whenAppeChange(appeStd: AppellationStdBool) {
    if (appeStd.isStandardInProject) {
      const label = new AppellationLabel(appeStd.appellation.appellation_label);
      this.stdAppeString = label.getString();
      this.changeDetector.detectChanges()
    }
    if (appeStd.isMostPopular) {
      const label = new AppellationLabel(appeStd.appellation.appellation_label);
      this.mostPopularAppeString = label.getString();
      this.changeDetector.detectChanges()
    }
  }


  /**
  * Loading Bar Logic
  */

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
