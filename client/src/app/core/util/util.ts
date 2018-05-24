import { TimePrimitive, InfTimePrimitive, InfRole } from "..";
import { CalendarType } from "../date-time/time-primitive";
import { Granularity } from "../date-time/date-time-commons";

/**
 * Utilities class for static functions
 */

export class U {


    static obj2Arr(obj: { [key: string]: any }): any[] {
        let arr = [];
        Object.keys(obj).forEach(key => {
            arr.push(obj[key]);
        })
        return arr;
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


    


}