import { Injectable, Inject, forwardRef } from '@angular/core';
import { EditorStates } from '../information.models';
import { IRoleState, RoleState } from '../components/role/role.model';
import { InfRole } from 'app/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RoleSetState, IRoleSetState, IRoleStates } from '../components/role-set/role-set.model';
import { indexBy, groupBy, prop } from 'ramda';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { roleStateKey } from '../components/role-set/role-set.actions';
import { BehaviorSubject } from 'rxjs';
import { ITeEntState } from '../components/te-ent/te-ent.model';
import { Observable } from 'rxjs/Observable';
import { RoleService } from './role.service';


@Injectable()
export class RoleSetService {

  constructor(
    @Inject(forwardRef(() => RoleService)) private roleService: RoleService
  ) { }

  createChildren(roles: InfRole[], state: EditorStates, isOutgoing: boolean): IRoleState[] {
    if (!roles || !state) return null;

    return roles.map(role =>
      new RoleState({
        role,
        state,
        isOutgoing
      }))
  }

}
