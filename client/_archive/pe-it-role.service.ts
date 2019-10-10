import { Injectable } from '@angular/core';
import { InfRole, InfTemporalEntity } from 'app/core';
import { TeEntDetail } from 'app/core/state/models';

@Injectable()
export class PeItRoleService {

  constructor() { }
    

  createChildren(role:InfRole):TeEntDetail{
    if(!role) return null;
    
    return  {
      teEnt: new InfTemporalEntity(role.temporal_entity),
      toggle: 'collapsed',
      selectPropState: 'init'
    } as TeEntDetail
  }

}
