import { DataUnitChild } from "./types";

export interface DataUnitChildListI { 
    [keyInState: string]: DataUnitChild; 
}

export class DataUnitChildList implements DataUnitChildListI {
    [keyInState: string]: DataUnitChild; 

    constructor(data?: DataUnitChildListI) {
        Object.assign(this, data);
    }
}