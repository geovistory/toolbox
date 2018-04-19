import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IPeItState } from "../../containers/pe-it/pe-it.model";


export interface IEntityAddExistingState {
        peItState?: IPeItState
}


export class EntityAddExistingState implements IEntityAddExistingState {
        peItState?: IPeItState;

    constructor(data?:IEntityAddExistingState) {
        Object.assign(
            this,
            data
        )
    }
}
