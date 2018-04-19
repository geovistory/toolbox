import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IPeItState } from "../../containers/pe-it/pe-it.model";


export interface IEntityCreateNewState {
        peItState?: IPeItState
}


export class EntityCreateNewState implements IEntityCreateNewState {
        peItState?: IPeItState;

    constructor(data?:IEntityCreateNewState) {
        Object.assign(
            this,
            data
        )
    }
}
