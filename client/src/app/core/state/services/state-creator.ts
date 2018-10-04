import { InfRole, InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfTimePrimitive, InfTemporalEntity, InfEntityProjectRel, DfhLabel } from 'app/core/sdk';
import { ProjectCrm } from 'app/core/active-project';
import { DataUnitChildList, RoleSetI, AppeDetail, DataUnitChild, ExistenceTimeDetail, LangDetail, PeItDetail, PlaceDetail, RoleDetail, RoleSet, TeEntDetail, TimePrimitveDetail } from '../models';
import { clone, groupBy, prop, indexBy, sort, omit } from 'ramda';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { ComConfig } from 'app/core/config/com-config';
import { U } from 'app/core/util/util';

/***************************************************
* General Interfaces
***************************************************/
export interface StateSettings {
    parentRolePk?: number;
    parentRoleSet?: RoleSetI;
    isCreateMode?: boolean;
    isAddMode?: boolean;
}


/***************************************************
* Data Unit create functions
***************************************************/


/**
 * Creates a DataUnitChildList from provided input data
 *
 * @param fkClass
 * @param roles
 * @param crm
 * @param settings
 */
export function createDataUnitChildren(fkClass: number, roles: InfRole[], crm: ProjectCrm, settings: StateSettings = {}): DataUnitChildList {

    const children = [];

    // /** exclude the circular role */
    if (roles) {
        const i = roles.findIndex(role => (role.pk_entity === settings.parentRolePk));
        if (i > -1) {
            roles.splice(i, 1)
        };
    }

    // Get class config
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

                        const roleSet = createRoleSet(Object.assign({}, roleSetDef, options), [newRole], crm, settings);
                        children.push(roleSet);
                    }
                } else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

                    // if this ui-element is a Existence-Time PropSet
                    const options = new ExistenceTimeDetail({ toggle: 'expanded' });
                    children.push(createExistenceTimeDetail(options, [], crm, settings));
                }
            });
        }
    } else if (!roles || !roles.length) return;
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
                    const options = new RoleSet({ toggle: 'expanded' })
                    const roleSetDef = classConfig.roleSets[el.roleSetKey];
                    if (r && r.length > 0) {
                        children.push(createRoleSet(Object.assign({}, roleSetDef, options), r, crm, settings));
                    }
                } else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

                    // if this ui-element is a Existence-Time PropSet
                    const options = new ExistenceTimeDetail({ toggle: 'collapsed' });
                    children.push(createExistenceTimeDetail(options, roles, crm, settings));
                }

            });
        }

    }

    if (!children.length) return;

    return indexBy(dataUnitChildKey, children.filter(c => (c)));
}

/**
* Creates a PeItDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of from() methods of the different state classes
*/
export function createPeItDetail(options: PeItDetail, peIt: InfPersistentItem, crm: ProjectCrm, settings: StateSettings = {}): PeItDetail {

    // those only pollute the state unless we are in add mode.
    // if (!settings.isAddMode) delete peIt.pi_roles;

    const peItCleaned = omit(['pi_roles'], peIt);

    return new PeItDetail({
        ...options,
        _children: createDataUnitChildren(peIt.fk_class, peIt.pi_roles, crm, settings),
        pkEntity: peIt.pk_entity,
        fkClass: peIt.fk_class,
        peIt: peItCleaned,
        selectPropState: 'init',
    })
}

/**
* Creates a createTeEntDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of from() methods of the different state classes
*/
export function createTeEntDetail(options: TeEntDetail, teEnt: InfTemporalEntity, crm: ProjectCrm, settings: StateSettings): TeEntDetail {

    if (!teEnt) return;

    return new TeEntDetail({
        selectPropState: 'init',
        teEnt: teEnt,
        fkClass: teEnt.fk_class,
        _children: createDataUnitChildren(teEnt.fk_class, teEnt.te_roles, crm, settings)
    });
}



/***************************************************
* Role Set create functions
***************************************************/


/**
 * Creates a RoleSet from provided input data
 *
 * @param options options will bi merged in RoleSet object
 * @param roles will be converted in _role_list
 * @param crm is not used within the RoleSet but it is passed to RoleDetail.createState()
 * @param settings state settings object. If settings.isAddMode, only one role is taken for the _role_list,
 * TODO: change the behavior with addMode to smthng more clever
 */
export function createRoleSet(options: RoleSet, roles: InfRole[], crm: ProjectCrm, settings: StateSettings): RoleSet {

    if (!roles || !roles.length) return;
    if (!options.property) throw Error('Please provide options.property. This is important to add information about the target class of a RoleSet.');

    const roleDetailTemplate: RoleDetail = {
        isOutgoing: options.isOutgoing,
        targetClassPk: options.targetClassPk
    }

    /**
     * This is a shortcut method to take only the number of roles, defined by the max quantiy
     * TODO: change the behavior with addMode to smthng more clever
     */
    if (settings.isAddMode && options.targetMaxQuantity > -1) {
        roles = roles.slice(0, options.targetMaxQuantity)
    }
    // let displayRoleForRangePk;

    // /** if there are no eprs, this will be roles from Repo, not from Project */
    // if (!roles[0].entity_version_project_rels && roles[0].pk_entity) {
    //     displayRoleForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoles(roles)
    // }

    const roleDetailArray = roles.map(role => createRoleDetail(roleDetailTemplate, role, crm, settings))
    const sortedByOrdNum = sortRoleDetailsByOrdNum(roleDetailArray);

    return new RoleSet({
        _role_list: indexBy(roleDetailKey, sortedByOrdNum),
        ...options,
        targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain,
    });

}

/***************************************************
* Custom Ui Elements (Property Set) create functions
***************************************************/

/**
* Creates a ExistenceTimeDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
* @param roles nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of from() methods of the different state classes
*/
export function createExistenceTimeDetail(options: ExistenceTimeDetail, roles: InfRole[], crm: ProjectCrm, settings: StateSettings): ExistenceTimeDetail {

    const rolesByFkProp = groupBy(prop('fk_property'), roles) as { [index: number]: InfRole[] };
    const rsts = clone(crm.classes[DfhConfig.ClASS_PK_TIME_SPAN].roleSets);
    const children: RoleSet[] = [];
    const ext = new ExistenceTimeDetail({
        roles: [],
        toggle: options.toggle ? options.toggle : 'collapsed'
    })


    if (settings.isCreateMode) return ext;

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
            children.push(createRoleSet(new RoleSet(rs), [role], crm, settings));
        }

    })

    if (!children.length) return null;
    else {
        ext._children = indexBy(roleSetKey, children)
    }


    return new ExistenceTimeDetail({
        ...options,
        ...ext
    });
}


/***************************************************
* Role State create functions
***************************************************/

/**
 * Creates a RoleDetail from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
 * @param dbData nested object as it is delivered from REST api with roles etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of from() methods of the different state classes
 */
export function createRoleDetail(options: RoleDetail = new RoleDetail(), role: InfRole, crm: ProjectCrm, settings: StateSettings = {}): RoleDetail {


    if (!role) return undefined;


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

    const targetClassConfig = crm.classes[options.targetClassPk];

    /** If role leads to TeEnt or Presence */
    if ((
        targetClassConfig
        && (targetClassConfig.dfh_fk_system_type == DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY
            || targetClassConfig.dfh_pk_class == DfhConfig.CLASS_PK_PRESENCE)
    ) || role.temporal_entity && role.temporal_entity.pk_entity
    ) {
        // add the parent role pk of the roleDetail to the peEnt
        settings.parentRolePk = role.pk_entity;
        settings.parentRoleSet = crm
            .roleSets[roleSetKeyFromParams(role.fk_property, options.isOutgoing)];

        // if we are in create mode we need the fk_class
        if (settings.isCreateMode) {
            roleDetail.role.temporal_entity = role.temporal_entity = {
                ...role.temporal_entity,
                fk_class: options.targetClassPk
            }
        }

        roleDetail._teEnt = createTeEntDetail(undefined, role.temporal_entity, crm, settings);

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

        roleDetail._appe = createAppeDetail(undefined, role.appellation, crm, settings);

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

        roleDetail._lang = createLangDetail(undefined, role.language, crm, settings);

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

        roleDetail._place = createPlaceDetail(undefined, role.place, crm, settings);

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

        roleDetail._timePrimitive = createTimePrimitveDetail(undefined, role.time_primitive, crm, settings);

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

        roleDetail._leaf_peIt = createPeItDetail({}, { fk_class: options.targetClassPk } as InfPersistentItem, crm, settings);

    }

    return new RoleDetail(roleDetail);
}


/***************************************************
* Value Detail create functions
***************************************************/

/**
 * Creates a AppeDetail from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
 * @param dbData nested object as it is delivered from REST api with roles etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of from() methods of the different state classes
 */
export function createAppeDetail(options: AppeDetail, dbData: InfAppellation, crm: ProjectCrm, settings: StateSettings): AppeDetail {
    return new AppeDetail({
        ...options,
        appellation: dbData,
    });
}

/**
* Creates a LangDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of from() methods of the different state classes
*/
export function createLangDetail(options: LangDetail, language: InfLanguage, crm: ProjectCrm, settings: StateSettings): LangDetail {
    return new LangDetail({
        ...options,
        language
    });
}


/**
* Creates a PlaceDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of from() methods of the different state classes
*/
export function createPlaceDetail(options: PlaceDetail, dbData: InfPlace, crm: ProjectCrm, settings: StateSettings): PlaceDetail {
    return new PlaceDetail({ ...options, place: dbData });
}

/**
* Creates a TimePrimitveDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of from() methods of the different state classes
*/
export function createTimePrimitveDetail(options: TimePrimitveDetail, dbData: InfTimePrimitive, crm: ProjectCrm, settings: StateSettings): TimePrimitveDetail {
    return new TimePrimitveDetail({ ...options, timePrimitive: dbData });
}



/***************************************************
* Key Functions for Lists
***************************************************/

/**
 * Retuns a key for given DataUnitChild usefull to create list object
 * with this structure:
 * {
 *      [key]: DataUnitChild
 * }
 *
 * @param child
 */
export function dataUnitChildKey(child: DataUnitChild): string {

    switch (child.type) {
        case 'RoleSet':
            return roleSetKey(child as RoleSet);

        case 'ExistenceTimeDetail':
            return '_existenceTime';

        default:
            break;
    }
}

/**
 * Retuns a key for given RoleDetail usefull to create list object
 * with this structure:
 * {
 *      [key]: RoleDetail
 * }
 *
 * @param roleDetail
 */
export function roleDetailKey(roleDetail: RoleDetail) { return '_' + roleDetail.role.pk_entity };


/**
 * Retuns a key for given RoleSet usefull to create list object
 * with this structure:
 * {
 *      [key]: RoleSet
 * }
 *
 * @param roleSet
 */
export function roleSetKey(roleSet: RoleSet) {
    return roleSetKeyFromParams(roleSet.property.dfh_pk_property, roleSet.isOutgoing)
}
export function roleSetKeyFromParams(fkProp: number, isOutgoing: boolean) {
    return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing')
}

export const pkEntityKey = (label: DfhLabel) => ('_' + label.pk_entity);



/***************************************************
* Helper functions
***************************************************/

/**
 * Checks if RoleSet a is of the same property or property-of-origin as RoleSet b.
 * This is useful to check if a RoleSet is circular in a tree of RoleSets and DataUnits
 *
 * @param a RoleSet you want to test if it is circular
 * @param b RoleSet to compare with (typically the parent RoleSet in the tree)
 */
export function similarRoleSet(a: RoleSetI, b: RoleSetI): boolean {
    if (!a || !b) return false;

    if (
        (
            a.property.dfh_pk_property === b.property.dfh_pk_property ||
            (
                a.property.dfh_fk_property_of_origin &&
                a.property.dfh_fk_property_of_origin === b.property.dfh_fk_property_of_origin
            )
        )
        && a.isOutgoing != b.isOutgoing
    ) return true;

    else return false;
}

/**
 * returns a copy of the given RoleDetail[], where the items are sorted
 * according to the ord_num in the epr.
 *
 * @param roleDetailArray a RoleDetail[]
 * @returns a sorted copy of RoleDetail[]
 */
export function sortRoleDetailsByOrdNum(roleDetailArray: RoleDetail[]): RoleDetail[] {

    const diff = (rdA: RoleDetail, rdB: RoleDetail) => {

        const a = rdA.role.entity_version_project_rels ? rdA.role.entity_version_project_rels[0].ord_num : undefined;
        const b = rdB.role.entity_version_project_rels ? rdB.role.entity_version_project_rels[0].ord_num : undefined;

        if (a === undefined || b === undefined) return 0;

        return a - b;
    }

    return sort(diff, roleDetailArray);
}

