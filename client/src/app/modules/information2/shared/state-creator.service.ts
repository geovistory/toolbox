import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';

import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import {
  DfhClass,
  DfhProperty,
  IAppState,
  InfAppellation,
  InfLanguage,
  InfPersistentItem,
  InfPlace,
  InfRole,
  InfTemporalEntity,
  InfTimePrimitive,
  U,
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
  PlaceDetail,
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
import { RoleSetService } from './role-set.service';
import { StateToDataService } from './state-to-data.service';


export interface StateSettings {
  parentRolePk?: number;
  isCreateMode?: boolean;
  isAddMode?: boolean;
}


@Injectable()
export class StateCreatorService {

  constructor(
    private classService: ClassService,
    private peItService: PeItService,
    private ngRedux: NgRedux<IAppState>
  ) { }



  initializePeItToCreate(fkClass, labelString?: string): ReplaySubject<PeItDetail> {
    const subject = new ReplaySubject(null);


    Observable.combineLatest(
      // Get DfhClass Observable
      this.classService.getByPk(fkClass),
      // get the property leading to appellaion first
      this.classService.getIngoingAppellationProperty(fkClass)

    ).subscribe(res => {

      const dfhClass = res[0], propertyToAppe = res[1];

      if (dfhClass && propertyToAppe) {

        const state = {
          peIt: {
            fk_class: fkClass
          } as InfPersistentItem,
          dfhClass: dfhClass,
          ingoingRoleSets: [],
          outgoingRoleSets: [],
          _roleSet_list: {
            _role_set_1: {
              label: {
                default: 'Names',
                sg: 'Name',
                pl: 'Names'
              },
              property: propertyToAppe,
              _role_list: {
                _role_detail_1: {
                  role: {
                    fk_property: propertyToAppe.dfh_pk_property,
                    entity_version_project_rels: [{
                      is_standard_in_project: true
                    }]
                  } as InfRole,
                  _teEnt: {
                    dfhClass: {
                      dfh_pk_class: DfhConfig.CLASS_PK_APPELLATION_USE,
                      dfh_standard_label: "Name",
                    } as DfhClass,
                    _roleSet_list: {
                      _role_set_1: {
                        label: {
                          default: 'Detailed Name',
                          sg: 'Detailed Name',
                          pl: 'Detailed Names'
                        },
                        property: {
                          "dfh_pk_property": 2,
                          "dfh_identifier_in_namespace": "R64",
                          "dfh_has_domain": 3,
                          "dfh_has_range": 2,
                          "dfh_standard_label": "Used Name",
                          "dfh_domain_instances_min_quantifier": 0,
                          "dfh_domain_instances_max_quantifier": -1,
                          "dfh_range_instances_min_quantifier": 1,
                          "dfh_range_instances_max_quantifier": 1,
                        } as DfhProperty,
                        _role_list: {
                          _role_1: {
                            role: {
                              fk_property: DfhConfig.PROPERTY_PK_R64_USED_NAME,
                              appellation: {
                                fk_class: DfhConfig.CLASS_PK_APPELLATION
                              }
                            } as InfRole,
                            _appe: {
                            }
                          } as RoleDetail
                        },
                      } as RoleSet
                    }
                  }
                }
              }
            }
          }
        }

        subject.next(state)
      }

    })


    return subject;
  }


  initializePeItState(pkEntity: number, pkProject: number, settings: StateSettings = {}): ReplaySubject<PeItDetail> {
    const subject = new ReplaySubject(null)


    // Get peIt from DB
    this.peItService.getNestedObject(pkEntity, pkProject).subscribe((peIt: InfPersistentItem) => {

      // Get DfhClass Observable
      const dfhClass$ = this.classService.getByPk(peIt.fk_class);

      // Get RoleSetListChildren Observable (returning roleSets etc.)
      const roleSetsListChildren$ = this.initRoleSetListState(peIt.fk_class, peIt.pi_roles, settings)
      Observable.combineLatest(dfhClass$, roleSetsListChildren$).subscribe(result => {
        if (result[0] && result[1]) {
          const dfhClass = result[0];
          const _roleSet_list = result[1].childRoleSets;
          const ingoingRoleSets = result[1].ingoingRoleSets;
          const outgoingRoleSets = result[1].outgoingRoleSets;

          if (!settings.isAddMode)
            delete peIt.pi_roles; // those only pollute the state unless we are in add mode.

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
      const ingoingRoleSets = U.infProperties2RoleSets(false, ingoingProperties)
      const outgoingRoleSets = U.infProperties2RoleSets(true, outgoingProperties)

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

    /** If role leads to Place (in the sense of geo coordinates!) */
    // else if (role.place && Object.keys(role.place).length){
    else if (role.fk_property == DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE && options.isOutgoing) {

      // when targetDfhClass is provided we are in create state and we need the fk_class
      if (options.targetDfhClass) roleDetail.role.place = {
        ...role.place,
        fk_class: options.targetDfhClass.dfh_pk_class
      }

      this.initializePlaceState(role.place).subscribe(placeDetail => {
        roleDetail._place = placeDetail;
        subject.next(roleDetail);
      })
    }


    /** If role leads to TimePrimitive */
    else if (DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.indexOf(role.fk_property) > -1 && options.isOutgoing === true) {

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
        const _existenceTime = result[2];

        if (!settings.isAddMode)
          delete teEnt.te_roles; // those only pollute the state. retrieve them from roleSets


        const teEntState: TeEntDetail = {
          selectPropState: 'init',
          toggle: 'collapsed',
          teEnt: teEnt,
          fkClass: teEnt.fk_class,
          dfhClass,
          _roleSet_list,
          _existenceTime, // todo: according to "settings" add the values to 
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

      // Generate RoleSets (from the perspective of the TemporalEntity, those are outgoing)
      const outgoingRoleSets = U.infProperties2RoleSets(true, ingoingProperties)

      // Generate roleSets 
      const roleSetOptions: RoleSet = {
        toggle: 'expanded'
      }

      const childRoleSets$ = this.initializeChildRoleSets(roles, [], outgoingRoleSets, roleSetOptions)

      childRoleSets$.subscribe(_roleSet_list => {
        subject.next({
          roles,
          toggle: options.toggle ? options.toggle : 'collapsed',
          _roleSet_list,
          outgoingRoleSets
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


  initializePlaceState(place: InfPlace): Subject<PlaceDetail> {
    const placeDetail: PlaceDetail = {}

    return new BehaviorSubject(placeDetail)
  }

  initializeLeafPeItState(dfhClass: DfhClass): Subject<PeItDetail> {
    const peItDetail: PeItDetail = {
      dfhClass
    }
    return new BehaviorSubject(peItDetail)
  }

}
