import { Injectable, EventEmitter } from '@angular/core';
import { EntityVersionProjectRel } from '../sdk/models/EntityVersionProjectRel';
import { EntityVersionProjectRelApi } from '../sdk/services/custom/EntityVersionProjectRel';
import { PersistentItemVersion } from '../sdk/models/PersistentItemVersion';

export enum EntityAddModalState {
  'choose-class',
  'search-existing',
  // 'create-new',
  'add-existing'
}

@Injectable()
export class EntityAddModalService {

  // State of view in modal
  onStateChange:EventEmitter<string>= new EventEmitter();

  // Add Entity Event
  onAdd: EventEmitter<number> = new EventEmitter();

  // Open Entity Event
  onOpen: EventEmitter<number> = new EventEmitter();

  // Entity Project Rels needed to add the selected names to the project
  eprNaming: EntityVersionProjectRel[];

  // state of the modal
  private _state: EntityAddModalState;

  // set current state by string
  set state(newState:string){
  this._state = EntityAddModalState[newState];
  this.onStateChange.emit(newState);
}

// get current state as string
get state():string {
return EntityAddModalState[this._state];
}

// get previous state as string
get previousState():string {
return EntityAddModalState[this._state - 1];
}

// get flag for displaying button to add existing information
get addButtonVisible():boolean {
return EntityAddModalState[this._state]  === 'add-existing' ? true : false;
}

// Class of the entity to add
selectedClass:any; //TODO: type the variable with class type

// Current modal title
modalTitle:string;

// Primary Key of the current project
pkProject:number;

// Primary Key of the persistent Item to Add
pkEntity:number;

// The persistent Item to Add
persistentItemVersion:PersistentItemVersion;

// The search string used to search existing peIts
// and create the appellation of the new peIt
searchString:string;

constructor(
  private entityProjectRelApi:EntityVersionProjectRelApi
) { }

addPeItToProject(){
  const apiCall = new EventEmitter();

  const eprToCreate = [
    {
      "is_in_project": true,
      "is_standard_in_project": true,
      "fk_entity_version_concat": this.persistentItemVersion.pk_entity_version_concat,
      "fk_project": this.pkProject
    },
    ...this.eprNaming
  ];

  this.entityProjectRelApi.create(eprToCreate).subscribe(
    (response) => {
      apiCall.emit();
    },
    error => {
      apiCall.error(error);

      // TODO: Alert
      error.error.details.messages;
    }
  )

  return apiCall;
}

}
