import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select, select$, WithSubStore, NgRedux, ObservableStore } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { InfPersistentItem, DfhProperty, DfhClass, InfPersistentItemApi, ActiveProjectService, EntityEditorService, InfEntityProjectRel, InfRole, Project } from 'app/core';
import { PeItService } from '../../shared/pe-it.service';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { PropertyPipe } from '../../shared/property.pipe';

import { EditorStates } from '../../information.models';
import { PeItActions } from './pe-it.actions';
import { IPeItState } from './pe-it.model';
import { AppellationStdBool } from '../../components/role/role.component';
import { RoleSetListState, IRoleSetListState } from '../../components/role-set-list/role-set-list.model';
import { RoleSetListComponent } from '../../components/role-set-list/role-set-list.component';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { RoleSetActions } from '../../components/role-set/role-set.actions';
import { RoleSetListActions } from '../../components/role-set-list/role-set-list-actions';
import { peItReducer } from './pe-it.reducer';
import { BehaviorSubject } from 'rxjs';

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
})
export class PeItComponent extends RoleSetListComponent implements OnInit {

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
   * Dispatches
   */

  @dispatch() peItToAddUpdated = (peIt) => {
    return this.actions.peItToAddUpdated(peIt)
  };

  @dispatch() peItToCreateUpdated = (peIt) => {
    return this.actions.peItToCreateUpdated(peIt)
  };

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
  ) {
    super(classService, roleService, propertyService, entityEditor)
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
    this.state$.subscribe(state => {
      this.initState(state)
    })
  }


  initState(state) {

    if (state == "add-pe-it") {
      this.initPeItToAddPeIt()
    }

    else if (state == "add") {
      this.initPeItToAdd()
    }

    else if (state == "edit") {
      this.initPeItToEdit()
    }

    else if (state == "create") {
      this.initPeItToCreate()
    }
  }

  initPeItToAdd() {
    Observable.zip(
      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfRepo(),
      this.ngRedux.select<Project>('activeProject')
    ).subscribe(result => {

      const peIt = result["0"], project = result["1"];

      // make a copy
      let peItToAdd = new InfPersistentItem(peIt);

      // add an epr
      peItToAdd.entity_version_project_rels = [
        new InfEntityProjectRel({
          fk_project: project.pk_project,
          is_in_project: false,
          fk_entity_version_concat: peIt.pk_entity_version_concat
        })
      ]

      this.peItToAddUpdated(peIt)

      this.initFkClassAndRoles(peIt.fk_class, peIt.pi_roles)
    })
  }

  initPeItToAddPeIt() {
    Observable.zip(
      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfRepo(),
      this.ngRedux.select<Project>('activeProject')
    ).subscribe(result => {

      const peIt = result["0"], project = result["1"];

      // make a copy
      let peItToAdd = new InfPersistentItem(peIt);

      // add an epr
      peItToAdd.entity_version_project_rels = [
        new InfEntityProjectRel({
          fk_project: project.pk_project,
          is_in_project: true,
          fk_entity_version_concat: peIt.pk_entity_version_concat
        })
      ]

      this.peItToAddUpdated(peIt)

      this.initFkClassAndRoles(peIt.fk_class, peIt.pi_roles)

    })
  }

  initPeItToCreate() {
    this.fkClass$.subscribe(fkClass => {
      if (fkClass) {
        this.initFkClassAndRoles(fkClass)

        let peItToCreate = new InfPersistentItem({
          fk_class: fkClass
        });

        this.classService.getByPk(fkClass).subscribe(cla => {
          peItToCreate.dfh_class = cla;
          this.peItToCreateUpdated(peItToCreate)
        })

        throw new Error('implentation for automatically adding a roleSet on create')


        //TODO find smarter choice of the default property to add on create
        //  this.in$.subscribe(
        //    idaps=>{

        //     idaps.filter(odap => {
        //       return odap.property.dfh_pk_property === 1 //'R63'
        //     })[0]  
        //    }
        //  )

      }
    })
  }

  initPeItToEdit() {
    this.queryRichObjectOfProject().subscribe((peIt) => {
      if (peIt) {
        this.localStore.dispatch(this.actions.peItToEditUpdated(peIt))
        this.initFkClassAndRoles(peIt.fk_class, peIt.pi_roles)
      }
    })
  }





  queryRichObjectOfRepo(): BehaviorSubject<InfPersistentItem> {

    const onDone: BehaviorSubject<InfPersistentItem> = new BehaviorSubject(null)

    this.startLoading();
    this.pkEntity$.subscribe(pkEntity => {

      this.peItApi.nestedObjectOfRepo(pkEntity).subscribe(
        (peIts: InfPersistentItem[]) => {

          const peIt = peIts[0];

          onDone.next(peIt);

          this.completeLoading();

        })
    });

    return onDone;

  }


  // Query the peIt
  queryRichObjectOfProject(): BehaviorSubject<InfPersistentItem> {
    const onDone: BehaviorSubject<InfPersistentItem> = new BehaviorSubject(null)

    this.startLoading();

    Observable.zip(this.ngRedux.select<Project>('activeProject'), this.pkEntity$)
      .subscribe(result => {
        const project = result[0], pkEntity = result[1];
        if (project && pkEntity)

          this.peItApi.nestedObjectOfProject(project.pk_project, pkEntity).subscribe(
            (peIts: InfPersistentItem[]) => {
              const peIt = peIts[0];

              onDone.next(peIt);

              this.completeLoading();
            });

      })


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
  //   if (appeStd.isStandardInProject) {
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
