import { indexBy, omit } from 'ramda';
import { AcEntity, AcNotification, ActionType } from '../../modules/gv-angular-cesium/angular-cesium-fork';
import {
    AppeDetail,
    DataUnitChild,
    DataUnitChildLabel,
    DataUnitChildList,
    DataUnitLabel,
    ExistenceTimeDetail,
    LangDetail,
    PeItDetail,
    RoleDetail,
    RoleLabel,
    RoleSet,
    RoleSetLabel,
    RoleSetList,
    TeEntDetail
} from 'app/core/models';
import { AppellationLabel } from '../../modules/information/shared/appellation-label';
import { DfhConfig } from '../../modules/information/shared/dfh-config';
import { ClassConfig, ProjectCrm } from '../active-project/active-project.models';
import { Granularity } from '../date-time/date-time-commons';
import { CalendarType, TimePrimitive } from '../date-time/time-primitive';
import { ComPropertySet, ComUiContextConfig, DfhClass, InfEntityProjectRel, InfTimePrimitive, InfRole, InfTemporalEntity, InfPersistentItem, DfhProperty } from '../sdk';
import { ExistenceTime } from 'app/core/existence-time/existence-time';

/**
 * Utilities class for static functions
 */

export class U {

    static roleSetKey(roleSet: RoleSet) {
        return U.roleSetKeyFromParams(roleSet.property.dfh_pk_property, roleSet.isOutgoing)
    }

    static roleSetKeyFromParams(fkProp: number, isOutgoing: boolean) {
        return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing')
    }

    static obj2Arr<T>(obj: { [key: string]: T }): T[] {
        const arr = [];

        if (obj == undefined) return arr;

        Object.keys(obj).forEach(key => {
            arr.push(obj[key]);
        })


        return arr;
    }

    /**
     * converts object to array with {key: value} objects, e.g.:
     * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
     *
     * @param obj
     */
    static obj2KeyValueArr<T>(obj: { [key: string]: T }): { key: string, value: T }[] {
        const keys = [];
        for (const key in obj) {
            if (obj[key]) {
                keys.push({ key: key, value: obj[key] });
            }
        }
        return keys;
    }


    /**
     *  Converts InfTimePrimitve and CalendarType to TimePrimitive
    */
    static InfTp2Tp(infTp: InfTimePrimitive, calendar: CalendarType): TimePrimitive {

        return new TimePrimitive({
            // add duration
            duration: infTp.duration as Granularity,

            // add calendar
            calendar: calendar,

            // add julian day
            julianDay: infTp.julian_day,
        });

    }

    /**
     * Converts InfTimePrimitive and InfRole to TimePrimitive
     */
    static InfTpAndInfRole2Tp(infTp: InfTimePrimitive, role: InfRole): TimePrimitive {
        return U.InfTp2Tp(infTp, U.getCalendarFromRole(role));
    }

    /**
     *  Extracts the calendar from  InfTimePrimitve to TimePrimitive
    */
    static getCalendarFromRole(role: InfRole): CalendarType {
        if (!role) return null;

        const cal = (role.entity_version_project_rels && role.entity_version_project_rels[0].calendar) ?
            role.entity_version_project_rels[0].calendar :
            role.community_favorite_calendar ?
                role.community_favorite_calendar : null;

        return cal as CalendarType;
    }

    /**
     * Converts InfRole to TimePrimitive
     * @param r the InfRole to convert
     */
    static infRole2TimePrimitive(r: InfRole): TimePrimitive {

        // from InfTimePrimitve to TimePrimitive
        const infTp: InfTimePrimitive = r ? r.time_primitive : null;
        let timePrimitive: TimePrimitive = null;
        const obj: any = {}

        if (
            infTp && infTp.duration && infTp.julian_day &&
            U.getCalendarFromRole(r)
        ) {
            // add duration
            obj.duration = infTp.duration

            // add calendar
            obj.calendar = U.getCalendarFromRole(r)

            // add julian day
            obj.julianDay = infTp.julian_day;

            timePrimitive = new TimePrimitive({ ...obj })
        }

        if (timePrimitive === null) {
            return new TimePrimitive({
                calendar: 'julian'
            })
        } else {
            return timePrimitive;
        }
    }



    /**
    * Returns the Appellation Label String that is for display in this project, from the given teEnt
    * @param teEnt
    * @returns appellation label as pure string
    */
    static getDisplayAppeLabelOfTeEnt(teEnt: InfTemporalEntity): string | null {
        if (!teEnt || !teEnt.te_roles) return null


        const rolesToAppe: InfRole[] = teEnt.te_roles.filter(
            role => (role && role.appellation && role.appellation.appellation_label
                // TODO: Add a clause as soon as we have DisplayRoleForDomain in the db
                // to filter for the role that is standard?? or is this not happening on forms?
            ))

        return rolesToAppe.length ? new AppellationLabel(rolesToAppe[0].appellation.appellation_label).getString() : null;

    }


    /**
    * Returns the teEnt (Name Use Activity) that has is for display in this project, from the given peIt
    *
    * @param peIt
    * @returns InfTemporalEntity that has a appellation label for display
    */
    static getDisplayAppeLabelOfPeIt(peIt: InfPersistentItem): InfTemporalEntity | null {
        if (!peIt) return null

        const rolesToAppeUse: InfRole[] = peIt.pi_roles.filter(
            role => (
                role &&
                // TODO Add a better clause as soon as we have DisplayRoleForDomain/Range
                role.entity_version_project_rels &&
                role.entity_version_project_rels[0] &&
                role.entity_version_project_rels[0].is_standard_in_project &&

                // TODO this could be passed in by methods parameter
                role.fk_property == DfhConfig.PROPERTY_PK_R63_NAMES
            ))

        return rolesToAppeUse.length ? new InfTemporalEntity(rolesToAppeUse[0].temporal_entity) : null;

    }

    /**
    * Returns the first teEnt (Name Use Activity) of the given peIt
    *
    * @param peIt
    * @returns InfTemporalEntity that has a appellation label for display
    */
    static getFirstAppeTeEntOfPeIt(peIt: InfPersistentItem): InfTemporalEntity | null {
        if (!peIt || !peIt.pi_roles) return null

        const roleToAppeUse: InfRole = peIt.pi_roles.find(
            role => (
                role && role.fk_property == DfhConfig.PROPERTY_PK_R63_NAMES
            ))

        return roleToAppeUse ? new InfTemporalEntity(roleToAppeUse.temporal_entity) : null;

    }



    /**
    * Convert array of Property to an array of RoleSet
    *
    * @param {boolean} isOutgoing direction: true=outgoing, false=ingoing
    * @param {DfhProperty[]} properties array of properties to Convert
    * @return {RoleSet[]} array of RoleSet
    */
    static infProperties2RoleSets(isOutgoing: boolean, properties: DfhProperty[]): RoleSet[] {
        if (!properties) return [];



        return properties.map(property => {
            const res = new RoleSet({
                isOutgoing: isOutgoing,
                property: omit(['labels', 'domain_class', 'range_class'], property),
                targetMaxQuantity: isOutgoing ? property.dfh_range_instances_max_quantifier : property.dfh_domain_instances_max_quantifier,
                targetMinQuantity: isOutgoing ? property.dfh_range_instances_min_quantifier : property.dfh_domain_instances_min_quantifier,
                targetClassPk: isOutgoing ? property.dfh_has_range : property.dfh_has_domain,
                targetClass: isOutgoing ? property.range_class : property.domain_class,
                label: this.createLabelObject(property, isOutgoing)
            })

            return res;
        });
    }

    /**
     * Converts array of ingoing Property and array of outgoing Property to RoleSetList
     * @param ingoingProperties
     * @param outgoingProperties
     */
    static roleSetsFromProperties(ingoingProperties: DfhProperty[], outgoingProperties: DfhProperty[]): RoleSetList {
        return indexBy(U.roleSetKey, [
            ...U.infProperties2RoleSets(false, ingoingProperties),
            ...U.infProperties2RoleSets(true, outgoingProperties)
        ])
    };

    /**
     * Gets ord_num of RoleSet or null, if not available
     *
     * @param roleSet
     */
    static ordNumFromRoleSet(roleSet: RoleSet): number | null {

        if (!U.uiContextConfigFromRoleSet(roleSet)) return null;

        return U.uiContextConfigFromRoleSet(roleSet).ord_num;
    }


    /**
     * gets ui_context_config of RoleSet or null, if not available
     * @param roleSet
     */
    static uiContextConfigFromRoleSet(roleSet: RoleSet): ComUiContextConfig | null {
        if (!roleSet) return null;

        if (!roleSet.property) return null;

        if (!roleSet.property.ui_context_config || !roleSet.property.ui_context_config[0]) return null;

        return roleSet.property.ui_context_config[0];
    }

    /**
    * Gets ord_num of ComPropertySet or null, if not available
    *
    * @param propSet
    */
    static ordNumFromPropSet(propSet: ComPropertySet): number | null {

        const config = U.uiContextConfigFromPropSet(propSet);

        if (!config) return null;

        return config.ord_num;
    }

    /**
     * gets ui_context_config of PropSet or null, if not available
     * @param propSet
     */
    static uiContextConfigFromPropSet(propSet: ComPropertySet): ComUiContextConfig | null {

        if (!propSet.ui_context_configs) return null;

        if (!propSet.ui_context_configs[0]) return null;

        return propSet.ui_context_configs[0];
    }



    /**
     * create a label object for the property
     * @param property
     * @param isOutgoing
     */
    static createLabelObject(property: DfhProperty, isOutgoing: boolean): RoleSetLabel {
        let sg = 'n.N.'
        let pl = 'n.N.'

        let labelObj: RoleSetLabel;
        if (isOutgoing) {

            if (property) {
                sg = '[sg: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
                pl = '[pl: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
            }

            // TODO return an object containing label.pl and label.sg
            if (property.labels.length) {
                if (property.labels.find(l => l.notes === 'label.sg')) {
                    sg = property.labels.find(l => l.notes === 'label.sg').dfh_label;
                }
                if (property.labels.find(l => l.notes === 'label.pl')) {
                    pl = property.labels.find(l => l.notes === 'label.pl').dfh_label;
                }
            }

            labelObj = {
                sg: sg,
                pl: pl,
                default: property.dfh_range_instances_max_quantifier === 1 ? sg : pl
            }

        } else if (isOutgoing === false) {

            if (property) {
                sg = '[inv.sg: ' + property.dfh_pk_property + ': '
                    + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
                pl = '[inv.pl: ' + property.dfh_pk_property + ': '
                    + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
            }


            // TODO return an object containing inversed_label.pl and inversed_label.sg
            if (property.labels.length) {
                if (property.labels.find(l => l.notes === 'label_inversed.sg')) {
                    sg = property.labels.find(l => l.notes === 'label_inversed.sg').dfh_label;
                }
                if (property.labels.find(l => l.notes === 'label_inversed.pl')) {
                    pl = property.labels.find(l => l.notes === 'label_inversed.pl').dfh_label;
                }
            }

            labelObj = {
                sg: sg,
                pl: pl,
                default: property.dfh_domain_instances_max_quantifier === 1 ? sg : pl
            }

        } else {
            labelObj = undefined;
        }
        return labelObj;
    }


    /**
 * Converts a DfhClass to a ClassConfig
 * @param dfhC
 */
    static classConfigFromDfhClass(dfhC: DfhClass): ClassConfig {
        const cConf: ClassConfig = {
            dfh_fk_system_type: (!dfhC.class_profile_view ? null :
                !dfhC.class_profile_view[0] ? null :
                    !dfhC.class_profile_view[0].dfh_fk_system_type ? null :
                        dfhC.class_profile_view[0].dfh_fk_system_type),
            label: dfhC.dfh_standard_label,
            dfh_identifier_in_namespace: dfhC.dfh_identifier_in_namespace,
            dfh_pk_class: dfhC.dfh_pk_class,
            uiContexts: {}
        };

        if (dfhC.ingoing_properties || dfhC.outgoing_properties) {
            cConf.roleSets = U.roleSetsFromProperties(dfhC.ingoing_properties, dfhC.outgoing_properties)
        }
        return cConf;
    }


    static labelFromDataUnitChildList(r: DataUnitChildList): DataUnitLabel {
        // get the first 3 data UnitsChildren's labels
        const duChildren = U.obj2Arr(r);

        return {
            parts: duChildren.slice(0, 2).map(c => U.labelFromDataUnitChild(c)),
            hasMore: (duChildren.length > 2)
        }
    }


    static labelFromDataUnitChild(c: DataUnitChild): DataUnitChildLabel {
        if (c && c.type == 'RoleSet') return U.labelFromRoleSet(c as RoleSet);
        else if (c && c.type == 'ExistenceTimeDetail') return U.labelFromExTime(c as ExistenceTimeDetail);

        else return null;
    }


    static labelFromRoleSet(r: RoleSet): DataUnitChildLabel {
        const duChildLabel = new DataUnitChildLabel();

        const roleDetails = U.obj2Arr(r._role_list);

        duChildLabel.roleLabel = U.labelFromRoleDetail(roleDetails[0]);

        if (roleDetails.length > 1) duChildLabel.suffix = '(+' + (roleDetails.length - 1) + ')';

        duChildLabel.introducer = r.label.default;

        return duChildLabel;
    }



    static labelFromRoleDetail(r: RoleDetail): RoleLabel {
        if (r) {

            if (r._teEnt) {
                if (r._teEnt._children) {
                    return {
                        type: 'te-ent',
                        string: U.labelFromDataUnitChildList(r._teEnt._children).parts[0].roleLabel.string
                    };
                } else {
                    return {
                        type: 'te-ent',
                        string: ''
                    }
                }
            } else if (r._appe) return { type: 'appe', string: U.labelFromAppeDetail(r._appe) };
            else if (r._lang) return { type: 'lang', string: U.labelFromLangDetail(r._lang) };
            else if (r._place) return { type: 'place', string: 'Point on Map' };
            else if (r._leaf_peIt) return { type: 'leaf-pe-it', string: U.labelFromLeafPeIt(r._leaf_peIt) };

            else {
                console.warn('labelFromRoleDetail: This kind of RoleDetail does not produce labels');
                
            }
        }
        else {
            return new RoleLabel();
        }

    }


    static labelFromAppeDetail(a: AppeDetail): string {
        if (a && a.appellation && a.appellation.appellation_label) {
            return new AppellationLabel(a.appellation.appellation_label).getString();
        } else return null;
    }

    static labelFromLangDetail(l: LangDetail): string {
        if (l && l.language) return l.language.iso6391;

        else return null;
    }

    static labelFromTimePrimitive(r: InfRole): TimePrimitive {
        if (r) return U.infRole2TimePrimitive(r)

        else return null;
    }

    static labelFromLeafPeIt(l: PeItDetail): string {
        if (l._children) {

            const p = U.labelFromDataUnitChildList(l._children)

            if (p && p.parts && p.parts[0] && p.parts[0].roleLabel) {
                return p.parts[0].roleLabel.string;
            }
        } else return null;
    }



    static labelFromExTime(e: ExistenceTimeDetail): DataUnitChildLabel {
        let earliest: TimePrimitive, latest: TimePrimitive;
        let eRoleDetail, lRoleDetail;

        if (e && e._children) {
            const c = e._children;
            const bOb = c[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_BEGIN_OF_BEGIN, true)];
            const eOb = c[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_END_OF_BEGIN, true)];
            const bOe = c[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_BEGIN_OF_END, true)];
            const eOe = c[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_END_OF_END, true)];
            const at = c[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_AT_SOME_TIME_WITHIN, true)];
            const ong = c[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_ONGOING_THROUGHOUT, true)];

            // Get earliest date
            const earliestArr = [bOb, eOb, at, ong, bOe, eOe].filter(rs => (rs))
            if (earliestArr && earliestArr[0]) {
                if (earliestArr[0]._role_list) {
                    const roleDetails = U.obj2Arr(earliestArr[0]._role_list);
                    if (roleDetails[0]) {
                        eRoleDetail = roleDetails[0];
                        earliest = U.labelFromTimePrimitive(eRoleDetail.role);
                    }
                }
            }

            // Get latest date
            const latestArr = [eOe, bOe, at, ong, eOb, bOb].filter(rs => (rs))
            if (latestArr && latestArr[0]) {
                if (latestArr[0]._role_list) {
                    const roleDetails = U.obj2Arr(latestArr[0]._role_list);
                    if (roleDetails[0]) {
                        lRoleDetail = roleDetails[0];
                        // if latest equals earliest, don't add it
                        if (lRoleDetail != eRoleDetail) latest = U.labelFromTimePrimitive(lRoleDetail.role);
                    }
                }
            }
        }

        if (!earliest && !latest) return null;

        return new DataUnitChildLabel({
            introducer: 'When',
            roleLabel: {
                type: 'ex-time',
                exTimeLabel: { earliest, latest }
            }
        })

    }

    /**
     *  Extracts the first InfEntityProjectRel from InfRole
    */
    static eprFromInfRole(role: InfRole): InfEntityProjectRel | null {

        return (role && role.entity_version_project_rels && role.entity_version_project_rels[0]) ?
            role.entity_version_project_rels[0] : null;

    }



    /**
     *  Extracts the first InfEntityProjectRel from RoleDetail
    */
    static eprFromRoleDetail(roleDetail: RoleDetail): InfEntityProjectRel | null {

        return (
            roleDetail &&
            roleDetail.role &&
            roleDetail.role.entity_version_project_rels &&
            roleDetail.role.entity_version_project_rels[0]
        ) ? roleDetail.role.entity_version_project_rels[0] : null;

    }

    static czmlPacketsFromPresences(presencesWithPath: { path: string[]; teEntDetail: TeEntDetail; }[]): {
        earliestJulianDate: CesiumJulianDate,
        latestJulianDate: CesiumJulianDate,
        czmlPackets: any[]
    } | null {
        if (!presencesWithPath) return null;


        const res: { earliestJulianDate: CesiumJulianDate, latestJulianDate: CesiumJulianDate, czmlPackets: any[] } = {
            earliestJulianDate: undefined,
            latestJulianDate: undefined,
            czmlPackets: []
        };

        presencesWithPath.forEach(presenceWithPath => {

            const presence = presenceWithPath.teEntDetail;

            // timeSpanActivated === false
            const colorInactive = [255, 255, 255, 100];

            // timeSpanActivated === true
            const colorActive = [32, 201, 251, 200];

            // accentuation === 'selected'
            const outlineColorSelected = [0, 255, 255, 255];
            const outlineWidthSelected = 3;

            // accentuation === 'highlighted'
            const outlineColorHighlighted = [255, 206, 0, 255];
            const outlineWidthHighlighted = 3;

            // accentuation === 'none'
            const outlineColorDefault = [26, 130, 95, 255]
            const outlineWidthDefault = 1;

            // validate presence
            if (presence.fkClass != DfhConfig.CLASS_PK_PRESENCE) return null;

            // return false if no DateUnitChildren
            if (!presence._children) return null;

            // return false if no RoleSet leading to a Place
            const placeSet = presence._children[U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE, true)] as RoleSet;
            if (!placeSet || placeSet.type != 'RoleSet') return null;

            // return false if no Place in first RoleDetail
            const placeRoleDetail = U.obj2Arr(placeSet._role_list)[0];
            if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.place) return null;

            // return false if no pk_entity in first RoleDetail
            if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.pk_entity) return null;

            let czmlPacket: any = {}

            // colors used for dynamic color change
            let colorRgba: any[] = colorInactive;

            // get the Existence Time of that TeEnt
            const exTime = U.ExTimeFromExTimeDetail(presence._children['_existenceTime'] as ExistenceTimeDetail);
            if (exTime) {

                const minMax = exTime.getMinMaxTimePrimitive();

                const min = new Cesium.JulianDate(minMax.min.julianDay);
                const max = new Cesium.JulianDate(minMax.max.getDateTime().getEndOf(minMax.max.duration).getJulianDay());

                const minStr = Cesium.JulianDate.toIso8601(min);
                const maxStr = Cesium.JulianDate.toIso8601(max);

                const before = Cesium.JulianDate.addSeconds(min, -1, min);
                const beforeStr = Cesium.JulianDate.toIso8601(before);

                const after = Cesium.JulianDate.addSeconds(max, 1, max);
                const afterStr = Cesium.JulianDate.toIso8601(after);

                colorRgba = [
                    beforeStr, ...colorInactive,
                    minStr, ...colorActive,
                    maxStr, ...colorActive,
                    afterStr, ...colorInactive,
                ];

                if (res.earliestJulianDate === undefined || Cesium.JulianDate.greaterThan(res.earliestJulianDate, before)) {
                    res.earliestJulianDate = before;
                }

                if (res.latestJulianDate === undefined || Cesium.JulianDate.lessThan(res.latestJulianDate, after)) {
                    res.latestJulianDate = after;
                }
            }

            const placeRole = placeRoleDetail.role;
            const place = placeRole.place;

            czmlPacket = {
                ...czmlPacket,
                id: placeRole.pk_entity,
                position: {
                    cartographicDegrees: [place.long, place.lat, 0]
                },
                point: {
                    color: {
                        rgba: colorRgba,
                        forwardExtrapolationType: 'HOLD',
                        backwardExtrapolationType: 'HOLD'
                    },
                    outlineColor: {
                        rgba: [255, 0, 0, 200]
                    },
                    outlineWidth: 3,
                    pixelSize: 15
                },
                properties: {
                    path: JSON.stringify(presenceWithPath.path)
                }
            }

            switch (presence.accentuation) {
                case 'selected':
                    czmlPacket.point.outlineColor.rgba = outlineColorSelected;
                    czmlPacket.point.outlineWidth = outlineWidthSelected;
                    break;

                case 'highlighted':
                    czmlPacket.point.outlineColor.rgba = outlineColorHighlighted;
                    czmlPacket.point.outlineWidth = outlineWidthHighlighted;
                    break;

                default:
                    czmlPacket.point.outlineColor.rgba = outlineColorDefault;
                    czmlPacket.point.outlineWidth = outlineWidthDefault;
                    break;
            }

            res.czmlPackets.push(czmlPacket)

        })

        if (res.earliestJulianDate == undefined) {
            res.earliestJulianDate = Cesium.JulianDate.fromIso8601('1200-01-01');
        }

        if (res.latestJulianDate == undefined) {
            res.latestJulianDate = Cesium.JulianDate.fromIso8601('2020-01-01');
        }

        const earliestStr = Cesium.JulianDate.toIso8601(res.earliestJulianDate);
        const latestStr = Cesium.JulianDate.toIso8601(res.latestJulianDate);
        const availability = [earliestStr, latestStr].join('/');

        // res.czmlPackets.forEach(packet => {
        //     packet['availability'] = availability
        // })

        return res;
    }



    static presencesFromPeIt(peItDetail: PeItDetail, path: string[]): { path: string[], teEntDetail: TeEntDetail }[] {

        const roleSetMap = U.obj2KeyValueArr(peItDetail._children).find((res) => {
            const child: DataUnitChild = res.value;
            if (child.type == 'RoleSet') {
                if ((child as RoleSet).targetClassPk == DfhConfig.CLASS_PK_PRESENCE) return true;
            }
            return false
        });

        if (!roleSetMap) return [];

        const roleSet = roleSetMap.value as RoleSet;
        const roleSetPath = [...path, '_children', roleSetMap.key]


        return U.obj2KeyValueArr(roleSet._role_list).map(roleDetailMap => ({
            path: [...roleSetPath, '_role_list', roleDetailMap.key, '_teEnt'],
            teEntDetail: roleDetailMap.value._teEnt
        }))
    }


    static teEntsWithoutPresencesFromPeIt(peItDetail: PeItDetail, path: string[]): { path: string[], teEntDetail: TeEntDetail }[] {

        const result: { path: string[], teEntDetail: TeEntDetail }[] = []


        // get rolesets to teEnts without presences
        const keys = Object.keys(peItDetail._children);
        const roleSets = {};
        keys.forEach(key => {
            const child: DataUnitChild = peItDetail._children[key];
            if (child.type == 'RoleSet') {
                if ((child as RoleSet).targetClassPk !== DfhConfig.CLASS_PK_PRESENCE) {
                    roleSets[key] = child as RoleSet;
                };
            }
        })


        // for each roleSet get the roleSet and make the path
        U.obj2KeyValueArr(roleSets).map(res => {
            const roleSet = res.value as RoleSet;
            const roleSetPath = [...path, '_children', res.key]

            // get the teEnt of roleDetails with path
            U.obj2KeyValueArr(roleSet._role_list).forEach(roleDetailMap => {

                const teEntWithPath = {
                    path: [...roleSetPath, '_role_list', roleDetailMap.key, '_teEnt'],
                    teEntDetail: roleDetailMap.value._teEnt
                }

                result.push(teEntWithPath)
            })

        })

        return result
    }


    static czmlPacketsFromTeEnts(teEntsWithPath: { path: string[]; teEntDetail: TeEntDetail; }[], crm: ProjectCrm): {
        earliestJulianDate: CesiumJulianDate,
        latestJulianDate: CesiumJulianDate,
        czmlPackets: any[]
    } | null {

        const res: {
            earliestJulianDate: CesiumJulianDate,
            latestJulianDate: CesiumJulianDate,
            czmlPackets: any[]
        } = {
            earliestJulianDate: undefined,
            latestJulianDate: undefined,
            czmlPackets: []
        };

        teEntsWithPath.forEach(teEntWithPath => {
            const path = teEntWithPath.path;
            const teEntDetail = teEntWithPath.teEntDetail;



            // get leaf peIts...
            U.obj2Arr(teEntDetail._children).forEach(duChild => {
                if (duChild.type === 'RoleSet') {
                    const rs = duChild as RoleSet;

                    // of class geographical place or built work
                    if (
                        rs.targetClassPk === DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE ||
                        rs.targetClassPk === DfhConfig.CLASS_PK_BUILT_WORK
                    ) {

                        // get leaf-peIts
                        U.obj2Arr(rs._role_list).forEach(roleDetail => {
                            if (roleDetail._leaf_peIt && !roleDetail._leaf_peIt.loading) {
                                // get presences of leaf-peIts
                                const presences = U.presencesFromPeIt(roleDetail._leaf_peIt, [])

                                presences.forEach(p => {

                                    const presence = p.teEntDetail;

                                    // timeSpanActivated === false
                                    const colorInactive = [255, 255, 255, 100];

                                    // timeSpanActivated === true
                                    const colorActive = [32, 201, 251, 200];

                                    // accentuation === 'selected'
                                    const outlineColorSelected = [0, 255, 255, 255];
                                    const outlineWidthSelected = 3;

                                    // accentuation === 'highlighted'
                                    const outlineColorHighlighted = [255, 206, 0, 255];
                                    const outlineWidthHighlighted = 3;

                                    // accentuation === 'none'
                                    const outlineColorDefault = [26, 130, 95, 255]
                                    const outlineWidthDefault = 1;

                                    // validate presence
                                    if (presence.fkClass != DfhConfig.CLASS_PK_PRESENCE) return null;

                                    // return false if no DateUnitChildren
                                    if (!presence._children) return null;

                                    // return false if no RoleSet leading to a Place
                                    const placeSet = presence._children[
                                        U.roleSetKeyFromParams(DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE, true)] as RoleSet;
                                    if (!placeSet || placeSet.type != 'RoleSet') return null;

                                    // return false if no Place in first RoleDetail
                                    const placeRoleDetail = U.obj2Arr(placeSet._role_list)[0];
                                    if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.place) return null;

                                    // return false if no pk_entity in first RoleDetail
                                    if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.pk_entity) return null;

                                    let czmlPacket: any = {}

                                    // colors used for dynamic color change
                                    let colorRgba: any[] = colorInactive;

                                    // get the Existence Time of initial TeEnt not the Presence
                                    const exTime = U.ExTimeFromExTimeDetail(teEntDetail._children['_existenceTime'] as ExistenceTimeDetail);

                                    // TODO: compare the exTime from initial teEnt with exTime of the presence and figure out which presence
                                    // is best for displaying the teEnt on the map
                                    // const exTime = U.ExTimeFromExTimeDetail(presence._children['_existenceTime'] as ExistenceTimeDetail);

                                    // exTime of initial TeEnt not Presence!
                                    if (exTime) {

                                        const minMax = exTime.getMinMaxTimePrimitive();

                                        const min = new Cesium.JulianDate(minMax.min.julianDay, 0, Cesium.TimeStandard.TAI);
                                        const max = new Cesium.JulianDate(minMax.max.getDateTime()
                                            .getEndOf(minMax.max.duration).getJulianDay(), 86400, Cesium.TimeStandard.TAI);

                                        const minStr = Cesium.JulianDate.toIso8601(min);
                                        const maxStr = Cesium.JulianDate.toIso8601(max);

                                        const before = Cesium.JulianDate.addSeconds(min, -1, min);
                                        const beforeStr = Cesium.JulianDate.toIso8601(before);

                                        const after = Cesium.JulianDate.addSeconds(max, 1, max);
                                        const afterStr = Cesium.JulianDate.toIso8601(after);

                                        colorRgba = [
                                            beforeStr, ...colorInactive,
                                            minStr, ...colorActive,
                                            maxStr, ...colorActive,
                                            afterStr, ...colorInactive,
                                        ];

                                        if (res.earliestJulianDate === undefined || Cesium.JulianDate
                                            .greaterThan(res.earliestJulianDate, before)) {
                                            res.earliestJulianDate = before;
                                        }

                                        if (res.latestJulianDate === undefined || Cesium.JulianDate.lessThan(res.latestJulianDate, after)) {
                                            res.latestJulianDate = after;
                                        }
                                    }

                                    const placeRole = placeRoleDetail.role;
                                    const place = placeRole.place;

                                    czmlPacket = {
                                        ...czmlPacket,
                                        id: placeRole.pk_entity,
                                        position: {
                                            cartographicDegrees: [place.long, place.lat, 0]
                                        },
                                        point: {
                                            color: {
                                                rgba: colorRgba,
                                                forwardExtrapolationType: 'HOLD',
                                                backwardExtrapolationType: 'HOLD'
                                            },
                                            outlineColor: {
                                                rgba: [255, 0, 0, 200]
                                            },
                                            outlineWidth: 3,
                                            pixelSize: 15
                                        },
                                        label: {
                                            id: 'label of: ' + placeRole.pk_entity,
                                            text: crm.classes[teEntDetail.fkClass].label,
                                            font: '16pt "source sans pro"',
                                            horizontalOrigin: 'LEFT',
                                            fillColor: {
                                                rgba: [20, 20, 20, 255]
                                            },
                                            outlineColor: {
                                                rgba: [255, 255, 255, 230]
                                            },
                                            outlineWidth: 2,
                                            pixelOffset: {
                                                cartesian2: [12.0, -16.0]
                                            },
                                            scaleByDistance: {
                                                nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
                                            },
                                            translucencyByDistance: {
                                                nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
                                            },
                                            // this makes sense if the point also scales
                                            // pixelOffsetScaleByDistance: {
                                            //     nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
                                            // },
                                            style: 'FILL_AND_OUTLINE',
                                        },
                                        properties: {
                                            path: JSON.stringify(path) // path of initial teEnt (not presence)
                                        }
                                    }

                                    switch (teEntDetail.accentuation) {
                                        case 'selected':
                                            czmlPacket.point.outlineColor.rgba = outlineColorSelected;
                                            czmlPacket.point.outlineWidth = outlineWidthSelected;
                                            break;

                                        case 'highlighted':
                                            czmlPacket.point.outlineColor.rgba = outlineColorHighlighted;
                                            czmlPacket.point.outlineWidth = outlineWidthHighlighted;
                                            break;

                                        default:
                                            czmlPacket.point.outlineColor.rgba = outlineColorDefault;
                                            czmlPacket.point.outlineWidth = outlineWidthDefault;
                                            break;
                                    }

                                    res.czmlPackets.push(czmlPacket)

                                })

                                if (res.earliestJulianDate == undefined) {
                                    res.earliestJulianDate = Cesium.JulianDate.fromIso8601('1200-01-01');
                                }

                                if (res.latestJulianDate == undefined) {
                                    res.latestJulianDate = Cesium.JulianDate.fromIso8601('2020-01-01');
                                }

                            }
                        })


                    }

                }
            })


        })

        return res;
    }



    static acNotificationFromPacket = (packet, actionType: ActionType): AcNotification => ({
        id: packet.id,
        entity: new AcEntity(packet),
        actionType
    })


    static ExTimeFromExTimeDetail = (exTimeDetail: ExistenceTimeDetail): ExistenceTime | null => {

        if (!exTimeDetail) return null;

        const e = new ExistenceTime();

        U.obj2Arr(exTimeDetail._children).forEach(rs => {
            const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[rs.property.dfh_pk_property]
            if (key) e[key] = U.infRole2TimePrimitive(U.obj2Arr(rs._role_list)[0].role);
        })

        return e;
    }


    static CesiumJulianDateFromJulianSecond = (julianSeconds: number): CesiumJulianDate => {
        if (!julianSeconds) return;

        const secondsOfFullDay = 60 * 60 * 24;
        const dayNumber = Math.floor(julianSeconds / secondsOfFullDay);
        const secondsOfDay = julianSeconds % secondsOfFullDay;
        return new Cesium.JulianDate(dayNumber, secondsOfDay)
    }
}
