import {IndexDB} from './IndexDB';
import {StringToKeyModel} from '../interfaces/StringToKeyModel';
import {KeyModelToString} from '../interfaces/KeyModelToString';
import {Warehouse} from '../../Warehouse';

export class IndexDBGeneric<IdModel, ValueModel> extends IndexDB<IdModel, ValueModel> {
    constructor(
        public keyToString: KeyModelToString<IdModel>,
        public stringToKey: StringToKeyModel<IdModel>,
        name: string,
        wh: Warehouse
    ) {super(name, wh);}
}
