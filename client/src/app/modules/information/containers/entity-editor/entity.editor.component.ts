import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService, EntityEditorService, IAppState } from 'app/core';
import { WithSubStore, NgRedux, dispatch, select, ObservableStore } from '@angular-redux/store';
import { IEntityEditorWrapper, EntityEditorWrapper } from './entity-editor.model';
import { EntityEditorActions, EntityEditorAction } from './entity-editor.actions';
import { Observable } from 'rxjs/Observable';
import { PeItState, IPeItState } from './../pe-it/pe-it.model';
import { IAppStateWithInformation } from '../../api/information.model';
import { entityEditorReducer } from './entity-editor.reducer';


const INITIAL_STATE: IEntityEditorWrapper = {

};


@Component({
  selector: 'gv-entity-editor',
  templateUrl: './entity.editor.component.html',
  styleUrls: ['./entity.editor.component.scss']
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private activeProjectService: ActiveProjectService,
    public entityEditor: EntityEditorService,
    private rootStore: NgRedux<IAppState>,
    private ngRedux: NgRedux<IEntityEditorWrapper>,
    private actions: EntityEditorActions,
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


    let wrapper = new EntityEditorWrapper({
      peItState: new PeItState({
        pkEntity: this.pkEntity,
        state: 'edit'
      })
    }); 

    this.localStore.dispatch(this.actions.entityEditorInitialized(wrapper));

  }



}


