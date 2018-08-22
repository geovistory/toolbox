import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ComConfig, IAppState, InfAppellation, InfEntityProjectRel, InfLanguage, InfPersistentItem, InfPlace, InfRole, InfTemporalEntity, InfTimePrimitive, U } from 'app/core';
import { clone, groupBy, indexBy, prop } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { dataUnitChildKey, roleDetailKey, similarRoleSet, sortRoleDetailsByOrdNum } from '../information.helpers';
import { AppeDetail, DataUnit, DataUnitChild, DataUnitChildList, ExistenceTimeDetail, LangDetail, PeItDetail, PlaceDetail, RoleDetail, RoleDetailList, RoleSet, RoleSetInterface, TeEntDetail, TimePrimitveDetail } from '../information.models';
import { AppellationLabel } from './appellation-label/appellation-label';
import { ClassService } from './class.service';
import { DfhConfig } from './dfh-config';
import { PeItService } from './pe-it.service';
import { RoleSetService } from './role-set.service';



export interface StateSettings {
  parentRolePk?: number;
  parentRoleSet?: RoleSetInterface;
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



    this.initDataUnitChildList(fkClass, [], { isCreateMode: true }).subscribe(dataUnitChildList => {
      const peItDetail: PeItDetail = {
        _children: dataUnitChildList,
        fkClass: fkClass,
        peIt: {
          fk_class: fkClass
        } as InfPersistentItem,
        selectPropState: 'init',
        // label: U.labelFromDataUnitChildList(dataUnitChildList)
      }

      subject.next(peItDetail);
    })

    return subject;
  }


  initializePeItState(pkEntity: number, pkProject: number, settings: StateSettings = {}): ReplaySubject<PeItDetail> {
    const subject = new ReplaySubject(null)


    // Get peIt from DB
    this.peItService.getNestedObject(pkEntity, pkProject).subscribe((peIt: InfPersistentItem) => {

      this.initDataUnitChildList(peIt.fk_class, peIt.pi_roles, settings).subscribe(dataUnitChildList => {

        // those only pollute the state unless we are in add mode.
        if (!settings.isAddMode) delete peIt.pi_roles;

        const peItDetail: PeItDetail = {
          _children: dataUnitChildList,
          pkEntity: pkEntity,
          fkClass: peIt.fk_class,
          peIt,
          selectPropState: 'init',
          // label: U.labelFromDataUnitChildList(dataUnitChildList)
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

    // /** exclude the circular role */
    if (roles) {
      const i = roles.findIndex(role => (role.pk_entity === settings.parentRolePk));
      if (i > -1) {
        roles.splice(i, 1)
      };
    }

    const crm = this.ngRedux.getState().activeProject.crm;

    // Get DfhClass Observable
    const classConfig = crm.classes[fkClass];


    if (settings.isCreateMode) {
      const uiContext = classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_CREATE];

      // add a roleSet for each roleSet in this ui-context
      if (uiContext && uiContext.uiElements) {
        uiContext.uiElements.forEach(el => {

          // if this is a element for a RoleSet
          if (
            el.roleSetKey
          ) {
            const roleSetDef = classConfig.roleSets[el.roleSetKey];

            // exclude the circular RoleSets
            if (!similarRoleSet(roleSetDef, settings.parentRoleSet)) {

              // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
              const options = new RoleSet({ toggle: 'expanded' })
              const newRole = {
                fk_property: el.fk_property,
                entity_version_project_rels: [{
                  is_in_project: true
                }]
              } as InfRole;

              const roleSet$ = this.initializeRoleSet([newRole], Object.assign({}, roleSetDef, options), settings);
              children$.push(roleSet$);
            }
          } else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

            // if this ui-element is a Existence-Time PropSet
            const options = new ExistenceTimeDetail({ toggle: 'expanded' });
            children$.push(this.initializeExistenceTimeState([], options, settings));
          }
        });
      }
    } else if (!roles || !roles.length) return new BehaviorSubject(undefined)
    else {

      const uiContext = classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];

      const rolesByFkProp = groupBy(prop('fk_property'), roles) as { [index: number]: InfRole[] }

      let r: InfRole[];

      // for each uiElement in this ui-context
      if (uiContext && uiContext.uiElements) {
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
              const roleSet$ = this.initializeRoleSet(r, Object.assign({}, roleSetDef, options), settings);
              children$.push(roleSet$);
            }
          } else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

            // if this ui-element is a Existence-Time PropSet
            const options = new ExistenceTimeDetail({ toggle: 'collapsed' });
            const extime = this.initializeExistenceTimeState(roles, options, settings);
            children$.push(extime);
          }

        });
      }

    }

    if (!children$.length) return new BehaviorSubject(undefined)

    combineLatest(children$).subscribe((children: DataUnitChild[]) => {
      subject.next(indexBy(dataUnitChildKey, children.filter(c => (c))));
    })

    return subject;
  }




  initializeRoleSet(roles: InfRole[], options: RoleSet, settings: StateSettings = {}): Subject<RoleSet> {
    const subject: Subject<RoleSet> = new ReplaySubject();

    if (!roles || !roles.length) return new BehaviorSubject(undefined)

    const roleDetailTemplate: RoleDetail = {
      isOutgoing: options.isOutgoing,
      targetClassPk: options.targetClassPk
    }
    /**
     * This is a shortcut method to take only the number of roles, defined by the max quantiy
     */
    if (settings.isAddMode && options.targetMaxQuantity > -1) {
      roles = roles.slice(0, options.targetMaxQuantity)
    }

    this.initializeRoleDetails(roles, roleDetailTemplate, settings).subscribe((_role_list: RoleDetailList) => {


      if (_role_list) {
        /** Creates the RoleSet */
        const roleSet: RoleSet = {
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
    let displayRoleForRangePk;

    if (!roles || !roles.length) return new BehaviorSubject(undefined)

    /** if there are no eprs, this will be roles from Repo, not from Project */
    if (!roles[0].entity_version_project_rels && roles[0].pk_entity) {
      displayRoleForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoles(roles)
    }
    const roleDetailArray$: Observable<RoleDetail>[] = [];
    roles.forEach((role, i, array) => {

      /** if there is a community favorite for display for range, add it as an option  */
      if (role.pk_entity === displayRoleForRangePk) options.isDisplayRoleForRange = true;

      roleDetailArray$.push(this.initializeRoleDetail(role, options, settings));

    });

    combineLatest(roleDetailArray$).subscribe(roleDetailArr => {

      const sortedByOrdNum = sortRoleDetailsByOrdNum(roleDetailArr);

      const roleDetails: RoleDetailList = indexBy(roleDetailKey, sortedByOrdNum)
      subject.next(roleDetails);
    })

    return subject;
  }

  initializeRoleDetail(role: InfRole, options: RoleDetail = {}, settings: StateSettings = {}): Subject<RoleDetail> {
    const subject = new ReplaySubject<RoleDetail>();

    if (!role) return new BehaviorSubject(undefined)


    const roleDetail: RoleDetail = {
      role: new InfRole(role),
      isCircular: false,
      ...options
    };

    if (role && role.entity_version_project_rels && role.entity_version_project_rels[0]) {
      // TODO uncomment as soon as we have the corresponding data model
      // role.entity_version_project_rels[0].is_display_role_for_domain
      roleDetail.isDisplayRoleForDomain = null
      roleDetail.isDisplayRoleForRange = role.entity_version_project_rels[0].is_standard_in_project;
    }

    const targetClassConfig = this.ngRedux.getState().activeProject.crm.classes[options.targetClassPk];

    /** If role leads to TeEnt or Presence */
    if (
      (
        targetClassConfig && (
          targetClassConfig.dfh_fk_system_type == DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY
          || targetClassConfig.dfh_pk_class == DfhConfig.CLASS_PK_PRESENCE

        )
      )
      || role.temporal_entity && role.temporal_entity.pk_entity
    ) {
      // add the parent role pk of the roleDetail to the peEnt
      settings.parentRolePk = role.pk_entity;
      settings.parentRoleSet = this.ngRedux.getState().activeProject.crm
        .roleSets[U.roleSetKeyFromParams(role.fk_property, options.isOutgoing)];

      // if we are in create mode we need the fk_class
      if (settings.isCreateMode) {
        roleDetail.role.temporal_entity = role.temporal_entity = {
          ...role.temporal_entity,
          fk_class: options.targetClassPk
        }
      }

      this.initializeTeEntState(role.temporal_entity, settings).subscribe(teEntState => {
        roleDetail._teEnt = {
          ...teEntState,
          ...roleDetail._teEnt
        };
        subject.next(roleDetail);
      })

    } else if (
      /** If role leads to Appe */
      // else if (role.appellation && Object.keys(role.appellation).length){
      options.targetClassPk == DfhConfig.CLASS_PK_APPELLATION
      || (role.appellation && role.appellation.pk_entity)
    ) {

      // if we are in create mode we need the fk_class
      if (settings.isCreateMode) {
        roleDetail.role.appellation = {
          ...role.appellation,
          fk_class: options.targetClassPk
        }
      }

      this.initializeAppeState(role.appellation).subscribe(appeState => {
        roleDetail._appe = appeState;
        subject.next(roleDetail);
      })
    } else if (
      /** If role leads to Language */
      // else if (role.language && Object.keys(role.language).length){
      options.targetClassPk == DfhConfig.CLASS_PK_LANGUAGE
      || (role.language && role.language.pk_entity)
    ) {

      // if we are in create mode we need the fk_class
      if (settings.isCreateMode) {
        roleDetail.role.language = {
          ...role.language,
          fk_class: options.targetClassPk
        }
      }

      this.initializeLangState(role.language).subscribe(langState => {
        roleDetail._lang = langState;
        subject.next(roleDetail);
      })
    } else if (
      /** If role leads to Place (in the sense of geo coordinates!) */
      // else if (role.place && Object.keys(role.place).length){
      options.targetClassPk == DfhConfig.CLASS_PK_PLACE
      || (role.place && role.place.pk_entity)
    ) {

      // if we are in create mode we need the fk_class
      if (settings.isCreateMode) {
        roleDetail.role.place = {
          ...role.place,
          fk_class: options.targetClassPk
        }
      }

      this.initializePlaceState(role.place).subscribe(placeDetail => {
        roleDetail._place = placeDetail;
        subject.next(roleDetail);
      })
    } else if (
      /** If role leads to TimePrimitive */
      options.targetClassPk == DfhConfig.CLASS_PK_TIME_PRIMITIVE
      || (role.time_primitive && role.time_primitive.pk_entity)
    ) {

      // if we are in create mode we need the fk_class
      if (settings.isCreateMode) {
        roleDetail.role.time_primitive = {
          ...role.time_primitive,
          fk_class: options.targetClassPk
        }
      }

      this.initializeTimePrimitiveState(role.time_primitive).subscribe(timePrimitiveState => {
        roleDetail._timePrimitive = timePrimitiveState;
        subject.next(roleDetail);
      })
    } else {

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

      this.initializeLeafPeItState(options.targetClassPk).subscribe(peItDetail => {
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

      // those only pollute the state. retrieve them from roleSets
      if (!settings.isAddMode) delete teEnt.te_roles;

      const teEntState: TeEntDetail = {
        selectPropState: 'init',
        toggle: 'collapsed',
        teEnt: teEnt,
        fkClass: teEnt.fk_class,
        _children,
        // label: U.labelFromDataUnitChildList(_children)
        // label: StateToDataService.getDisplayAppeLabelOfTeEntRoleSets(_children)
      }

      subject.next(teEntState);

    })

    return subject;
  }


  initializeExistenceTimeState(
    roles: InfRole[],
    options: ExistenceTimeDetail = new ExistenceTimeDetail(),
    settings: StateSettings = {}
  ): Subject<ExistenceTimeDetail> {

    const subject = new ReplaySubject<ExistenceTimeDetail>();
    const rolesByFkProp = groupBy(prop('fk_property'), roles) as { [index: number]: InfRole[] };
    const rsts = clone(this.ngRedux.getState().activeProject.crm.classes[DfhConfig.ClASS_PK_TIME_SPAN].roleSets);
    const children$: Observable<RoleSet>[] = []
    const ext = new ExistenceTimeDetail({
      roles: [],
      toggle: options.toggle ? options.toggle : 'collapsed'
    })


    if (settings.isCreateMode) return new BehaviorSubject(ext);

    U.obj2Arr(rsts).forEach((rs: RoleSet) => {


      if (rolesByFkProp[rs.property.dfh_pk_property]) {

        /**
         * This is a shortcut method to take max one role per RoleSet
         */
        const role = rolesByFkProp[rs.property.dfh_pk_property][0]

        if (settings.isAddMode) {
          role.entity_version_project_rels = [{
            is_in_project: true
          } as InfEntityProjectRel]
        }

        ext.roles = [...ext.roles, role]
        children$.push(this.initializeRoleSet([role], new RoleSet(rs)));
      }

    })

    if (!children$.length) return new BehaviorSubject(null);
    else {
      combineLatest(children$).subscribe(children => {

        ext._children = indexBy(U.roleSetKey, children)

        subject.next(ext);
      })
    }
    return subject;
  }





  /**
   * Initializers for States of Leaf objects
   * */

  initializeAppeState(appellation: InfAppellation): Subject<AppeDetail> {

    // if no appellation provided, create an emtpy appellation with an empty appellationLabel
    const appe = appellation ? new InfAppellation(appellation) : new InfAppellation();
    appe.appellation_label = (appellation && appellation.appellation_label) ?
      new AppellationLabel(appellation.appellation_label) : new AppellationLabel();

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

  initializeLeafPeItState(fkClass: number): Subject<PeItDetail> {

    const peItDetail: PeItDetail = {
      fkClass
    }
    return new BehaviorSubject(peItDetail)
  }

}
