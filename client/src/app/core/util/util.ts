import { TimePrimitive, InfTimePrimitive, InfRole, InfTemporalEntity, InfPersistentItem, DfhProperty } from "..";
import { CalendarType } from "../date-time/time-primitive";
import { Granularity } from "../date-time/date-time-commons";
import { DfhConfig } from "../../modules/information2/shared/dfh-config";
import { AppellationLabel } from "../../modules/information2/shared/appellation-label";
import { RoleSet, RoleSetLabelObj, RoleSetList } from "../../modules/information2/information.models";
import { indexBy, omit } from 'ramda';
import { roleSetKey } from "../../modules/information2/information.helpers";
import { ComUiContextConfig } from "../sdk";
/**
 * Utilities class for static functions
 */

export class U {


    static obj2Arr(obj: { [key: string]: any }): any[] {
        let arr = [];

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
    static obj2KeyValueArr(obj: { [key: string]: any }): { key: string, value: any }[] {
        let keys = [];
        for (let key in obj) {
            keys.push({ key: key, value: obj[key] });
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
        let obj: any = {}

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
        }
        else {
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
                //TODO Add a clause as soon as we have DisplayRoleForDomain in the db to filter for the role that is standard?? or is this not happening on forms?
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
                //TODO Add a better clause as soon as we have DisplayRoleForDomain/Range
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
            return {
                isOutgoing: isOutgoing,
                property: omit(['labels', 'domain_class', 'range_class'], property),
                targetClassPk: isOutgoing ? property.dfh_has_range : property.dfh_has_domain,
                targetClass: isOutgoing ? property.range_class : property.domain_class,
                label: this.createLabelObject(property, isOutgoing)
            } as RoleSet
        });
    }

    /**
     * Converts array of ingoing Property and array of outgoing Property to RoleSetList
     * @param ingoingProperties 
     * @param outgoingProperties 
     */
    static roleSetsFromProperties(ingoingProperties: DfhProperty[], outgoingProperties: DfhProperty[]): RoleSetList {
        return indexBy(roleSetKey, [
            ...U.infProperties2RoleSets(false, ingoingProperties),
            ...U.infProperties2RoleSets(true, outgoingProperties)
        ])
    };

    /**
     * Gets ord_num of RoleSet or null, if not available
     * 
     * @param roleSet 
     */
    static ordNumOfRoleSet(roleSet: RoleSet): number | null {
        
        if(!U.uiPropConfigOfTRoleSet(roleSet)) return null;

        return U.uiPropConfigOfTRoleSet(roleSet).ord_num;
    }

    /**
     * gets ui_context_config of RoleSet or null, if not available
     * @param roleSet 
     */
    static uiPropConfigOfTRoleSet(roleSet: RoleSet): ComUiContextConfig | null {
        if (!roleSet) return null;

        if (!roleSet.property) return null;

        if (!roleSet.property.ui_context_config || !roleSet.property.ui_context_config[0]) return null;

        return roleSet.property.ui_context_config[0];
    }

    /**
     * create a label object for the property
     * @param property 
     * @param isOutgoing 
     */
    static createLabelObject(property: DfhProperty, isOutgoing: boolean): RoleSetLabelObj {
        let sg = 'n.N.'
        let pl = 'n.N.'

        let labelObj: RoleSetLabelObj;
        if (isOutgoing) {

            if (property) {
                sg = '[sg: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
                pl = '[pl: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
            }

            // TODO return an object containing label.pl and label.sg
            if (property.labels.length) {
                if (property.labels.find(l => l.notes === 'label.sg'))
                    sg = property.labels.find(l => l.notes === 'label.sg').dfh_label;
                if (property.labels.find(l => l.notes === 'label.pl'))
                    pl = property.labels.find(l => l.notes === 'label.pl').dfh_label;
            }

            labelObj = {
                sg: sg,
                pl: pl,
                default: property.dfh_range_instances_max_quantifier === 1 ? sg : pl
            }

        } else if (isOutgoing === false) {

            if (property) {
                sg = '[inv.sg: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
                pl = '[inv.pl: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
            }


            // TODO return an object containing inversed_label.pl and inversed_label.sg
            if (property.labels.length) {
                if (property.labels.find(l => l.notes === 'label_inversed.sg'))
                    sg = property.labels.find(l => l.notes === 'label_inversed.sg').dfh_label;
                if (property.labels.find(l => l.notes === 'label_inversed.pl'))
                    pl = property.labels.find(l => l.notes === 'label_inversed.pl').dfh_label;
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


}