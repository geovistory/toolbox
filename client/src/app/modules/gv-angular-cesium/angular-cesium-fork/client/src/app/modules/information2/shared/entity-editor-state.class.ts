import { EventEmitter } from '@angular/core';

export enum EntityState {
  'edit', // edit an entity and its phenomena within a project
  'add', // adding an entity and its phenomena to a project
  'view', // view a entity and its phenomena within a project
  'communityDataView', // view an entity with all phenomena existing in the repo
  'nameAdd' // adding a name to an entity that is already in the project (acutally this is more a name state than a entiy state --> may be move to a seperate state enum)
}

export class EntityEditorState {

  // State of view in modal
  onStateChange:EventEmitter<string>= new EventEmitter();

  // state of the entity editor, that is currently active/edited
  private _state: EntityState;

  /**
  * set state - set the state of the entity editor, that is currently active/edited
  *
  * This emits the new state in an onStateChange event
  *
  * @param  {string} newState String matching an EntityState
  */
  set state(newState:string){
    this._state = EntityState[newState];
    this.onStateChange.emit(newState);
  }


  /**
  * get state -  get the state of the entity editor, that is currently active/edited
  *
  * @return {string}  String matching an EntityState
  */
  get state():string {
    return EntityState[this._state];
  }

  constructor(){

  }
}