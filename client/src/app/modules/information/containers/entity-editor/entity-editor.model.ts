import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IPeItState } from "../pe-it/pe-it.model";

export interface IEntityEditorWrapper {
        peItState?: IPeItState
}


export class EntityEditorWrapper implements IEntityEditorWrapper {
        peItState?: IPeItState;

    constructor(data?:IEntityEditorWrapper) {
        Object.assign(
            this,
            data
        )
    }
}
