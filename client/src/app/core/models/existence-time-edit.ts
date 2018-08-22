import { ExistenceTimeDetailI, ExistenceTimeDetail } from "./existence-time-detail";
import { ExTimeHelpMode, ExTimeModalMode } from "./types";

export interface ExistenceTimeEditI extends ExistenceTimeDetailI {
    // mode of help
    helpMode?: ExTimeHelpMode;
    mode?: ExTimeModalMode;
}

export class ExistenceTimeEdit extends ExistenceTimeDetail {
    helpMode: ExTimeHelpMode;
    mode: ExTimeModalMode;

    constructor(data?: ExistenceTimeEditI) {
        super()
        Object.assign(this, data);
    }

}