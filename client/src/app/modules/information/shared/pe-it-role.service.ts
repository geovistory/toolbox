import { Injectable } from '@angular/core';
import { InfRole, InfTemporalEntity } from 'app/core';
import { EditorStates } from '../information.models';
import { ITeEntState, TeEntState } from '../components/te-ent/te-ent.model';

@Injectable()
export class PeItRoleService {

  constructor() { }
    

  createChildren(role:InfRole, state:EditorStates):ITeEntState{
    if(!role || !state) return null;
    
    return  new TeEntState({
      teEnt: new InfTemporalEntity(role.temporal_entity),
      state: state,
      toggle: 'collapsed',
      selectPropState: 'init'
    })
  }

}
