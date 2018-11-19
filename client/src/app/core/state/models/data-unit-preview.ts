import { ExTimeLabel } from './ex-time-label';



export class DataUnitPreview {

    fkClass: number;
    pkEntity: number;
    label: string;

    constructor(data?: DataUnitPreview) {
        Object.assign(this, data);
    }
}
