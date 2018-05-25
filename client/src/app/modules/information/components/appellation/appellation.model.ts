import { InfAppellation } from "app/core";
import { EditorStates } from "../../information.models";

export interface IAppellationState {
    appellation?: InfAppellation,
    state?: EditorStates,
}


export class AppellationState implements IAppellationState {
    appellation?: InfAppellation;
    state?: EditorStates;

    constructor(data?: IAppellationState) {
        Object.assign(this, data)
    }
}

