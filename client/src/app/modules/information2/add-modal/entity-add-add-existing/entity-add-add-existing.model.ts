import { PeItDetail } from "../../information.models";


export interface IEntityAddExistingState {
        peItState?: PeItDetail
}


export class EntityAddExistingState implements IEntityAddExistingState {
        peItState?: PeItDetail;

    constructor(data?:IEntityAddExistingState) {
        Object.assign(
            this,
            data
        )
    }
}
