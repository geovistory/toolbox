import { NgRedux, ObservableStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService, EntityEditorService, IAppState, Project } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { combineLatest } from 'rxjs';
import { InformationActions } from '../../information.actions';
import { Information } from '../../information.models';
import { informationReducer } from '../../information.reducer';
import { StateCreatorService } from '../../shared/state-creator.service';



@AutoUnsubscribe()
@Component({
  selector: 'gv-entity-editor',
  templateUrl: './entity.editor.component.html',
  styleUrls: ['./entity.editor.component.scss'],
})
export class EntityEditorComponent implements OnInit, OnDestroy {

  readonly basePath = ['information']
  localStore: ObservableStore<Information>;

  /**
  * Properties
  */


  // Primary key of the Persistent Item to be viewed or edited
  pkEntity: number;

  // State that will be passed to the included PeItComponent on init
  peItState: string;

  // Flag to indicate that the editor is initialized
  initialized: boolean;

  pkProject: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activeProjectService: ActiveProjectService,
    public entityEditor: EntityEditorService,
    private ngRedux: NgRedux<IAppState>,
    private actions: InformationActions,
    private stateCreator: StateCreatorService

  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);

    // trigger the activation of the project
    this.activeProjectService.setActiveProject(this.activatedRoute.snapshot.parent.params['id']);

  }

  /**
   * Dispatches
   */
  // @dispatch() entityEditorInitialized = (wrapper) => {
  //   return this.actions.entityEditorInitialized(wrapper);
  // }



  ngOnInit() {
    // Initialize the substore of this component

    this.initEditor()

  }

  ngOnDestroy() {
    this.destroyEditor()
  }

  getBasePath = () => this.basePath

  initEditor() {

    combineLatest(
      this.ngRedux.select<Project>('activeProject'),
      this.activatedRoute.params
    ).subscribe(result => {
      const project = result[0]
      const params = result[1]
      if (
        project && params && params['id'] &&
        (
          this.pkProject != project.pk_project ||
          params['id'] && this.pkEntity != params['id']
        )
      ) {
        this.pkProject = project.pk_project;

        // Get pkEntity from url
        this.pkEntity = params['id'];

        this.stateCreator.initializePeItState(this.pkEntity, project.pk_project).subscribe(peItState => {
          this.localStore.dispatch(this.actions.entityEditorInitialized(peItState));
          this.initialized = true;
        })
      }
    })
  }


  destroyEditor() {
    this.localStore.dispatch(this.actions.entityEditorDestroyed());

  }
}


