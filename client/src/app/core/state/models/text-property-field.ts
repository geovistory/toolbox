import { TextPropertyDetailList } from './text-property-detail-list';
import { FieldType, CollapsedExpanded } from './types';
import { Field } from './field';

export class TextPropertyField extends Field {

    readonly type?= 'TextPropertyField';

    textPropertyDetailList?: TextPropertyDetailList;

    toggle?= 'expanded' as CollapsedExpanded;

    createOrAdd?: {
        createList?: TextPropertyDetailList;
        addList?: TextPropertyDetailList;
    }

    constructor(data?: TextPropertyField) {
        super()
        Object.assign(this, data);
    }


}
