import { InfTextProperty } from 'app/core/sdk';

export class TextPropertyDetail {

    fkClassField?: number;

    textareaLike?= true;
    inputLike?= false;

    textProperty?: InfTextProperty;

    constructor(data?: TextPropertyDetail) {
        Object.assign(this, data);
    }


}
