import { Injectable } from '@angular/core';
import { InfPersistentItem, InfPersistentItemApi, InfRole, InfTemporalEntity, InfAppellation } from 'app/core';
import { indexBy, groupBy, prop } from 'ramda';

import { ClassService } from './class.service';
import { Observable } from 'rxjs/Observable';
import { PeItState, IPeItState } from '../containers/pe-it/pe-it.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { IRoleSetState, RoleSetState, IRoleStates } from '../components/role-set/role-set.model';
import { PropertyService } from './property.service';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';
import { EditorStates } from '../information.models';
import { IRoleState, RoleState } from '../components/role/role.model';
import { roleStateKey } from '../components/role-set/role-set.actions';
import { TeEntState, ITeEntState } from '../components/te-ent/te-ent.model';
import { PeItService } from './pe-it.service';
import { Subject } from 'rxjs/Subject';
import { RoleSetService } from './role-set.service';
import { ConfigService } from './config.service';
import { IAppellationState, AppellationState } from '../components/appellation/appellation.model';
import { AppellationLabel } from './appellation-label/appellation-label';


@Injectable()
export class StateCreatorService {

  constructor(

    private peItApi: InfPersistentItemApi,
    private classService: ClassService,
    private propertyService: PropertyService,
    private peItService: PeItService,
    private configService: ConfigService
  ) { }



  initializePeItToCreate(fkClass): ReplaySubject<IPeItState> {
    const subject = new ReplaySubject(null);

    const state = 'create-pe-it'

    let peIt = new InfPersistentItem();
    let roleToAppeUse = new InfRole();
    let appeUse = new InfTemporalEntity;
    let roleToAppellation = new InfRole;
    let appellation = new InfAppellation;

    roleToAppeUse.fk_property = this.configService.PROPERTY_PK_R63_NAMES;
    appeUse.fk_class = this.configService.CLASS_PK_APPELLATION_USE;
    roleToAppellation.fk_property = this.configService.PROPERTY_PK_R64_USED_NAME;
    appellation.fk_class = this.configService.CLASS_PK_APPELLATION;

    peIt.fk_class = fkClass;
    peIt.pi_roles = [roleToAppeUse];
    roleToAppeUse.temporal_entity = appeUse;
    appeUse.te_roles = [roleToAppellation];
    roleToAppellation.appellation = appellation;


    // Get DfhClass Observable
    const dfhClass$ = this.classService.getByPk(fkClass);

    // Get RoleSetListChildren Observable (returning roleSets etc.)
    const roleSetsListChildren$ = this.initRoleSetListState(fkClass, peIt.pi_roles, state)

    Observable.combineLatest(dfhClass$, roleSetsListChildren$).subscribe(result => {
      if (result[0] && result[1]) {
        const dfhClass = result[0];
        const roleSets = result[1].childRoleSets;
        const ingoingRoleSets = result[1].ingoingRoleSets;
        const outgoingRoleSets = result[1].outgoingRoleSets;

        const peItState = new PeItState({
          state: state,
          selectPropState: 'init',
          peIt,
          fkClass,
          dfhClass,
          roleSets,
          ingoingRoleSets,
          outgoingRoleSets
        })

        subject.next(peItState);

      }
    })

    return subject;
  }


  initializePeItState(pkEntity: number, pkProject: number, state: EditorStates): ReplaySubject<IPeItState> {
    const subject = new ReplaySubject(null)


    // Get peIt from DB
    this.peItService.getNestedObject(pkEntity, pkProject).subscribe((peIt: InfPersistentItem) => {

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
            fkClass: peIt.fk_class,
            peIt,
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



  initRoleSetListState(fkClass, roles, state, parentRolePk?: number): ReplaySubject<{ childRoleSets: IRoleSets, ingoingRoleSets: IRoleSetState[], outgoingRoleSets: IRoleSetState[] }> {
    const subject = new ReplaySubject<{ childRoleSets: IRoleSets, ingoingRoleSets: IRoleSetState[], outgoingRoleSets: IRoleSetState[] }>()

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
      const options: IRoleSetState = {
        state: state,
        toggle: (state === 'create' || state === 'create-pe-it' || state === 'create-pe-it-role') ? 'expanded' : 'collapsed'
      }
      const childRoleSets$ = this.initializeChildRoleSets(roles, ingoingRoleSets, outgoingRoleSets, options, parentRolePk)

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
  private initializeChildRoleSets(roles: InfRole[], ingoingRoleSets: RoleSetState[], outgoingRoleSets: RoleSetState[], options: IRoleSetState = {}, parentRolePk?: number): Subject<IRoleSets> {
    const subject = new ReplaySubject<IRoleSets>();

    const givenRoleSets = [...ingoingRoleSets, ...outgoingRoleSets];

    // declare array that will be returned
    const roleSets$: Observable<IRoleSetState>[] = [];

    if (options.state === 'create-pe-it-role') {
      // add a roleSet for each givenRoleSet 
      givenRoleSets.forEach(rs => {
        const emptyRole = new InfRole()
        const roleSet$ = this.initializeRoleSetState([emptyRole], Object.assign(rs, options), parentRolePk);
        roleSets$.push(roleSet$);
      });
    }
    else if (!roles || !roles.length) return new BehaviorSubject(undefined)
    else {

      const rolesByFkProp = groupBy(prop('fk_property'), roles)

      // enrich role sets with roles and child RoleStates
      givenRoleSets.forEach(rs => {

        // add a roleSet only for the given roles  
        const r = rolesByFkProp[rs.property.dfh_pk_property];
        if (r && r.length > 0) {
          const roleSet$ = this.initializeRoleSetState(r, Object.assign(rs, options), parentRolePk);
          roleSets$.push(roleSet$);
        }

      })
    }

    Observable.combineLatest(roleSets$).subscribe(roleSets => {
      subject.next(indexBy(roleSetKey, roleSets))
    })


    return subject;
  }



  initializeRoleSetState(roles: InfRole[], options: IRoleSetState, parentRolePk?: number): Subject<IRoleSetState> {
    const subject = new ReplaySubject();

    if (!roles || !roles.length) return new BehaviorSubject(undefined)


    this.initializeRoleStates(roles, options.state, options.isOutgoing, parentRolePk).subscribe((roleStates: IRoleStates) => {
      if (roleStates) {
        /** Creates the RoleSet */
        let iRoleState = new RoleSetState({
          targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain
        })

        switch (options.state) {
          /** if the roleset is in editable mode, the roles that are in project need to be taken */
          case 'editable':
            iRoleState.roleStatesInProject = roleStates;
            break;

          /** if the roleset is in add-pe-it mode, the roles that are in other projects need to be taken */
          case 'add-pe-it':
            iRoleState.roleStatesInOtherProjects = roleStates;
            break;

          /** if the roleset is in create-pe-it mode, add the states to roleStatesInProject, since they will be in Project later */
          case 'create-pe-it':
            iRoleState.roleStatesInProject = roleStates;
            break;

          // default:

          //   iRoleState.roleStatesInProject = roleStates;
          //   break;
        }

        /** Assings options to RolSet (this can come from the two functions before) */
        subject.next(Object.assign(options, iRoleState))
      }
    })

    return subject;
  }


  initializeRoleStates(roles: InfRole[], state: EditorStates, isOutgoing: boolean, parentRolePk?: number): Subject<IRoleStates> {
    const subject = new ReplaySubject<IRoleStates>();

    if (!roles || !roles.length) return new BehaviorSubject(undefined)

    /** if there are no eprs, this will be roles from Repo, not from Project */
    if (!roles[0].entity_version_project_rels && roles[0].pk_entity)
      var displayRoleForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoles(roles)

    const roleStateArray$: Observable<IRoleState>[] = [];
    roles.forEach(role => {

      /** if there is a community favorite for display for range, add it as an option  */
      var options = role.pk_entity === displayRoleForRangePk ?
        { isDisplayRoleForRange: true } : undefined;

      roleStateArray$.push(this.initializeRoleState(role, state, isOutgoing, options, parentRolePk));
    });

    Observable.combineLatest(roleStateArray$).subscribe(roleStateArr => {
      const roleStates: IRoleStates = indexBy(roleStateKey, roleStateArr)
      subject.next(roleStates);
    })

    return subject;
  }

  initializeRoleState(role: InfRole, state: EditorStates, isOutgoing: boolean, options: IRoleState = {}, parentRolePk?: number): Subject<IRoleState> {
    const subject = new ReplaySubject<IRoleState>();

    if (!role) return new BehaviorSubject(undefined)

    let roleState = new RoleState({
      role,
      state: state,
      isOutgoing: isOutgoing,
      isCircular: false,
      ...options
    });

    if (role && role.entity_version_project_rels && role.entity_version_project_rels[0]) {
      // TODO uncomment as soon as we have the corresponding data model
      // role.entity_version_project_rels[0].is_display_role_for_domain
      roleState.isDisplayRoleForDomain = null
      roleState.isDisplayRoleForRange = role.entity_version_project_rels[0].is_standard_in_project;;
    }

    /** If role leads to TeEnt */
    if (role.temporal_entity && Object.keys(role.temporal_entity).length) {
      // add the parent role pk of the roleState to the peEnt
      const willBeParentRolePk = role.pk_entity;

      this.initializeTeEntState(role.temporal_entity, state, willBeParentRolePk).subscribe(teEntState => {
        roleState.childTeEnt = teEntState;
        subject.next(roleState);
      })

    }

    /** If role leads to Appe */
    // else if (role.appellation && Object.keys(role.appellation).length){
    else if (role.fk_property == this.configService.PROPERTY_PK_R64_USED_NAME && isOutgoing) {
      this.initializeAppeState(role.appellation, state).subscribe(appeState => {
        roleState.appeState = appeState;
        subject.next(roleState);
      })
    }

    else {

      // check if it is circular
      if (role.pk_entity === parentRolePk) {
        roleState.isCircular = true;
      }

      return new BehaviorSubject(roleState)

    }

    return subject;
  }


  initializeTeEntState(teEnt: InfTemporalEntity, state: EditorStates, parentRolePk): Subject<ITeEntState> {
    const subject = new ReplaySubject();

    if (!teEnt) return new BehaviorSubject(undefined)


    // Get DfhClass Observable
    const dfhClass$ = this.classService.getByPk(teEnt.fk_class);

    // Get RoleSetListChildren Observable (returning roleSets etc.)
    const roleSetsListChildren$ = this.initRoleSetListState(teEnt.fk_class, teEnt.te_roles, state, parentRolePk)

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
          toggle: (state === 'create' || state === 'create-pe-it' || state === 'create-pe-it-role') ? 'expanded' : 'collapsed',
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


  /** States of leaf objects  */


  initializeAppeState(appellation: InfAppellation, state: EditorStates): Subject<IAppellationState> {

    // if no appellation provided, create an emtpy appellation with an empty appellationLabel
    let appe = appellation ? new InfAppellation(appellation) : new InfAppellation();
    appe.appellation_label = (appellation && appellation.appellation_label) ? new AppellationLabel(appellation.appellation_label) : new AppellationLabel();

    const appeState = new AppellationState({
      appellation: appe,
      state
    })

    return new BehaviorSubject(appeState)
  }

}
