import { Injectable, EventEmitter } from '@angular/core';
import { EntityProjectRelApi } from '../sdk/services/custom/EntityProjectRel';
import { PersistentItem } from '../sdk/models/PersistentItem';
import { EntityProjectRel } from '../sdk/models/EntityProjectRel';

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
  eprNaming: EntityProjectRel[];

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
pkPersistentItem:number;

// The persistent Item to Add
persistentItem:PersistentItem;

constructor(
  private entityProjectRelApi:EntityProjectRelApi
) { }

addPeItToProject(){
  const apiCall = new EventEmitter();
  
  this.entityProjectRelApi.create(
    [
      {
        "is_in_project": true,
        "is_standard_in_project": true,
        "fk_entity": this.persistentItem.pk_entity,
        "fk_project": this.pkProject
      },
      ...this.eprNaming
    ]
  ).subscribe(
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
