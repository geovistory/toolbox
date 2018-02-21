import { Injectable, EventEmitter } from '@angular/core';
import { EntityVersionProjectRel } from '../sdk/models/EntityVersionProjectRel';
import { EntityVersionProjectRelApi } from '../sdk/services/custom/EntityVersionProjectRel';
import { PersistentItemVersion } from '../sdk/models/PersistentItemVersion';
import { PersistentItemVersionApi } from '../sdk/services/custom/PersistentItemVersion';
import { ActiveProjectService } from './active-project.service';

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

  // Entity Project Rels needed to add the selected names to the project
  eprNaming: EntityVersionProjectRel[];

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

  // true if add button should be visible
  addButtonVisible: boolean;

  // Class of the entity to add
  selectedClass: any; //TODO: type the variable with class type

  // Current modal title
  modalTitle: string;

  // Primary Key of the current project
  pkProject: number;

  // Primary Key of the persistent Item to Add
  pkEntity: number;

  // The persistent Item to Add
  peItToAdd: PersistentItemVersion;

  // The persistent item to create
  peItToCreate: PersistentItemVersion;

  // The search string used to search existing peIts
  // and create the appellation of the new peIt
  searchString: string;

  // true if create button should be visible
  createButtonVisible: boolean;

  constructor(
    private entityProjectRelApi: EntityVersionProjectRelApi,
    private activeProjectService: ActiveProjectService,
    private persistentItemApi: PersistentItemVersionApi
  ) { }

  addPeItToProject() {

    return this.persistentItemApi.addPeItToProject(
      this.activeProjectService.project.pk_project,
      this.peItToAdd
    )

  }

  createPeIt() {
    return this.persistentItemApi.findOrCreatePeIt(
      this.activeProjectService.project.pk_project,
      this.peItToCreate
    )
  }

}
