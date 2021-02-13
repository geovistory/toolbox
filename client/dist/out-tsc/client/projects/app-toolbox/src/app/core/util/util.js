import { TimePrimitive, TimeSpanUtil } from '@kleiolab/lib-utils';
import { AcEntity } from 'angular-cesium';
import { SysConfig } from '../../../../../../../server/src/lb3/common/config/sys-config';
import { DfhConfig } from "@kleiolab/lib-config";
export class U {
    static obj2Arr(obj) {
        const arr = [];
        if (obj == undefined)
            return arr;
        Object.keys(obj).forEach(key => {
            arr.push(obj[key]);
        });
        return arr;
    }
    static objNr2Arr(obj) {
        const arr = [];
        if (obj == undefined)
            return arr;
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
    static obj2KeyValueArr(obj) {
        const keys = [];
        for (const key in obj) {
            if (obj[key]) {
                keys.push({ key: key, value: obj[key] });
            }
        }
        return keys;
    }
    static firstItemInIndexedGroup(item, key) {
        return item && item[key] && Object.keys(item[key]).length ? U.obj2Arr(item[key])[0] : undefined;
    }
    static firstItemInObject(item) {
        return item && Object.keys(item).length ? U.obj2Arr(item)[0] : undefined;
    }
    /**
     *  Extracts the calendar from  InfTimePrimitve to TimePrimitive
    */
    static getCalendarFromStatement(statement) {
        if (!statement)
            return null;
        const cal = (statement.entity_version_project_rels && statement.entity_version_project_rels[0].calendar) ?
            statement.entity_version_project_rels[0].calendar :
            statement.community_favorite_calendar ?
                statement.community_favorite_calendar : null;
        return cal;
    }
    /**
     * Converts InfStatement to TimePrimitive
     * @param r the InfStatement to convert
     */
    static infStatement2TimePrimitive(r) {
        // from InfTimePrimitve to TimePrimitive
        const infTp = r ? r.object_time_primitive : null;
        let timePrimitive = null;
        const obj = {};
        if (infTp && infTp.duration && infTp.julian_day &&
            U.getCalendarFromStatement(r)) {
            // add duration
            obj.duration = infTp.duration;
            // add calendar
            obj.calendar = U.getCalendarFromStatement(r);
            // add julian day
            obj.julianDay = infTp.julian_day;
            timePrimitive = new TimePrimitive(Object.assign({}, obj));
        }
        if (timePrimitive === null) {
            return new TimePrimitive({
                calendar: 'julian'
            });
        }
        else {
            return timePrimitive;
        }
    }
    static stringFromQuillDoc(quillDoc) {
        if (quillDoc && quillDoc.ops && quillDoc.ops.length)
            return quillDoc.ops.map(op => op.insert).join('');
        else
            return '';
    }
    /**
     * Transform ProProject to ProjectPreview
     */
    static proProjectToProjectPreview(project) {
        return {
            label: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
            description: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
            default_language: project.default_language,
            pk_project: project.pk_entity
        };
    }
    static firstProTextPropStringOfType(textProperties, fkSystemType) {
        return (textProperties.find(t => t.fk_system_type === fkSystemType) || { string: '' }).string;
    }
    /**
    * Erzeugt eine UUID nach RFC 4122
    */
    static uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
            let random = Math.random() * 16 | 0; // Nachkommastellen abschneiden
            let value = char === "x" ? random : (random % 4 + 8); // Bei x Random 0-15 (0-F), bei y Random 0-3 + 8 = 8-11 (8-b) gemäss RFC 4122
            return value.toString(16); // Hexadezimales Zeichen zurückgeben
        });
    }
    static timeSpanItemToTimeSpan(timeSpanItem) {
        const t = new TimeSpanUtil();
        timeSpanItem.properties.forEach(p => {
            const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
            if (p.items && p.items.length)
                t[key] = p.items[0].timePrimitive;
        });
        return t;
    }
    static propertyFieldKeyFromParams(fkProp, isOutgoing) {
        return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
    }
    /**
     * Helper function that converts given number to string
     * but zero (=0) values return undefined.
     */
    static toStr0undef(val) {
        if (val === 0)
            return undefined;
        else if (val === undefined)
            return undefined;
        else if (val === null)
            return undefined;
        else
            return val.toString();
    }
    /**
     * Helper function that converts given array to string
     *
     * If array contains 0, null or undefined, return underfined
     */
    static toStrContains0undef(vals) {
        let string = '';
        for (let i = 0; i < vals.length; i++) {
            const val = vals[i];
            if (val === 0)
                return undefined;
            else if (val === undefined)
                return undefined;
            else if (val === null)
                return undefined;
            else if (i === 0) {
                string = val.toString();
            }
            else {
                string = `${string}_${val.toString()}`;
            }
        }
        return string;
    }
}
U.acNotificationFromPacket = (packet, actionType) => ({
    id: packet.id,
    entity: new AcEntity(packet),
    actionType
});
U.CesiumJulianDateFromJulianSecond = (julianSeconds) => {
    if (!julianSeconds)
        return;
    const secondsOfFullDay = 60 * 60 * 24;
    const dayNumber = Math.floor(julianSeconds / secondsOfFullDay);
    const secondsOfDay = julianSeconds % secondsOfFullDay;
    return new Cesium.JulianDate(dayNumber, secondsOfDay);
};
U.recursiveMarkAsTouched = (f) => {
    if (f.controls) {
        if (Array.isArray(f.controls)) {
            // in this case it is a formArray
            f.controls.forEach((c) => {
                c.markAsTouched();
                if (c.controls)
                    U.recursiveMarkAsTouched(c);
            });
        }
        else {
            // in this case it is a formGroup
            if (f.controls['childControl']) {
                const c = f.controls['childControl'];
                c.markAsTouched();
                if (c.controls)
                    U.recursiveMarkAsTouched(c);
            }
        }
    }
};
//# sourceMappingURL=util.js.map