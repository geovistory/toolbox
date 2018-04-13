import { InfTemporalEntity, InfRole, DfhProperty } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";
import { ExistenceTime } from "../existence-time";
import { IPiRoleSetListState } from "../../containers/pe-it-role-set-list/pe-it-role-set-list.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";




export interface ITeEntState {
    teEnt?: InfTemporalEntity;
    parentProperty?: DfhProperty;
    parentRole?: InfRole;
    label?: string;
    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    childRoleSetList?: BehaviorSubject<IPiRoleSetListState[]>;
    // existenceTimeState: BehaviorSubject<ITeExistenceTimeState>
}


export class TeEntState implements ITeEntState {


    
    constructor(data?:ITeEntState) {
        Object.assign(this, data)
    }

}
