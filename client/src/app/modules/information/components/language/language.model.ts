import { InfLanguage } from "app/core";
import { EditorStates } from "../../information.models";

export interface ILanguageState {
    language?: InfLanguage,
    state?: EditorStates,
}


export class LanguageState implements ILanguageState {
    language?: InfLanguage;
    state?: EditorStates;

    constructor(data?: ILanguageState) {
        Object.assign(this, data)
    }
}

