import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IPeItState } from "../../containers/pe-it/pe-it.model";
import { InfPersistentItem } from "../../../../core";


export interface IEntityCreateNewState {
    peItState?: IPeItState,
    formValue?: InfPersistentItem;
}


export class EntityCreateNewState implements IEntityCreateNewState {
    peItState?: IPeItState;
    formValue?: InfPersistentItem;

    constructor(data?: IEntityCreateNewState) {
        Object.assign(
            this,
            data
        )
    }
}
