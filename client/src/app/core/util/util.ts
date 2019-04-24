import { TimeSpan } from 'app/core/time-span/time-span';
import { AppeDetail, ClassInstanceFieldLabel, FieldList, ClassInstanceLabel, ExistenceTimeDetail, LangDetail, PeItDetail, RoleDetail, RoleLabel, PropertyField, FieldLabel, PropertyFieldList, TeEntDetail, RoleDetailList, PlaceDetail } from 'app/core/state/models';
import { indexBy, omit } from 'ramda';
import { AcEntity, AcNotification, ActionType } from '../../modules/gv-angular-cesium/angular-cesium-fork';
import { AppellationLabel } from '../../modules/information/shared/appellation-label';
import { DfhConfig } from '../../modules/information/shared/dfh-config';
import { ClassConfig, ProjectCrm } from 'app/core/active-project/active-project.models';
import { Granularity } from '../date-time/date-time-commons';
import { CalendarType, TimePrimitive } from '../date-time/time-primitive';
import { ComClassField, ComUiContextConfig, DfhClass, DfhProperty, InfEntityProjectRel, InfPersistentItem, InfRole, InfTemporalEntity, InfTimePrimitive, InfEntityProjectRelInterface, DfhProjRel } from '../sdk';
import { propertyFieldKeyFromParams, propertyFieldKey, fieldKey, roleDetailKey } from 'app/core/state/services/state-creator';
import * as Config from '../../../../../common/config/Config';
import { Field } from '../state/models/field';
import { ComConfig } from '../config/com-config';
import { TextPropertyField } from '../state/models/text-property-field';

export interface LabelGeneratorSettings {
    // maximum number of data unit children that are taken into account for the label generator
    // e.g.: for a AppeForLanguage it will take only label and language, when you put it to 2
    fieldsMax?: number;

    // maximum number of roles per propertyField taken into account for the label generator
    rolesMax?: number;

    // path of that element in the store. useful to attatch leaf-pe-it-view
    path: string[];
}


/**
 * Utilities class for static functions
 */

export class U {

    static obj2Arr<T>(obj: { [key: string]: T }): T[] {
        const arr = [];

        if (obj == undefined) return arr;

        Object.keys(obj).forEach(key => {
            arr.push(obj[key]);
        });

        return arr;
    }


    static objNr2Arr<T>(obj: { [key: number]: T }): T[] {
        const arr = [];

        if (obj == undefined) return arr;

        Object.keys(obj).forEach(key => {
            arr.push(obj[key]);
        });

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
     * Return a string for given peIt.
     * Usefull for display of Types.
     */
    static stringForPeIt(peIt: InfPersistentItem): string {

        return (!peIt || !peIt.pi_roles) ? '' :
            peIt.pi_roles
                .filter(r => (
                    r &&
                    r.temporal_entity &&
                    r.temporal_entity.fk_class === DfhConfig.CLASS_PK_APPELLATION_USE &&
                    r.temporal_entity.te_roles &&
                    r.temporal_entity.te_roles.length
                ))
                .map(pir => pir.temporal_entity.te_roles.filter(ter => (ter && Object.keys((ter.appellation || {})).length))
                    .map(r => {
                        return new AppellationLabel(r.appellation.appellation_label).getString()
                    })[0]).join(', ')

    }

    /**
      * Convert array of ComClassField to an array of Fields
      *
      */
    static comCLassFields2Fields(classFields: ComClassField[]): Field[] {
        if (!classFields) return [];

        return classFields.map(comClassfield => {

            const label = {
                default: comClassfield.label,
                sg: comClassfield.label,
                pl: comClassfield.label
            }
            const fkClassField = comClassfield.pk_entity;


            switch (comClassfield.pk_entity) {
                case ComConfig.PK_CLASS_FIELD_WHEN:

                    return new ExistenceTimeDetail({ fkClassField, label })

                case ComConfig.PK_CLASS_FIELD_ENTITY_DEFINITION:
                case ComConfig.PK_CLASS_FIELD_EXACT_REFERENCE:
                case ComConfig.PK_CLASS_FIELD_SHORT_TITLE:

                    return new TextPropertyField({ fkClassField, label })

                default:
                    break;
            }
        });
    }

    /**
    * Convert array of Property to an array of PropertyField
    *
    * @param {boolean} isOutgoing direction: true=outgoing, false=ingoing
    * @param {DfhProperty[]} properties array of properties to Convert
    * @return {PropertyField[]} array of PropertyField
    */
    static infProperties2PropertyFields(isOutgoing: boolean, properties: DfhProperty[]): PropertyField[] {
        if (!properties) return [];



        return properties.map(property => {
            const res = new PropertyField({
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
     * Converts array of ingoing Property and array of outgoing Property to PropertyFieldList
     * @param ingoingProperties
     * @param outgoingProperties
     */
    static propertyFieldsFromProperties(ingoingProperties: DfhProperty[], outgoingProperties: DfhProperty[]): PropertyFieldList {
        return indexBy(propertyFieldKey, [
            ...U.infProperties2PropertyFields(false, ingoingProperties),
            ...U.infProperties2PropertyFields(true, outgoingProperties)
        ])
    };

    /**
     * Gets ord_num of PropertyField or null, if not available
     *
     * @param propertyField
     */
    static ordNumFromPropertyField(propertyField: PropertyField): number | null {

        if (!U.uiContextConfigFromPropertyField(propertyField)) return null;

        return U.uiContextConfigFromPropertyField(propertyField).ord_num;
    }


    /**
     * gets ui_context_config of PropertyField or null, if not available
     * @param propertyField
     */
    static uiContextConfigFromPropertyField(propertyField: PropertyField): ComUiContextConfig | null {
        if (!propertyField) return null;

        if (!propertyField.property) return null;

        if (!propertyField.property.ui_context_config || !propertyField.property.ui_context_config[0]) return null;

        return propertyField.property.ui_context_config[0];
    }

    /**
    * Gets ord_num of ComClassField or null, if not available
    *
    * @param propSet
    */
    static ordNumFromPropSet(propSet: ComClassField): number | null {

        const config = U.uiContextConfigFromPropSet(propSet);

        if (!config) return null;

        return config.ord_num;
    }

    /**
     * gets ui_context_config of PropSet or null, if not available
     * @param propSet
     */
    static uiContextConfigFromPropSet(propSet: ComClassField): ComUiContextConfig | null {

        if (!propSet.ui_context_configs) return null;

        if (!propSet.ui_context_configs[0]) return null;

        return propSet.ui_context_configs[0];
    }



    /**
     * create a label object for the property
     * @param property
     * @param isOutgoing
     */
    static createLabelObject(property: DfhProperty, isOutgoing: boolean): FieldLabel {
        let sg = 'n.N.'
        let pl = 'n.N.'

        let labelObj: FieldLabel;
        if (isOutgoing) {

            if (property) {
                sg = '[sg: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
                pl = '[pl: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
            }

            // TODO return an object containing label.pl and label.sg
            if (property.labels && property.labels.length) {
                if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_SG)) {
                    sg = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_SG).dfh_label;
                }
                if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_PL)) {
                    pl = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_PL).dfh_label;
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
            if (property.labels && property.labels.length) {
                if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_SG)) {
                    sg = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_SG).dfh_label;
                }
                if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_PL)) {
                    pl = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_PL).dfh_label;
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
     * Gets the project rel of a data_for_history class
     */
    static getProjRel = (dfhClass: DfhClass): DfhProjRel => {
        if (dfhClass && dfhClass.proj_rels && dfhClass.proj_rels.length && dfhClass.proj_rels[0]) {
            return dfhClass.proj_rels[0];
        } else return undefined;
    }

    /**
     * Converts a DfhClass to a ClassConfig
     * @param dfhC
     */
    static classConfigFromDfhClass(dfhC: DfhClass): ClassConfig {

        // extract class label. prefer eager loaded label over standard label.
        const extractClassLabel = (c: DfhClass): string => {
            if (c.labels && c.labels.length) return c.labels[0].dfh_label;
            else return c.dfh_standard_label
        }

        const extractSubclassOf = (c: DfhClass): 'peIt' | 'teEnt' | undefined => {
            const systype = (!c.class_profile_view ? null :
                !c.class_profile_view[0] ? null :
                    !c.class_profile_view[0].dfh_fk_system_type ? null :
                        c.class_profile_view[0].dfh_fk_system_type);

            if (systype === DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM) return 'peIt';
            if (systype === DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY) return 'teEnt';
            else return undefined;
        }

        const extractIsInProject = (c: DfhClass): boolean => {
            return !c.proj_rels ? false :
                !c.proj_rels[0] ? false : c.proj_rels[0].is_in_project;
        }

        const cConf: ClassConfig = {
            pkEntity: dfhC.pk_entity,
            dfh_pk_class: dfhC.dfh_pk_class,
            subclassOf: extractSubclassOf(dfhC),
            profileLabels: dfhC.class_profile_view.map(prof => prof.dfh_profile_label).join(', '),
            profilePks: dfhC.class_profile_view.map(prof => prof.dfh_fk_profile),
            isInProject: extractIsInProject(dfhC),
            projRel: U.getProjRel(dfhC),
            label: extractClassLabel(dfhC),
            dfh_standard_label: dfhC.dfh_standard_label,
            changingProjRel: false,
            scopeNote: !dfhC.text_properties ? '' : !dfhC.text_properties.length ? '' : dfhC.text_properties[0].dfh_text_property,
            dfh_identifier_in_namespace: dfhC.dfh_identifier_in_namespace,
            uiContexts: {}
        };

        if (dfhC.ingoing_properties || dfhC.outgoing_properties) {
            cConf.propertyFields = U.propertyFieldsFromProperties(dfhC.ingoing_properties, dfhC.outgoing_properties)
        }
        return cConf;
    }

    /**************************************************************************
     * Label Generator Functions
     **************************************************************************/

    static labelFromFieldList(r: FieldList, settings: LabelGeneratorSettings): ClassInstanceLabel {
        const max = !settings ? undefined : settings.fieldsMax;
        const duChildren = U.obj2Arr(r);

        // create array with max amount of labels
        const sliced = max ? duChildren.slice(0, max) : duChildren;

        return {
            path: settings.path,
            parts: sliced.map(c => U.labelFromField(c, { ...settings, path: [...settings.path, fieldKey(c)] })),
            hasMore: (duChildren.length > 2)
        }
    }


    static labelFromField(c: Field, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
        if (c && c.type == 'PropertyField') return U.labelFromPropertyField(c as PropertyField, settings);
        else if (c && c.type == 'ExistenceTimeDetail') return U.labelFromExTime(c as ExistenceTimeDetail, settings);
        else if (c && c.type == 'TextPropertyField') return U.labelFromTextPropertyField(c as TextPropertyField, settings);

        else return null;
    }


    static labelFromPropertyField(r: PropertyField, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
        const max = !settings ? undefined : settings.rolesMax;

        const roleDetails = U.obj2Arr(r._role_list);
        const duChildLabel = new ClassInstanceFieldLabel({ path: settings.path });

        // create array with max amount of labels
        const spliced = max ? roleDetails.splice(0, max) : roleDetails;

        duChildLabel.roleLabels = spliced.map(det => U.labelFromRoleDetail(det, { ...settings, path: [...settings.path, '_role_list', roleDetailKey(det)] }));

        if (roleDetails.length > 1) duChildLabel.suffix = '(+' + (roleDetails.length - max) + ')';

        duChildLabel.introducer = r.label.default;

        return duChildLabel;
    }



    static labelFromRoleDetail(r: RoleDetail, settings: LabelGeneratorSettings): RoleLabel {
        const path = settings.path;
        if (r) {
            if (r._teEnt) {
                let string = '';
                if (r._teEnt._fields) {
                    const label = U.labelFromFieldList(r._teEnt._fields, settings);
                    if (label && label.parts && label.parts[0] && label.parts[0].roleLabels && label.parts[0].roleLabels[0] && label.parts[0].roleLabels[0].string) {
                        string = label.parts[0].roleLabels[0].string;
                    }
                }
                return {
                    path,
                    type: 'te-ent',
                    string
                }
            } else if (r._appe) return { path, type: 'appe', string: U.labelFromAppeDetail(r._appe) };
            else if (r._lang) return { path, type: 'lang', string: U.labelFromLangDetail(r._lang) };
            else if (r._place) return { path, type: 'place', string: U.labelFromPlaceDetail(r._place) };
            else if (r._leaf_peIt) return { path, type: 'leaf-pe-it', fkEntity: r.role.fk_entity };

            else {
                console.warn('labelFromRoleDetail: This kind of RoleDetail does not produce labels');

            }
        } else {
            return new RoleLabel();
        }

    }


    static labelFromAppeDetail(a: AppeDetail): string {
        if (a && a.appellation && a.appellation.appellation_label) {
            return new AppellationLabel(a.appellation.appellation_label).getString();
        } else return null;
    }

    static labelFromLangDetail(l: LangDetail): string {
        if (l && l.language) return l.language.notes;

        else return null;
    }

    static labelFromPlaceDetail(p: PlaceDetail): string {
        if (p && p.place) return 'WGS84: ' + p.place.lat + '°, ' + p.place.long + '°';

        else return null;
    }

    static labelFromTimePrimitive(r: InfRole): TimePrimitive {
        if (r) return U.infRole2TimePrimitive(r)

        else return null;
    }

    static labelFromLeafPeIt(l: PeItDetail, settings: LabelGeneratorSettings): string {
        if (l._fields) {

            const p = U.labelFromFieldList(l._fields, { ...settings, path: [...settings.path, '_fields'] })

            if (p && p.parts && p.parts[0] && p.parts[0].roleLabels && p.parts[0].roleLabels[0]) {
                return p.parts[0].roleLabels[0].string;
            }
        } else return null;
    }

    static labelFromTextPropertyField(txtPropField: TextPropertyField, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
        return new ClassInstanceFieldLabel({
            path: settings.path,
            introducer: '',
            roleLabels: [{
                path: undefined,
                type: 'txt-prop',
                string: U.obj2Arr(txtPropField.textPropertyDetailList).slice(0, settings.rolesMax).map(tD => (
                    tD.textProperty.text_property_quill_doc.contents.ops.map(op => op.insert).join('')
                )).join(', ')
            }]
        })
    }

    static labelFromExTime(e: ExistenceTimeDetail, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
        let earliest: TimePrimitive, latest: TimePrimitive;
        let eRoleDetail: RoleDetail, lRoleDetail;

        if (e && e._fields) {
            const c = e._fields;
            const bOb = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_BEGIN_OF_BEGIN, true)];
            const eOb = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_END_OF_BEGIN, true)];
            const bOe = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_BEGIN_OF_END, true)];
            const eOe = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_END_OF_END, true)];
            const at = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_AT_SOME_TIME_WITHIN, true)];
            const ong = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_ONGOING_THROUGHOUT, true)];

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

        return new ClassInstanceFieldLabel({
            path: settings.path,
            introducer: 'When',
            roleLabels: [{
                path: undefined,
                type: 'ex-time',
                exTimeLabel: { earliest, latest }
            }]
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
            if (!presence._fields) return null;

            // return false if no PropertyField leading to a Place
            const placeSet = presence._fields[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE, true)] as PropertyField;
            if (!placeSet || placeSet.type != 'PropertyField') return null;

            // return false if no Place in first RoleDetail
            const placeRoleDetail = U.obj2Arr(placeSet._role_list)[0];
            if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.place) return null;

            // return false if no pk_entity in first RoleDetail
            if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.pk_entity) return null;

            let czmlPacket: any = {}

            // colors used for dynamic color change
            let colorRgba: any[] = colorInactive;

            // get the TimeSpan of that TeEnt
            const exTime = U.timeSpanFromExTimeDetail(presence._fields['_field_48'] as ExistenceTimeDetail);
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

        const propertyFieldMap = U.obj2KeyValueArr(peItDetail._fields).find((res) => {
            const child: Field = res.value;
            if (child.type == 'PropertyField') {
                if ((child as PropertyField).targetClassPk == DfhConfig.CLASS_PK_PRESENCE) return true;
            }
            return false
        });

        if (!propertyFieldMap) return [];

        const propertyField = propertyFieldMap.value as PropertyField;
        const propertyFieldPath = [...path, '_fields', propertyFieldMap.key]


        return U.obj2KeyValueArr(propertyField._role_list).map(roleDetailMap => ({
            path: [...propertyFieldPath, '_role_list', roleDetailMap.key, '_teEnt'],
            teEntDetail: roleDetailMap.value._teEnt
        }))
    }


    static teEntsWithoutPresencesFromPeIt(peItDetail: PeItDetail, path: string[]): { path: string[], teEntDetail: TeEntDetail }[] {

        const result: { path: string[], teEntDetail: TeEntDetail }[] = []


        // get propertyFields to teEnts without presences
        const keys = (!peItDetail || !peItDetail._fields) ? [] : Object.keys(peItDetail._fields);
        const propertyFields = {};
        keys.forEach(key => {
            const child: Field = peItDetail._fields[key];
            if (child.type == 'PropertyField') {
                if ((child as PropertyField).targetClassPk !== DfhConfig.CLASS_PK_PRESENCE) {
                    propertyFields[key] = child as PropertyField;
                };
            }
        })


        // for each propertyField get the propertyField and make the path
        U.obj2KeyValueArr(propertyFields).map(res => {
            const propertyField = res.value as PropertyField;
            const propertyFieldPath = [...path, '_fields', res.key]

            // get the teEnt of roleDetails with path
            U.obj2KeyValueArr(propertyField._role_list).forEach(roleDetailMap => {

                const teEntWithPath = {
                    path: [...propertyFieldPath, '_role_list', roleDetailMap.key, '_teEnt'],
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
            U.obj2Arr(teEntDetail._fields).forEach(duChild => {
                if (duChild.type === 'PropertyField') {
                    const rs = duChild as PropertyField;

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
                                    if (!presence._fields) return null;

                                    // return false if no PropertyField leading to a Place
                                    const placeSet = presence._fields[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE, true)] as PropertyField;
                                    if (!placeSet || placeSet.type != 'PropertyField') return null;

                                    // return false if no Place in first RoleDetail
                                    const placeRoleDetail = U.obj2Arr(placeSet._role_list)[0];
                                    if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.place) return null;

                                    // return false if no pk_entity in first RoleDetail
                                    if (!placeRoleDetail || !placeRoleDetail.role || !placeRoleDetail.role.pk_entity) return null;

                                    let czmlPacket: any = {}

                                    // colors used for dynamic color change
                                    let colorRgba: any[] = colorInactive;

                                    // get the TimeSpan of initial TeEnt not the Presence
                                    const timeSpan = U.timeSpanFromExTimeDetail(teEntDetail._fields['_field_48'] as ExistenceTimeDetail);

                                    // TODO: compare the TimeSpan from initial teEnt with TimeSpan of the presence and figure out which presence
                                    // is best for displaying the teEnt on the map
                                    // const TimeSpan = U.ExTimeFromExTimeDetail(presence._fields['_field_48'] as ExistenceTimeDetail);

                                    // TimeSpan of initial TeEnt not Presence!
                                    if (timeSpan) {

                                        const minMax = timeSpan.getMinMaxTimePrimitive();

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


    static timeSpanFromExTimeDetail = (exTimeDetail: ExistenceTimeDetail): TimeSpan | null => {

        if (!exTimeDetail) return null;

        const e = new TimeSpan();

        U.obj2Arr(exTimeDetail._fields).forEach(rs => {
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

    /**
     * Returns true if the given object has a
     * entity_version_project_rels[0].is_in_project === true
     * Else returns false;
     */
    static entityIsInProject = (entity: any): boolean => {
        if (
            entity && entity.entity_version_project_rels &&
            entity.entity_version_project_rels[0] &&
            entity.entity_version_project_rels[0].is_in_project
        ) return true;
        else return false;
    }

    /**
     * Figures out if any of the roleDetails of the given RoleDetailList
     * has a temporal entity that is in editing mode. If so:
     *
     * @returns the key that roleDetail has in the given List.
     */
    static extractRoleDetailKeyOfEditingTeEnt(roleDetailList: RoleDetailList): string {
        let key: string;
        U.obj2KeyValueArr(roleDetailList).some((item) => {
            if (item.value._teEnt && item.value._teEnt.editing) {
                key = item.key;
                return true;
            }
        });
        return key;

    }



    /**
     * Returns the key of the data unit children that should be isolated in view
     * @returns the key of that Field
     */
    static extractFieldKeyForIsolation(children: FieldList): string {
        let key: string;
        U.obj2KeyValueArr(children).some((child) => {
            if (child.value.type === 'PropertyField') {
                const propertyField = child.value as PropertyField;

                if (propertyField._property_field_form) {

                    // if a role set has a role set form (to add or create a new form)

                    key = child.key

                } else if (U.extractRoleDetailKeyOfEditingTeEnt(propertyField._role_list)) {

                    // if a teEnt is editing

                    key = child.key;
                    return true;
                }
            } else if (child.value.type === 'TextPropertyField') {
                const textPropField = child.value as TextPropertyField;
                if (textPropField.createOrAdd) {
                    key = child.key;
                }
            }
        })
        return key;
    }
}
