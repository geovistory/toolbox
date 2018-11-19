import { InfTextProperty } from 'app/core/sdk';
import { CollapsedExpanded } from './types';

export class TextPropertyDetail {

    fkClassField?: number;

    textareaLike?= true;
    inputLike?= false;

    textProperty?: InfTextProperty;

    toggle?: CollapsedExpanded = 'collapsed';

    constructor(data?: TextPropertyDetail) {
        Object.assign(this, data);
    }


}
