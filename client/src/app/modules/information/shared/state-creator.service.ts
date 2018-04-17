import { Injectable } from '@angular/core';
import { InfPersistentItem, InfPersistentItemApi, InfRole, InfTemporalEntity } from 'app/core';
import { indexBy, groupBy, prop } from 'ramda';

import { ClassService } from './class.service';
import { Observable } from 'rxjs/Observable';
import { PeItState, IPeItState } from '../containers/pe-it/pe-it.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { IRoleSetState, RoleSetState } from '../components/role-set/role-set.model';
import { PropertyService } from './property.service';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';
import { EditorStates } from '../information.models';
import { IRoleState, RoleState } from '../components/role/role.model';
import { roleStateKey } from '../components/role-set/role-set.actions';
import { TeEntState, ITeEntState } from '../components/te-ent/te-ent.model';


@Injectable()
export class StateCreatorService {

  constructor(

    private peItApi: InfPersistentItemApi,
    private classService: ClassService,
    private propertyService: PropertyService
  ) { }






  initializePeItState(pkEntity, pkProject, state): BehaviorSubject<IPeItState> {
    const subject = new BehaviorSubject(null)

    // Get peIt from DB
    this.peItApi.nestedObjectOfProject(pkProject, pkEntity).subscribe((peIts: InfPersistentItem[]) => {
      const peIt = peIts[0];

      // Get DfhClass Observable
      const dfhClass$ = this.classService.getByPk(peIt.fk_class);

      // Get RoleSetListChildren Observable (returning roleSets etc.)
      const roleSetsListChildren$ = this.initRoleSetListState(peIt.fk_class, peIt.pi_roles, state)

      Observable.combineLatest(dfhClass$, roleSetsListChildren$).subscribe(result => {
        if (result[0] && result[1]) {
          const dfhClass = result[0];
          const roleSets = result[1].childRoleSets;
          const ingoingRoleSets = result[1].ingoingRoleSets;
          const outgoingRoleSets = result[1].outgoingRoleSets;

          const peItState = new PeItState({
            pkEntity: pkEntity,
            state: state,
            selectPropState: 'init',
            peItToEdit: peIt,
            fkClass: peIt.fk_class,
            dfhClass,
            roleSets,
            ingoingRoleSets,
            outgoingRoleSets
          })

          subject.next(peItState);

        }
      })
    });

    return subject;
  }



  initRoleSetListState(fkClass, roles, state): BehaviorSubject<{ childRoleSets: IRoleSets, ingoingRoleSets: IRoleSetState[], outgoingRoleSets: IRoleSetState[] }> {
    const subject: BehaviorSubject<{ childRoleSets: IRoleSets, ingoingRoleSets: IRoleSetState[], outgoingRoleSets: IRoleSetState[] }> = new BehaviorSubject(null)

    Observable.zip(
      // Generate ingoing and outgoing properties
      this.classService.getIngoingProperties(fkClass),
      this.classService.getOutgoingProperties(fkClass),
    ).subscribe(result => {
      const ingoingProperties = result[0];
      const outgoingProperties = result[1];

      // Generate Direction Aware Properties (they appear in the select/dropdown to add new RoleSet)
      const ingoingRoleSets = this.propertyService.toRoleSets(false, ingoingProperties)
      const outgoingRoleSets = this.propertyService.toRoleSets(true, outgoingProperties)

      // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
      const options: IRoleSetState = { state: state, toggle: 'collapsed' }
      const childRoleSets$ = this.initializeChildRoleSets(roles, ingoingRoleSets, outgoingRoleSets, options)

      childRoleSets$.subscribe(childRoleSets => {
        subject.next({ childRoleSets, ingoingRoleSets, outgoingRoleSets });
      })

    })

    return subject;
  }


  /**
  * Initialize RoleSets of RoleSetList
  * 
  * @param {InfRole[]} roles array of roles a PeIti
  * @param {RoleSetState[]} ingoingRoleSets array of ingoing properties (depending on context)
  * @param {RoleSetState[]} outgoingRoleSets array of outgoing properties (depending on context)
  * @param {RoleSetState} options any other option that should be apllied to all of the roleSets
  * @return {IRoleSets} Object of RoleSetState, the model of the Gui-Element for RoleSets
  */
  private initializeChildRoleSets(roles: InfRole[], ingoingRoleSets: RoleSetState[], outgoingRoleSets: RoleSetState[], options: IRoleSetState = {}): BehaviorSubject<IRoleSets> {
    const subject = new BehaviorSubject(null);

    // declare array that will be returned
    const roleSets$: Observable<IRoleSetState>[] = [];

    const rolesByFkProp = groupBy(prop('fk_property'), roles)

    const givenRoleSets = [...ingoingRoleSets, ...outgoingRoleSets];

    // enrich role sets with roles and child RoleStates
    givenRoleSets.forEach(rs => {
      const r = rolesByFkProp[rs.property.dfh_pk_property];
      if (r && r.length > 0) {
        const roleSet$ = this.initializeRoleSetState(r, Object.assign(rs, options));
        roleSets$.push(roleSet$);
      }
    })

    Observable.combineLatest(roleSets$).subscribe(roleSets => {
      subject.next(indexBy(roleSetKey, roleSets))
    })


    return subject;
  }



  initializeRoleSetState(roles: InfRole[], options: IRoleSetState): BehaviorSubject<IRoleSetState> {
    if (!roles || !roles.length) return new BehaviorSubject(undefined);

    const subject = new BehaviorSubject(null);


    const roleStates$: Observable<IRoleState>[] = [];

    roles.forEach(role => {
      roleStates$.push(this.initializeRoleState(role, options.state, options.isOutgoing))
    })

    Observable.combineLatest(roleStates$).subscribe(roleStates => {

      /** Creates the RoleSet */
      const iRoleState = new RoleSetState({
        childRoleStates: indexBy(roleStateKey, roleStates),
        targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain
      })

      /** Assings options to RolSet (this can come from the two functions before) */
      subject.next(Object.assign(options, iRoleState))

    })

    return subject;
  }


  initializeRoleState(role: InfRole, state: EditorStates, isOutgoing: boolean): BehaviorSubject<IRoleState> {
    const subject = new BehaviorSubject(null);


    let roleState = new RoleState({
      role,
      state: state,
      isOutgoing: isOutgoing,

    });

    if (role && role.entity_version_project_rels[0]) {
      roleState.isDisplayRoleForDomain = role.entity_version_project_rels[0].is_standard_in_project;
      // TODO uncomment as soon as we have the corresponding data model
      // role.entity_version_project_rels[0].is_display_role_for_domain
      roleState.isDisplayRoleForRange = null;
    }

    if (!role.temporal_entity) {

      return new BehaviorSubject(roleState)

    } else {

      this.initializeTeEntState(role.temporal_entity, state).subscribe(teEntState => {
        roleState.childTeEnt = teEntState;
        subject.next(roleState);
      })

    }

    return subject;
  }


  initializeTeEntState(teEnt: InfTemporalEntity, state: EditorStates): BehaviorSubject<ITeEntState> {
    const subject = new BehaviorSubject(null);

    // Get DfhClass Observable
    const dfhClass$ = this.classService.getByPk(teEnt.fk_class);

    // Get RoleSetListChildren Observable (returning roleSets etc.)
    const roleSetsListChildren$ = this.initRoleSetListState(teEnt.fk_class, teEnt.te_roles, state)

    Observable.combineLatest(dfhClass$, roleSetsListChildren$).subscribe(result => {
      if (result[0] && result[1]) {
        const dfhClass = result[0];
        const roleSets = result[1].childRoleSets;
        const ingoingRoleSets = result[1].ingoingRoleSets;
        const outgoingRoleSets = result[1].outgoingRoleSets;

        const teEntState = new TeEntState({
          teEnt: teEnt,
          state: state,
          selectPropState: 'init',
          toggle: 'collapsed',
          teEntToAdd: teEnt,
          fkClass: teEnt.fk_class,
          dfhClass,
          roleSets,
          ingoingRoleSets,
          outgoingRoleSets
        })

        subject.next(teEntState);
      }
    })

    return subject;
  }



}
