import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService, EntityEditorService, IAppState, InfPersistentItemApi, Project, InfPersistentItem } from 'app/core';
import { WithSubStore, NgRedux, dispatch, select, ObservableStore } from '@angular-redux/store';
import { IEntityEditorWrapper, EntityEditorWrapper } from './entity-editor.model';
import { EntityEditorActions, EntityEditorAction } from './entity-editor.actions';
import { Observable } from 'rxjs/Observable';
import { PeItState, IPeItState } from './../pe-it/pe-it.model';
import { IAppStateWithInformation } from '../../api/information.model';
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
export class EntityEditorComponent implements OnInit {

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

  // Flag to indicate that the activeProject is set
  activeProjectReady: boolean;

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


    // wait for the project to be set
    this.activeProjectService.onProjectChange().subscribe(project => {
      this.activeProjectReady = true;
    })

    // trigger the activation of the project
    this.activeProjectService.setActiveProject(this.activatedRoute.snapshot.parent.params['id']);

    //get pkEntity from url
    this.activatedRoute.params.subscribe(params => {
      this.pkEntity = params['id'];
    })


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


  initEditor() {
    const state: EditorStates = 'editable';

    const projecSubs = this.ngRedux.select<Project>('activeProject').subscribe(project => {
      if (project && this.pkProject != project.pk_project) {
        this.pkProject = project.pk_project;

        this.stateCreator.initializePeItState(this.pkEntity, project.pk_project, state).subscribe(peItState => {
          let wrapper = new EntityEditorWrapper({
            peItState: peItState
          });

          this.localStore.dispatch(this.actions.entityEditorInitialized(wrapper));
        })
      }
    })
  }

}


