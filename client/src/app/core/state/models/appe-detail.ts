import { InfAppellation } from 'app/core/sdk/models/InfAppellation';

export interface AppeDetailI {
    appellation?: InfAppellation;
}

export class AppeDetail implements AppeDetailI {

    appellation: InfAppellation;

    constructor(data?: AppeDetailI) {
        Object.assign(this, data);
    }

}
