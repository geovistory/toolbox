import { Injectable, EventEmitter } from '@angular/core';
import { InfEntityProjectRel, DfhClass, InfPersistentItem,  InfEntityProjectRelApi, InfPersistentItemApi, IAppState } from 'app/core';
import { StateToDataService } from './state-to-data.service';
import { PeItDetail } from '../information.models';
import { NgRedux } from '@angular-redux/store';


export enum EntityAddModalState {
  'choose-class',
  'search-existing',
  'create-new',
  'add-existing'
}

@Injectable()
export class EntityAddModalService {

  // State of view in modal
  onStateChange: EventEmitter<string> = new EventEmitter();

  // Add Entity Event
  onAdd: EventEmitter<number> = new EventEmitter();

  // Open Entity Event
  onOpen: EventEmitter<number> = new EventEmitter();

  // Select Entity Event
  onSelect: EventEmitter<number> = new EventEmitter();

  // Entity Project Rels needed to add the selected names to the project
  eprNaming: InfEntityProjectRel[];

  // state of the modal
  private _state: EntityAddModalState;

  // previousState of the modal
  previousState: string;

  // set current state by string
  set state(newState: string) {
    this._state = EntityAddModalState[newState];
    this.onStateChange.emit(newState);
  }

  // get current state as string
  get state(): string {
    return EntityAddModalState[this._state];
  }

  // true if it is about selecting a peIt as the range of a role
  selectRoleRange: boolean;

  // true if add button should be visible
  addButtonVisible: boolean;

  // Class of the entity to add
  selectedClass: DfhClass;

  // Current modal title
  modalTitle: string;

  // Primary Key of the current project
  pkProject: number;

  // Primary Key of the persistent Item to Add
  pkEntity: number;

  // The persistent Item to Add
  peItStateToAdd: PeItDetail;

  // The persistent item to create
  peItToCreate: InfPersistentItem;

  // The search string used to search existing peIts
  // and create the appellation of the new peIt
  searchString: string;

  // true if create button should be visible
  createButtonVisible: boolean;

  constructor(
    private entityProjectRelApi: InfEntityProjectRelApi,
    private ngRedux: NgRedux<IAppState>,
    private persistentItemApi: InfPersistentItemApi
  ) { }

  changePeItProjectRelation() {

    console.error('New implementation needed: Use the form value of pe-it-add-form instead of state and peItStateToPeItToRelate()');
    // return this.persistentItemApi.changePeItProjectRelation(
    //   this.activeProjectService.project.pk_project,
    //   true,
    //   StateToDataService.peItStateToPeItToRelate(this.peItStateToAdd)
    // )
  }

  createPeIt() {
    return this.persistentItemApi.findOrCreatePeIt(
      this.ngRedux.getState().activeProject.pk_project,
      this.peItToCreate
    )
  }

}
