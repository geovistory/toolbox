import { TextPropertyDetailList } from './text-property-detail-list';
import { FieldType } from './types';
import { Field } from './field';

export class TextPropertyField extends Field {

    readonly type? = 'TextPropertyField';

    fkClassField?: number;

    textPropertyDetailList?: TextPropertyDetailList;

    constructor(data?: TextPropertyField) {
        super()
        Object.assign(this, data);
    }


}
