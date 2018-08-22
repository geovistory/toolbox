import { TeEntDetail } from "./te-ent-detail";
import { AppeDetail } from "./appe-detail";
import { LangDetail } from "./lang-detail";
import { TimePrimitveDetail } from "./time-primitive-detail";
import { PeItDetail } from "./pe-it-detail";
import { PlaceDetail } from "./place-detail";
import { InfRole } from "app/core/sdk";
import { CollapsedExpanded } from "./types";

/*******************************
 * RoleDetail Interface
 *******************************/

export interface RoleDetailI {
    _teEnt?: TeEntDetail;

    _appe?: AppeDetail;
    _lang?: LangDetail;
    _timePrimitive?: TimePrimitveDetail;
    _leaf_peIt?: PeItDetail

    _leaf_teEnt?: TeEntDetail
    _place?: PlaceDetail;

    // record
    role?: InfRole;

    // gui
    isOutgoing?: boolean,

    toggle?: CollapsedExpanded;

    /**
     * This field flags roles that are used by the project to produce a display label of a range entity (thus normally a Persistent Item).
     * It is up to the application logic to create this label. This is usually done by following the path from the Role to the
     * TemporalEntity and from there to the Role with is_display_role_for_domain=true to some object
     * like an appellationLabel or a date, that can be used to create a display label.
     */
    isDisplayRoleForRange?: boolean;

    /**
     * This field flags roles that are used by the project to produce a display label of a domain entity (thus normally a Temporal Entity).
     *  It is up to the application logic to create this label. This done by following the path from the Role to the
     * range entity like an appellationLabel or a date, that can be used to create a display label.
     */
    isDisplayRoleForDomain?: boolean;

    /**
     * Pk of target class of a RoleState.
     * Used to select persistent Items or temporal entities of the given dfhClass.
     * E.g.: When selecting the Father of a Birth, this pk is used to initialize
     * the GUI for selecting a person.
     */
    targetClassPk?: number;

    /** true if the parent role of the parent teEnt is the same role */
    isCircular?: boolean;


    /** True while changing the display role (eye) */
    changingDisplayRole?: boolean;

    isReadyToCreate?: boolean;

}


export class RoleDetail implements RoleDetailI {
    _teEnt?: TeEntDetail;
    _appe?: AppeDetail;
    _lang?: LangDetail;
    _timePrimitive?: TimePrimitveDetail;
    _leaf_peIt?: PeItDetail
    _leaf_teEnt?: TeEntDetail
    _place?: PlaceDetail;
    role?: InfRole;
    isOutgoing?: boolean;
    toggle?: CollapsedExpanded;
    isDisplayRoleForRange?: boolean;
    isDisplayRoleForDomain?: boolean;
    targetClassPk?: number;
    isCircular?: boolean;
    changingDisplayRole?: boolean;
    isReadyToCreate?: boolean;    

    constructor(data?: RoleDetailI) {
        Object.assign(this, data);
    }
}