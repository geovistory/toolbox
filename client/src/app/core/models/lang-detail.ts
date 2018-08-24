import { InfLanguage } from "app/core/sdk";

export interface LangDetailI {
    language?: InfLanguage
}

export class LangDetail implements LangDetailI {
    language?: InfLanguage
    
    constructor(data?: LangDetailI) {
        Object.assign(this, data);
    }
}