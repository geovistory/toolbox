import {  ExistenceTimeDetail } from './existence-time-detail';
import { ExTimeHelpMode, ExTimeModalMode } from './types';


export class ExistenceTimeEdit extends ExistenceTimeDetail {
    helpMode?: ExTimeHelpMode;
    mode?: ExTimeModalMode;

    constructor(data?: ExistenceTimeEdit) {
        super()
        Object.assign(this, data);
    }

}
