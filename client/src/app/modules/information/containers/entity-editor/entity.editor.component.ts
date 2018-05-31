import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService, EntityEditorService, IAppState, InfPersistentItemApi, Project, InfPersistentItem } from 'app/core';
import { WithSubStore, NgRedux, dispatch, select, ObservableStore } from '@angular-redux/store';
import { IEntityEditorWrapper, EntityEditorWrapper } from './entity-editor.model';
import { EntityEditorActions, EntityEditorAction } from './entity-editor.actions';
import { Observable } from 'rxjs/Observable';
import { PeItState, IPeItState } from './../pe-it/pe-it.model';
import { entityEditorReducer } from './entity-editor.reducer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PeItService } from '../../shared/pe-it.service';
import { ClassService } from '../../shared/class.service';
import { RoleSetListService } from '../../shared/role-set-list.service';
import { EditorStates } from '../../information.models';
import { indexBy } from 'ramda';
import { roleSetKey } from '../../components/role-set-list/role-set-list-actions';
import { StateCreatorService } from '../../shared/state-creator.service';


const INITIAL_STATE: IEntityEditorWrapper = {

};

@AutoUnsubscribe()
@Component({
  selector: 'gv-entity-editor',
  templateUrl: './entity.editor.component.html',
  styleUrls: ['./entity.editor.component.scss'],
})
export class EntityEditorComponent implements OnInit, OnDestroy {

  readonly basePath = ['information', 'entityEditor']
  getBasePath = () => this.basePath
  localStore: ObservableStore<IEntityEditorWrapper>;

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
    private rootStore: NgRedux<IAppState>,
    private ngRedux: NgRedux<IEntityEditorWrapper>,
    private actions: EntityEditorActions,
    private stateCreator: StateCreatorService

  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityEditorReducer);

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

  ngOnDestroy(){
    this.destroyEditor()
  }

  initEditor() {
    const state: EditorStates = 'editable';

    Observable.combineLatest(
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

        //get pkEntity from url
        this.pkEntity = params['id'];

        this.stateCreator.initializePeItState(this.pkEntity, project.pk_project, state).subscribe(peItState => {
          let wrapper = new EntityEditorWrapper({
            peItState: peItState
          });

          this.localStore.dispatch(this.actions.entityEditorInitialized(wrapper));
          this.initialized = true;
        })
      }
    })
  }


  destroyEditor(){
    this.localStore.dispatch(this.actions.entityEditorDestroyed());

  }
}


