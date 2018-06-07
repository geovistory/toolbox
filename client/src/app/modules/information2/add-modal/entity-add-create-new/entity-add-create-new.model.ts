import { InfPersistentItem } from "app/core";
import { PeItDetail } from "../../information.models";


export interface IEntityCreateNewState {
    peItState?: PeItDetail,
    formValue?: InfPersistentItem;
}


export class EntityCreateNewState implements IEntityCreateNewState {
    peItState?: PeItDetail;
    formValue?: InfPersistentItem;

    constructor(data?: IEntityCreateNewState) {
        Object.assign(
            this,
            data
        )
    }
}
