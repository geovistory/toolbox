import { InfTemporalEntity, InfRole, DfhProperty } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";
import { ExistenceTime } from "../existence-time";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IRoleSetListState } from "../role-set-list/role-set-list.model";
import { IExistenceTimeState } from "../te-ent-existence-time/te-ent-existence-time.model";




export interface ITeEntState extends IRoleSetListState{
    teEntToEdit?: InfTemporalEntity;
    teEntToAdd?: InfTemporalEntity;
    teEntToCreate?: InfTemporalEntity;

    /** before init */
    teEnt?: InfTemporalEntity;

    label?: string;
    state?: EditorStates;
    toggle?: CollapsedExpanded;

    existenceTimeState?: IExistenceTimeState;

}


export class TeEntState implements ITeEntState {

    teEntToEdit?: InfTemporalEntity;
    teEntToAdd?: InfTemporalEntity;
    teEntToCreate?: InfTemporalEntity;

    /** before init */
    teEnt?: InfTemporalEntity;

    label?: string;
    state?: EditorStates;
    toggle?: CollapsedExpanded;

    existenceTimeState?: IExistenceTimeState;

    constructor(data?: ITeEntState) {
        Object.assign(this, data)
    }

}
