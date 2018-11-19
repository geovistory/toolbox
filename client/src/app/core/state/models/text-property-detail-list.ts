import { TextPropertyDetail } from './text-property-detail';

export class TextPropertyDetailList {

    [key: string]: TextPropertyDetail;

    constructor(data?: TextPropertyDetailList) {
        Object.assign(this, data);
    }


}
