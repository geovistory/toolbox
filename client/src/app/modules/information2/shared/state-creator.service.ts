import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';

import { Injectable } from '@angular/core';
import {
  DfhClass,
  InfAppellation,
  InfEntityProjectRel,
  InfLanguage,
  InfPersistentItem,
  InfRole,
  InfTemporalEntity,
  InfTimePrimitive,
} from 'app/core';
import { groupBy, indexBy, prop } from 'ramda';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';

import { roleDetailKey, roleSetKey } from '../information.helpers';
import {
  AppeDetail,
  ExistenceTimeDetail,
  LangDetail,
  PeItDetail,
  RoleDetail,
  RoleDetailList,
  RoleSet,
  RoleSetList,
  TeEntDetail,
  TimePrimitveDetail,
} from '../information.models';
import { AppellationLabel } from './appellation-label/appellation-label';
import { ClassService } from './class.service';
import { DfhConfig } from './dfh-config';
import { PeItService } from './pe-it.service';
import { PropertyService } from './property.service';
import { RoleSetService } from './role-set.service';
import { StateToDataService } from './state-to-data.service';
import { BROWSER_NOOP_ANIMATIONS_PROVIDERS } from '@angular/platform-browser/animations/src/providers';


export interface StateSettings {
  parentRolePk?: number;
  isCreateMode?: boolean;
}


@Injectable()
export class StateCreatorService {

  constructor(
    private classService: ClassService,
    private propertyService: PropertyService,
    private peItService: PeItService,
  ) { }



  initializePeItToCreate(fkClass, labelString?: string): ReplaySubject<PeItDetail> {
    const subject = new ReplaySubject(null);

    const state = 'create-pe-it'

    let peIt = new InfPersistentItem();
    let roleToAppeUse = new InfRole();
    roleToAppeUse.entity_version_project_rels = [new InfEntityProjectRel()];
    roleToAppeUse.entity_version_project_rels[0].is_standard_in_project = true; // TODO: change for is_display_role_for_range
    let appeUse = new InfTemporalEntity;
    let roleToAppellation = new InfRole;
    roleToAppellation.entity_version_project_rels = [new InfEntityProjectRel()];
    roleToAppellation.entity_version_project_rels[0].is_standard_in_project = true; // TODO: change for is_display_role_for_domain
    let appellation = new InfAppellation;
    if (labelString) appellation.appellation_label = new AppellationLabel(null, labelString)

    roleToAppeUse.fk_property = DfhConfig.PROPERTY_PK_R63_NAMES;
    appeUse.fk_class = DfhConfig.CLASS_PK_APPELLATION_USE;
    roleToAppellation.fk_property = DfhConfig.PROPERTY_PK_R64_USED_NAME;
    appellation.fk_class = DfhConfig.CLASS_PK_APPELLATION;

    peIt.fk_class = fkClass;
    peIt.pi_roles = [roleToAppeUse];
    roleToAppeUse.temporal_entity = appeUse;
    appeUse.te_roles = [roleToAppellation];
    roleToAppellation.appellation = appellation;


    // Get DfhClass Observable
    const dfhClass$ = this.classService.getByPk(fkClass);

    // Get RoleSetListChildren Observable (returning roleSets etc.)
    const roleSetsListChildren$ = this.initRoleSetListState(fkClass, peIt.pi_roles)

    Observable.combineLatest(dfhClass$, roleSetsListChildren$).subscribe(result => {
      if (result[0] && result[1]) {
        const dfhClass = result[0];
        const _roleSet_list = result[1].childRoleSets;
        const ingoingRoleSets = result[1].ingoingRoleSets;
        const outgoingRoleSets = result[1].outgoingRoleSets;

        const peItDetail: PeItDetail = {
          selectPropState: 'init',
          peIt,
          fkClass,
          dfhClass,
          _roleSet_list,
          ingoingRoleSets,
          outgoingRoleSets
        }

        subject.next(peItDetail);

      }
    })

    return subject;
  }


  initializePeItState(pkEntity: number, pkProject: number): ReplaySubject<PeItDetail> {
    const subject = new ReplaySubject(null)


    // Get peIt from DB
    this.peItService.getNestedObject(pkEntity, pkProject).subscribe((peIt: InfPersistentItem) => {

      // Get DfhClass Observable
      const dfhClass$ = this.classService.getByPk(peIt.fk_class);

      // Get RoleSetListChildren Observable (returning roleSets etc.)
      const roleSetsListChildren$ = this.initRoleSetListState(peIt.fk_class, peIt.pi_roles)
      Observable.combineLatest(dfhClass$, roleSetsListChildren$).subscribe(result => {
        if (result[0] && result[1]) {
          const dfhClass = result[0];
          const _roleSet_list = result[1].childRoleSets;
          const ingoingRoleSets = result[1].ingoingRoleSets;
          const outgoingRoleSets = result[1].outgoingRoleSets;

          delete peIt.pi_roles; // those only pollute the state. retrieve them from roleSets

          const peItDetail: PeItDetail = {
            pkEntity: pkEntity,
            selectPropState: 'init',
            fkClass: peIt.fk_class,
            peIt,
            dfhClass,
            _roleSet_list,
            ingoingRoleSets,
            outgoingRoleSets,
            label: StateToDataService.getDisplayAppeLabelOfPeItRoleSets(_roleSet_list)
          }

          subject.next(peItDetail);

        }
      })
    });

    return subject;
  }



  initRoleSetListState(fkClass, roles, settings: StateSettings = {}): ReplaySubject<{ childRoleSets: RoleSetList, ingoingRoleSets: RoleSet[], outgoingRoleSets: RoleSet[] }> {
    const subject = new ReplaySubject<{ childRoleSets: RoleSetList, ingoingRoleSets: RoleSet[], outgoingRoleSets: RoleSet[] }>()

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
      const options: RoleSet = {
        toggle: settings.isCreateMode ? 'expanded' : 'collapsed'
      }
      const childRoleSets$ = this.initializeChildRoleSets(roles, ingoingRoleSets, outgoingRoleSets, options, settings)

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
  * @param {RoleSet[]} ingoingRoleSets array of ingoing properties (depending on context)
  * @param {RoleSet[]} outgoingRoleSets array of outgoing properties (depending on context)
  * @param {RoleSet} options any other option that should be apllied to all of the roleSets
  * @return {RoleSetList} Object of RoleSet, the model of the Gui-Element for RoleSets
  */
  private initializeChildRoleSets(roles: InfRole[], ingoingRoleSets: RoleSet[], outgoingRoleSets: RoleSet[], options: RoleSet = {}, settings: StateSettings = {}): Subject<RoleSetList> {
    const subject = new ReplaySubject<RoleSetList>();

    const givenRoleSets = [...ingoingRoleSets, ...outgoingRoleSets];

    // declare array that will be returned
    const roleSets$: Observable<RoleSet>[] = [];

    // if (settings.isCreateMode) {
    //   // add a roleSet for each givenRoleSet 
    //   givenRoleSets.forEach(rs => {
    //     const emptyRole = new InfRole()
    //     const roleSet$ = this.initializeRoleSet([emptyRole], Object.assign(rs, options), settings);
    //     roleSets$.push(roleSet$);
    //   });
    // }
    // else 
    if (!roles || !roles.length) return new BehaviorSubject(undefined)
    else {
      const rolesByFkProp = groupBy(prop('fk_property'), roles)

      // enrich role sets with roles and child RoleDetails
      givenRoleSets.forEach(rs => {

        let r: InfRole[];

        // take existing roles of this property  
        r = rolesByFkProp[rs.property.dfh_pk_property];

        if (
          // if this is in createMode  
          settings.isCreateMode &&
          // and if it is nor yet set (prevents from overwriting the circular role)
          !r &&
          // and if the min quantifier is 1
          (
            (rs.isOutgoing === true && rs.property.dfh_range_instances_min_quantifier == 1) ||
            (rs.isOutgoing === false && rs.property.dfh_domain_instances_min_quantifier == 1)
          )
        ) {
          r = [{
            fk_property: rs.property.dfh_pk_property
          } as InfRole]
        }

        if (r && r.length > 0) {
          const roleSet$ = this.initializeRoleSet(r, Object.assign({}, rs, options), settings);
          roleSets$.push(roleSet$);
        }
      })
    }

    if (!roleSets$.length) return new BehaviorSubject(undefined)

    Observable.combineLatest(roleSets$).subscribe(roleSets => {
      subject.next(indexBy(roleSetKey, roleSets))
    })


    return subject;
  }



  initializeRoleSet(roles: InfRole[], options: RoleSet, settings: StateSettings = {}): Subject<RoleSet> {
    const subject: Subject<RoleSet> = new ReplaySubject();

    if (!roles || !roles.length) return new BehaviorSubject(undefined)

    const roleDetailTemplate: RoleDetail = {
      isOutgoing: options.isOutgoing,
      targetDfhClass: options.targetClass
    }
    
    this.initializeRoleDetails(roles, roleDetailTemplate, settings).subscribe((_role_list: RoleDetailList) => {
      if (_role_list) {
        /** Creates the RoleSet */
        let roleSet: RoleSet = {
          ...options,
          targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain,
          _role_list
        }

        /** Assings options to RolSet (this can come from the two functions before) */
        subject.next(Object.assign(options, roleSet))
      }
    })

    return subject;
  }


  initializeRoleDetails(roles: InfRole[], options: RoleDetail = {}, settings: StateSettings = {}): Subject<RoleDetailList> {
    const subject = new ReplaySubject<RoleDetailList>();

    if (!roles || !roles.length) return new BehaviorSubject(undefined)

    /** if there are no eprs, this will be roles from Repo, not from Project */
    if (!roles[0].entity_version_project_rels && roles[0].pk_entity)
      var displayRoleForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoles(roles)

    const roleDetailArray$: Observable<RoleDetail>[] = [];
    roles.forEach(role => {

      /** if there is a community favorite for display for range, add it as an option  */
      if (role.pk_entity === displayRoleForRangePk) options.isDisplayRoleForRange = true;

      // /** exclude the circular role */
      if (role.pk_entity === settings.parentRolePk) {
      }
      // else {
      roleDetailArray$.push(this.initializeRoleDetail(role, options, settings));
      // }
    });

    Observable.combineLatest(roleDetailArray$).subscribe(roleDetailArr => {
      const roleDetails: RoleDetailList = indexBy(roleDetailKey, roleDetailArr)
      subject.next(roleDetails);
    })

    return subject;
  }

  initializeRoleDetail(role: InfRole, options: RoleDetail = {}, settings: StateSettings = {}): Subject<RoleDetail> {
    const subject = new ReplaySubject<RoleDetail>();

    if (!role) return new BehaviorSubject(undefined)


    let roleDetail: RoleDetail = {
      role: new InfRole(role),
      isCircular: false,
      ...options
    };

    if (role && role.entity_version_project_rels && role.entity_version_project_rels[0]) {
      // TODO uncomment as soon as we have the corresponding data model
      // role.entity_version_project_rels[0].is_display_role_for_domain
      roleDetail.isDisplayRoleForDomain = null
      roleDetail.isDisplayRoleForRange = role.entity_version_project_rels[0].is_standard_in_project;;
    }

    /** If role leads to TeEnt */
    if (role.temporal_entity && Object.keys(role.temporal_entity).length) {
      // add the parent role pk of the roleDetail to the peEnt
      settings.parentRolePk = role.pk_entity;

      this.initializeTeEntState(role.temporal_entity, settings).subscribe(teEntState => {
        roleDetail._teEnt = {
          ...teEntState,
          ...roleDetail._teEnt
        };
        subject.next(roleDetail);
      })

    }

    /** If role leads to Appe */
    // else if (role.appellation && Object.keys(role.appellation).length){
    else if (role.fk_property == DfhConfig.PROPERTY_PK_R64_USED_NAME && options.isOutgoing) {

      // when targetDfhClass is provided we are in create state and we need the fk_class
      if (options.targetDfhClass) roleDetail.role.appellation = {
        ...role.appellation,
        fk_class: options.targetDfhClass.dfh_pk_class
      }

      this.initializeAppeState(role.appellation).subscribe(appeState => {
        roleDetail._appe = appeState;
        subject.next(roleDetail);
      })
    }

    /** If role leads to Language */
    // else if (role.language && Object.keys(role.language).length){
    else if (role.fk_property == DfhConfig.PROPERTY_PK_R61_USED_LANGUAGE && options.isOutgoing) {

      // when targetDfhClass is provided we are in create state and we need the fk_class
      if (options.targetDfhClass) roleDetail.role.language = {
        ...role.language,
        fk_class: options.targetDfhClass.dfh_pk_class
      }

      this.initializeLangState(role.language).subscribe(langState => {
        roleDetail._lang = langState;
        subject.next(roleDetail);
      })
    }

    /** If role leads to TimePrimitive */
    else if (DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.indexOf(role.fk_property) > -1 && options.isOutgoing === false) {

      // when targetDfhClass is provided we are in create state and we need the fk_class
      if (options.targetDfhClass) roleDetail.role.time_primitive = {
        ...role.time_primitive,
        fk_class: options.targetDfhClass.dfh_pk_class
      }

      this.initializeTimePrimitiveState(role.time_primitive).subscribe(timePrimitiveState => {
        roleDetail._timePrimitive = timePrimitiveState;
        subject.next(roleDetail);
      })
    }


    else {

      // check if it is circular
      if (
        // if not creat mode and the pk's of both roles are the same
        (!settings.isCreateMode && role.pk_entity === settings.parentRolePk) ||
        // or if we are in create mode and the initialized role has a fk_entity 
        // (means this is the circular role added upon start creating a new information) 
        (settings.isCreateMode && role.fk_entity)
      ) {
        roleDetail.isCircular = true;
      }

      this.initializeLeafPeItState(options.targetDfhClass).subscribe(peItDetail => {
        roleDetail._leaf_peIt = peItDetail;
        subject.next(roleDetail)
      })

    }

    return subject;
  }


  initializeTeEntState(teEnt: InfTemporalEntity, settings: StateSettings = {}): Subject<TeEntDetail> {
    const subject = new ReplaySubject();

    if (!teEnt) return new BehaviorSubject(undefined)


    // Get DfhClass Observable
    const dfhClass$ = this.classService.getByPk(teEnt.fk_class);

    // Get RoleSetListChildren Observable (returning roleSets etc.)
    const roleSetsListChildren$ = this.initRoleSetListState(teEnt.fk_class, teEnt.te_roles, settings)

    // Get ExistenceTimeState Observable
    const existenceTimeState$ = this.initializeExistenceTimeState(teEnt.te_roles);

    Observable.combineLatest(dfhClass$, roleSetsListChildren$,
      existenceTimeState$
    ).subscribe(result => {
      if (result[0] && result[1]
        && result[2]
      ) {
        const dfhClass = result[0];
        const _roleSet_list = result[1].childRoleSets;
        const ingoingRoleSets = result[1].ingoingRoleSets;
        const outgoingRoleSets = result[1].outgoingRoleSets;
        const existenceTimeState = result[2];


        delete teEnt.te_roles; // those only pollute the state. retrieve them from roleSets

        const teEntState: TeEntDetail = {
          selectPropState: 'init',
          toggle: 'collapsed',
          teEnt: teEnt,
          fkClass: teEnt.fk_class,
          dfhClass,
          _roleSet_list,
          // existenceTimeState,
          ingoingRoleSets,
          outgoingRoleSets,
          label: StateToDataService.getDisplayAppeLabelOfTeEntRoleSets(_roleSet_list)
        }

        subject.next(teEntState);
      }
    })

    return subject;
  }


  initializeExistenceTimeState(roles: InfRole[], options: ExistenceTimeDetail = {}): Subject<ExistenceTimeDetail> {
    const subject = new ReplaySubject();

    // get all InfProperties leading to a timePrimitive
    this.classService.getIngoingProperties(DfhConfig.CLASS_PK_TIME_PRIMITIVE).subscribe(ingoingProperties => {

      // Generate RoleSets
      const ingoingRoleSets = this.propertyService.toRoleSets(false, ingoingProperties)

      // Generate roleSets 
      const roleSetOptions: RoleSet = {
        toggle: 'expanded'
      }

      const childRoleSets$ = this.initializeChildRoleSets(roles, ingoingRoleSets, [], roleSetOptions)

      childRoleSets$.subscribe(roleSets => {
        subject.next({
          roles,
          toggle: options.toggle ? options.toggle : 'collapsed',
          roleSets,
          ingoingRoleSets
        } as ExistenceTimeDetail);
      })

    })

    return subject;
  }





  /** 
   * Initializers for States of Leaf objects  
   * */

  initializeAppeState(appellation: InfAppellation): Subject<AppeDetail> {

    // if no appellation provided, create an emtpy appellation with an empty appellationLabel
    let appe = appellation ? new InfAppellation(appellation) : new InfAppellation();
    appe.appellation_label = (appellation && appellation.appellation_label) ? new AppellationLabel(appellation.appellation_label) : new AppellationLabel();

    const appeState: AppeDetail = {
      appellation: appe
    }

    return new BehaviorSubject(appeState)
  }


  initializeLangState(language: InfLanguage): Subject<LangDetail> {

    const langState: LangDetail = {
      language
    }

    return new BehaviorSubject(langState)
  }


  initializeTimePrimitiveState(timePrimitive: InfTimePrimitive): Subject<TimePrimitveDetail> {
    const timePrimitiveState: TimePrimitveDetail = {
      timePrimitive,
    }

    return new BehaviorSubject(timePrimitiveState)
  }

  initializeLeafPeItState(dfhClass: DfhClass): Subject<PeItDetail> {
    const peItDetail: PeItDetail = {
      dfhClass
    }
    return new BehaviorSubject(peItDetail)
  }

}
