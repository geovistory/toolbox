import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';

import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import {
  ComConfig,
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

import { dataUnitChildKey, roleDetailKey, roleSetKey } from '../information.helpers';
import {
  AppeDetail,
  DataUnit,
  DataUnitChild,
  DataUnitChildList,
  ExistenceTimeDetail,
  LangDetail,
  PeItDetail,
  PlaceDetail,
  RoleDetail,
  RoleDetailList,
  RoleSet,
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
          _children: {
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
                    _children: {
                      _role_set_1: new RoleSet({
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
                      })
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

      this.initDataUnitChildList(peIt.fk_class, peIt.pi_roles, settings).subscribe(dataUnitChildList => {

        if (!settings.isAddMode)
          delete peIt.pi_roles; // those only pollute the state unless we are in add mode.

        const peItDetail: PeItDetail = {
          _children: dataUnitChildList,
          pkEntity: pkEntity,
          fkClass: peIt.fk_class,
          peIt,
          selectPropState: 'init',
          // label: StateToDataService.getDisplayAppeLabelOfPeItRoleSets(_children)
        }

        subject.next(peItDetail);

      });

    });

    return subject;
  }


  /**
* Initialize RoleSetList
* 
* @param {number} fkClass fk_class of PeIt
* @param {InfRole[]} roles array of roles a PeIt
* @param {InfStateSettings} settings settings to create the state
* 
* @return {DataUnit} Object of RoleSet, the model of the Gui-Element for RoleSets
*/
  initDataUnitChildList(fkClass: number, roles: InfRole[], settings: StateSettings = {}): Subject<DataUnitChildList> {

    const subject = new ReplaySubject<DataUnitChildList>()

    // declare array that will be returned
    const children$: Observable<DataUnitChild>[] = [];


    // Get DfhClass Observable
    const classConfig = this.ngRedux.getState().activeProject.crm[fkClass];

    if (settings.isCreateMode) {
      const uiContext = classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_CREATE];

      // add a roleSet for each roleSet in this ui-context
      uiContext.uiElements.forEach(el => {

        // if this is a element for a RoleSet
        if (el.roleSetKey) {
          // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
          const options = new RoleSet({ toggle: 'expanded' })
          const emptyRole = new InfRole();
          const roleSetDef = classConfig.roleSets[el.roleSetKey];
          const roleSet$ = this.initializeRoleSet([emptyRole], Object.assign(roleSetDef, options), settings);
          children$.push(roleSet$);
        }

        // if this ui-element is a Existence-Time PropSet
        else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {
          const options = new ExistenceTimeDetail({ toggle: 'expanded' });
          children$.push(this.initializeExistenceTimeState([], options));
        }
      });
    }
    else if (!roles || !roles.length) return new BehaviorSubject(undefined)
    else {

      const uiContext = classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];

      const rolesByFkProp = groupBy(prop('fk_property'), roles)

      let r: InfRole[];

      // for each uiElement in this ui-context
      uiContext.uiElements.forEach(el => {

        // if this is a element for a RoleSet
        if (el.roleSetKey) {
          // enrich RoleSet with roles and child RoleDetails

          // take existing roles of this property  
          r = rolesByFkProp[el.fk_property];

          // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
          const options = new RoleSet({ toggle: 'collapsed' })
          const roleSetDef = classConfig.roleSets[el.roleSetKey];
          if (r && r.length > 0) {
            const roleSet$ = this.initializeRoleSet(r, Object.assign(roleSetDef, options), settings);
            children$.push(roleSet$);
          }
        }

        // if this ui-element is a Existence-Time PropSet
        else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {
          const options = new ExistenceTimeDetail({ toggle: 'collapsed' });
          const extime = this.initializeExistenceTimeState(roles, options, settings);
          children$.push(extime);
        }

      });

    }

    if (!children$.length) return new BehaviorSubject(undefined)

    Observable.combineLatest(children$).subscribe((children: DataUnitChild[]) => {
      subject.next(indexBy(dataUnitChildKey, children.filter(c=>(c))));
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
          _role_list,
          ...options,
          targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain,
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

    // Get children
    this.initDataUnitChildList(teEnt.fk_class, teEnt.te_roles, settings).subscribe(_children => {


      if (!settings.isAddMode)
        delete teEnt.te_roles; // those only pollute the state. retrieve them from roleSets

      const teEntState: TeEntDetail = {
        selectPropState: 'init',
        toggle: 'collapsed',
        teEnt: teEnt,
        fkClass: teEnt.fk_class,
        _children
        // label: StateToDataService.getDisplayAppeLabelOfTeEntRoleSets(_children)
      }

      subject.next(teEntState);

    })

    return subject;
  }


  initializeExistenceTimeState(roles: InfRole[], options: ExistenceTimeDetail = new ExistenceTimeDetail(), settings: StateSettings = {}): Subject<ExistenceTimeDetail> {
    const subject = new ReplaySubject<ExistenceTimeDetail>();

    const rolesByFkProp = groupBy(prop('fk_property'), roles);
    const rsts = this.ngRedux.getState().activeProject.crm[DfhConfig.ClASS_PK_TIME_SPAN].roleSets;

    let children$: Observable<RoleSet>[] = []
    const ext = new ExistenceTimeDetail({
      roles: [],
      toggle: options.toggle ? options.toggle : 'collapsed'
    })

    if (settings.isCreateMode) return new BehaviorSubject(ext);

    U.obj2Arr(rsts).forEach((rs: RoleSet) => {
      const roles = rolesByFkProp[rs.property.dfh_pk_property];
      if (roles) {
        ext.roles = [...ext.roles, ...roles]
        children$.push(this.initializeRoleSet(roles, rs));
      }
    })

    if (!children$.length) return new BehaviorSubject(null);
    else
      Observable.combineLatest(children$).subscribe(children => {

        ext._children = indexBy(roleSetKey, children)

        subject.next(ext);
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
