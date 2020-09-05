import {IndexDB} from './IndexDB';
import {StringToKeyModel} from '../interfaces/StringToKeyModel';
import {KeyModelToString} from '../interfaces/KeyModelToString';

export class IndexDBGeneric<IdModel, ValueModel> extends IndexDB<IdModel, ValueModel> {
    constructor(
        public keyToString: KeyModelToString<IdModel>,
        public stringToKey: StringToKeyModel<IdModel>,
        name: string
    ) {super(name);}
}
