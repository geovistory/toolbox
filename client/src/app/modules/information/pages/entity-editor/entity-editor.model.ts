import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface IEntityEditorWrapper {
    children: {
        peItWrapper$: BehaviorSubject<IPeItWrapper>,
    }
}

